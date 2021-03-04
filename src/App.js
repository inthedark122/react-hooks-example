import './App.css';
import { useEffect, useRef, useState, useMemo } from 'react';

const listeners = [];

const callListeners = () => {
  listeners.forEach(fn => fn())
}

const addListener = (fn) => {
  listeners.push(fn);
}

window.callListeners = callListeners;

function Child({count}) {
  useEffect(() => {
    console.log("Child count", count);

    return () => {
      console.log("Child count.return", count);
    }
  }, [])

  console.log("render child:", count);

  return <div>Child count: {count}</div>
}

function App() {
  // const count = 0;
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const countMemo = useMemo(() => ({count}), [count]);
  const countMemoRef = useMemo(() => ({count}), []);

  countRef.current = count;
  countMemoRef.count = count;

  useEffect(() => {
    addListener(() => setCount(countMemoRef.count + 1))
  }, [])

  useEffect(() => {
    console.log("countMemo", countMemo);
  }, [])

  useEffect(() => {
    console.log("countMemoRef", countMemoRef);
  }, [])


  useEffect(() => {
    console.log("useEffect:", count, countRef.current, countMemo.count, countMemoRef.count);

    return () => {
      console.log("useEffect.return", count, countRef.current, countMemo.count, countMemoRef.count);
    }
  }, [count])

  console.log("render:", count)

  return (
    <div className="App">
      <div>Счетчик: {count}</div>
      <div>
        <button onClick={() => setCount(count - 1)}>-</button>
        {" | "}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      {count % 4 !== 0 && <Child count={count} />}
      {/* {count % 4 !== 0 && <Child key={count} count={count} />} */}
    </div>
  );
}

export default App;
