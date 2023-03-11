import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";

function CustomPlayer(props) {
  return (
    <AudioPlayer
      src={props.src}
      autoPlay={false}
      autoPlayAfterSrcChange={false}
      onPlay={(e) => console.log("onPlay")}
      showFilledVolume={true}
      showJumpControls={false}
      layout='horizontal'
      customProgressBarSection={[
        RHAP_UI.MAIN_CONTROLS,
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.DURATION,
      ]}
      //remove this to remove volume controls
      customControlsSection={[RHAP_UI.VOLUME_CONTROLS]}
    />
  );
}

export default CustomPlayer;
