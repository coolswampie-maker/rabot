// Local dev Postgres without Docker, via embedded-postgres.
// Starts an in-process Postgres on port 5432 (matches .env) and stays alive.
import EmbeddedPostgres from 'embedded-postgres';
import { existsSync } from 'node:fs';

const dataDir = './.pgdata';
const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: 'rudn',
  password: 'rudn',
  port: 5432,
  persistent: true,
});

const fresh = !existsSync(dataDir);
if (fresh) {
  console.log('Initialising Postgres data dir…');
  await pg.initialise();
}
await pg.start();
console.log('Postgres started on 127.0.0.1:5432');

try {
  await pg.createDatabase('rudn');
  console.log('Created database "rudn"');
} catch {
  console.log('Database "rudn" already exists');
}

const stop = async () => {
  try { await pg.stop(); } catch {}
  process.exit(0);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
console.log('READY — keeping Postgres alive. Ctrl+C to stop.');
setInterval(() => {}, 1 << 30);
