import './globals.scss';
import { Fira_Code } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import tTlogo from '../public/images/tt-logo.png';
import styles from './layout.module.scss';
import { LogoutButton } from './LogoutButton';

const inter = Fira_Code({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <main>
          <header className={styles.header}>
            <div className={styles.contentWrapper}>
              <figure className={styles.figure}>
                <a>
                  <Image
                    src={tTlogo}
                    alt="trip tracker logo"
                    width={170}
                    height={114}
                  />
                </a>
              </figure>
              <div className={styles.divider} />
              <nav className={`${styles.container} ${styles.nav}`}>
                <ul className={styles.ul}>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
                {user ? (
                  <>
                    <div>{user.username}</div>
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <Link href="/register">register</Link>
                    <Link href="/login">login</Link>
                  </>
                )}

                {/* <div className={styles.headerButtonsContainer}>
                  <button className={styles.button}>login</button>
                  <button className={styles.button}>register</button>
                </div>
                <LogoutButton /> */}
              </nav>
            </div>
            <div className={styles.divider} />
          </header>
          {children}
          <div className={styles.divider} />
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
    </html>
  );
}
