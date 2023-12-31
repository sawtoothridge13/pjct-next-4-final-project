import { config } from 'dotenv';
import postgres from 'postgres';

config();

const sql = postgres();

console.log(
  await sql`
SELECT * FROM users;
`,
);

// for testing
await sql.end();
