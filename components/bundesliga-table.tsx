"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface TeamStanding {
  teamName: string;
  teamIconUrl: string;
  points: number;
  opponentGoals: number;
  goals: number;
  matches: number;
  won: number;
  draw: number;
  lost: number;
  goalDiff: number;
}

export default function BundesligaTable() {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBundesligaTable = async () => {
      try {
        setLoading(true);
        // Using OpenLigaDB API for current Bundesliga season
        const response = await fetch(
          "https://api.openligadb.de/getbltable/bl1/2025",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Bundesliga table");
        }

        const data = await response.json();
        setStandings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBundesligaTable();
  }, []);

  const getPositionColor = (position: number) => {
    if (position <= 4)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (position === 5 || position === 6)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (position >= 16)
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Lade Bundesliga Tabelle...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center text-red-600 dark:text-red-400">
            <p>Fehler beim Laden der Tabelle: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          Aktuelle Bundesliga Tabelle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-semibold">Pos</th>
                <th className="text-left py-3 px-4 font-semibold">Verein</th>
                <th className="text-center py-3 px-2 font-semibold">Sp</th>
                <th className="text-center py-3 px-2 font-semibold">S</th>
                <th className="text-center py-3 px-2 font-semibold">U</th>
                <th className="text-center py-3 px-2 font-semibold">N</th>
                <th className="text-center py-3 px-2 font-semibold">Tore</th>
                <th className="text-center py-3 px-2 font-semibold">Diff</th>
                <th className="text-center py-3 px-2 font-semibold">Pkt</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => {
                const position = index + 1;
                return (
                  <tr
                    key={team.teamName}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <Badge
                        className={getPositionColor(position)}
                      >
                        {position}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {team.teamIconUrl && (
                          <Image
                            src={team.teamIconUrl || "/placeholder.svg"}
                            alt={`${team.teamName} logo`}
                            className="w-6 h-6 object-contain"
                          />
                        )}
                        <span className="font-medium">{team.teamName}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-2">{team.matches}</td>
                    <td className="text-center py-3 px-2">{team.won}</td>
                    <td className="text-center py-3 px-2">{team.draw}</td>
                    <td className="text-center py-3 px-2">{team.lost}</td>
                    <td className="text-center py-3 px-2">
                      {team.goals}:{team.opponentGoals}
                    </td>
                    <td className="text-center py-3 px-2">
                      <span
                        className={
                          team.goalDiff >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {team.goalDiff > 0 ? "+" : ""}
                        {team.goalDiff}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-bold">{team.points}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              1-4
            </Badge>
            <span>Champions League</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              5-6
            </Badge>
            <span>Europa League</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              16-18
            </Badge>
            <span>Abstieg</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
