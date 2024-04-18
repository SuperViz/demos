import React from 'react'

type MockVideoFrameProps = {
	color: string
}

export const MockVideoFrame: React.FC<MockVideoFrameProps> = ({ color }) => {
	return (
		<div className='mock-video-frame'>
			<video disableRemotePlayback src='./video/video-conference-man.mp4' autoPlay loop />
			<div className='footer-video'>
				<div>
					<span className='video-badge' style={{ backgroundColor: color }}></span>
					<span className='participant-video-name'>Richard</span>
				</div>
				<div className='mic'>
					<img src='./img/mic.svg' />
				</div>
			</div>
		</div>
	)
}
