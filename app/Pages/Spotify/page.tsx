import React from 'react';

const Spotify = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        style={{ borderRadius: '0px', width: '100%', height: '100%' }}
        src="https://open.spotify.com/embed/playlist/6xAnOf4qPwE4W7iGbanqju?utm_source=generator&theme=0"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Spotify;
