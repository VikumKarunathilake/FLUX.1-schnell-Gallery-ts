// globals.d.ts
declare global {
    interface AdsByGoogle {
      // Add properties based on the known configuration options, if any
      adSlot?: string;
      adClient?: string;
      // Add other properties as needed
    }
  
    interface Window {
      adsbygoogle: AdsByGoogle[]; // Use the defined AdsByGoogle type
    }
  }
  
  export {};
  