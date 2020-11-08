import React from "react";
import { SpeechProvider } from "@speechly/react-client";
import './App.css';
import { SpeechForm } from "./SpeechForm";

function App(): JSX.Element {
  return (
    <div className="App">
      <SpeechProvider appId="a3d40343-ab1e-49ef-ba2d-d3b0e9fae78c" language="en-US">
        <SpeechForm />
      </SpeechProvider>
    </div>
  );
}

export default App;