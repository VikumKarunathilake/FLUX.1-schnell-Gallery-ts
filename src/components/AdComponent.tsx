"use client"

import { useEffect, useRef } from 'react'

interface AdComponentProps {
  showAd: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdComponent({ showAd, className = "" }: AdComponentProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showAd && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error('Error loading AdSense ad:', err)
      }
    }
  }, [showAd])

  if (!showAd) return null

  return (
    <div className={`bg-gray-100 p-4 rounded-md mb-4 ${className}`}>
      <h3 className="text-lg font-medium mb-2">Advertisement</h3>
      <div className="flex justify-center">
        <div ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-9627208949475310"
            data-ad-slot="3853103841"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
      <p className="text-gray-600 mt-2 text-center text-sm">
        Please support our platform by considering our sponsors.
      </p>
    </div>
  )
}