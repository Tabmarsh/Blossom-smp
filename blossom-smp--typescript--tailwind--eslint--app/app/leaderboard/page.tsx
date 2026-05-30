import Leaderboard from '../components/Leaderboard'

export default async function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
      <main className="mx-auto max-w-3xl">
        <Leaderboard />
      </main>
    </div>
  )
}
