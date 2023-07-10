'use client';
import Link from 'next/link';
import styles from './Button.module.scss';

export default function RegisterButton() {
  return (
    <Link className={styles.button} href="/register">
      register
    </Link>
  );
}
