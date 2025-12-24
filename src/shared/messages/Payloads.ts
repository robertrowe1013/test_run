/**
 * Shared message payload types for Mole Buster events.
 *
 * These types mirror the Events defined in Events.ts and are imported by both
 * server and client to ensure messages stay in sync.
 */

import type { MoleType } from '../types/MoleType';

import type { EventName } from './Events';

/** Unique identifier for a mole instance during a match. */
export type MoleId = string;

/** Unique identifier for a player. (Exact form depends on Hytopia runtime.) */
export type PlayerId = string;

/** Identifier for a specific match instance. */
export type MatchId = string;

export type MatchPhase = 'waiting' | 'in_progress' | 'finished';

export interface MoleSpawnedPayload {
  moleId: MoleId;
  matchId: MatchId;
  holeIndex: number;
  type: MoleType;
  /** Unix timestamp (ms) when the mole became visible. */
  spawnedAt: number;
  /** Unix timestamp (ms) when the mole is scheduled to despawn if not hit. */
  despawnsAt: number;
}

export interface MoleDespawnedPayload {
  moleId: MoleId;
  matchId: MatchId;
  reason: 'hit' | 'timeout';
}

export interface MoleHitRequestPayload {
  moleId: MoleId;
  matchId: MatchId;
  playerId: PlayerId;
}

export interface MoleHitBroadcastPayload {
  moleId: MoleId;
  matchId: MatchId;
  playerId: PlayerId;
  /** Score delta applied for this hit. */
  pointsDelta: number;
}

export interface ScoreUpdatePayload {
  matchId: MatchId;
  scores: Array<{
    playerId: PlayerId;
    /** Current total score after applying the latest change. */
    totalScore: number;
  }>;
}

export interface MatchStateUpdatePayload {
  matchId: MatchId;
  phase: MatchPhase;
  /** Remaining time in seconds for time-limited modes (e.g., Timed). */
  remainingTimeSeconds: number | null;
}

/**
 * Mapping from event name to its payload type.
 *
 * Server and client code can use this map to build strongly-typed handlers.
 */
export interface EventPayloadMap {
  'mole.spawned': MoleSpawnedPayload;
  'mole.despawned': MoleDespawnedPayload;
  'mole.hit': MoleHitRequestPayload | MoleHitBroadcastPayload;
  'score.update': ScoreUpdatePayload;
  'match.state_update': MatchStateUpdatePayload;
}

export type PayloadForEvent<E extends EventName> = EventPayloadMap[E];


