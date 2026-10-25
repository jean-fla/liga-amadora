
const times = [
  { nome: "Atlético do Vale", cidade: "Alegre, ES", sigla: "AV", cor: "#2563eb", pontos: 18, jogos: 7 },
  { nome: "União FC", cidade: "Guaçuí, ES", sigla: "UF", cor: "#dc2626", pontos: 16, jogos: 7 },
  { nome: "Real Esperança", cidade: "Jerônimo Monteiro, ES", sigla: "RE", cor: "#16a34a", pontos: 13, jogos: 7 },
  { nome: "Estrela do Sul", cidade: "Cachoeiro de Itapemirim, ES", sigla: "ES", cor: "#9333ea", pontos: 10, jogos: 7 },
];

const partidas = [
  { casa: "Atlético do Vale", fora: "União FC", data: "Sábado, 15:00", status: "Próxima partida" },
  { casa: "Real Esperança", fora: "Estrela do Sul", data: "Domingo, 09:00", status: "Próxima partida" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7f5] text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-2xl">
              ⚽
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">LIGA AMADORA</p>
              <p className="text-xs text-zinc-500">O futebol da nossa região</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex">
            <a href="#classificacao" className="hover:text-green-700">Classificação</a>
            <a href="#partidas" className="hover:text-green-700">Partidas</a>
            <a href="#times" className="hover:text-green-700">Times</a>
          </nav>

          <a
            href="#times"
            className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800"
          >
            Explorar liga
          </a>
        </div>
      </header>

      <section className="bg-[#102d21] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1.5 text-xs font-semibold text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              FUTEBOL QUE MOVE A COMUNIDADE
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A paixão pelo futebol começa <span className="text-green-400">aqui.</span>
            </h1>
            <p className="mt-5 max-w-lg leading-7 text-zinc-300">
              Acompanhe os times, confira a classificação e descubra os próximos
              confrontos do futebol amador da nossa região.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#classificacao"
                className="rounded-lg bg-green-500 px-5 py-3 font-bold text-[#102d21] transition hover:bg-green-400"
              >
                Ver classificação →
              </a>
              <a
                href="#partidas"
                className="rounded-lg border border-white/20 px-5 py-3 font-semibold transition hover:bg-white/10"
              >
                Próximas partidas
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-zinc-400">CAMPEONATO REGIONAL</p>
                <h2 className="mt-1 text-xl font-bold">Temporada de futebol</h2>
              </div>
              <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-bold text-green-300">
                DEMONSTRAÇÃO
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-zinc-400">Times participantes</p>
                <p className="mt-2 text-3xl font-black">04</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-zinc-400">Rodadas disputadas</p>
                <p className="mt-2 text-3xl font-black">07</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-green-500/10 p-4">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-bold">A disputa continua</p>
                <p className="mt-1 text-sm text-zinc-300">
                  Cada jogo conta na caminhada pelo título.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="classificacao" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-700">Quem está na frente?</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Classificação</h2>
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-500 shadow-sm">
            Dados fictícios para demonstração
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="grid grid-cols-[40px_minmax(0,1fr)_48px_48px] gap-2 bg-zinc-100 px-4 py-3 text-xs font-bold uppercase tracking-wide text-zinc-500 sm:grid-cols-[50px_minmax(0,1fr)_70px_70px_70px] sm:px-6">
            <span>#</span>
            <span>Time</span>
            <span className="text-center">J</span>
            <span className="text-center">PTS</span>
            <span className="hidden text-center sm:block">Saldo</span>
          </div>
          {times.map((time, index) => (
            <div
              key={time.sigla}
              className="grid grid-cols-[40px_minmax(0,1fr)_48px_48px] items-center gap-2 border-t border-zinc-100 px-4 py-4 sm:grid-cols-[50px_minmax(0,1fr)_70px_70px_70px] sm:px-6"
            >
              <span className={`text-sm font-black ${index === 0 ? "text-green-700" : "text-zinc-400"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                  style={{ backgroundColor: time.cor }}
                >
                  {time.sigla}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{time.nome}</p>
                  <p className="truncate text-xs text-zinc-500">{time.cidade}</p>
                </div>
              </div>
              <span className="text-center text-sm text-zinc-600">{time.jogos}</span>
              <span className="text-center text-sm font-black">{time.pontos}</span>
              <span className="hidden text-center text-sm text-zinc-500 sm:block">—</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          J = jogos disputados · PTS = pontos. A classificação será calculada a partir dos resultados cadastrados.
        </p>
      </section>

      <section id="partidas" className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-widest text-green-700">Prepare a torcida</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Próximas partidas</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {partidas.map((partida) => (
              <article key={partida.casa} className="rounded-2xl border border-zinc-200 p-5 transition hover:border-green-300 hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-800">
                    {partida.status}
                  </span>
                  <span className="text-xs text-zinc-500">{partida.data}</span>
                </div>
                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                  <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">🛡️</div>
                    <p className="mt-2 text-sm font-bold">{partida.casa}</p>
                  </div>
                  <span className="text-sm font-black text-zinc-300">VS</span>
                  <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">🛡️</div>
                    <p className="mt-2 text-sm font-bold">{partida.fora}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="times" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">Conheça os participantes</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Times da liga</h2>
          <p className="mt-2 max-w-xl text-zinc-600">
            Cada equipe tem sua história, sua torcida e o sonho de levantar a taça.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {times.map((time) => (
            <article key={time.sigla} className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white"
                style={{ backgroundColor: time.cor }}
              >
                {time.sigla}
              </div>
              <h3 className="mt-4 font-bold">{time.nome}</h3>
              <p className="mt-1 text-sm text-zinc-500">{time.cidade}</p>
              <p className="mt-4 border-t border-zinc-100 pt-3 text-xs font-semibold text-green-700">
                Participante da liga
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#102d21] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-black tracking-wide">⚽ LIGA AMADORA</p>
            <p className="mt-1 text-sm text-zinc-400">Valorizando o futebol da nossa comunidade.</p>
          </div>
          <p className="text-xs text-zinc-400">Projeto acadêmico · Dados demonstrativos</p>
        </div>
      </footer>
    </main>
  );
}
