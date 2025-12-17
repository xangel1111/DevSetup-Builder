import { useStore } from '../../../store/useStore';
import { cn } from '../../../lib/utils';

export const BudgetSidebar = () => {
  const { cart, budget, getTotal, removeFromCart } = useStore();
  const total = getTotal();
  const remaining = budget - total;
  const progressPercentage = Math.min((total / budget) * 100, 100);

  return (
    <aside className={cn(
      "w-full md:w-96 rounded-2xl border border-slate-800 bg-slate-900/70 p-6",
      "backdrop-blur-xl sticky top-24 h-fit"
    )}>
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="mr-2">🚀</span> Your Setup Build
      </h2>

      {/* Budget Progress Widget */}
      <div className="mb-8 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span className="text-slate-400">Spent: <span className="text-white">${total}</span></span>
          <span className="text-slate-400">Budget: <span className="text-white">${budget}</span></span>
        </div>
        
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
           {/* Background subtle glow */}
           <div className={cn("absolute inset-0 opacity-20 transition-all duration-500", 
             remaining < 0 ? 'bg-red-600' : 'bg-blue-600'
           )}></div>
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out relative",
              remaining < 0 ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
            )}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="mt-3 text-right">
            <span className={cn("text-sm font-bold", remaining < 0 ? 'text-red-400' : 'text-emerald-400')}>
                {remaining < 0 ? `Over budget by $${Math.abs(remaining)}` : `$${remaining} remaining`}
            </span>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {cart.length === 0 ? (
            <p className="text-slate-500 text-center py-4 italic">Your setup is empty.</p>
        ) : (
            cart.map(item => (
            <div key={item.id} className="flex justify-between items-start group p-2 rounded-lg hover:bg-slate-800/50 transition">
                <div>
                    <h4 className="text-slate-200 font-medium text-sm">{item.name}</h4>
                    <p className="text-slate-500 text-xs">Qty: {item.quantity} x ${item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-slate-300 font-mono font-medium">${item.price * item.quantity}</span>
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100 p-1"
                        aria-label="Remove item"
                    >
                        ✕
                    </button>
                </div>
            </div>
            ))
        )}
      </div>
      
      <div className="border-t border-slate-800 pt-6">
        <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400">Total Cost</span>
            <span className="text-2xl font-bold text-white">${total}</span>
        </div>
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:from-blue-500 hover:to-cyan-500 transition hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-[0.98]">
            Finalize Setup
        </button>
      </div>
    </aside>
  );
};