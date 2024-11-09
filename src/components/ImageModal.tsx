import { X, Download, Calendar, FileText, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageModalProps } from '../types';
import { format } from 'date-fns';
import { useState } from 'react';

export function ImageModal({ image, onClose, onDelete, isAdmin }: ImageModalProps) {
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  
  if (!image) return null;

  const handleDelete = async () => {
    if (onDelete && window.confirm('Are you sure you want to delete this image?')) {
      await onDelete(image.id);
      onClose();
    }
  };

  const promptLength = image.generation_prompt?.length || 0;
  const shouldTruncate = promptLength > 200;
  const truncatedPrompt = shouldTruncate && !isPromptExpanded
    ? `${image.generation_prompt?.slice(0, 200)}...`
    : image.generation_prompt;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-50 my-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Image Details</h3>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 transition-colors p-2"
                aria-label="Delete item"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6">
          <div className="relative flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="relative w-full pt-[100%]">
              <img
                src={image.imgbb_display_url}
                alt={image.imgbb_title || 'Generated Image'}
                className="absolute inset-0 w-full h-full object-contain p-4"
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
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={20} />
                <h4 className="font-medium">Prompt</h4>
              </div>
              <div className="relative">
                <p className="text-gray-700 break-words">
                  {truncatedPrompt}
                </p>
                {shouldTruncate && (
                  <button
                    onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 mt-2"
                  >
                    {isPromptExpanded ? (
                      <>
                        <ChevronUp size={16} />
                        <span>Show less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        <span>Show more</span>
                      </>
                    )}
                  </button>
                )}
              </div>
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Dimensions</p>
                <p className="font-medium">{image.imgbb_width} × {image.imgbb_height}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
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