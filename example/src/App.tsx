import AsciiEffect from "my-package";
import { useEffect, useRef } from "react";
import './App.scss';

function App() {
  const effectRef = useRef<AsciiEffect>();
  useEffect(() => {
    effectRef.current = new AsciiEffect(12);
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
