import Script from 'next/script';
import GalleryWidgetComponent from './GalleryWidgetComponent';

export const metadata = {
  title: `TripTracker | Media`,
  description: 'Page for photos, video, and audio associated with trip',
};

export default function MediaPage() {
  return (
    <main>
      <Script
        src="https://product-gallery.cloudinary.com/all.js"
        type="text/javascript"
      />
      <GalleryWidgetComponent />
    </main>
  );
}
