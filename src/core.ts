/**
 * Decision Lab — illustrative decision-support engine.
 * Standalone example. Not extracted from any private product.
 *
 * Controls: deterministic output, bounded inputs, no PII persistence.
 * Human responsibility: choose and justify weights for a real use case.
 */

export type Criterion = 'impact' | 'urgency' | 'confidence' | 'effort' | 'risk';
export type Scores = Record<Criterion, number>;

export type Initiative = {
  id: string;
  title: string;
  scores: Scores;
};

export type Factor = {
  criterion: Criterion;
  input: number;
  normalized: number;
  weight: number;
  points: number;
  orientation: 'higher-is-better' | 'lower-is-better';
};

export type Evaluation = {
  id: string;
  title: string;
  score: number;
  tier: 'Prioridade alta' | 'Prioridade média' | 'Revisar antes de priorizar';
  breakdown: Factor[];
  explanation: string;
};

export const CRITERIA: readonly Criterion[] = [
  'impact', 'urgency', 'confidence', 'effort', 'risk',
];

export const WEIGHTS: Readonly<Scores> = Object.freeze({
  impact: 0.35,
  urgency: 0.15,
  confidence: 0.20,
  effort: 0.20,
  risk: 0.10,
});

const LOWER_IS_BETTER = new Set<Criterion>(['effort', 'risk']);

export class InputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Reject unknown fields and values instead of silently coercing input. */
export function parseInitiative(raw: unknown): Initiative {
  if (!isRecord(raw)) throw new InputError('A iniciativa deve ser um objeto.');
  const topKeys = Object.keys(raw).sort();
  if (topKeys.join(',') !== 'id,scores,title') {
    throw new InputError('Campos aceitos: id, title e scores.');
  }
  if (typeof raw.id !== 'string' || !/^[a-zA-Z0-9_-]{1,32}$/.test(raw.id)) {
    throw new InputError('id deve conter 1–32 caracteres alfanuméricos, _ ou -.');
  }
  if (typeof raw.title !== 'string' || raw.title.trim().length < 3 ||
      raw.title.trim().length > 100 || /[\u0000-\u001F\u007F]/.test(raw.title)) {
    throw new InputError('title deve conter de 3 a 100 caracteres visíveis.');
  }
  if (!isRecord(raw.scores)) throw new InputError('scores deve ser um objeto.');
  const actual = Object.keys(raw.scores).sort();
  if (actual.join(',') !== [...CRITERIA].sort().join(',')) {
    throw new InputError('scores deve informar impact, urgency, confidence, effort e risk.');
  }
  for (const criterion of CRITERIA) {
    const value = raw.scores[criterion];
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 5) {
      throw new InputError(`${criterion} deve ser inteiro entre 0 e 5.`);
    }
  }
  return {
    id: raw.id,
    title: raw.title.trim(),
    scores: Object.fromEntries(CRITERIA.map(key => [key, raw.scores[key]])) as Scores,
  };
}

/**
 * The score is an explainable 0–100 weighted model.
 * A low effort/risk receives more points than a high effort/risk.
 * It supports (does not automate) a decision made by a person.
 */
export function evaluate(input: Initiative): Evaluation {
  const initiative = parseInitiative(input);
  const breakdown: Factor[] = CRITERIA.map(criterion => {
    const value = initiative.scores[criterion];
    const normalized = LOWER_IS_BETTER.has(criterion) ? (5 - value) / 5 : value / 5;
    const points = normalized * WEIGHTS[criterion] * 100;
    return {
      criterion,
      input: value,
      normalized,
      weight: WEIGHTS[criterion],
      points: Number(points.toFixed(2)),
      orientation: LOWER_IS_BETTER.has(criterion) ? 'lower-is-better' : 'higher-is-better',
    };
  });
  const score = Number(breakdown.reduce((n, factor) => n + factor.points, 0).toFixed(2));
  const tier = score >= 70 ? 'Prioridade alta'
    : score >= 45 ? 'Prioridade média' : 'Revisar antes de priorizar';
  const strongest = [...breakdown].sort((a, b) => b.points - a.points)[0];
  return {
    id: initiative.id,
    title: initiative.title,
    score,
    tier,
    breakdown,
    explanation: `Maior contribuição ponderada: ${strongest.criterion} (${strongest.points.toFixed(2)} pontos). Modelo demonstrativo; decisão final humana.`,
  };
}

export function evaluateBatch(raw: unknown): Evaluation[] {
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > 20) {
    throw new InputError('Informe de 1 a 20 iniciativas.');
  }
  const items = raw.map(parseInitiative);
  if (new Set(items.map(item => item.id)).size !== items.length) {
    throw new InputError('Identificadores duplicados.');
  }
  return items.map(evaluate)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id, 'en'));
}
