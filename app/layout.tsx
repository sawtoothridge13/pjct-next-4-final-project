import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { getTrips } from '../database/trips';
import { getUserBySessionToken } from '../database/users';
import tTlogo from '../public/images/tt-logo.png';
import DropDownMenu from './components/DropDownMenu';
import LoginButton from './components/LoginButton';
import { LogoutButton } from './components/LogoutButton';
import RegisterButton from './components/RegisterButton';
import styles from './layout.module.scss';

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
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <main>
          <header className={styles.header}>
            <div className={styles.contentWrapper}>
              <nav className={styles.nav}>
                <figure>
                  <Image
                    priority={true}
                    src={tTlogo}
                    alt="trip tracker logo"
                    width={170}
                    height={114}
                  />
                </figure>
                {user ? <a href="/trips/1">Dashboard</a> : <a href="/">Home</a>}

                <ul className={styles.ul}>
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
                <div className={styles.headerButtonsContainer}>
                  {user ? (
                    <>
                      <div>{user.username}</div>
                      <LogoutButton />
                    </>
                  ) : (
                    <>
                      <RegisterButton />
                      <LoginButton />
                    </>
                  )}
                </div>
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

/* {user ? (
                  <DropDownMenu options={options} />
                ) : (
                  <a href="/">Home</a>
                )} */
