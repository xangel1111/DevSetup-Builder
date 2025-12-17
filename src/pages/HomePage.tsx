import { ProductCard } from '../features/catalog/components/ProductCard';
import { BudgetSidebar } from '../features/budget/components/BudgetSidebar';
import { useStore } from '../store/useStore';

export const HomePage = () => {
  const { products, isLoading } = useStore();
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <main className="flex-1 w-full">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Build Your Setup</h1>
            <p className="text-slate-400">Select components within your budget.</p>
        </div>
        
        {isLoading ? (
            <div className="text-white">Loading catalog...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        )}
      </main>
      <BudgetSidebar />
    </div>
  );
};