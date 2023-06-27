import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import { getAnimals } from '../../database/animals';
import { getValidSessionByToken } from '../../database/sessions';

// import AnimalsForm from './AnimalsForm';

// **************** COPY 1 - 3 TO ANY PAGE YOU WANT TO RESTRICT!!!!!!! ONLY UPDATE redirect address *********

export default async function AdminPage() {
  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect('/login?returnTo=/admin');

  // const animals = await getAnimals();
  // return <AnimalsForm animals={animals} />;
}
