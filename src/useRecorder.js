import { useEffect, useState } from "react";
import axios from 'axios';
const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);


  let variable;

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = e => {

      let a = URL.createObjectURL(e.data);
      setAudioURL(a)

      console.log(a)
      let arr = a.split("/")
      const fname = arr[3]
      console.log(arr[3])

      const link = document.createElement('a');
      link.href = a;
      link.setAttribute(
        'download',
        fname+".weba",
    )
     link.click();

     // post id
     axios.post('http://localhost:5000/processData', {
         data: fname,
       })
       .then(function (response) {
         console.log(response);
       })
        .catch(function (error) {
          console.log(error);
        });
        
    //  // read
    //  var reader = new FileReader();
    //  reader.onload = function(z) {
    //   // binary data
    //   axios.post('http://localhost:5000/processData', {
    //     data: JSON.stringify(z.target.result),
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // };
    // reader.onerror = function(z) {
    //   // error occurred
    //   console.log('Error : ' + z.type);
    // };

    // reader.readAsBinaryString(e.data);

      
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };


  return [audioURL, isRecording, startRecording, stopRecording, variable];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
