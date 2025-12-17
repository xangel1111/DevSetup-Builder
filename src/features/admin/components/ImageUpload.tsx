import { useState } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  onUpload: (url: string) => void;
}

export const ImageUpload = ({ onUpload }: Props) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 
    
    try {
      // REEMPLAZA CON TU CLOUD NAME
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error en la subida');
      }

      const data = await res.json();
      console.log('Imagen subida:', data.secure_url);

      onUpload(data.secure_url);
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      toast.error('Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="flex items-center gap-2 cursor-pointer bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white p-2 rounded-lg text-sm justify-center transition">
        {uploading ? <Loader2 className="animate-spin" size={16} /> : <ImageIcon size={16} />}
        {uploading ? 'Uploading...' : 'Upload Image'}
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};
