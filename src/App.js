import React from "react";
import ReactDOM from 'react-dom';
import { SpeechProvider } from "@speechly/react-client";
import './App.css';
import { SpeechForm } from "./SpeechForm";
import { Appreciation } from "./Appreciation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App(): JSX.Element {
  return (
    <div className="App">
    <Router>
    	<Switch>
          	<Route path="/" exact component={() => 
          		<SpeechProvider appId="a3d40343-ab1e-49ef-ba2d-d3b0e9fae78c" language="en-US">
					<SpeechForm />
				</SpeechProvider>} />
          	<Route path="/appreciation" exact component={() => <Appreciation />} />
        </Switch>     
        </Router>		
    </div>
  );
}

export default App;