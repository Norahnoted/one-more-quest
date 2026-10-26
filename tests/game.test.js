import test from 'node:test';
import assert from 'node:assert/strict';
import { initialRecord, transition, levelOf } from '../src/game.js';
test('ten applications level up and one undo restores the last complete state', () => {
  let record = initialRecord();
  for (let i=0;i<10;i++) record=transition(record,'apply');
  assert.equal(levelOf(record.current.totalXp),2);
  const undone=transition(record,'undo');
  assert.equal(undone.current.totalXp,90);
  assert.equal(levelOf(undone.current.totalXp),1);
  assert.equal(transition(undone,'undo'),undone);
});
test('preparation preserves XP and hearts, snapshots do not mutate',()=>{
  const original=transition(initialRecord(),'apply');
  const prepared=transition(original,'prepare');
  assert.equal(prepared.current.reinforcement,1);
  assert.equal(prepared.current.totalXp,10);
  assert.equal(prepared.current.hearts,3);
  assert.deepEqual(transition(prepared,'undo').current,original.current);
  assert.equal(original.current.reinforcement,0);
});
test('daily counts separate dates and undo restores the original day',()=>{
  const a=transition(initialRecord(),'apply','2026-10-26');
  const b=transition(a,'prepare','2026-10-27');
  assert.deepEqual(b.current.daily['2026-10-26'],{apply:1,prepare:0,interview:0});
  assert.deepEqual(b.current.daily['2026-10-27'],{apply:0,prepare:1,interview:0});
  assert.deepEqual(transition(b,'undo').current,a.current);
});
