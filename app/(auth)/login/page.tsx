import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import passport from '../../../public/images/passport.png';
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
      <section className={styles.heroArea}>
        <div>
          <h1 className={styles.h1}>Login</h1>
          <br />
          <LoginForm returnTo={searchParams.returnTo} />
          <h3 className={styles.h3}>
            All of your adventures.
            <br /> All of your memories.
            <br /> All in one place.
          </h3>
        </div>
      </section>
    </main>
  );
}
