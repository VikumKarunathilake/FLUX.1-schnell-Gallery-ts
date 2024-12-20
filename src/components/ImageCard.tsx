import { ImageCardProps } from '../types'
import { formatDistanceToNow } from 'date-fns'

export function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div 
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
     
        <img
          src={image.imgbb_display_url}
          alt={image.imgbb_title || 'Generated Image'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-medium line-clamp-2 text-sm sm:text-base">{image.generation_prompt}</p>
          <p className="text-gray-300 text-xs sm:text-sm mt-1">
            {formatDistanceToNow(new Date(image.generation_timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  )
}