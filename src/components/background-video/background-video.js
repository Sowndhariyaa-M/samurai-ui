import React from 'react';
import Background from '../../assets/background.mp4';
require('./background-video.css')

const BackgroundVideo = () => {
    return (
        <React.Fragment>
            <div className='video-bg'>
                <video src={Background} autoPlay loop muted />
            </div>
        </React.Fragment>
    )
}

export default BackgroundVideo