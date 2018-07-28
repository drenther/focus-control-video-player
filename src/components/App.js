import React, { Component } from 'react';

import Video from './Video';

import { apiValues } from '../pageVisibilityUtils';

const { hidden, visibilityChange } = apiValues();

class App extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.isVisible = true;
  }

  componentDidMount() {
    this.videoRef.current.play();

    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);

    document.addEventListener('focus', this.forceVisibilityTrue, false);

    document.addEventListener('blur', this.forceVisibilityFalse, false);

    window.addEventListener('focus', this.forceVisibilityTrue, false);

    window.addEventListener('blur', this.forceVisibilityFalse, false);
  }

  handleVisibilityChange = forcedFlag => {
    if (typeof forcedFlag === 'boolean') {
      if (forcedFlag) {
        return this.onVisible();
      }

      return this.onHidden();
    }

    if (document[hidden]) {
      return this.onHidden();
    }

    return this.onVisible();
  };

  playVideo = () => {
    this.videoRef.current.play();
  };

  pauseVideo = () => {
    this.videoRef.current.pause();
  };

  onVisible = () => {
    if (this.isVisible) return;
    this.isVisible = true;
    this.playVideo();
  };

  onHidden = () => {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.pauseVideo();
  };

  forceVisibilityTrue = () => {
    this.handleVisibilityChange(true);
  };

  forceVisibilityFalse = () => {
    this.handleVisibilityChange(false);
  };

  componentWillUnmount() {
    document.removeEventListener(visibilityChange, this.handleVisibilityChange, false);

    document.removeEventListener('focus', this.forceVisibilityTrue, false);

    document.removeEventListener('blur', this.forceVisibilityFalse, false);

    window.removeEventListener('focus', this.forceVisibilityTrue, false);

    window.removeEventListener('blur', this.forceVisibilityFalse, false);
  }

  render() {
    return <Video ref={this.videoRef} src="https://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_10mb.mp4" loop={true} />;
  }
}

export default App;
