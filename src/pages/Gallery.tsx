"use client"

import { useState, useEffect } from 'react'
import { Search, Camera, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageCard } from '../components/ImageCard'
import { ImageModal } from '../components/ImageModal'
import { useAuth } from '../context/AuthContext'
import type { GeneratedImage } from '../types'
import AdComponent from '../components/AdComponent'

type SortOption = 'newest' | 'oldest' | 'prompt-asc' | 'prompt-desc'

export function Gallery() {
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const { user } = useAuth()
  const API_URL = 'https://flux-api.up.railway.app/'
  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/images`)
      const data = await res.json()
      setImages(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching images:', error)
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchImages()
    setRefreshing(false)
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchImages()
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    }
  }

  const sortImages = (images: GeneratedImage[]) => {
    return [...images].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.generation_timestamp).getTime() - new Date(a.generation_timestamp).getTime()
        case 'oldest':
          return new Date(a.generation_timestamp).getTime() - new Date(b.generation_timestamp).getTime()
        case 'prompt-asc':
          return (a.generation_prompt || '').localeCompare(b.generation_prompt || '')
        case 'prompt-desc':
          return (b.generation_prompt || '').localeCompare(a.generation_prompt || '')
        default:
          return 0
      }
    })
  }

  const filteredImages = images.filter(image => 
    image.generation_prompt?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedImages = sortImages(filteredImages)
  
  const totalPages = Math.ceil(sortedImages.length / ITEMS_PER_PAGE)
  const paginatedImages = sortedImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const PaginationControls = () => (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber
          if (totalPages <= 5) {
            pageNumber = i + 1
          } else if (currentPage <= 3) {
            pageNumber = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i
          } else {
            pageNumber = currentPage - 2 + i
          }

          return (
            <button
              key={i}
              onClick={() => goToPage(pageNumber)}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === pageNumber
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by prompt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              title="Select an option"
              aria-label="Select an option"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="flex px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="prompt-asc">Prompt (A-Z)</option>
              <option value="prompt-desc">Prompt (Z-A)</option>
            </select>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="sr-only sm:not-sr-only">Refresh</span>
            </button>
          </div>
        </div>

        {totalPages > 1 && <PaginationControls />}
      </div>

      <AdComponent showAd={true} />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading images...</p>
        </div>
      ) : paginatedImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No images found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search query.' : 'Start by generating some images.'}
          </p>
        </div>
      )}
      <AdComponent showAd={true} />
      {totalPages > 1 && <PaginationControls />}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDelete={handleDelete}
          isAdmin={user?.is_admin}
        />
      )}
    </main>
  )
}