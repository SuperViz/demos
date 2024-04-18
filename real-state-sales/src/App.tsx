import { SuperVizRoomProvider } from '@superviz/react-sdk'
import Room from 'src/components/Room';

const developerKey = import.meta.env.VITE_DEVELOPER_KEY;
const userId = Math.floor(Math.random() * 1000).toString()

export default function App() {
	return (
		<SuperVizRoomProvider
			developerKey={developerKey}
			group={{
				id: 'demos-real-estate-group',
				name: 'Demos: Real Estate',
			}}
			participant={{
				id: userId,
				name: userId + ' Participant',
			}}
			environment='dev'
			roomId='real-estate-demo'
		>
			<Room />
		</SuperVizRoomProvider>
	)
}