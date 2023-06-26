'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './LoginForm.module.scss';

type Props = { returnTo?: string };

export default function LoginForm({ returnTo }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  console.log(returnTo);

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    }

    if ('user' in data) {
      // if the url contains a returnTo query param I want to redirect there instead

      if (returnTo) {
        router.push(returnTo);
        return;
      }
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
      <button className={styles.button} onClick={async () => await login()}>
        login
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
