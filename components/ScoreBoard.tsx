import { cn } from "@/lib/utils";

interface Player {
  id: string;
  name: string;
  score: number;
  team?: string;
}

interface ScoreBoardProps {
  players: Player[];
  title?: string;
  showTeams?: boolean;
  className?: string;
}

export function ScoreBoard({ players, title = "Scoreboard", showTeams = false, className }: ScoreBoardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const teamScores = showTeams
    ? players.reduce((acc, player) => {
        if (player.team) {
          acc[player.team] = (acc[player.team] || 0) + player.score;
        }
        return acc;
      }, {} as Record<string, number>)
    : {};

  const sortedTeams = Object.entries(teamScores).sort((a, b) => b[1] - a[1]);

  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-6", className)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>

      {showTeams && sortedTeams.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Team Scores</h3>
          <div className="space-y-2">
            {sortedTeams.map(([team, score], index) => (
              <div
                key={team}
                className={cn(
                  "flex justify-between items-center p-3 rounded-lg",
                  index === 0 ? "bg-yellow-100 border-2 border-yellow-400" : "bg-gray-50"
                )}
              >
                <div className="flex items-center">
                  {index === 0 && <span className="text-yellow-500 mr-2">👑</span>}
                  <span className="font-semibold">{team}</span>
                </div>
                <span className="text-lg font-bold">{score}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={cn(
              "flex justify-between items-center p-3 rounded-lg transition-colors",
              index === 0 ? "bg-yellow-100 border-2 border-yellow-400" : "bg-gray-50 hover:bg-gray-100"
            )}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}
              </span>
              <div>
                <span className="font-semibold">{player.name}</span>
                {showTeams && player.team && (
                  <span className="text-sm text-gray-500 ml-2">({player.team})</span>
                )}
              </div>
            </div>
            <span className="text-lg font-bold">{player.score}</span>
          </div>
        ))}
      </div>

      {players.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No players yet
        </div>
      )}
    </div>
  );
}