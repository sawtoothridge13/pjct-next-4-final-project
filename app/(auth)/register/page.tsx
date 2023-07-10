import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import styles from './Register.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: `TripTracker | Register`,
  description:
    'Register page for TripTracker an all-in one site to view and track travel journeys.',
};

export default async function RegisterPage() {
  // if the user is logged in redirect

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (session) redirect('/');
  return (
    <main>
      <div className={styles.heroArea}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.h1}>Register</h1>
          <div className={styles.loginForm}>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
