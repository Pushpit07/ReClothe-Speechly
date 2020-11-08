import React, { useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import "./Mic.css";

const vibrate = (durationMs = 5) => {
  if (navigator.vibrate) {
    navigator.vibrate(durationMs);
  }
};

export function useKeyboardEvent(
  keyDownCallback,
  keyUpCallBack,
  dependencies = []
) {
  useEffect(() => {
    window.addEventListener("keydown", keyDownCallback);
    window.addEventListener("keyup", keyUpCallBack);
    return () => {
      window.removeEventListener("keydown", keyDownCallback);
      window.removeEventListener("keyup", keyUpCallBack);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

const Mic = (props) => {
  const { speechState, toggleRecording, initialise } = useSpeechContext();
  const [springProps, setSpringProps] = useSpring(() => ({
    effectOpacity: 0,
    transform: "scale(1)",
    transformOrigin: "50% 50%",
  }));

  const [mouseDrag, setMouseDrag] = useState(false);

  React.useEffect(() => {
    const handleMouseUp = () => setMouseDrag(false);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const micStart = useCallback(() => {
    switch (speechState) {
      case SpeechState.Idle:
      case SpeechState.Recording:
      case SpeechState.Loading:
        return;
    }

    toggleRecording();

    setSpringProps({
      effectOpacity: 1,
      transform: "scale(1.35)",
      config: { tension: 500 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechState]);

  const micStop = useCallback(() => {
    switch (speechState) {
      case SpeechState.Idle:
      case SpeechState.Connecting:
      case SpeechState.Ready:
        return;
    }

    toggleRecording();

    setSpringProps({
      effectOpacity: 0,
      transform: "scale(1.0)",
      config: { tension: 170 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechState]);

  const onTangentButtonDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMouseDrag(true);
    micStart();
    vibrate();
  };

  const onTangentButtonUp = (event) => {
    micStop();
    vibrate();
  };

  const onStartClick = (event) => {
    initialise();
  };

  useEffect(() => {
    if (!mouseDrag) micStop();
  }, [mouseDrag]);

  const keyDown = (event, state) => {
    if (props.captureKey) {
      if (event.key === props.captureKey) {
        if (!event.repeat) {
          showStartButton(state) ? initialise() : micStart();
        }
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  const showStartButton = (state) => {
    switch (state) {
      case SpeechState.Idle:
      case SpeechState.Connecting:
      case SpeechState.Failed:
      case SpeechState.NoAudioConsent:
      case SpeechState.NoBrowserSupport:
        return true;
    }
    return false;
  };

  useKeyboardEvent(
    (event) => keyDown(event, speechState),
    (event) => event.key === props.captureKey && micStop(),
    [speechState, props.captureKey] // useState dependencies used in the callback, or in the functions used by the callback
  );

  return (
    <div className="MicContainer">
      {showStartButton(speechState) && (
        <div className={`MicWidget ${speechState}`}>
          <MicButton onClick={onStartClick}>
            <PowerIcon />
          </MicButton>
        </div>
      )}

      {!showStartButton(speechState) && (
        <animated.div
          className={`MicWidget ${speechState}`}
          style={springProps}
        >
          <animated.div style={{ opacity: springProps.effectOpacity }}>
            <MicFx />
          </animated.div>
          <MicButton
            onMouseDown={onTangentButtonDown}
            onMouseUp={onTangentButtonUp}
          >
            <MicIcon />
          </MicButton>
        </animated.div>
      )}
    </div>
  );
};

const MicFx = () => {
  return (
    <svg
      className="MicFx MicColorSpin"
      viewBox="0 0 246 246"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="50%" y1="10%" x2="50%" y2="100%" id="a">
          <stop className="GradientStop1" offset="0%" />
          <stop className="GradientStop2" offset="100%" />
        </linearGradient>
        <filter
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          filterUnits="objectBoundingBox"
          id="b"
        >
          <feGaussianBlur stdDeviation="18" in="SourceGraphic" />
        </filter>
      </defs>
      <circle
        filter="url(#b)"
        cx="124"
        cy="124"
        r="79"
        fill="url(#a)"
        fillRule="evenodd"
      />
    </svg>
  );
};
const MicButton = (props) => {
  return (
    <div
      className="MicButton"
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onTouchStart={props.onMouseDown}
      onTouchEnd={props.onMouseUp}
      onDragStart={props.onMouseDown}
      onDragEnd={props.onMouseUp}
    >
      <svg
        className="MicColorSpin"
        viewBox="0 0 92 92"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
            <stop className="GradientStop1" offset="0%" />
            <stop className="GradientStop2" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="nonzero">
          <path
            d="M46 3.119c23.683 0 42.881 19.198 42.881 42.881S69.683 88.881 46 88.881 3.119 69.683 3.119 46 22.317 3.119 46 3.119z"
            fill="#FFF"
          />
          <path
            d="M46 0C20.595 0 0 20.595 0 46s20.595 46 46 46 46-20.595 46-46S71.405 0 46 0zm0 3.119c23.683 0 42.881 19.198 42.881 42.881S69.683 88.881 46 88.881 3.119 69.683 3.119 46 22.317 3.119 46 3.119z"
            fill="url(#a)"
          />
        </g>
      </svg>
      {props.children}
    </div>
  );
};

const MicIcon = () => {
  return (
    <svg
      className="MicIcon"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#000" fillRule="evenodd">
        <path d="M42 26h4v4c0 9.265-7 16.895-16 17.89V55h-4v-7.11c-8.892-.982-15.833-8.444-15.997-17.56L10 30v-4h4v4c0 7.732 6.268 14 14 14 7.628 0 13.83-6.1 13.997-13.687L42 30v-4z" />
        <rect x="20" y="1" width="16" height="37" rx="8" />
      </g>
    </svg>
  );
};

const PowerIcon = () => {
  return (
    <svg
      className="MicIcon"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#000" fillRule="evenodd">
        <path
          d="M52 28c0 13.255-10.745 24-24 24S4 41.255 4 28c0-8.921 4.867-16.705 12.091-20.842l1.984 3.474C12.055 14.08 8 20.566 8 28c0 11.046 8.954 20 20 20s20-8.954 20-20c0-7.434-4.056-13.92-10.075-17.368L39.91 7.16C47.133 11.296 52 19.079 52 28z"
          fillRule="nonzero"
        />
        <rect x="24" y="1" width="8" height="23" rx="4" />
      </g>
    </svg>
  );
};

export default Mic;
