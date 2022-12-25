import AsciiEffect from 'ascii-video-effect';
import { useRef } from 'react';
import Webcam from 'react-webcam';
import './App.scss';

const SIZE = {
  width: 640,
  height: 480,
};

function App() {
  const effectRef = useRef<AsciiEffect>();
  const webcamRef = useRef<Webcam>(null);
  const textRef = useRef<HTMLPreElement | null>(null);
  const onResultAvaiable = (asciiStr: string) => {
    if (textRef.current) {
      textRef.current.innerHTML = asciiStr;
    }
  };
  const onVideoReady = () => {
    const effect = new AsciiEffect(
      webcamRef?.current?.video as HTMLVideoElement,
      onResultAvaiable,
      SIZE.width,
      SIZE.height
    );
    effectRef.current = effect;
    if (textRef.current) {
      const styles = effect.getAsciiContainerStyles();
      Object.entries(styles).forEach(([k, v]) => {
        (textRef.current as any).style[k as any] = v;
      });
    }
  };
  return (
    <div className="App">
      <div style={{ display: 'flex' }} className="effect-container">
        <Webcam
          audio={false}
          style={{ visibility: 'hidden', maxWidth: 0, maxHeight: 0 }}
          height={SIZE.height}
          width={SIZE.width}
          ref={webcamRef}
          onCanPlay={onVideoReady}
        />
        <pre className="ascii-renderer" ref={ref => (textRef.current = ref)} />
      </div>
    </div>
  );
}

export default App;
