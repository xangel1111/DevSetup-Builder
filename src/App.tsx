import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useStore } from './store/useStore';
import { Navbar } from './components/layout/Navbar';

import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';

import { Toaster, toast } from 'sonner';

function App() {
  const fetchProducts = useStore(state => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
        <Navbar />
        
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/builder" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
      </div>
    </BrowserRouter>
    <Toaster position="bottom-right" theme="dark" />
    </>
  );
}

export default App;