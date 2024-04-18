import React, { useEffect, useRef, useState } from 'react'
import { SuperVizRoomProvider } from '@superviz/react-sdk'
import { useSearchParams } from 'react-router-dom'
import { OnBoarding, Room } from 'src/components'

export const DemoPage: React.FC = () => {
	const key = import.meta.env.VITE_DEVELOPER_KEY

	const [searchParams] = useSearchParams()
	const roomId = searchParams.get('roomId') || ''
	const userName = searchParams.get('userName') || ''
	const skipTour = searchParams.get('complete') === 'true'
	const [modalIsOpen, setModalIsOpen] = useState(true)
	const [videoConferenceisOpen, setVideoConferenceIsOpen] = useState(false)
	const [isSingleView, setSingleView] = useState(true)
	const uuid = useRef<string>(getRoomId('real-estate'))

	// frame loaded ::
	const [loading, setLoading] = useState(false)
	const [iFrameOneLoaded, setIframeOneLoaded] = useState(false)
	const [iFrameTwoLoaded, setIframeTwoLoaded] = useState(false)

	// check for both iframes loaded ::
	useEffect(() => {
		if (iFrameOneLoaded) setLoading(false)
	}, [iFrameOneLoaded, iFrameTwoLoaded])
	//-----------

	// participant joined ::
	const [participantOneJoined, setParticipantOneJoined] = useState(false)
	const audienceIframe = useRef<HTMLIFrameElement>(null)

	// check for participant one joined to load up video for participant 2 ::
	useEffect(() => {
		if (participantOneJoined) {
			audienceIframe.current?.contentWindow?.postMessage('participant-one-joined-from-parent', '*')
			setSingleView(false)
		}
	}, [participantOneJoined])
	//-----------

	// Receive incoming messages from children ::
	const receiveMessage = (event: MessageEvent) => {
		switch (event.data) {
			case 'participant-one-joined':
				setParticipantOneJoined(true)
				break
			case 'iframe-one-loaded':
				setIframeOneLoaded(true)
				break
			case 'iframe-two-loaded':
				setIframeTwoLoaded(true)
				break
			case 'participant-left':
				window.location.reload()
				break
			default:
				return
		}
	}

	window.addEventListener('message', receiveMessage)
	//-----------

	const handleOkModal = () => {
		setModalIsOpen(false)
		setVideoConferenceIsOpen(true)
		setLoading(true)
	}

	if (roomId && userName) {
		return (
			<SuperVizRoomProvider
				developerKey={key}
				group={{
					id: 'demos-whiteboard-group',
					name: 'Demos: Whiteboard',
				}}
				participant={{
					id: userName,
					name: userName,
				}}
				environment='dev'
				roomId={roomId}>
				<Room />
			</SuperVizRoomProvider>
		)
	}

	return (
		<div className={isSingleView ? 'demo-container onboarding' : 'demo-container'}>
			{videoConferenceisOpen && (
				<>
					<iframe className='demo-iframe' src={`/real-estate/?userName=Mary&roomId=${uuid.current}`} />

					<iframe
						style={{
							display: isSingleView ? 'none' : 'block',
						}}
						ref={audienceIframe}
						className='demo-iframe'
						src={`/real-estate/?userName=Richard&roomId=${uuid.current}&participant-type=true`}
					/>
				</>
			)}
		</div>
	)
}
