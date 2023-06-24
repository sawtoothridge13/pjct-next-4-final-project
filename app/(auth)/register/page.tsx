// import styles from './Register.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: `TripTracker | Register`,
  description:
    'Register page for TripTracker an all-in one site to view and track travel journeys.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}

// export default function RegisterPage() {
//   return (
//     <main>
//       <section className={styles.heroArea}>
//         <div>
//           <h1 className={styles.h1}>Register</h1>
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
