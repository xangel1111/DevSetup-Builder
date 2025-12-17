import { Link, useLocation } from 'react-router';
import { LayoutGrid, ShoppingBag } from 'lucide-react';

export const Navbar = () => {
    const loc = useLocation();
    const linkClass = (path: string) => `text-sm font-medium transition ${loc.pathname === path ? 'text-white' : 'text-slate-400 hover:text-white'}`;
    
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-white text-lg">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">DS</div>
                    DevSetup
                </Link>
                <div className="flex gap-6">
                    <Link to="/" className={linkClass('/')}><ShoppingBag className="inline w-4 h-4 mr-1"/> Shop</Link>
                    <Link to="/admin" className={linkClass('/admin')}><LayoutGrid className="inline w-4 h-4 mr-1"/> Admin</Link>
                </div>
            </div>
        </nav>
    );
}