
"use client";

import { useState, type FormEvent } from "react";

type Time = {
  nome: string;
  sigla: string;
  v: number;
  e: number;
  d: number;
  gp: number;
  gc: number;
};

type Jogo = {
  casa: string;
  siglaCasa: string;
  fora: string;
  siglaFora: string;
  data: string;
  local: string;
  golsCasa?: number;
  golsFora?: number;
  status: "Agendado" | "Encerrado";
};

type Artilheiro = {
  nome: string;
  time: string;
  sigla: string;
  gols: number;
};

type TimeComEstatisticas = Time & {
  jogos: number;
  pontos: number;
  sg: number;
  aproveitamento: number;
};

const timesIniciais: Time[] = [
  { nome: "Atlético do Vale", sigla: "ADV", v: 6, e: 0, d: 1, gp: 20, gc: 8 },
  { nome: "Real Alegre", sigla: "REA", v: 5, e: 0, d: 2, gp: 17, gc: 9 },
  { nome: "União FC", sigla: "UFC", v: 4, e: 1, d: 2, gp: 14, gc: 9 },
  { nome: "Estrela Azul", sigla: "EAZ", v: 3, e: 1, d: 3, gp: 11, gc: 10 },
  { nome: "Vila Nova", sigla: "VNO", v: 2, e: 1, d: 4, gp: 8, gc: 12 },
];

const jogosIniciais: Jogo[] = [
  {
    casa: "Atlético do Vale",
    siglaCasa: "ADV",
    fora: "Real Alegre",
    siglaFora: "REA",
    data: "SÁBADO, 15:30",
    local: "Campo Municipal",
    status: "Agendado",
  },
  {
    casa: "União FC",
    siglaCasa: "UFC",
    fora: "Estrela Azul",
    siglaFora: "EAZ",
    data: "DOMINGO, 09:00",
    local: "Arena do Bairro",
    status: "Agendado",
  },
  {
    casa: "Vila Nova",
    siglaCasa: "VNO",
    fora: "Atlético do Vale",
    siglaFora: "ADV",
    data: "RODADA ANTERIOR",
    local: "Campo do Centro",
    golsCasa: 1,
    golsFora: 3,
    status: "Encerrado",
  },
  {
    casa: "Real Alegre",
    siglaCasa: "REA",
    fora: "União FC",
    siglaFora: "UFC",
    data: "RODADA ANTERIOR",
    local: "Estádio Municipal",
    golsCasa: 2,
    golsFora: 2,
    status: "Encerrado",
  },
];

const artilheiros: Artilheiro[] = [
  { nome: "Pedro Henrique", time: "Atlético do Vale", sigla: "ADV", gols: 9 },
  { nome: "Lucas Martins", time: "Real Alegre", sigla: "REA", gols: 7 },
  { nome: "Gabriel Souza", time: "União FC", sigla: "UFC", gols: 6 },
  { nome: "Matheus Costa", time: "Estrela Azul", sigla: "EAZ", gols: 5 },
  { nome: "Rafael Oliveira", time: "Vila Nova", sigla: "VNO", gols: 4 },
];

function calcularEstatisticas(time: Time): TimeComEstatisticas {
  const jogos = time.v + time.e + time.d;
  const pontos = time.v * 3 + time.e;
  const sg = time.gp - time.gc;
  const aproveitamento =
    jogos > 0 ? Math.round((pontos / (jogos * 3)) * 100) : 0;

  return {
    ...time,
    jogos,
    pontos,
    sg,
    aproveitamento,
  };
}

function Escudo({ sigla }: { sigla: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-black tracking-tight text-blue-950 shadow-sm">
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
      <p className="mt-2 text-sm leading-6 text-slate-500">{descricao}</p>
    </div>
  );
}

