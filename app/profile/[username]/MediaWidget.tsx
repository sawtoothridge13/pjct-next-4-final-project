import { cloudinary } from 'cloudinary';

const myWidget = cloudinary.galleryWidget({
  container: '#my-gallery',
  cloudName: 'demo',
  mediaAssets: [
    {
      tag: 'shoes_product_gallery_demo',
      mediaType: 'image',
    },
    {
      tag: 'shoes_product_gallery_demo',
      mediaType: 'video',
    },
    {
      tag: 'shoes_product_gallery_demo_spinset',
      mediaType: 'spin',
    },
  ],
  displayProps: {
    spacing: 15,
  },
  aspectRatio: '3:4',
  transformation: {
    crop: 'fill',
  },
  bgColor: 'transparent',
  carouselOffset: 10,
  navigation: 'always',
  thumbnailProps: {
    mediaSymbolSize: 42,
    spacing: 20,
    width: 90,
    height: 90,
    navigationFloat: true,
    navigationShape: 'square',
    navigationSize: 40,
    navigationColor: '#ffffff',
    selectedStyle: 'border',
    selectedBorderPosition: 'bottom',
    selectedBorderWidth: 3,
    navigationIconColor: '#000000',
    mediaSymbolShape: 'radius',
  },
  navigationButtonProps: {
    shape: 'rectangle',
    iconColor: '#ffffff',
    color: '#000',
    size: 52,
    navigationPosition: 'offset',
    navigationOffset: 12,
  },
  themeProps: {
    primary: '#000000',
    active: '#777777',
  },
  secureDistribution: 'res-s.cloudinary.com',
});

myWidget.render();
