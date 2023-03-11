import React from "react";
import MicRecorder from "mic-recorder-to-mp3";
import CustomPlayer from "./customPlayer";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
    };
  }

  click = () => {
    if (this.state.isRecording) {
      Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob);
          this.setState({ blobURL, isRecording: false });
        })
        .catch((e) => console.log(e));
    } else {
      if (this.state.isBlocked) {
        alert("Permission Denied");
      } else {
        Mp3Recorder.start()
          .then(() => {
            this.setState({ isRecording: true });
          })
          .catch((e) => console.error(e));
      }
    }
  };

  checkPermission = () => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        this.setState({ isBlocked: false });
      },
      () => {
        this.setState({ isBlocked: true });
      }
    );
  };

  componentDidMount() {
    this.checkPermission();
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <button onClick={this.click}>
            {this.state.isRecording ? "stop" : "record"}
          </button>
          <CustomPlayer src={this.state.blobURL} />
        </header>
      </div>
    );
  }
}

export default Recorder;
