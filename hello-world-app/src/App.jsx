import { useEffect, useState } from "react";

const App = () => {
  const text = "HELLO WORLD!";
  const [display, setDisplay] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < text.length) {
        setDisplay(display + text[count]);
        setCount(count + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [count])

  return (
    <>
      <h1>{display}</h1>
    </>
  )
}

export default App;
