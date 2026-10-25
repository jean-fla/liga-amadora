
"use client";

import { useState } from "react";

type Time = {
  nome: string;
  sigla: string;
  pontos: number;
  jogos: number;
  v: number;
  e: number;
  d: number;
  sg: number;
};

type Jogo = {
  id: number;
  casa: string;
  siglaCasa: string;
  fora: string;
  siglaFora: string;
  data: string;
  local: string;
  status: "Agendado" | "Encerrado";
  golsCasa?: number;
  golsFora?: number;
};

const timesIniciais: Time[] = [
  { nome: "Atlético do Vale", sigla: "ADV", pontos: 18, jogos: 7, v: 6, e: 0, d: 1, sg: 12 },
  { nome: "Real Alegre", sigla: "REA", pontos: 15, jogos: 7, v: 5, e: 0, d: 2, sg: 8 },
  { nome: "União FC", sigla: "UFC", pontos: 13, jogos: 7, v: 4, e: 1, d: 2, sg: 5 },
  { nome: "Estrela Azul", sigla: "EAZ", pontos: 10, jogos: 7, v: 3, e: 1, d: 3, sg: 1 },
  { nome: "Vila Nova", sigla: "VNO", pontos: 7, jogos: 7, v: 2, e: 1, d: 4, sg: -4 },
];

const jogosIniciais: Jogo[] = [
  {
    id: 1,
    casa: "Atlético do Vale",
    siglaCasa: "ADV",
    fora: "Real Alegre",
    siglaFora: "REA",
    data: "Sábado, 15:30",
    local: "Campo Municipal",
    status: "Agendado",
  },
  {
    id: 2,
    casa: "União FC",
    siglaCasa: "UFC",
    fora: "Estrela Azul",
    siglaFora: "EAZ",
    data: "Domingo, 09:00",
    local: "Arena do Bairro",
    status: "Agendado",
  },
  {
    id: 3,
    casa: "Real Alegre",
    siglaCasa: "REA",
    fora: "Vila Nova",
    siglaFora: "VNO",
    data: "Rodada anterior",
    local: "Campo Municipal",
    status: "Encerrado",
    golsCasa: 2,
    golsFora: 1,
  },
  {
    id: 4,
    casa: "Atlético do Vale",
    siglaCasa: "ADV",
    fora: "União FC",
    siglaFora: "UFC",
    data: "Rodada anterior",
    local: "Arena do Bairro",
    status: "Encerrado",
    golsCasa: 3,
    golsFora: 0,
  },
];

const artilheiros = [
  { nome: "Lucas Ferreira", time: "Atlético do Vale", sigla: "ADV", gols: 8 },
  { nome: "Gabriel Souza", time: "Real Alegre", sigla: "REA", gols: 6 },
  { nome: "Pedro Henrique", time: "União FC", sigla: "UFC", gols: 5 },
  { nome: "Matheus Lima", time: "Estrela Azul", sigla: "EAZ", gols: 4 },
  { nome: "Rafael Costa", time: "Vila Nova", sigla: "VNO", gols: 3 },
];

function Escudo({ sigla }: { sigla: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xs font-black text-blue-950 shadow-sm">
      {sigla}
    </div>
  );
}

function TituloSecao({
  etiqueta,
  titulo,
  descricao,
}: {
  etiqueta: string;
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
        {etiqueta}
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
        {titulo}
      </h2>
      <p className="mt-2 text-sm text-slate-500">{descricao}</p>
    </div>
  );
}

