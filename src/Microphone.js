import React from "react";
import MicOffIcon from '@material-ui/icons/MicOff';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import {
  Word as SpeechWord,
  SpeechSegment,
  SpeechState,
} from "@speechly/react-client";

type Props = {
  segment?: SpeechSegment;
  state: SpeechState;
  onRecord: () => Promise<void>;
};

export const Microphone = React.memo(
  ({ state, segment, onRecord }: Props): JSX.Element => {
    let enabled = false;
    let text = "Error";

    switch (state) {
      case SpeechState.Idle:
      case SpeechState.Ready:
        enabled = true;
        text = <MicOffIcon style={{fontSize: '40px', textDecoration: 'none'}}/>;
        break;
      case SpeechState.Recording:
        enabled = true;
        text = <SettingsVoiceIcon style={{fontSize: '40px', textDecoration: 'none'}}/>;
        break;
      case SpeechState.Connecting:
      case SpeechState.Loading:
        enabled = false;
        text = "Loading...";
        break;
      default:
        break;
    }

    return (
      <div>
        <br/>
        <br/>
        <button onClick={onRecord} disabled={!enabled} style={{padding: '10px', borderRadius: '100px', textDecoration: 'none', outline: 'none'}}>
          {text}
        </button>
        <br/>
        <br/>
        <Transcript segment={segment} />
      </div>
    );
  }
);

const Transcript = React.memo(
  ({ segment }: { segment?: SpeechSegment }): JSX.Element => {
    if (segment === undefined) {
      return (
        <div>
          <em>Waiting for speech input...</em>
        </div>
      );
    }

    return (
      <div>
        {segment.words.map((w) => (
          <Word word={w} key={w.index} />
        ))}
      </div>
    );
  }
);

const Word = React.memo(
  ({ word }: { word: SpeechWord }): JSX.Element => {
    if (word.isFinal) {
      return <strong>{`${word.value} `}</strong>;
    }

    return <span>{`${word.value} `}</span>;
  }
);