export default function Home() {
  const [times, setTimes] = useState<Time[]>(timesIniciais);
  const [pesquisa, setPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("pontos");
  const [filtroJogos, setFiltroJogos] = useState("Todos");
  const [timeSelecionado, setTimeSelecionado] = useState<string | null>(null);
  const [painelOrganizador, setPainelOrganizador] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novaSigla, setNovaSigla] = useState("");
  const [aviso, setAviso] = useState("");

  const jogos = jogosIniciais;

  const classificacao = times
    .map(calcularEstatisticas)
    .sort((a, b) => {
      if (ordenacao === "nome") {
        return a.nome.localeCompare(b.nome, "pt-BR");
      }

      if (ordenacao === "vitorias") {
        return b.v - a.v || b.pontos - a.pontos || b.sg - a.sg;
      }

      if (ordenacao === "saldo") {
        return b.sg - a.sg || b.pontos - a.pontos;
      }

      return (
        b.pontos - a.pontos ||
        b.v - a.v ||
        b.sg - a.sg ||
        b.gp - a.gp
      );
    });

  const timesFiltrados = classificacao.filter((time) =>
    time.nome.toLowerCase().includes(pesquisa.toLowerCase().trim())
  );

  const jogosVisiveis = jogos.filter((jogo) => {
    if (filtroJogos === "Agendados") return jogo.status === "Agendado";
    if (filtroJogos === "Encerrados") return jogo.status === "Encerrado";
    return true;
  });

  const lider = classificacao[0];
  const totalJogos = times.reduce(
    (total, time) => total + time.v + time.e + time.d,
    0
  ) / 2;

  const totalGols = times.reduce((total, time) => total + time.gp, 0);

  function adicionarTime(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nome = novoNome.trim();
    const sigla = novaSigla.trim().toUpperCase();

    if (!nome || !sigla) {
      setAviso("Preencha o nome e a sigla do time.");
      return;
    }

    if (sigla.length > 4) {
      setAviso("A sigla deve ter no máximo 4 caracteres.");
      return;
    }

    if (times.some((time) => time.nome.toLowerCase() === nome.toLowerCase())) {
      setAviso("Já existe um time com esse nome.");
      return;
    }

    if (times.some((time) => time.sigla === sigla)) {
      setAviso("Essa sigla já está sendo utilizada.");
      return;
    }

    setTimes((atuais) => [
      ...atuais,
      {
        nome,
        sigla,
        v: 0,
        e: 0,
        d: 0,
        gp: 0,
        gc: 0,
      },
    ]);

    setNovoNome("");
    setNovaSigla("");
    setAviso(`Time "${nome}" adicionado à tabela de demonstração.`);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
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

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#inicio" className="transition hover:text-blue-950">
              Início
            </a>
            <a href="#classificacao" className="transition hover:text-blue-950">
              Classificação
            </a>
            <a href="#jogos" className="transition hover:text-blue-950">
              Partidas
            </a>
            <a href="#artilheiros" className="transition hover:text-blue-950">
              Artilheiros
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setPainelOrganizador(!painelOrganizador)}
            className="rounded-xl bg-blue-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-900 sm:text-sm"
          >
            {painelOrganizador ? "Fechar painel" : "Área do organizador"}
          </button>
        </div>
      </header>

      {painelOrganizador && (
        <section className="border-b border-blue-200 bg-blue-50">
          <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
            <h2 className="text-xl font-black text-blue-950">
              Cadastro demonstrativo de times
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Adicione uma equipe para testar a tabela. Este formulário ainda
              não utiliza login nem salva dados no banco de dados.
            </p>

            <form
              onSubmit={adicionarTime}
              className="mt-5 grid gap-3 sm:grid-cols-[1fr_150px_auto]"
            >
              <input
                value={novoNome}
                onChange={(event) => setNovoNome(event.target.value)}
                placeholder="Nome do time"
                maxLength={60}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input
                value={novaSigla}
                onChange={(event) => setNovaSigla(event.target.value)}
                placeholder="Sigla (ex.: ABC)"
                maxLength={4}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900"
              >
                Adicionar time
              </button>
            </form>

            {aviso && (
              <p role="status" className="mt-3 text-sm font-semibold text-blue-900">
                {aviso}
              </p>
            )}
          </div>
        </section>
      )}

      <section
        id="inicio"
        className="relative overflow-hidden bg-blue-950 text-white"
      >
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border-[45px] border-white/5" />
        <div className="absolute -bottom-48 right-1/4 h-96 w-96 rounded-full border-[55px] border-white/5" />

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
              Acompanhe a classificação, confira os confrontos e descubra quem
              está brilhando no futebol amador.
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
                Ver partidas
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-blue-100">
                CAMPEONATO EM DESTAQUE
              </p>
              <span className="rounded-lg bg-emerald-400/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
                DEMO
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-black">Liga Regional</h2>
            <p className="mt-1 text-sm text-blue-200">
              Futebol amador • Temporada 2026
            </p>

            <div className="my-6 h-px bg-white/15" />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-3xl font-black">{String(times.length).padStart(2, "0")}</p>
                <p className="mt-1 text-xs text-blue-200">Times</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-3xl font-black">{String(Math.round(totalJogos)).padStart(2, "0")}</p>
                <p className="mt-1 text-xs text-blue-200">Jogos registrados</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-3xl font-black">{totalGols}</p>
                <p className="mt-1 text-xs text-blue-200">Gols pró somados</p>
              </div>
            </div>

            {lider && (
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <Escudo sigla={lider.sigla} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-blue-200">Líder da tabela</p>
                  <p className="truncate font-extrabold">{lider.nome}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">{lider.pontos}</p>
                  <p className="text-xs text-blue-200">pontos</p>
                </div>
              </div>
            )}

            <p className="mt-4 text-xs leading-5 text-blue-200/70">
              Números ilustrativos para demonstração do sistema.
            </p>
          </div>
        </div>
      </section>

      <section
        id="classificacao"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 lg:px-8 lg:py-20"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <TituloSecao
            etiqueta="Quem está na frente?"
            titulo="Classificação"
            descricao="Compare o desempenho dos clubes e acompanhe a disputa pela liderança."
          />
          <span className="mb-8 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
            TEMPORADA 2026
          </span>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-[1fr_240px]">
          <div>
            <label
              htmlFor="pesquisa-times"
              className="mb-2 block text-sm font-bold text-blue-950"
            >
              Buscar time
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <span aria-hidden="true">🔎</span>
              <input
                id="pesquisa-times"
                type="search"
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
                placeholder="Digite o nome de um clube..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              {pesquisa && (
                <button
                  type="button"
                  onClick={() => setPesquisa("")}
                  className="text-sm font-bold text-blue-800 hover:text-blue-950"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="ordenacao"
              className="mb-2 block text-sm font-bold text-blue-950"
            >
              Ordenar tabela por
            </label>
            <select
              id="ordenacao"
              value={ordenacao}
              onChange={(event) => setOrdenacao(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="pontos">Pontos e critérios</option>
              <option value="vitorias">Vitórias</option>
              <option value="saldo">Saldo de gols</option>
              <option value="nome">Nome do time</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div>
              <h3 className="font-extrabold text-blue-950">
                Tabela de classificação
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Pontuação e estatísticas dos clubes
              </p>
            </div>
            <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800">
              {timesFiltrados.length} {timesFiltrados.length === 1 ? "clube" : "clubes"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Pos.</th>
                  <th className="px-3 py-4">Clube</th>
                  <th className="px-3 py-4 text-center">PTS</th>
                  <th className="px-3 py-4 text-center">J</th>
                  <th className="px-3 py-4 text-center">V</th>
                  <th className="px-3 py-4 text-center">E</th>
                  <th className="px-3 py-4 text-center">D</th>
                  <th className="px-3 py-4 text-center">GP</th>
                  <th className="px-3 py-4 text-center">GC</th>
                  <th className="px-3 py-4 text-center">SG</th>
                  <th className="px-5 py-4 text-center">APR.</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {timesFiltrados.map((time, index) => {
                  const posicaoOriginal = classificacao.findIndex(
                    (item) => item.sigla === time.sigla
                  );
                  const posicao = posicaoOriginal + 1;

                  return (
                    <tr
                      key={time.sigla}
                      className={`transition hover:bg-blue-50/60 ${
                        posicao <= 4 && ordenacao === "pontos"
                          ? "bg-white"
                          : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg font-black ${
                            posicao === 1
                              ? "bg-amber-100 text-amber-800"
                              : posicao <= 4
                                ? "bg-blue-100 text-blue-900"
                                : "bg-slate-100 text-slate-600"
                          }`}
                          title={
                            posicao <= 4
                              ? "Entre os quatro primeiros da tabela"
                              : `Posição ${posicao}`
                          }
                        >
                          {posicao}
                        </span>
                      </td>

                      <td className="px-3 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setTimeSelecionado(
                              timeSelecionado === time.sigla
                                ? null
                                : time.sigla
                            )
                          }
                          className="flex items-center gap-3 text-left"
                        >
                          <Escudo sigla={time.sigla} />
                          <span>
                            <span className="block whitespace-nowrap font-bold text-slate-800 hover:text-blue-800">
                              {time.nome}
                            </span>
                            <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Ver detalhes
                            </span>
                          </span>
                        </button>
                      </td>

                      <td className="px-3 py-4 text-center font-black text-blue-950">
                        {time.pontos}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600">
                        {time.jogos}
                      </td>
                      <td className="px-3 py-4 text-center font-semibold text-emerald-700">
                        {time.v}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600">
                        {time.e}
                      </td>
                      <td className="px-3 py-4 text-center text-red-600">
                        {time.d}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600">
                        {time.gp}
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600">
                        {time.gc}
                      </td>
                      <td
                        className={`px-3 py-4 text-center font-bold ${
                          time.sg > 0
                            ? "text-emerald-700"
                            : time.sg < 0
                              ? "text-red-600"
                              : "text-slate-500"
                        }`}
                      >
                        {time.sg > 0 ? `+${time.sg}` : time.sg}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                          {time.aproveitamento}%
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {timesFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      Nenhum time encontrado. Tente outro nome.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
            <span>PTS: pontos</span>
            <span>J: jogos</span>
            <span>V: vitórias</span>
            <span>E: empates</span>
            <span>D: derrotas</span>
            <span>GP: gols pró</span>
            <span>GC: gols contra</span>
            <span>SG: saldo de gols</span>
            <span>APR.: aproveitamento</span>
          </div>
        </div>

        {timeSelecionado && (
          <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
            {(() => {
              const time = calcularEstatisticas(
                times.find((item) => item.sigla === timeSelecionado)!
              );

              return (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Escudo sigla={time.sigla} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                          Perfil do clube
                        </p>
                        <h3 className="mt-1 text-xl font-black text-blue-950">
                          {time.nome}
                        </h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTimeSelecionado(null)}
                      className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-900 hover:bg-blue-100"
                    >
                      Fechar detalhes
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["Pontos", time.pontos],
                      ["Vitórias", time.v],
                      ["Saldo de gols", time.sg > 0 ? `+${time.sg}` : time.sg],
                      ["Aproveitamento", `${time.aproveitamento}%`],
                    ].map(([rotulo, valor]) => (
                      <div key={rotulo} className="rounded-xl bg-white p-4">
                        <p className="text-xs text-slate-500">{rotulo}</p>
                        <p className="mt-1 text-2xl font-black text-blue-950">
                          {valor}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Os dados desta tabela são fictícios e servem para demonstrar o
          funcionamento da interface. Os critérios de desempate podem variar
          conforme o regulamento de cada campeonato.
        </p>
      </section>

      <section id="jogos" className="scroll-mt-24 border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <TituloSecao
            etiqueta="Prepare a torcida"
            titulo="Partidas"
            descricao="Consulte os próximos confrontos e veja os resultados registrados."
          />

          <div className="mb-6 flex flex-wrap gap-2">
            {["Todos", "Agendados", "Encerrados"].map((filtro) => (
              <button
                key={filtro}
                type="button"
                onClick={() => setFiltroJogos(filtro)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  filtroJogos === filtro
                    ? "bg-blue-950 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filtro}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {jogosVisiveis.map((jogo) => (
              <article
                key={jogo.siglaCasa + jogo.siglaFora}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:shadow-lg sm:p-6"
              >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-lg bg-blue-100 px-3 py-2 text-[10px] font-black tracking-wider text-blue-900">
                    {jogo.data}
                  </span>
                  <span
                    className={`rounded-lg px-3 py-2 text-[10px] font-black ${
                      jogo.status === "Encerrado"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {jogo.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="flex min-w-0 flex-col items-center gap-3 text-center">
                    <Escudo sigla={jogo.siglaCasa} />
                    <span className="text-sm font-extrabold text-slate-800">
                      {jogo.casa}
                    </span>
                  </div>

                  {jogo.status === "Encerrado" ? (
                    <div className="flex items-center gap-2 rounded-xl bg-blue-950 px-4 py-3 text-xl font-black text-white">
                      <span>{jogo.golsCasa}</span>
                      <span className="text-blue-300">:</span>
                      <span>{jogo.golsFora}</span>
                    </div>
                  ) : (
                    <span className="rounded-xl bg-blue-950 px-3 py-2 text-sm font-black text-white">
                      VS
                    </span>
                  )}

                  <div className="flex min-w-0 flex-col items-center gap-3 text-center">
                    <Escudo sigla={jogo.siglaFora} />
                    <span className="text-sm font-extrabold text-slate-800">
                      {jogo.fora}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
                  <span>📍</span>
                  {jogo.local}
                </div>
              </article>
            ))}

            {jogosVisiveis.length === 0 && (
              <p className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 md:col-span-2">
                Não há partidas nesta categoria.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        id="artilheiros"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 lg:px-8 lg:py-20"
      >
        <TituloSecao
          etiqueta="Quem balança as redes?"
          titulo="Artilharia"
          descricao="Os jogadores com mais gols na temporada demonstrativa."
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="font-extrabold text-blue-950">
              Maiores goleadores
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Classificação individual de gols
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {[...artilheiros]
              .sort((a, b) => b.gols - a.gols)
              .map((jogador, index) => (
                <div
                  key={jogador.nome}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                      index === 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <Escudo sigla={jogador.sigla} />

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-800">{jogador.nome}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {jogador.time}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-blue-950">
                      {jogador.gols}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      gols
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Os nomes e números da artilharia também são ilustrativos.
        </p>
      </section>

      <footer className="bg-blue-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-black tracking-wide">LIGA AMADORA ⚽</p>
            <p className="mt-1 text-xs text-blue-200">
              Valorizando o futebol da nossa comunidade.
            </p>
          </div>
          <p className="text-xs text-blue-200/70">
            Projeto acadêmico • Temporada 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
