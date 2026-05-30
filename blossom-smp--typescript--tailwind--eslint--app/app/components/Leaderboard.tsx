import React from 'react'
import supabaseAdmin from '../../lib/supabaseServer'

type Player = {
  id: string
  username: string
  display_name?: string | null
  points: number
  avatar_url?: string | null
}

type Achievement = {
  id: string
  event_name: string
  tier: string
  points: number
  achieved_at: string
}

export default async function Leaderboard() {
  const { data: players } = await supabaseAdmin
    .from<Player>('players')
    .select('*')
    .order('points', { ascending: false })

  if (!players) {
    return <div>No players found.</div>
  }

  const rows = await Promise.all(
    players.map(async (player, index) => {
      const { data: achievements } = await supabaseAdmin
        .from<Achievement>('player_achievements')
        .select('*')
        .eq('player_id', player.id)
        .order('achieved_at', { ascending: false })

      return (
        <li key={player.id} className="flex items-center justify-between bg-gray-800/50 p-4 rounded">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">#{index + 1}</div>
            <div>
              <div className="font-medium">{player.username}</div>
              <div className="text-xs text-gray-400">AS</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{player.points} pts</div>
            <div className="text-xs text-gray-400">
              {achievements && achievements.length > 0
                ? achievements.map((a) => `${a.event_name} ${a.tier}`).join(', ')
                : '—'}
            </div>
          </div>
        </li>
      )
    })
  )

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Blossom SMP</h1>
      <p className="text-sm text-gray-400">Official Competitive Power Rankings</p>
      <ul className="mt-4 space-y-3">{rows}</ul>
    </section>
  )
}
