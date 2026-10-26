import { useGame } from './useGame.js';
import DeskScene from './components/DeskScene.jsx';
import ProgressPanel from './components/ProgressPanel.jsx';
import ActionBar from './components/ActionBar.jsx';
import Feedback, { RewardCard } from './components/Feedback.jsx';
import WeaponPanel from './components/WeaponPanel.jsx';
import DailyTracker from './components/DailyTracker.jsx';
import Collection from './components/Collection.jsx';
import ReflectionDialog from './components/ReflectionDialog.jsx';
export default function App() {
  const game = useGame();
  return <main className="app-shell mx-auto"><ProgressPanel progress={game.record.current} effect={game.effect}/><header className="page-header flex justify-between items-start gap-6"><div><p className="eyebrow edition">YOUR NEXT CHAPTER</p><h1>One More Quest<span className="title-star" aria-hidden="true">✧</span></h1><p className="subtitle">A little courage. A little progress. One more day.</p></div><div className="edition-stamp" aria-hidden="true">ONE<br/>MORE<br/><span>TRY.</span></div></header>
    <div className="action-intro flex justify-between items-center"><h2>What did you do today?</h2><span>Small steps count.</span></div>
    <ActionBar act={game.act} blocked={game.blocked || game.busy} busy={game.busy} hearts={game.record.current.hearts} openReflection={game.openReflection} canUndo={Boolean(game.record.previous)}/>
    <Feedback message={game.message} warning={game.warning}/>
    <DeskScene effect={game.effect} encounter={game.encounter} weaponId={game.record.current.weaponId} collection={game.record.current.collection}/>
    <RewardCard boss={game.reward} dismiss={game.dismissReward}/>
    <WeaponPanel progress={game.record.current} effect={game.effect}/>
    <DailyTracker daily={game.record.current.daily}/>
    <Collection collection={game.record.current.collection}/>
    <ReflectionDialog open={game.reflection} close={game.closeReflection} begin={game.act}/>
    <footer className="page-footer flex flex-wrap justify-between gap-3"><span>❋ Every application is a step. Every interview is experience.</span><span>{game.warning ? 'Progress not saved' : 'Saved in this browser'} <span className="save-dot"/></span></footer>
  </main>;
}
