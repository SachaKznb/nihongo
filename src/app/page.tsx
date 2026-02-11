import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 pattern-overlay">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-japanese text-teal-600">日</span>
            <span className="text-xl font-bold font-display text-stone-800">nihongo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-stone-600 hover:text-teal-600 transition-colors font-medium"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-teal-200/50 transition-all hover:-translate-y-0.5"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              {/* Social Proof Badge */}
              <div className="inline-flex items-center gap-3 bg-white shadow-lg shadow-stone-200/50 px-5 py-3 rounded-full text-sm font-medium mb-8 border border-stone-100">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs">S</div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 border-2 border-white flex items-center justify-center text-white text-xs">M</div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 border-2 border-white flex items-center justify-center text-white text-xs">J</div>
                </div>
                <span className="text-stone-600">
                  <span className="font-bold text-teal-600">2,847</span> apprenants cette semaine
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold font-display text-stone-900 leading-tight mb-6">
                Maitrisez les
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500"> kanji</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 2 150 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6"/>
                        <stop offset="100%" stopColor="#10b981"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />
                naturellement
              </h1>
              <p className="text-xl text-stone-600 mb-8 leading-relaxed">
                Apprenez les caracteres japonais avec des mnemoniques en francais
                et un systeme de repetition espacee qui s&apos;adapte a votre rythme.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>100% gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Methode prouvee</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>En francais</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="group bg-gradient-to-r from-stone-800 to-stone-900 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-stone-400/30 transition-all hover:-translate-y-1 inline-flex items-center gap-3"
                >
                  Commencer gratuitement
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="#methode"
                  className="text-stone-700 px-8 py-4 rounded-full font-semibold hover:bg-stone-100 transition-all inline-flex items-center gap-2"
                >
                  Decouvrir la methode
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/40 to-orange-200/40 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-stone-200/50 p-8 border border-stone-100">
                {/* Streak indicator */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <span className="animate-streak-fire">🔥</span>
                  <span>12 jours</span>
                </div>

                <div className="text-center mb-6">
                  <div className="text-9xl font-japanese text-transparent bg-clip-text bg-gradient-to-br from-stone-700 to-stone-900 animate-float">水</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                    <span className="text-stone-500 text-sm font-medium">Signification</span>
                    <span className="font-bold font-display text-stone-800">Eau</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                    <span className="text-stone-500 text-sm font-medium">Lecture</span>
                    <span className="font-japanese text-stone-800 text-lg">みず (mizu)</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100">
                    <p className="text-sm text-teal-800">
                      <span className="font-bold">Mnemonique:</span> Imaginez des gouttes d&apos;eau
                      qui tombent et creent des vagues, comme les traits du kanji.
                    </p>
                  </div>
                </div>

                {/* XP indicator */}
                <div className="mt-6 flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-emerald-700 font-medium text-sm">+10 XP gagnes</span>
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">Niveau 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Social Proof */}
      <section className="py-16 px-6 bg-white border-y border-stone-100">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold font-display text-stone-900 mb-2 group-hover:scale-110 transition-transform">2,136</div>
              <div className="text-stone-500 text-sm">Kanji a apprendre</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold font-display text-teal-600 mb-2 group-hover:scale-110 transition-transform">6,000+</div>
              <div className="text-stone-500 text-sm">Mots de vocabulaire</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold font-display text-stone-900 mb-2 group-hover:scale-110 transition-transform">15k+</div>
              <div className="text-stone-500 text-sm">Utilisateurs actifs</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold font-display text-amber-500 mb-2 group-hover:scale-110 transition-transform">94%</div>
              <div className="text-stone-500 text-sm">Taux de retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Features */}
      <section className="py-20 px-6 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <span>🎮</span> Gamifie
            </span>
            <h2 className="text-4xl font-bold font-display text-stone-900 mb-4">
              Restez motive chaque jour
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Gagnez des XP, maintenez votre serie, et debloquez des succes.
              L&apos;apprentissage devient addictif !
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Streak Card */}
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-200/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">🔥</span>
                <span className="text-6xl font-bold font-display">30</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Series de jours</h3>
              <p className="text-amber-100 text-sm">Etudiez chaque jour pour maintenir votre flamme et debloquer des bonus.</p>
            </div>

            {/* XP Card */}
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-6 text-white shadow-xl shadow-teal-200/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">⚡</span>
                <span className="text-6xl font-bold font-display">2.4k</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Points d&apos;experience</h3>
              <p className="text-emerald-100 text-sm">Gagnez des XP a chaque lecon et revision. Montez de niveau !</p>
            </div>

            {/* Achievements Card */}
            <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-3xl p-6 text-white shadow-xl shadow-purple-200/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">🏆</span>
                <span className="text-6xl font-bold font-display">12</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Succes debloques</h3>
              <p className="text-violet-100 text-sm">Completez des defis pour obtenir des badges et recompenses speciales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="methode" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-stone-900 mb-4">
              Une methode qui fonctionne
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Apprenez les kanji dans l&apos;ordre optimal, des composants de base
              aux caracteres complexes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Radicals */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-stone-200/50 border border-stone-100 hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 gradient-radical rounded-2xl flex items-center justify-center text-white text-3xl font-japanese mb-6 shadow-lg shadow-blue-200/50">
                  一
                </div>
                <h3 className="text-xl font-bold font-display text-stone-900 mb-3">1. Radicaux</h3>
                <p className="text-stone-600 leading-relaxed">
                  Commencez par les composants de base. Chaque radical a un nom
                  et une histoire pour le memoriser facilement.
                </p>
                <div className="mt-4 flex -space-x-2">
                  {["人", "大", "口", "山"].map((char, i) => (
                    <div key={i} className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-japanese border-2 border-white">
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanji */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-stone-200/50 border border-stone-100 hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 gradient-kanji rounded-2xl flex items-center justify-center text-white text-3xl font-japanese mb-6 shadow-lg shadow-pink-200/50">
                  日
                </div>
                <h3 className="text-xl font-bold font-display text-stone-900 mb-3">2. Kanji</h3>
                <p className="text-stone-600 leading-relaxed">
                  Assemblez les radicaux pour former des kanji. Les mnemoniques
                  en francais rendent l&apos;apprentissage intuitif.
                </p>
                <div className="mt-4 flex -space-x-2">
                  {["森", "明", "好", "語"].map((char, i) => (
                    <div key={i} className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 font-japanese border-2 border-white">
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vocabulary */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-stone-200/50 border border-stone-100 hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 gradient-vocab rounded-2xl flex items-center justify-center text-white text-3xl font-japanese mb-6 shadow-lg shadow-purple-200/50">
                  言
                </div>
                <h3 className="text-xl font-bold font-display text-stone-900 mb-3">3. Vocabulaire</h3>
                <p className="text-stone-600 leading-relaxed">
                  Utilisez vos kanji dans de vrais mots. Chaque mot renforce
                  votre comprehension des caracteres.
                </p>
                <div className="mt-4 flex -space-x-2">
                  {["食べる", "飲む", "見る", "行く"].map((word, i) => (
                    <div key={i} className="h-10 px-3 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-japanese text-sm border-2 border-white">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SRS Section */}
      <section className="py-24 px-6 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl font-japanese">復</div>
          <div className="absolute bottom-10 right-10 text-9xl font-japanese">習</div>
        </div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 text-teal-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <span>🧠</span> Science de la memoire
              </span>
              <h2 className="text-4xl font-bold font-display mb-6">
                La repetition espacee,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">votre super pouvoir</span>
              </h2>
              <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                Notre algorithme SRS presente les elements au moment optimal pour
                votre memoire. Revisez moins, retenez plus. C&apos;est prouve scientifiquement.
              </p>
              <div className="space-y-4">
                {[
                  { stage: "Apprenti", emoji: "🌱", time: "4h → 2 jours", color: "from-pink-400 to-pink-600" },
                  { stage: "Guru", emoji: "🌿", time: "1 → 2 semaines", color: "from-purple-400 to-purple-600" },
                  { stage: "Maitre", emoji: "🌳", time: "1 mois", color: "from-blue-400 to-blue-600" },
                  { stage: "Illumine", emoji: "☀️", time: "4 mois", color: "from-amber-400 to-amber-600" },
                  { stage: "Brule", emoji: "🔥", time: "Memorise !", color: "from-stone-400 to-stone-600" },
                ].map((item) => (
                  <div key={item.stage} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                    <span className="text-white font-semibold font-display w-24">{item.stage}</span>
                    <span className="text-stone-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-stone-800 rounded-3xl p-8 border border-stone-700">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-stone-400 font-medium">Progression</span>
                  <span className="text-teal-400 font-bold font-display">Niveau 5</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-400">Radicaux</span>
                      <span className="text-white font-bold">24/30</span>
                    </div>
                    <div className="h-3 bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 gradient-radical rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-400">Kanji</span>
                      <span className="text-white font-bold">18/25</span>
                    </div>
                    <div className="h-3 bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 gradient-kanji rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-400">Vocabulaire</span>
                      <span className="text-white font-bold">45/80</span>
                    </div>
                    <div className="h-3 bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 gradient-vocab rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Achievement unlocked */}
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-amber-400 font-bold text-sm">Succes debloque !</p>
                      <p className="text-stone-400 text-xs">Premiere semaine completee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-stone-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-stone-900 mb-4">
              Ils ont reussi avec Nihongo
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Marie L.",
                level: "Niveau 15",
                text: "Grace aux mnemoniques en francais, j'ai enfin reussi a retenir les kanji. Avant, je les oubliais apres quelques jours !",
                avatar: "M",
                color: "from-pink-400 to-rose-500"
              },
              {
                name: "Thomas B.",
                level: "Niveau 8",
                text: "Le systeme de series m'a rendu accro. 45 jours sans interruption ! Je n'ai jamais ete aussi regulier.",
                avatar: "T",
                color: "from-blue-400 to-indigo-500"
              },
              {
                name: "Sophie D.",
                level: "Niveau 22",
                text: "En 6 mois, j'ai appris plus de kanji qu'en 2 ans avec d'autres methodes. L'approche est vraiment efficace.",
                avatar: "S",
                color: "from-amber-400 to-orange-500"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg shadow-stone-200/50 border border-stone-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold font-display text-stone-900">{testimonial.name}</p>
                    <p className="text-sm text-teal-600 font-medium">{testimonial.level}</p>
                  </div>
                </div>
                <p className="text-stone-600 italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full blur-3xl opacity-20"></div>
            <span className="relative text-7xl font-japanese text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-emerald-600">始めよう</span>
          </div>
          <h2 className="text-4xl font-bold font-display text-stone-900 mb-6">
            Pret a commencer votre voyage ?
          </h2>
          <p className="text-xl text-stone-600 mb-6 max-w-2xl mx-auto">
            Rejoignez des milliers de francophones qui apprennent le japonais
            de maniere efficace et agreable.
          </p>

          {/* Urgency / Scarcity */}
          <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-sm font-medium">127 personnes se sont inscrites aujourd&apos;hui</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-teal-200/50 transition-all hover:-translate-y-1"
            >
              Creer mon compte gratuit
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <p className="mt-6 text-sm text-stone-400">Pas de carte bancaire requise • Acces immediat</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-200 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-japanese text-teal-600">日</span>
              <span className="font-bold font-display text-stone-800 text-lg">nihongo</span>
            </div>
            <p className="text-stone-500 text-sm">
              &copy; 2024 Nihongo. Fait avec ❤️ pour les apprenants francophones.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
