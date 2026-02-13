"use client";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-200 via-purple-400 to-slate-200 bg-clip-text text-transparent mb-6">
            NextApp
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Desarrollada por Gael Carrasco Bello
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