export default function Home() {
  const [times, setTimes] = useState<Time[]>(timesIniciais);
  const [pesquisa, setPesquisa] = useState("");
  const [ordem, setOrdem] = useState("pontos");
  const [filtroJogo, setFiltroJogo] = useState("Todos");
  const [timeSelecionado, setTimeSelecionado] = useState<Time | null>(null);
  const [painelAberto, setPainelAberto] = useState(false);
  const [nomeNovoTime, setNomeNovoTime] = useState("");
  const [siglaNovoTime, setSiglaNovoTime] = useState("");
  const [aviso, setAviso] = useState("");

  const timesFiltrados = times
    .filter((time) =>
      time.nome.toLowerCase().includes(pesquisa.toLowerCase())
    )
    .sort((a, b) => {
      if (ordem === "vitorias") return b.v - a.v;
      if (ordem === "saldo") return b.sg - a.sg;
      if (ordem === "nome") return a.nome.localeCompare(b.nome);
      return b.pontos - a.pontos || b.sg - a.sg || b.v - a.v;
    });

  const jogosVisiveis = jogosIniciais.filter((jogo) => {
    if (filtroJogo === "Próximos") return jogo.status === "Agendado";
    if (filtroJogo === "Encerrados") return jogo.status === "Encerrado";
    return true;
  });

  function adicionarTime(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nome = nomeNovoTime.trim();
    const sigla = siglaNovoTime.trim().toUpperCase();

    if (!nome || !sigla) {
      setAviso("Preencha o nome e a sigla do clube.");
      return;
    }

    if (times.some((time) => time.nome.toLowerCase() === nome.toLowerCase())) {
      setAviso("Esse time já está cadastrado.");
      return;
    }

    if (times.some((time) => time.sigla === sigla)) {
      setAviso("Essa sigla já está sendo utilizada.");
      return;
    }

    setTimes((atuais) => [
      ...atuais,
      { nome, sigla, pontos: 0, jogos: 0, v: 0, e: 0, d: 0, sg: 0 },
    ]);

    setNomeNovoTime("");
    setSiglaNovoTime("");
    setAviso("Time adicionado nesta demonstração!");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-xl text-white">
              ⚽
            </div>
            <div>
              <p className="text-lg font-black tracking-tight text-blue-950">
                LIGA AMADORA
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Futebol que conecta
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#inicio" className="hover:text-blue-950">Início</a>
            <a href="#classificacao" className="hover:text-blue-950">Classificação</a>
            <a href="#jogos" className="hover:text-blue-950">Partidas</a>
            <a href="#artilharia" className="hover:text-blue-950">Artilharia</a>
          </nav>

          <button
            type="button"
            onClick={() => {
              setPainelAberto(!painelAberto);
              setAviso("");
            }}
            className="rounded-xl bg-blue-950 px-3 py-3 text-xs font-bold text-white transition hover:bg-blue-800 sm:px-4 sm:text-sm"
          >
            {painelAberto ? "Fechar painel" : "Organizador"}
          </button>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden bg-blue-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border-[45px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-48 right-1/4 h-96 w-96 rounded-full border-[55px] border-white/5" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.3fr_0.7fr] md:items-center md:py-24 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Temporada em destaque
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
              A paixão começa aqui
            </p>

            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              O seu campeonato.
              <span className="block text-blue-300">A sua torcida.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-blue-100/80 sm:text-lg">
              Acompanhe os clubes, confira os confrontos e descubra quem está
              brilhando no futebol amador.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#classificacao"
                className="rounded-xl bg-white px-5 py-3.5 font-bold text-blue-950 transition hover:bg-blue-50"
              >
                Ver classificação →
              </a>
              <a
                href="#jogos"
                className="rounded-xl border border-white/25 px-5 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Conferir partidas
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-blue-100">LIGA REGIONAL</p>
              <span className="rounded-lg bg-amber-300/15 px-2.5 py-1 text-xs font-bold text-amber-200">
                DEMONSTRAÇÃO
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-black">Temporada 2026</h2>
            <p className="mt-1 text-sm text-blue-200">Futebol amador</p>

            <div className="my-6 h-px bg-white/15" />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-3xl font-black">{String(times.length).padStart(2, "0")}</p>
                <p className="mt-1 text-xs text-blue-200">Clubes</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-3xl font-black">{String(jogosIniciais.length).padStart(2, "0")}</p>
                <p className="mt-1 text-xs text-blue-200">Partidas</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-3xl font-black">
                  {times.length > 0
                    ? times.reduce((lider, time) => time.pontos > lider.pontos ? time : lider).sigla
                    : "--"}
                </p>
                <p className="mt-1 text-xs text-blue-200">Líder</p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-blue-200/70">
              Os dados atuais são fictícios e servem para demonstrar as funcionalidades.
            </p>
          </div>
        </div>
      </section>

      {painelAberto && (
        <section className="border-b border-blue-200 bg-blue-50">
          <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
            <div className="mb-6 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-xl text-white">
                ⚙
              </div>
              <div>
                <h2 className="text-2xl font-black text-blue-950">
                  Painel do organizador
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Demonstração local de cadastro de clubes.
                </p>
              </div>
            </div>

            <form
              onSubmit={adicionarTime}
              className="grid gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:grid-cols-[1fr_160px_auto] sm:items-end"
            >
              <div>
                <label htmlFor="novo-time" className="mb-2 block text-sm font-bold text-blue-950">
                  Nome do clube
                </label>
                <input
                  id="novo-time"
                  value={nomeNovoTime}
                  onChange={(event) => setNomeNovoTime(event.target.value)}
                  placeholder="Ex.: Esporte Clube"
                  maxLength={60}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="sigla-time" className="mb-2 block text-sm font-bold text-blue-950">
                  Sigla
                </label>
                <input
                  id="sigla-time"
                  value={siglaNovoTime}
                  onChange={(event) => setSiglaNovoTime(event.target.value)}
                  placeholder="EXC"
                  maxLength={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-950 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
              >
                Adicionar time
              </button>
            </form>

            {aviso && (
              <p role="status" className="mt-3 text-sm font-semibold text-blue-950">
                {aviso}
              </p>
            )}

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Atenção: este painel é apenas uma demonstração. Não tem login nem
              gravação permanente. Os times adicionados desaparecem quando a
              página é recarregada. Não use dados reais ainda.
            </p>
          </div>
        </section>
      )}

      <section id="classificacao" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <TituloSecao
          etiqueta="Quem está na frente?"
          titulo="Classificação"
          descricao="Pesquise os clubes e organize a tabela por diferentes critérios."
        />

        <div className="mb-5 grid gap-4 sm:grid-cols-[1fr_220px]">
          <div>
            <label htmlFor="pesquisa-times" className="mb-2 block text-sm font-bold text-blue-950">
              Buscar time
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <span aria-hidden="true">🔎</span>
              <input
                id="pesquisa-times"
                type="search"
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
                placeholder="Digite o nome do clube..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              {pesquisa && (
                <button
                  type="button"
                  onClick={() => setPesquisa("")}
                  className="text-sm font-bold text-blue-800"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="ordem-tabela" className="mb-2 block text-sm font-bold text-blue-950">
              Ordenar classificação
            </label>
            <select
              id="ordem-tabela"
              value={ordem}
              onChange={(event) => setOrdem(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="pontos">Pontos e saldo de gols</option>
              <option value="vitorias">Número de vitórias</option>
              <option value="saldo">Saldo de gols</option>
              <option value="nome">Nome do clube</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div>
              <h3 className="font-extrabold text-blue-950">Tabela de pontos</h3>
              <p className="mt-1 text-xs text-slate-500">
                {timesFiltrados.length} clube(s) encontrado(s)
              </p>
            </div>
            <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800">
              TEMPORADA 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Pos.</th>
                  <th className="px-3 py-4">Clube</th>
                  <th className="px-3 py-4 text-center">PTS</th>
                  <th className="px-3 py-4 text-center">J</th>
                  <th className="px-3 py-4 text-center">V</th>
                  <th className="px-3 py-4 text-center">E</th>
                  <th className="px-3 py-4 text-center">D</th>
                  <th className="px-5 py-4 text-center">SG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timesFiltrados.map((time, index) => (
                  <tr key={time.sigla} className="transition hover:bg-blue-50/60">
                    <td className="px-5 py-4">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg font-black ${index === 0 ? "bg-blue-950 text-white" : "bg-slate-100 text-slate-600"}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        type="button"
                        onClick={() => setTimeSelecionado(time)}
                        className="flex items-center gap-3 text-left"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-blue-950">
                          {time.sigla}
                        </div>
                        <span className="whitespace-nowrap font-bold text-slate-800 hover:text-blue-800">
                          {time.nome}
                        </span>
                      </button>
                    </td>
                    <td className="px-3 py-4 text-center font-black text-blue-950">{time.pontos}</td>
                    <td className="px-3 py-4 text-center text-slate-600">{time.jogos}</td>
                    <td className="px-3 py-4 text-center text-slate-600">{time.v}</td>
                    <td className="px-3 py-4 text-center text-slate-600">{time.e}</td>
                    <td className="px-3 py-4 text-center text-slate-600">{time.d}</td>
                    <td className={`px-5 py-4 text-center font-bold ${time.sg > 0 ? "text-emerald-700" : time.sg < 0 ? "text-red-600" : "text-slate-500"}`}>
                      {time.sg > 0 ? `+${time.sg}` : time.sg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {timesFiltrados.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-slate-500">
                Nenhum time encontrado. Tente outro nome.
              </p>
            )}
          </div>

          <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            PTS: pontos • J: jogos • V: vitórias • E: empates • D: derrotas • SG: saldo de gols.
          </p>
        </div>

        {timeSelecionado && (
          <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950 text-sm font-black text-white">
                  {timeSelecionado.sigla}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Perfil do clube</p>
                  <h3 className="mt-1 text-2xl font-black text-blue-950">{timeSelecionado.nome}</h3>
                  <p className="mt-1 text-sm text-slate-500">Liga Regional • Temporada 2026</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTimeSelecionado(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Fechar perfil
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Pontos", valor: timeSelecionado.pontos },
                { label: "Vitórias", valor: timeSelecionado.v },
                { label: "Empates", valor: timeSelecionado.e },
                { label: "Saldo de gols", valor: timeSelecionado.sg > 0 ? `+${timeSelecionado.sg}` : timeSelecionado.sg },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-1 text-2xl font-black text-blue-950">{item.valor}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Perfil demonstrativo. Elenco, escudo oficial e histórico detalhado poderão ser conectados ao banco posteriormente.
            </p>
          </div>
        )}
      </section>

      <section id="jogos" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <TituloSecao
            etiqueta="Prepare a torcida"
            titulo="Central de partidas"
            descricao="Consulte os próximos confrontos e confira os resultados anteriores."
          />

          <div className="mb-6 flex flex-wrap gap-2">
            {["Todos", "Próximos", "Encerrados"].map((filtro) => (
              <button
                key={filtro}
                type="button"
                onClick={() => setFiltroJogo(filtro)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${filtroJogo === filtro ? "bg-blue-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50"}`}
              >
                {filtro}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {jogosVisiveis.map((jogo) => (
              <article key={jogo.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:shadow-lg sm:p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-lg bg-blue-100 px-3 py-2 text-[10px] font-black tracking-wider text-blue-900">
                    {jogo.data}
                  </span>
                  <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${jogo.status === "Encerrado" ? "bg-slate-200 text-slate-700" : "bg-emerald-100 text-emerald-800"}`}>
                    {jogo.status}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const time = times.find((t) => t.sigla === jogo.siglaCasa);
                      if (time) setTimeSelecionado(time);
                    }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <Escudo sigla={jogo.siglaCasa} />
                    <span className="text-sm font-extrabold text-slate-800 hover:text-blue-800">{jogo.casa}</span>
                  </button>

                  {jogo.status === "Encerrado" ? (
                    <div className="rounded-xl bg-blue-950 px-3 py-2 text-xl font-black text-white">
                      {jogo.golsCasa} - {jogo.golsFora}
                    </div>
                  ) : (
                    <span className="rounded-xl bg-blue-950 px-3 py-2 text-sm font-black text-white">VS</span>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const time = times.find((t) => t.sigla === jogo.siglaFora);
                      if (time) setTimeSelecionado(time);
                    }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <Escudo sigla={jogo.siglaFora} />
                    <span className="text-sm font-extrabold text-slate-800 hover:text-blue-800">{jogo.fora}</span>
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
                  <span>📍</span>
                  {jogo.local}
                </div>
              </article>
            ))}
          </div>

          {jogosVisiveis.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              Não há partidas nesta categoria.
            </p>
          )}
        </div>
      </section>

      <section id="artilharia" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <TituloSecao
          etiqueta="Quem balança a rede?"
          titulo="Artilharia"
          descricao="Confira os jogadores com mais gols nesta demonstração."
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="font-extrabold text-blue-950">Maiores goleadores</h3>
            <p className="mt-1 text-xs text-slate-500">Estatísticas fictícias para demonstração</p>
          </div>

          <div className="divide-y divide-slate-100">
            {artilheiros.map((jogador, index) => (
              <div key={jogador.nome} className="flex items-center gap-4 px-5 py-4 transition hover:bg-blue-50/50">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-black ${index === 0 ? "bg-amber-300 text-amber-950" : "bg-slate-100 text-slate-600"}`}>
                  {index + 1}
                </div>
                <Escudo sigla={jogador.sigla} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-800">{jogador.nome}</p>
                  <p className="mt-1 text-xs text-slate-500">{jogador.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-blue-950">{jogador.gols}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-500">gols</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-blue-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-black tracking-wide">LIGA AMADORA ⚽</p>
            <p className="mt-1 text-xs text-blue-200">
              Valorizando o futebol da nossa comunidade.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-blue-200">
            <a href="#classificacao" className="hover:text-white">Classificação</a>
            <a href="#jogos" className="hover:text-white">Partidas</a>
            <a href="#artilharia" className="hover:text-white">Artilharia</a>
          </div>
          <p className="text-xs text-blue-200/70">Projeto acadêmico • 2026</p>
        </div>
      </footer>
    </main>
  );
}
