import './globals.scss';
import { Fira_Code } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import tTlogo from '../public/images/tt-logo.png';
import styles from './layout.module.scss';

const inter = Fira_Code({ subsets: ['latin'] });

type Props = {
  children: string;
};
export default function RootLayout({ children }: Props) {
  return (
    <body className={inter.className}>
      <main>
        <header className={styles.header}>
          <div className={styles.contentWrapper}>
            <figure>
              <a>
                <Image
                  src={tTlogo}
                  alt="trip tracker logo"
                  width={170}
                  height={114}
                />
              </a>
            </figure>

            <nav className={`${styles.container} ${styles.nav}`}>
              <ul className={styles.ul}>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="contact">Contact</a>
                </li>
              </ul>
              <div className={styles.headerButtonsContainer}>
                <button className={styles.button}>login</button>
                <button className={styles.button}>register</button>
              </div>
            </nav>
          </div>
          <div className={styles.divider} />
        </header>
        {children}
        <footer className={styles.footer}>
          <div className={styles.contentWrapper}>
            <div className={styles.footerContent}>
              <div>
                <h4>Address</h4>
                <div className={styles.address}>
                  <p>
                    123 Main St.
                    <br />
                    Anytown, SW 58943
                    <br />
                  </p>
                </div>
              </div>
              <div>
                <h4>Contact</h4>
                <div className={styles.contact}>
                  <p>
                    tel: 1-800-555-5555
                    <br />
                    e-mail: office@triptracker.com
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.copyright}>
              <p>Copyright 2023 | Trip Tracker</p>
            </div>
          </div>
          <div className={styles.divider} />
        </footer>
      </main>
    </body>
  );
}
