import test from 'node:test';
import assert from 'node:assert/strict';
import { initialRecord, transition } from '../src/game.js';
import { loadSave, saveRecord, SAVE_KEY } from '../src/storage.js';
function memory(initial=null) { let raw=initial; return {getItem:()=>raw,setItem:(key,value)=>{assert.equal(key,SAVE_KEY);raw=value;}}; }
test('progress and undo survive save round trip',()=>{
  const storage=memory();
  const record=transition(transition(initialRecord(),'apply'),'prepare');
  assert.equal(saveRecord(record,()=>storage),'');
  const loaded=loadSave(()=>storage);
  assert.equal(loaded.blocked,false);
  assert.deepEqual(loaded.record,record);
  assert.equal(transition(loaded.record,'undo').current.reinforcement,0);
});
test('missing save is a genuine new player',()=>{assert.deepEqual(loadSave(()=>memory()).record,initialRecord());});
test('malformed and unsupported saves are preserved and blocked',()=>{
  for(const raw of ['{bad',JSON.stringify({...initialRecord(),version:99}),JSON.stringify({...initialRecord(),current:{...initialRecord().current,hearts:-1}})]) {
    const storage=memory(raw);
    assert.equal(loadSave(()=>storage).blocked,true);
    assert.equal(storage.getItem(),raw);
  }
});
test('read and write failures are reported',()=>{
  const denied=()=>{throw new Error('denied');};
  assert.equal(loadSave(denied).blocked,true);
  assert.match(saveRecord(initialRecord(),denied),/not saved/);
  assert.match(saveRecord(initialRecord(),()=>({setItem(){throw new Error('full');}})),/not saved/);
});
test('old valid saves gain empty daily counters without losing progress',()=>{
  const old=transition(initialRecord(),'apply');
  delete old.current.daily; delete old.previous.daily;
  const loaded=loadSave(()=>memory(JSON.stringify(old)));
  assert.equal(loaded.blocked,false);
  assert.equal(loaded.record.current.totalXp,10);
  assert.deepEqual(loaded.record.current.daily,{});
});
test('invalid daily counters cannot overwrite existing data',()=>{
  const record=initialRecord();record.current.daily={'2026-10-26':{apply:-1,prepare:0,interview:0}};
  assert.equal(loadSave(()=>memory(JSON.stringify(record))).blocked,true);
});
