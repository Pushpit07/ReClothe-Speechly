import React, { useEffect } from "react";
import { SpeechSegment, useSpeechContext } from "@speechly/react-client";
import { Microphone } from "./Microphone";
import DonateForm from './form';
import {
  IntentType,
  ClothType,
  parseTypeEntity,
  parseIntent,
  parseClothEntity,
} from "./parser";


export const SpeechForm: React.FC = (): JSX.Element => {
	const { toggleRecording, speechState, segment } = useSpeechContext();

	useEffect(() => {
	    if (segment === undefined) {
	      return;
	    }
	    parseSegment(segment);
  	}, [segment]);

	return (
	<div>
		<DonateForm segment={segment}/>
		<Microphone
        	segment={segment}
        	state={speechState}
        	onRecord={toggleRecording}
      	/>
	</div>
	);
};

function parseSegment(segment: SpeechSegment) {
  const intent = parseIntent(segment);

  switch (intent) {
    case IntentType.Filter:
      const languages = parseTypeEntity(segment);
      console.log(segment)
      console.log("Filtering by intent type", languages);
      break;
    case ClothType.Filter:
      const cloth = parseClothEntity(segment);
      console.log(segment)
      console.log("Filtering by cloth type: ", cloth);
      break;
    case IntentType.Reset:
    	console.log(segment)
      console.log("Resetting the filters");
      break;
    default:
    	// console.log(segment)
    	break;
  }
}