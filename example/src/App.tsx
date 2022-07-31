import AsciiEffect from "my-package";
import { useRef } from "react";
import Webcam from "react-webcam";
import './App.scss';

const SIZE = {
  width: 480,
  height: 640,
}

function App() {
  const effectRef = useRef<AsciiEffect>();
  const webcamRef = useRef<Webcam>(null);
  return (
    <div className="App">
      <div className="effect-container">
        <Webcam
          audio={false}
          height={SIZE.height}
          ref={webcamRef}
          width={SIZE.width}
          onCanPlay={() => {
            effectRef.current = new AsciiEffect(
              webcamRef?.current?.video as HTMLVideoElement
            )
          }}
        />
      </div>
    </div>
  );
}

export default App;
