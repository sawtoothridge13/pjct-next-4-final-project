'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  0;

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    }
    if ('user' in data) {
      console.log(data.user);
      router.push(`/profile/${data.user.username}`);
      // we may have a revalidate path here in the future
      router.refresh();
    }
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        username:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        password:
        <input
          value={password}
          type="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button className={styles.button} onClick={async () => await register()}>
        sign up
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
