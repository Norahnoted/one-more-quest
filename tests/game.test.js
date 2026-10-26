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
test('interviews grant complete rewards and preserve reinforcement, undo restores everything',()=>{
  const prepared=transition(transition(initialRecord(),'prepare'),'prepare');
  const interviewed=transition(prepared,'interview','2026-10-26');
  assert.equal(interviewed.current.totalXp,30);
  assert.equal(interviewed.current.weaponId,'eraser');
  assert.equal(interviewed.current.reinforcement,2);
  assert.equal(interviewed.current.collection.eraser,1);
  assert.equal(interviewed.current.daily['2026-10-26'].interview,1);
  assert.deepEqual(transition(interviewed,'undo').current,prepared.current);
});
test('boss rotation counts repeats without unbounded objects',()=>{
  let record=initialRecord();for(let i=0;i<4;i++) record=transition(record,'interview');
  assert.equal(record.current.collection.eraser,2);
  assert.equal(Object.keys(record.current.collection).length,3);
  assert.equal(record.current.interviewsCompleted,4);
});
test('heartbreak is manually bounded and does not touch rewards or daily counts',()=>{
  let record=transition(initialRecord(),'interview','2026-10-26');
  const original=structuredClone(record.current);
  for(let i=0;i<3;i++) record=transition(record,'heartbreak','2026-10-27');
  assert.equal(record.current.hearts,0);
  assert.equal(transition(record,'heartbreak'),record);
  assert.equal(record.current.totalXp,original.totalXp);
  assert.deepEqual(record.current.collection,original.collection);
  assert.deepEqual(record.current.daily,original.daily);
  const undo=transition(record,'undo');assert.equal(undo.current.hearts,1);
  const continued=transition(record,'apply','2026-10-27');assert.equal(continued.current.hearts,0);assert.equal(continued.current.totalXp,40);
});
