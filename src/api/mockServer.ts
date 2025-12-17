import MockAdapter from 'axios-mock-adapter';
import { apiClient } from './client';
import type { Product } from '../types';

const mockProducts: Product[] = [
    { id: '1', name: 'Dell UltraSharp U2723QE', price: 580, category: 'monitor', description: '4K USB-C Hub Monitor, IPS Black Technology.', image: 'https://m.media-amazon.com/images/I/81c-9BOQwwL._AC_SL1500_.jpg' },
    { id: '2', name: 'LG UltraGear 27GN950-B', price: 799, category: 'monitor', description: '27 inch UHD (3840 x 2160) Nano IPS Display, 144Hz.', image: 'https://m.media-amazon.com/images/I/81Display, 144Hz.D81c-9BOQwwL._AC_SL1500_.jpg' }, // Placeholder image
    { id: '3', name: 'Logitech MX Master 3S', price: 99, category: 'mouse', description: 'Performance Wireless Mouse, 8K DPI, Quiet Clicks.', image: 'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1' },
    { id: '4', name: 'Keychron Q1 Pro', price: 199, category: 'keyboard', description: 'QMK/VIA Wireless Custom Mechanical Keyboard.', image: 'https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-Q1-Pro-QMK-VIA-wireless-custom-mechanical-keyboard-carbon-black-A_1800x1800.jpg?v=1673517665' },
    { id: '5', name: 'Sony WH-1000XM5', price: 348, category: 'headset', description: 'Wireless Noise Canceling Headphones with Auto NC.', image: 'https://m.media-amazon.com/images/I/61+e0YcE3-L._AC_SL1500_.jpg' },
    { id: '6', name: 'Herman Miller Aeron', price: 1200, category: 'chair', description: 'Ergonomic Chair, Size B, Graphite.', image: 'https://s7d2.scene7.com/is/image/hermanmiller/aeron-chair-size-b-graphite-2?Wid=800&hei=800&qlt=85,0&resMode=sharp2&op_usm=0.9,1.0,8,0' },
];

export const mock = new MockAdapter(apiClient, { delayResponse: 500 }); // Simula 500ms de latencia

mock.onGet('/products').reply(200, mockProducts);