import * as React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { render } from "react-dom";
import useRecorder from "./useRecorder";

import "./styles.css";

function App() {
  let [audioURL, isRecording, startRecording, stopRecording, variable] = useRecorder();

 
  const sendAudioDataToServer = async ()  => {
    const formData  = new FormData();
    formData.append("file",audioURL);
    formData.append("fileName","myfile");
    try {

      const res = await axios.post(
          'http://localhost:5000/processData',
            variable
      );

      console.log(res);

  } catch(e) {

      console.log(e);

  }
  }
  return (
    <div className="App">
      <h1>Welcome to our APP</h1>
      <h3>This app is designed to classify persons into being COVID-19 positive or negative</h3>
      
      <audio className="mt-4" src={audioURL} controls />
     <div style={{marginBottom:"20px"}}>

     </div>
      <button className="btn btn-success m-4" onClick={startRecording} disabled={isRecording}>
        start recording
      </button>
      <button className="btn  btn-danger" onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </button>
      <div>

      </div>
      <button className="btn btn-primary " onClick={sendAudioDataToServer} >
        Submit
      </button>
    
      <p>
       
      </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
