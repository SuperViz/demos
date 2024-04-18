import { SuperVizRoomProvider } from '@superviz/react-sdk'
import Room from 'src/components/Room';

const developerKey = import.meta.env.VITE_DEVELOPER_KEY;
const userId = Math.floor(Math.random() * 1000).toString()

export default function App() {
	return (
		<SuperVizRoomProvider
			developerKey={developerKey}
			group={{
				id: 'demos-issues-autodesk-group',
				name: 'Demos: Issues Autodesk',
			}}
			participant={{
				id: userId,
				name: userId + ' Participant',
			}}
			environment='dev'
			roomId='issues-autodesk-demo'
		>
			<Room />
		</SuperVizRoomProvider>
	)
}