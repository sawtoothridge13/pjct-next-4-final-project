// import styles from './Login.module.scss';

import LoginForm from './LoginForm';

export const metadata = {
  title: `TripTracker | Login`,
  description:
    'Login page for TripTracker an all-in one site to view and track travel journeys.',
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage({ searchParams }: Props) {
  console.log('My search params', searchParams);
  return <LoginForm returnTo={searchParams.returnTo} />;
}

// export default function LoginPage() {
//   return (
//     <main>
//       <section className={styles.heroArea}>
//         <div>
//           <h1 className={styles.h1}>Login</h1>
//           <br />
//           <h3 className={styles.h3}>
//             All of your adventures.
//             <br /> All of your memories.
//             <br /> All in one place.
//           </h3>
//         </div>
//       </section>
//     </main>
//   );
// }
