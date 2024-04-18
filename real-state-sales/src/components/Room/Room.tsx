/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MatterportIframe, VideoConference, useVideo } from '@superviz/react-sdk'
import { VideoConferenceStyles } from 'src/constants'
import { Badge, MockVideoFrame } from 'src/components'

const matterportKey = import.meta.env.VITE_MATTERPORT_KEY

export const Room: React.FC = () => {
	const [searchParams] = useSearchParams()
	const participantType = searchParams.get('participant-type') || ''

	const [opacity, setOpacity] = useState(0)
	const [roomElementsVisible, setRoomElementsVisible] = useState(false)
	const [richardColor, setRichardColor] = useState<string>('transparent')

	// mute mic on host when entering ::
	const { toggleMicrophone } = useVideo()

	const toggle = useCallback(() => {
		if (!participantType) {
			setTimeout(() => {
				toggleMicrophone()
			}, 1000)
		}
	}, [toggleMicrophone])
	//-----------

	// Set initial position ::
	const [mpSdk, setMpSdk] = useState<any>(null)

	useEffect(() => {
		if (mpSdk) {
			setTimeout(() => {
				const rotation = { x: 10, y: participantType ? 0 : 180 }
				mpSdk.Sweep.moveTo('3ae0c820346e486ab08deef545650d87', { transition: mpSdk.Sweep.Transition.INSTANT, rotation })
			}, 3000)
		}
	}, [mpSdk])
	//-----------

	// send message to parent when joined video conference ::
	const [joined, setJoined] = useState(false)

	useEffect(() => {
		if (joined) {
			window.parent.postMessage(participantType ? 'participant-two-joined' : 'participant-one-joined', '*')
			setRoomElementsVisible(true)
		}
	}, [joined, participantType])
	//-----------

	// send message to parent when matterport iframe is loaded ::
	const [loadedIframe, setLoadedIframe] = useState(false)

	useEffect(() => {
		if (loadedIframe) {
			window.parent.postMessage(participantType ? 'iframe-two-loaded' : 'iframe-one-loaded', '*')
		}
	}, [loadedIframe])
	//-----------

	// listen for messages from parent ::
	const [readyToEnter, setReadyToEnter] = useState(participantType ? false : true)

	const receiveMessage = (event: MessageEvent) => {
		if (event.data === 'participant-one-joined-from-parent') setReadyToEnter(true)
	}

	window.addEventListener('message', receiveMessage)
	//-----------

	return (
		<>
			{roomElementsVisible && (
				<>
					<MockVideoFrame color={richardColor} />
					<Badge />
				</>
			)}
			<MatterportIframe
				style={{ opacity }}
				width={window.innerWidth}
				height={window.innerHeight}
				bundleUrl={`/vendor/matterport/showcase.html?&play=1&tour=0&search=0&qs=1&vr=0&hr=0&f=0&brand=0&gt=0&applicationKey=${matterportKey}&m=MCSDez4M2Xd`}
				matterportKey={matterportKey}
				onMpSdkLoaded={({ matterportSdkInstance }) => {
					matterportSdkInstance.Sweep.current.subscribe(function (currentSweep) {
						if (currentSweep.sid === '') return

						setMpSdk(matterportSdkInstance)
					})
				}}
			/>

			{readyToEnter && (
				<VideoConference
					enableFollow
					enableGather
					onParticipantListChange={(e) => {
						Object.values(e).map((participant) => {
							if (participant.type === 'audience') setRichardColor(participant.color as string)
						})
					}}
					onConnectionStatusChange={() => setOpacity(1)}
					skipMeetingSettings={participantType ? true : false}
					participantType={participantType ? 'audience' : 'host'}
					onMeetingStateChange={(state) => {
						if (state === 3) setJoined(true)
						if (state === 1) setLoadedIframe(true)
					}}
					onLocalParticipantJoin={toggle}
					onLocalParticipantLeave={() => {
						window.parent.postMessage('participant-left', '*')
					}}
					offset={{ top: -10, bottom: 0, left: 0, right: 0 }}
					styles={VideoConferenceStyles}
				/>
			)}
		</>
	)
}

// I HAVE THE COLOR ::
