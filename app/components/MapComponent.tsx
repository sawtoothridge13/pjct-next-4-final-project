'use client';

import React from 'react';
import { getMapById } from '../../database/maps';
import styles from './MapComponent.module.scss';

export default function MapFrame() {
  return (
    <iframe
      className={styles.map}
      title="Google Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21755.64446175212!2d8.66849835005182!3d47.03129090311349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47854e8f12afede5%3A0xc6ec65a5c8394513!2sGrosser%20Mythen!5e0!3m2!1sen!2sat!4v1689004542403!5m2!1sen!2sat"
      width="1700"
      height="450"
      sandbox="allow-scripts"
    />
  );
}
