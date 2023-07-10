import { Sql } from 'postgres';

export const maps = [
  {
    id: 1,
    journalId: 1,
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4422158817392!2d106.70266857517915!3d10.77740318937141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4603881d67%3A0x441b5ea18bb92d95!2sAquari%20Hotel!5e0!3m2!1sen!2sat!4v1689004410485!5m2!1sen!2sat',
  },
  {
    id: 2,
    journalId: 2,
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21755.64446175212!2d8.66849835005182!3d47.03129090311349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47854e8f12afede5%3A0xc6ec65a5c8394513!2sGrosser%20Mythen!5e0!3m2!1sen!2sat!4v1689004542403!5m2!1sen!2sat',
  },
  {
    id: 3,
    journalId: 3,
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.7370488686292!2d16.362739876520532!3d48.2116805712518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07bd509edd35%3A0x404f8964ab075f83!2sFreyung%2C%201010%20Wien!5e0!3m2!1sen!2sat!4v1689004614243!5m2!1sen!2sat',
  },
  {
    id: 4,
    journalId: 4,
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22811.425777628774!2d-107.18726665898687!3d44.383330598888385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x534a5430c6d25649%3A0x499fcaed8e7ce31e!2sBighorn%20Mountains!5e0!3m2!1sen!2sat!4v1689004724253!5m2!1sen!2sat',
  },
  {
    id: 5,
    journalId: 5,
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75268.4273442021!2d-5.040533988218078!3d36.89217348850446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72b4340eaba9eb%3A0x79b302b7e89aea8c!2sRancho%20Los%20Angeles!5e0!3m2!1sen!2sat!4v1689004807343!5m2!1sen!2sat',
  },
];

export async function up(sql: Sql) {
  for (const map of maps) {
    await sql`
    INSERT INTO maps
      (journal_id, url)
    VALUES
      (${map.journalId}, ${map.url})
  `;
  }
}

export async function down(sql: Sql) {
  for (const map of maps) {
    await sql`
      DELETE FROM maps WHERE id = ${map.id}
  `;
  }
}
