import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MatterportIframe, VideoConference } from '@superviz/react-sdk'
import { VideoConferenceStyles } from 'src/assets/constants/VideoConferenceStyles'

const matterportKey = import.meta.env.VITE_MATTERPORT_KEY

export default function Room() {
	const [searchParams] = useSearchParams()
	const participantType = searchParams.get('participant-type') || ''

	const [opacity, setOpacity] = useState(0)

	// send message to parent when matterport iframe is loaded ::
	const [loadedIframe, setLoadedIframe] = useState(false)

	useEffect(() => {
		if (loadedIframe) {
			window.parent.postMessage(participantType ? 'iframe-two-loaded' : 'iframe-one-loaded', '*')
		}
	}, [loadedIframe])

	return (
		<>
			<MatterportIframe
				style={{ opacity }}
				width={window.innerWidth}
				height={window.innerHeight}
				bundleUrl={`/vendor/matterport/showcase.html?&play=1&tour=0&search=0&qs=1&vr=0&hr=0&f=0&brand=0&gt=0&applicationKey=${matterportKey}&m=MCSDez4M2Xd`}
				matterportKey={matterportKey}
			/>

			<VideoConference
				enableFollow
				enableGather
				onConnectionStatusChange={() => setOpacity(1)}
				skipMeetingSettings={participantType ? true : false}
				participantType={participantType ? 'audience' : 'host'}
				onMeetingStateChange={(state) => {
					if (state === 1) setLoadedIframe(true)
				}}
				offset={{ top: -10, bottom: 0, left: 0, right: 0 }}
				styles={VideoConferenceStyles}
			/>
		</>
	)
}