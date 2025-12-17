import { create } from 'zustand';
import type { Product, CartItem } from '../types';
import { supabase } from '../api/supabase'; // Importa tu cliente

interface AppState {




  products: Product[];
  cart: CartItem[];
  budget: number;
  isLoading: boolean; // Estado de carga
  
  fetchProducts: () => Promise<void>; // Acción asíncrona
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  setBudget: (amount: number) => void;
  getTotal: () => number;

  addProduct: (product: Omit<Product, 'id'>) => Promise<void>; // Actualizamos tipo
  deleteProduct: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  products: [],
  cart: [],
  budget: 2500,
  isLoading: false,

  addToCart: (product) => set((state) => {
    const exists = state.cart.find(item => item.id === product.id);
    if (exists) {
      return {
        cart: state.cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
  
  setBudget: (amount) => set({ budget: amount }),

  getTotal: () => {
    const state = get();
    return state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  },
  
// LEER DE LA BASE DE DATOS
  fetchProducts: async () => {
    set({ isLoading: true });
    
    // Select * from products
    const { data, error } = await supabase.from('products').select('*');
    
    if (error) console.error('Error cargando:', error);
    else set({ products: data as Product[] });
    
    set({ isLoading: false });
  },

  // GUARDAR EN BASE DE DATOS
  addProduct: async (newProduct) => {
    // Insert into products values (...)
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select();

    if (error) {
      alert('Error guardando en BD');
      console.error(error);
    } else if (data) {
      // Actualizamos estado local para que se vea instantáneo
      set((state) => ({ products: [...state.products, data[0] as Product] }));
    }
  },

  // ELIMINAR DE BASE DE DATOS
  deleteProduct: async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (!error) {
      set((state) => ({ products: state.products.filter(p => p.id !== id) }));
    }
  },
}));