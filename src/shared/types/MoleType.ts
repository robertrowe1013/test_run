/**
 * Shared mole type definitions and base scoring metadata.
 *
 * This file is referenced by both server and client code.
 * Point values are derived from planning/design.txt:
 *  - Standard: +5
 *  - Deluxe:  +15
 *  - Penalty: -10
 */

/**
 * All supported mole type identifiers.
 *
 * Keep this list in sync with:
 *  - content/moles/*.json
 *  - assets/models/moles/*
 *  - src/server/entities/MoleTypes.ts
 */
export type MoleType = 'standard' | 'deluxe' | 'penalty';

/**
 * Static metadata for a given mole type.
 *
 * GameBalanceConfig can further tune spawn odds and mode-specific behavior,
 * but base point values live here so scoring logic has a single source of truth.
 */
export interface MoleTypeDefinition {
  /** Logical identifier for the mole type (matches MoleType). */
  readonly id: MoleType;
  /** Base score delta applied when this mole is successfully hit. */
  readonly basePoints: number;
  /** Optional short label for use in UI. */
  readonly displayName: string;
}

/**
 * Base mole definitions keyed by type.
 *
 * Server-side systems (e.g. scoring) and content loaders can rely on this map
 * for default point values, while still allowing mode-specific overrides.
 */
export const MOLE_TYPES: Record<MoleType, MoleTypeDefinition> = {
  standard: {
    id: 'standard',
    basePoints: 5,
    displayName: 'Standard Mole',
  },
  deluxe: {
    id: 'deluxe',
    basePoints: 15,
    displayName: 'Deluxe Mole',
  },
  penalty: {
    id: 'penalty',
    basePoints: -10,
    displayName: 'Penalty Mole',
  },
} as const;


