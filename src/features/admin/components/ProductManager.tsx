import { useState } from 'react';
import { useStore } from '../../../store/useStore';
import type { Category } from '../../../types';
import { Trash2, Plus } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { toast } from 'sonner';

export const ProductManager = () => {
  const { products, addProduct, deleteProduct } = useStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState({ name: '', price: '', category: 'monitor', image: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) return toast.caller("Please upload an image first");

    setIsSubmitting(true);
    await addProduct({
        name: form.name,
        price: Number(form.price),
        category: form.category as any,
        image: form.image,
        description: 'New Item from Admin'
    });
    setIsSubmitting(false);
    setIsOpen(false);
    setForm({ name: '', price: '', category: 'monitor', image: '' });
    toast.success('Product added successfully!');
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-bold text-white">Inventory Items</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus size={16} /> {isOpen ? 'Close Form' : 'Add Product'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 bg-slate-950/50 border-b border-slate-800 animate-in slide-in-from-top-2">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                
                {/* Input Name */}
                <div className="flex-1 w-full space-y-1">
                    <label className="text-xs text-slate-400">Name</label>
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                           value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                
                {/* Input Price */}
                <div className="w-32 space-y-1">
                    <label className="text-xs text-slate-400">Price</label>
                    <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white outline-none" 
                           value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                </div>
                
                {/* Select Category */}
                <div className="w-40 space-y-1">
                    <label className="text-xs text-slate-400">Category</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white outline-none" 
                            value={form.category} onChange={e => setForm({...form, category: e.target.value as Category})}>
                        {['monitor', 'keyboard', 'mouse', 'chair', 'headset'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                   {form.image && (
                     <div className="relative group">
                        <img src={form.image} alt="Preview" className="h-32 w-full object-cover rounded-lg border border-slate-700 shadow-sm" />
                     </div>
                   )}
                   <ImageUpload onUpload={(url) => setForm({ ...form, image: url })} />
                </div>

                <button 
                    disabled={isSubmitting} 
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg text-sm font-medium w-full sm:w-auto"
                >
                   {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
                {/* --------------------------------------- */}

            </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-950/50">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-800/30 transition">
                <td className="px-6 py-4 font-medium text-slate-200">{product.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-emerald-400">${product.price}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="text-slate-400 hover:text-red-400 transition p-2 hover:bg-red-400/10 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};