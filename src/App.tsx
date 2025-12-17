import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useStore } from './store/useStore';
import { Navbar } from './components/layout/Navbar';

// Páginas
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage'; // Esta es tu página del Builder/Tienda
import { AdminPage } from './pages/AdminPage';

function App() {
  const fetchProducts = useStore(state => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
        <Navbar />
        
        {/* Usamos un container para todas las rutas excepto Landing si quisieras full width, 
            pero aquí mantendré padding para consistencia */}
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/builder" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;