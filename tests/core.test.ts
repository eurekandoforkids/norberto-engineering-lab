import {test} from 'node:test';
import assert from 'node:assert/strict';
import {evaluate, evaluateBatch, parseInitiative, InputError} from '../src/core.ts';
import {EXAMPLES} from '../src/examples.ts';

test('same input produces a deterministic and explainable score', () => {
  const first = evaluate(EXAMPLES[0]);
  const second = evaluate(EXAMPLES[0]);
  assert.deepEqual(first, second);
  assert.equal(first.score, 87);
  assert.equal(first.breakdown.length, 5);
  assert.equal(first.tier, 'Prioridade alta');
});

test('zero effort and risk improve score; zero effort is not a division error', () => {
  const base = structuredClone(EXAMPLES[0]);
  const easier = structuredClone(base);
  easier.scores.effort = 0;
  easier.scores.risk = 0;
  assert.ok(evaluate(easier).score > evaluate(base).score);
});

test('each score is bounded to 0-100', () => {
  const item = structuredClone(EXAMPLES[0]);
  for (const k of Object.keys(item.scores) as (keyof typeof item.scores)[]) item.scores[k] = 5;
  assert.equal(evaluate(item).score, 70);
  for (const k of Object.keys(item.scores) as (keyof typeof item.scores)[]) item.scores[k] = 0;
  assert.equal(evaluate(item).score, 30);
});

test('batch is sorted descending and ties break consistently by id', () => {
  const list = evaluateBatch([...EXAMPLES].reverse());
  assert.deepEqual(list.map(x => x.id), ['a1', 'b2', 'c3']);
  const a = structuredClone(EXAMPLES[0]);
  const b = {...structuredClone(a), id: 'b'};
  a.id = 'a';
  assert.deepEqual(evaluateBatch([b, a]).map(x => x.id), ['a', 'b']);
});

test('invalid or unknown fields are rejected', () => {
  assert.throws(() => parseInitiative({...EXAMPLES[0], secret: 'bad'}), InputError);
  assert.throws(() => parseInitiative({...EXAMPLES[0], scores: {...EXAMPLES[0].scores, risk: 8}}), InputError);
  assert.throws(() => parseInitiative({...EXAMPLES[0], scores: {...EXAMPLES[0].scores, effort: '3'}}), InputError);
  assert.throws(() => parseInitiative({...EXAMPLES[0], id: '../../secret'}), InputError);
  assert.throws(() => parseInitiative({...EXAMPLES[0], title: '\ninvalid'}), InputError);
});

test('rejects duplicate IDs, empty and oversized batches', () => {
  assert.throws(() => evaluateBatch([]), InputError);
  assert.throws(() => evaluateBatch([EXAMPLES[0], EXAMPLES[0]]), InputError);
  assert.throws(() => evaluateBatch(Array.from({length: 21}, (_, n) => ({...EXAMPLES[0], id:String(n)}))), InputError);
});
