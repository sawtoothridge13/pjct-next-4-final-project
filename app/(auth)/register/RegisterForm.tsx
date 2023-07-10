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

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    console.log(data.user);
    router.push(`/profile/${data.user.username}`);
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <section className={styles.section}>
      <form
        className={styles.loginForm}
        onSubmit={(event) => event.preventDefault()}
      >
        <label className={styles.label}>
          username:
          <input
            className={styles.input}
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label className={styles.label}>
          password:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button
          className={styles.button}
          onClick={async () => await register()}
        >
          register
        </button>
        {error !== '' && <div className={styles.error}>{error}</div>}
      </form>
    </section>
  );
}
