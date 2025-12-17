import { StatsGrid } from '../features/admin/components/StatsGrid';
import { ProductManager } from '../features/admin/components/ProductManager';

export const AdminPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Overview of your inventory and setup statistics.</p>
      </div>

      <StatsGrid />
      <ProductManager />
    </div>
  );
};