import { useEffect, useState } from "react";
import './App.css';

const App = () => {
  const [text, setText] = useState("HELLO WORLD!");
  const [display, setDisplay] = useState("");
  const [customText, setCustomText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < text.length) {
        setDisplay(display + text[count]);
        setCount(count + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [count]);

  const changeText = () => {
    if (customText.trim()) {
      setDisplay("");
      setText(customText.trim().toUpperCase());
      setCount(0);
    }
  }

  return (
    <>
      <h1 className="text-content">{display}<span className="dots">{display.length != text.length && "..."}</span></h1>
      <h3>Change Text?</h3>
      <input type="text" value={customText} onChange={e => setCustomText(e.target.value)} />
      <button onClick={changeText}>Change Text</button>

    </>
  )
}

export default App;
