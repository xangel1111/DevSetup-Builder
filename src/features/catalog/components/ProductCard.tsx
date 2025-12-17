import type { Product } from '../../../types';
import { useStore } from '../../../store/useStore';
import { cn } from '../../../lib/utils';

export const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useStore(state => state.addToCart);

  return (
    <div className={cn(
      "group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6",
      "hover:border-slate-700 transition-all duration-300 ease-in-out",
      "flex flex-col h-full"
    )}>
      {/* Subtle glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500 -z-10"></div>

      <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-slate-950 flex items-center justify-center relative">
         {/* Placeholder */}
        <img 
          src={product.image} 
          alt={product.name}
          className="object-contain h-full w-full transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200/0f172a/334155?text=No+Image';
          }}
        />
        <span className="absolute top-2 right-2 text-xs font-medium uppercase tracking-wider text-slate-400 bg-slate-950/80 px-2 py-1 rounded-full backdrop-blur-md border border-slate-800">
            {product.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-100 mb-1">{product.name}</h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-white">
            ${product.price}
          </span>
          <button 
            onClick={() => addToCart(product)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
              "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
              "hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95"
            )}
          >
            Add to Setup
          </button>
        </div>
      </div>
    </div>
  );
};