async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products`, {
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
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Sarlavha qismi */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Uzgo.uz Avto-Chexollar
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Strapi va Next.js orqali ulangan maxsus mahsulotlar katalogi
          </p>
        </div>

        {/* Mahsulotlar ro'yxati */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">Hozircha mahsulotlar topilmadi yoki Strapi bilan bog'lanishda muammo bor.</p>
            <p className="text-sm text-gray-400 mt-2">Strapi Admin panelidan Public ruxsatlarini va mahsulotlar qo'shilganini tekshiring.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              // Strapi strukturangizga qarab (masalan: title, price) o'zgarishi mumkin
              const title = product.attributes?.title || product.title || "Nomsiz mahsulot";
              const price = product.attributes?.price || product.price || "Narxi belgilanmagan";

              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    {/* Rasm joyi */}
                    <span>Rasm</span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
                    <p className="text-indigo-600 font-bold mb-4">{price} so'm</p>
                    <button className="mt-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                      Batafsil
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
