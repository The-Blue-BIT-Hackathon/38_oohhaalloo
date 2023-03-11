import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className='container valign-wrapper'>
        <div className='row'>
          <div className='landing-copy col s12 center-align'>
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className='flow-text grey-text text-darken-1'>
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'
            >
              Logout
            </button>
            <AudioPlayer
              src='https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3'
              onPlay={(e) => console.log("onPlay")}
              showFilledVolume={true}
              showJumpControls={false}
              layout='horizontal'
              customProgressBarSection={[
                RHAP_UI.MAIN_CONTROLS,
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.MAIN_CONTROLS,
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.DURATION,
              ]}
              //remove this to remove volume controls
              customControlsSection={[RHAP_UI.VOLUME_CONTROLS]}
            />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
