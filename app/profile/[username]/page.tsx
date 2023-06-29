import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import DropDownMenu from './DropDownMenu';
import styles from './page.module.scss';

type Props = {
  params: { username: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  if (!user) {
    notFound();
  }

  return (
    <main className={styles.heroArea}>
      <section className={styles.section}>
        <div>
          <DropDownMenu options={options} />
        </div>
      </section>
      <section>
        <h2 className={styles.h2}>Journal</h2>
      </section>
      <section>
        <h2 className={styles.h2}>Media Gallery</h2>
      </section>
      <section>
        <h2 className={styles.h2}>Map</h2>
      </section>

      <div>
        <div>id: {user.id}</div>
        <div>username: {user.username}</div>
        <br />
      </div>
    </main>
  );
}
