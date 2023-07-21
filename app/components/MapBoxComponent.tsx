'use client';

import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react';
import styles from './MapComponent.module.scss';

const MapBoxComponent: React.FC = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic2F3dG9vdGhyaWRnZTEzIiwiYSI6ImNsazViaGd4bDBpNzQzcG83cG1oeGN3Z3cifQ.D6PeLnxxTEEVI01Utn3XWA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    // Clean up the map instance when the component unmounts
    return () => map.remove();
  }, []);

  return <div className={styles.container} id="map" />;
};

export default MapBoxComponent;
