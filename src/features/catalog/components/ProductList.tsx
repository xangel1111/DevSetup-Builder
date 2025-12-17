import { useStore } from '../../../store/useStore';
import { ProductCard } from './ProductCard'; // Importación relativa dentro de la feature

export const ProductList = () => {
  const { products, isLoading } = useStore();

  if (isLoading) return <div>Cargando catálogo...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};