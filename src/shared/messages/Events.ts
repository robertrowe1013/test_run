/**
 * Shared network event names for Mole Buster.
 *
 * These identifiers are used by both client and server when sending/handling
 * messages. Keep them string-literal and centralized here so refactors are safe.
 *
 * Related docs:
 *  - planning/overview.txt
 *  - planning/design.txt
 */

export const Events = {
  /**
   * Server → Client: a mole has become visible at a hole.
   */
  MOLE_SPAWNED: 'mole.spawned',

  /**
   * Server → Client: a mole is no longer visible (hit or timed out).
   */
  MOLE_DESPAWNED: 'mole.despawned',

  /**
   * Client → Server: player attempted to hit a mole.
   * Server → Client: confirmed hit broadcast to all players.
   */
  MOLE_HIT: 'mole.hit',

  /**
   * Server → Client: score update for one or more players.
   */
  SCORE_UPDATE: 'score.update',

  /**
   * Server → Client: high-level match state changes
   * (waiting, in_progress, finished) and timers.
   */
  MATCH_STATE_UPDATE: 'match.state_update',
} as const;

export type EventName = (typeof Events)[keyof typeof Events];


