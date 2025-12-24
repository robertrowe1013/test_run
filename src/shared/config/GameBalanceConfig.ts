/**
 * Shared game balance configuration for Mole Buster.
 *
 * This file centralizes tunable values that affect difficulty and pacing.
 * Server-side systems (e.g. MoleSpawnSystem, game modes) should read from
 * this module instead of hard-coding numbers.
 *
 * Source docs:
 *  - planning/design.txt   (mole behavior, timing, types, scoring)
 *  - planning/overview.txt (game modes and goals)
 */

import type { MoleType } from '../types/MoleType';

/**
 * Global spawn timing configuration.
 *
 * Durations are in seconds to match the 3–15 second window described in design.txt.
 */
export const MoleSpawnTiming = {
  /** Minimum time a mole can remain visible. */
  minVisibleSeconds: 3,
  /** Maximum time a mole can remain visible. */
  maxVisibleSeconds: 15,
} as const;

/**
 * Relative spawn weights for each mole type.
 *
 * These values are used to build weighted random selections. They are
 * intentionally simple defaults and can be tuned per mode if needed.
 */
export const BaseMoleSpawnWeights: Record<MoleType, number> = {
  standard: 8, // common, low-value
  deluxe: 2,   // rarer, high-value
  penalty: 1,  // rare, keeps players from spamming
} as const;

/**
 * Optional per-mode overrides.
 *
 * Game modes can choose to:
 *  - Use these presets directly
 *  - Or implement their own weighting logic on top of BaseMoleSpawnWeights
 */
export type GameModeId = 'timed' | 'score_chase' | 'versus';

export interface ModeSpawnConfig {
  /** Multiplier applied to all spawn weights for this mode (global density knob). */
  readonly spawnRateMultiplier: number;
  /** Optional per-type weight overrides for this mode. */
  readonly moleSpawnWeights?: Partial<Record<MoleType, number>>;
}

export const ModeSpawnConfigs: Record<GameModeId, ModeSpawnConfig> = {
  timed: {
    // Steady pacing across three minutes; mostly standard moles.
    spawnRateMultiplier: 1.0,
    moleSpawnWeights: undefined,
  },
  score_chase: {
    // Slightly higher density so reaching 100 points feels active.
    spawnRateMultiplier: 1.25,
    moleSpawnWeights: {
      deluxe: 3, // promote some high-value opportunities
    },
  },
  versus: {
    // Balanced density; actual positive/negative scoring is handled by color logic.
    spawnRateMultiplier: 1.0,
    moleSpawnWeights: {
      penalty: 2, // increase risk to discourage random hits
    },
  },
} as const;


