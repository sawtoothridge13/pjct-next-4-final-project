'use client';
import Link from 'next/link';
import styles from './Button.module.scss';

export default function LoginButton() {
  return (
    <Link className={styles.button} href="/login">
      login
    </Link>
  );
}
