import React from 'react';

const Video = React.forwardRef(({ src, loop }, ref) => (
  <video controls loop={loop} ref={ref}>
    <source type="video/mp4" src={src} />
  </video>
));

export default Video;
