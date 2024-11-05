import React, { useEffect } from 'react';

interface AdComponentProps {
  showAd: boolean; // Type for showAd prop
}

const AdComponent: React.FC<AdComponentProps> = ({ showAd }) => {
  useEffect(() => {
    // Ensure adsbygoogle is defined before pushing ads
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [showAd]);

  if (!showAd) return null;

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <h3 className="text-lg font-medium mb-2">Advertisement</h3>
      <div className="flex justify-center">
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9627208949475310"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle adsbygoogle-block"
          data-ad-client="ca-pub-9627208949475310"
          data-ad-slot="3853103841"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <p className="text-gray-600 mt-2 text-center">
        Please support our platform by considering our sponsors.
      </p>
    </div>
  );
};

export default AdComponent;
