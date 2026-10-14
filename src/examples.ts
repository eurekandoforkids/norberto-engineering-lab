import type { Initiative } from './core.ts';

// Invented, intentionally generic records. Never real customer or product data.
export const EXAMPLES: Initiative[] = [
  { id: 'a1', title: 'Automatizar conferência de relatórios', scores: {
    impact: 5, urgency: 4, confidence: 5, effort: 2, risk: 1,
  } },
  { id: 'b2', title: 'Reorganizar base documental', scores: {
    impact: 3, urgency: 3, confidence: 4, effort: 2, risk: 1,
  } },
  { id: 'c3', title: 'Experimentar nova interface interna', scores: {
    impact: 4, urgency: 2, confidence: 2, effort: 4, risk: 3,
  } },
];
