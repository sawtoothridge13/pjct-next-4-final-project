import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';
import styles from './page.module.scss';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage({ searchParams }: Props) {
  // if the user is logged in redirect

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (session) redirect('/');

  console.log('My search params', searchParams);
  return (
    <main>
      <div className={styles.heroArea}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.h1}>Login</h1>
          <div className={styles.loginForm}>
            <LoginForm returnTo={searchParams.returnTo} />
          </div>
        </div>
      </div>
    </main>
  );
}
