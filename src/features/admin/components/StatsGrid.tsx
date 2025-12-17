import { useStore } from '../../../store/useStore';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export const StatsGrid = () => {
  const { products, cart, budget } = useStore();
  
  // Cálculos simples para simular métricas
  const totalValue = products.reduce((acc, p) => acc + p.price, 0);
  const cartValue = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  const stats = [
    { title: "Total Products", value: products.length, icon: Package, color: "text-blue-500" },
    { title: "Inventory Value", value: `$${totalValue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500" },
    { title: "Active Carts", value: cart.length > 0 ? "1 Active" : "0", icon: ShoppingCart, color: "text-purple-500" },
    { title: "Avg. Item Price", value: `$${Math.round(totalValue / (products.length || 1))}`, icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-400 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
            <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};