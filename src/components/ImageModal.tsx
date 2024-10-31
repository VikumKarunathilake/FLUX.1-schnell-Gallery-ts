import { X, Download, Calendar, FileText, Trash2 } from 'lucide-react';
import { ImageModalProps } from '../types';
import { format } from 'date-fns';

export function ImageModal({ image, onClose, onDelete, isAdmin }: ImageModalProps) {
  if (!image) return null;

  const handleDelete = async () => {
    if (onDelete && window.confirm('Are you sure you want to delete this image?')) {
      await onDelete(image.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in">
      <div className="relative max-w-7xl w-full mx-4 sm:mx-8 lg:mx-12 bg-white rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-50">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Image Details</h3>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 transition-colors p-2"
                aria-label='Delete item'
              >
                <Trash2 size={20} />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label='Close'
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="relative">
            <img
              src={image.imgbb_display_url}
              alt={image.imgbb_title || 'Generated Image'}
              className="w-full rounded-lg object-contain max-h-[80vh] sm:max-h-[60vh]"
              loading="lazy"
            />
            <a 
              href={image.imgbb_display_url}
              download
              className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download image"
            >
              <Download size={20} />
            </a>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={20} />
                <h4 className="font-medium">Prompt</h4>
              </div>
              <p className="text-gray-700">{image.generation_prompt}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={20} />
                <h4 className="font-medium">Generated</h4>
              </div>
              <p className="text-gray-700">
                {format(new Date(image.generation_timestamp), 'PPpp')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Dimensions</p>
                <p className="font-medium">{image.imgbb_width} × {image.imgbb_height}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-medium">{image.imgbb_size}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
