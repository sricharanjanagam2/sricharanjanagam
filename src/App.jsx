import { useState, useRef, useEffect } from 'react';
import './App.css';

const STM_MAX_SIZE = 5;
const REPETITION_THRESHOLD = 3;

function App() {
  // Main states mapping the C data structures
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      // In STM - increase rep
      newStm[stmIdx] = { ...newStm[stmIdx], count: newStm[stmIdx].count + 1 };
      newTotalReps++;

      // Promote to LTM?
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
      // New memory
      if (newStm.length >= STM_MAX_SIZE) {
        // STM Full -> evict oldest (front of queue, shift)
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
    
    // Stack pop
    const recalled = newForgotten.pop();
    recalled.count++;
    let newTotalReps = totalRepetitions + 1;

    // Make room in STM
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

  // Get Top 5 Memories
  const allMemories = [
    ...stm.map(m => ({ ...m, loc: 'STM' })),
    ...ltm.map(m => ({ ...m, loc: 'LTM' })),
    ...forgotten.map(m => ({ ...m, loc: 'FRG' }))
  ];
  const topMemories = allMemories.sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title-glow">Memory Simulator</h1>
        <p className="subtitle">Explore how data structures model human memory behavior</p>
      </header>

      <div className="glass-panel controls-section">
        <div className="input-group">
          <input 
            ref={inputRef}
            type="text" 
            className="memory-input" 
            placeholder="Enter a new memory to remember..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={addMemory}>
            Remember
          </button>
        </div>

        <div className="action-buttons">
          <button 
            className="btn btn-secondary" 
            onClick={recallMemory}
            disabled={forgotten.length === 0}
          >
            Recall Last Forgotten
          </button>
          <button className="btn btn-danger" onClick={clearSystem}>
            Clear System
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="sections-container">
          
          <div className="glass-panel section-panel">
            <div className="section-header">
              <h2 className="section-title stm-title">🧠 Short-Term Memory</h2>
              <span className="badge">{stm.length} / {STM_MAX_SIZE} (Queue)</span>
            </div>
            
            <div className="memory-tray">
              {stm.length === 0 ? (
                <div className="empty-state">STM is empty</div>
              ) : (
                stm.map((m, i) => (
                  <div key={`stm-${m.memory}-${i}`} className="memory-card card-stm">
                    <div className="rep-badge">x{m.count}</div>
                    <div className="memory-content">{m.memory}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel section-panel">
            <div className="section-header">
              <h2 className="section-title ltm-title">📚 Long-Term Memory</h2>
              <span className="badge">{ltm.length} Items (Linked List)</span>
            </div>
            
            <div className="memory-tray">
              {ltm.length === 0 ? (
                <div className="empty-state">No memories promoted yet (Requires {REPETITION_THRESHOLD} reps)</div>
              ) : (
                ltm.map((m, i) => (
                  <div key={`ltm-${m.memory}-${i}`} className="memory-card card-ltm">
                    <div className="rep-badge">x{m.count}</div>
                    <div className="memory-content">{m.memory}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel section-panel">
            <div className="section-header">
              <h2 className="section-title forgotten-title">🚫 Forgotten Memory</h2>
              <span className="badge">{forgotten.length} Items (Stack)</span>
            </div>
            
            <div className="memory-tray">
              {forgotten.length === 0 ? (
                <div className="empty-state">Nothing forgotten... yet</div>
              ) : (
                forgotten.slice().reverse().map((m, i) => (
                  <div key={`frg-${m.memory}-${i}`} className="memory-card card-forgotten">
                    <div className="rep-badge">x{m.count}</div>
                    <div className="memory-content">{m.memory} {i===0 && "(Top)"}</div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        <div className="glass-panel stats-panel">
          <div className="section-header">
            <h2 className="section-title">📊 Stats</h2>
          </div>

          <div className="stat-item">
            <span className="stat-label">Total Repetitions</span>
            <span className="stat-value">{totalRepetitions}</span>
          </div>

          <div className="section-header" style={{marginTop: '1rem'}}>
            <h3 className="section-title" style={{fontSize: '1.2rem'}}>🏆 Top Memories</h3>
          </div>

          <div className="top-memories-list">
            {topMemories.length === 0 ? (
              <div className="empty-state">No memories active</div>
            ) : (
              topMemories.map((m, i) => (
                <div key={`top-${m.memory}-${i}`} className="top-memory-item">
                  <span className="top-memory-rank">#{i+1}</span>
                  <span className="top-memory-text" title={m.memory}>{m.memory}</span>
                  <span className="top-memory-count">{m.count}x</span>
                  <span className="top-memory-loc">{m.loc}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="watermark">sricharan</div>
    </div>
  );
}

export default App;
