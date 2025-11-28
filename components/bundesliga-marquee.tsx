"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import LogoSC from "../public/Assets/Img/LogoSCFreiburg.png";
import next from "next";
interface TeamStanding {
  teamName: string;
  teamId: number;
  matches: number;
  won: number;
  draw: number;
  lost: number;
  goals: number;
  opponentGoals: number;
  goalDiff: number;
  points: number;
}

interface MatchData {
  matchDateTime: string;
  team1: { teamName: string };
  team2: { teamName: string };
  matchResults: Array<{
    pointsTeam1: number;
    pointsTeam2: number;
  }>;
}

interface cardInterface {
  className?: string;
}

export default function SCFreiburgMarquee() {
  const [freiburgData, setFreiburgData] = useState<TeamStanding | null>(null);
  const [currentMatchday, setCurrentMatchday] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [standings, setStandings] = useState<TeamStanding[]>([]); // Declare standings variable

  useEffect(() => {
    const fetchFreiburgData = async () => {
      try {
        setLoading(true);

        // Fetch current Bundesliga standings
        const standingsResponse = await fetch(
          "https://api.openligadb.de/getbltable/bl1/2025",
        );
        if (!standingsResponse.ok) {
          throw new Error("Failed to fetch standings");
        }
        const fetchedStandings: TeamStanding[] = await standingsResponse.json();
        setStandings(fetchedStandings); // Set standings state

        // Find SC Freiburg in the standings
        const freiburg = fetchedStandings.find(
          (team) =>
            team.teamName.toLowerCase().includes("freiburg") ||
            team.teamName.toLowerCase().includes("sc freiburg"),
        );

        if (freiburg) {
          setFreiburgData(freiburg);
        } else {
          throw new Error("SC Freiburg not found in standings");
        }

        // Fetch current matchday info
        const matchesResponse = await fetch(
          "https://api.openligadb.de/getmatchdata/bl1/2025",
        );
        if (!matchesResponse.ok) {
          throw new Error("Failed to fetch matches");
        }
        const matches: MatchData[] = await matchesResponse.json();

        // Find current matchday (latest completed or ongoing match)
        const now = new Date();
        let latestMatchday = 1;

        for (const match of matches) {
          const matchDate = new Date(match.matchDateTime);
          if (matchDate <= now && match.matchResults.length > 0) {
            // This is a rough estimation - in real implementation you'd get matchday from API
            latestMatchday = Math.min(
              34,
              Math.floor(matches.indexOf(match) / 9 + 1),
            );
          }
        }

        setCurrentMatchday(latestMatchday);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFreiburgData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchFreiburgData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">
            Lade SC Freiburg Daten...
          </span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-destructive text-center">
          <p className="font-semibold">Fehler beim Laden der Daten</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </Card>
    );
  }

  if (!freiburgData) {
    return (
      <Card>
        <div className="text-center text-muted-foreground">
          Keine Daten für SC Freiburg gefunden
        </div>
      </Card>
    );
  }

  const marqueeText = `🏆 SC FREIBURG • Spieltag: ${currentMatchday} • Rang: ${standings.findIndex((team) => team.teamId === freiburgData.teamId) + 1} • Punkte gesamt: ${freiburgData.points} Spiele gewonnen(${freiburgData.won} unentschieden${freiburgData.draw}remis-${freiburgData.lost} verloren • geschossene Tore: ${freiburgData.goals} erhaltene Tore${freiburgData.opponentGoals} (${freiburgData.goalDiff > 0 ? "+" : ""}${freiburgData.goalDiff}) } • `;

  return (
    <>
      {/* Detailed stats below marquee */}
      <div className="mt-6 flex flex-row gap-4 items-center overflow-x-auto">
        <Image
          src={LogoSC}
          alt="SC Freiburg Logo"
          width={100}
          height={80}
          className="rounded-full"
        />
        <section className="p-4 flex flex-row">
          <div className="flex flex-row items-center gap-x-3">
            <h3 className="text-white font-semibold text-sm lg:text-6xl  mb-2">
              SPIELTAG
            </h3>
            <p className="text-amber-500 text-4xl lg:text-6xl font-bold">
              {currentMatchday}
            </p>
            <p className="text-sm text-white lg:text-6xl ">von 34 Spieltagen</p>
          </div>
        </section>

        <section className="p-4">
          <div className="space-y-1">
            <p className="text-2xl font-bold lg:text-6xl text-amber-500 ">
              {freiburgData.points} Punkte
            </p>
            <p className="text-sm text-white lg:text-3xl">
              {freiburgData.won} Siege • {freiburgData.draw} Unentschieden •{" "}
              {freiburgData.lost} Niederlagen
            </p>
          </div>
        </section>

        <section className=" p-4">
          <div className="flex items-center gap-x-3 space-y-1 text-center">
            <h3 className="font-semibold text-sm text-white lg:text-2xl mb-2">
              TORVERHÄLTNIS
            </h3>

            <p className="text-2xl lg:text-6xl text-amber-500 font-bold">
              {freiburgData.goals}:{freiburgData.opponentGoals}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
