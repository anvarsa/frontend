async function getNews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Strapi'dan ma'lumot olishda xatolik:", error);
    return [];
  }
}

export default async function Home() {
  const articles = await getNews();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-wider text-sky-400">UZGO<span className="text-white">.UZ</span></span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#latest" className="hover:text-sky-400 transition">So'nggi yangiliklar</a>
            <a href="#categories" className="hover:text-sky-400 transition">Bo'limlar</a>
            <a href="#trending" className="hover:text-sky-400 transition">Muhim</a>
            <a href="#contact" className="hover:text-sky-400 transition">Aloqa</a>
          </nav>
          <div>
            <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1.5 rounded-full font-semibold">
              Live 24/7
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-sky-500/10 text-sky-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-6 border border-sky-500/20">
            Axborot-tahliliy portal
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Kun muhim voqealari va <span className="text-sky-400">ishonchli xabarlar</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Dunyodagi va yurtimizdagi eng so'nggi yangiliklar, eksklyuziv maqolalar hamda tahlillar bizning portalda.
          </p>
        </div>
      </section>

      {/* News Grid Section */}
      <section id="latest" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white border-l-4 border-sky-400 pl-4">So'nggi Yangiliklar</h2>
            <span className="text-sm text-slate-400">Strapi API orqali yangilanadi</span>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-lg">Hozircha yangiliklar qo'shilmagan.</p>
              <p className="text-sm text-slate-500 mt-2">Strapi Admin panelidan maqolalar (articles) qo'shib tekshirib ko'ring.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((item: any) => {
                const title = item.attributes?.title || item.title || "Sarlavha mavjud emas";
                const description = item.attributes?.description || item.description || "Tavsif yozilmagan";

                return (
                  <div key={item.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col hover:border-slate-700 transition">
                    <div className="h-48 bg-slate-800 flex items-center justify-center text-slate-600 font-medium">
                      Rasm (Cloudflare R2)
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs text-sky-400 font-semibold mb-2 uppercase tracking-wider">Yangilik</span>
                      <h3 className="text-xl font-bold text-white mb-3 leading-snug">{title}</h3>
                      <p className="text-slate-400 text-sm mb-6 flex-grow">{description}</p>
                      <button className="w-full bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold py-2.5 rounded-xl transition border border-slate-700">
                        To'liq o'qish
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800 bg-slate-900 py-12 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg font-bold text-white mb-2">UZGO.UZ — Axborot Portali</p>
          <p>© 2026 Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
