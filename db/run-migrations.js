const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || process.env.SUPABASE_DATABASE_URL

if (!databaseUrl) {
  console.error('ERROR: set DATABASE_URL (Postgres connection string) or SUPABASE_DB_URL')
  process.exit(1)
}

async function run() {
  const client = new Client({ connectionString: databaseUrl })
  await client.connect()

  try {
    const schemaPath = path.join(__dirname, 'schema.sql')
    const seedPath = path.join(__dirname, 'seeds', 'seed_players.sql')

    const schemaSql = fs.readFileSync(schemaPath, 'utf8')
    console.log('Running schema...')
    await client.query(schemaSql)
    console.log('Schema applied.')

    const seedSql = fs.readFileSync(seedPath, 'utf8')
    console.log('Running seeds...')
    await client.query(seedSql)
    console.log('Seeds applied.')
  } catch (err) {
    console.error('Migration error:', err)
  } finally {
    await client.end()
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
