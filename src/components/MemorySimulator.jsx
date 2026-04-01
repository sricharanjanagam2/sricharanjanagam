import { useState, useRef, useEffect } from 'react';
import '../App.css'; // Preserving the simulator's previous CSS

const STM_MAX_SIZE = 5;
const REPETITION_THRESHOLD = 3;

function MemorySimulator() {
  const [stm, setStm] = useState([
    { memory: "Learning to ride a bike", count: 1 },
    { memory: "First day of school", count: 1 },
    { memory: "Favorite meal", count: 1 }
  ]);
  const [ltm, setLtm] = useState([]);
  const [forgotten, setForgotten] = useState([]);
  const [totalRepetitions, setTotalRepetitions] = useState(3);
  
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const addMemory = () => {
    const memoryText = inputValue.trim();
    if (!memoryText) return;

    let newStm = [...stm];
    let newLtm = [...ltm];
    let newForgotten = [...forgotten];
    let newTotalReps = totalRepetitions;

    let stmIdx = newStm.findIndex(m => m.memory === memoryText);
    let ltmIdx = newLtm.findIndex(m => m.memory === memoryText);
    let forgottenIdx = newForgotten.findIndex(m => m.memory === memoryText);

    if (stmIdx !== -1) {
      newStm[stmIdx] = { ...newStm[stmIdx], count: newStm[stmIdx].count + 1 };
      newTotalReps++;

      if (newStm[stmIdx].count >= REPETITION_THRESHOLD) {
        const promoted = newStm[stmIdx];
        newStm.splice(stmIdx, 1);
        newLtm.push({ ...promoted });
      }
    } else if (ltmIdx !== -1) {
      newLtm[ltmIdx] = { ...newLtm[ltmIdx], count: newLtm[ltmIdx].count + 1 };
      newTotalReps++;
    } else if (forgottenIdx !== -1) {
      newForgotten[forgottenIdx] = { ...newForgotten[forgottenIdx], count: newForgotten[forgottenIdx].count + 1 };
      newTotalReps++;
    } else {
      if (newStm.length >= STM_MAX_SIZE) {
        const oldest = newStm.shift();
        if (oldest.count < REPETITION_THRESHOLD) {
          newForgotten.push(oldest);
        } else {
          newLtm.push(oldest);
        }
      }
      newStm.push({ memory: memoryText, count: 1 });
      newTotalReps++;
    }

    setStm(newStm);
    setLtm(newLtm);
    setForgotten(newForgotten);
    setTotalRepetitions(newTotalReps);
    setInputValue("");
  };

  const recallMemory = () => {
    if (forgotten.length === 0) return;

    let newStm = [...stm];
    let newLtm = [...ltm];
    let newForgotten = [...forgotten];
    
    const recalled = newForgotten.pop();
    recalled.count++;
    let newTotalReps = totalRepetitions + 1;

    if (newStm.length >= STM_MAX_SIZE) {
      const oldest = newStm.shift();
      if (oldest.count < REPETITION_THRESHOLD) {
        newForgotten.push(oldest);
      } else {
        newLtm.push(oldest);
      }
    }

    newStm.push(recalled);

    setStm(newStm);
    setLtm(newLtm);
    setForgotten(newForgotten);
    setTotalRepetitions(newTotalReps);
  };

  const clearSystem = () => {
    if (window.confirm("Are you sure you want to forget everything?")) {
      setStm([]);
      setLtm([]);
      setForgotten([]);
      setTotalRepetitions(0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addMemory();
    }
  };

  const allMemories = [
    ...stm.map(m => ({ ...m, loc: 'STM' })),
    ...ltm.map(m => ({ ...m, loc: 'LTM' })),
    ...forgotten.map(m => ({ ...m, loc: 'FRG' }))
  ];
  const topMemories = allMemories.sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="simulator-wrapper glass-card p-6 md:p-10 rounded-2xl relative overflow-hidden my-8">
      {/* Glow effect behind simulator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-purple-900/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="memory-dashboard app-container w-full max-w-5xl mx-auto z-10 relative">
        <header className="header text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">Human Memory Simulator</h2>
          <p className="text-slate-400">Explore how data structures model human memory behavior</p>
        </header>

        <div className="glass p-6 rounded-xl border border-white/5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
          <div className="w-full flex gap-3">
            <input 
              ref={inputRef}
              type="text" 
              className="flex-1 bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-inter" 
              placeholder="Enter a memory (e.g., Learn React)..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className="bg-purple-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]" 
              onClick={addMemory}
            >
              Remember
            </button>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button 
              className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors border border-slate-600 whitespace-nowrap disabled:opacity-50" 
              onClick={recallMemory}
              disabled={forgotten.length === 0}
            >
              Recall Forgotten
            </button>
            <button 
              className="flex-1 md:flex-none bg-red-900/50 hover:bg-red-600 border border-red-500/30 text-white font-medium py-3 px-6 rounded-lg transition-colors" 
              onClick={clearSystem}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="glass p-5 rounded-xl border border-white/5 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <h3 className="text-lg font-semibold text-cyan-300">🧠 Short-Term</h3>
                <span className="text-xs font-bold px-2 py-1 bg-black/50 rounded text-slate-300">{stm.length} / {STM_MAX_SIZE} (Queue)</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 min-h-[200px]">
                {stm.length === 0 ? (
                  <div className="m-auto text-slate-500 italic text-sm">STM is empty</div>
                ) : (
                  stm.map((m, i) => (
                    <div key={`stm-${m.memory}-${i}`} className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded-lg flex items-start gap-3 animation-fade-in group hover:bg-cyan-900/40 transition-colors">
                      <div className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-1 rounded min-w-[2.5rem] text-center">x{m.count}</div>
                      <div className="text-sm font-medium text-slate-200">{m.memory}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass p-5 rounded-xl border border-white/5 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <h3 className="text-lg font-semibold text-purple-400">📚 Long-Term</h3>
                <span className="text-xs font-bold px-2 py-1 bg-black/50 rounded text-slate-300">{ltm.length} Items</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 min-h-[200px]">
                {ltm.length === 0 ? (
                  <div className="m-auto text-slate-500 italic text-sm text-center px-4">No memories promoted yet (Requires {REPETITION_THRESHOLD} reps)</div>
                ) : (
                  ltm.map((m, i) => (
                    <div key={`ltm-${m.memory}-${i}`} className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg flex items-start gap-3 animation-fade-in group hover:bg-purple-900/40 transition-colors">
                      <div className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-1 rounded min-w-[2.5rem] text-center">x{m.count}</div>
                      <div className="text-sm font-medium text-slate-200">{m.memory}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass p-5 rounded-xl border border-white/5 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <h3 className="text-lg font-semibold text-slate-400">🚫 Forgotten</h3>
                <span className="text-xs font-bold px-2 py-1 bg-black/50 rounded text-slate-300">{forgotten.length} Items (Stack)</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 min-h-[200px]">
                {forgotten.length === 0 ? (
                  <div className="m-auto text-slate-500 italic text-sm">Nothing forgotten... yet</div>
                ) : (
                  forgotten.slice().reverse().map((m, i) => (
                    <div key={`frg-${m.memory}-${i}`} className="bg-slate-800/40 border border-slate-600/30 p-3 rounded-lg flex items-start gap-3 animation-fade-in opacity-70 group hover:opacity-100 transition-opacity">
                      <div className="bg-slate-700 text-slate-300 text-xs font-bold px-2 py-1 rounded min-w-[2.5rem] text-center">x{m.count}</div>
                      <div className="text-sm font-medium text-slate-400 line-through decoration-slate-600">{m.memory} {i===0 && <span className="text-xs text-slate-500 no-underline ml-1">(Top)</span>}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/5 shadow-lg flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8 flex flex-col justify-center items-center text-center">
            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Repetitions</h3>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-purple-400">{totalRepetitions}</div>
          </div>

          <div className="w-full md:w-2/3">
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">🏆 Top Memories</h3>
            <div className="flex flex-col gap-2">
              {topMemories.length === 0 ? (
                <div className="text-sm text-slate-500 italic">No memories active</div>
              ) : (
                topMemories.map((m, i) => (
                  <div key={`top-${m.memory}-${i}`} className="flex items-center gap-4 bg-black/20 px-4 py-2 rounded-lg border border-white/5">
                    <span className="text-slate-500 font-mono text-xs w-4">#{i+1}</span>
                    <span className="flex-1 text-sm font-medium text-slate-200 truncate" title={m.memory}>{m.memory}</span>
                    <span className="text-xs font-bold text-cyan-400">{m.count}x</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide
                      ${m.loc === 'STM' ? 'bg-cyan-900/50 text-cyan-300' : 
                        m.loc === 'LTM' ? 'bg-purple-900/50 text-purple-300' : 
                        'bg-slate-700 text-slate-300'}`}>
                      {m.loc}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemorySimulator;
