import { SuperVizRoomProvider } from '@superviz/react-sdk'
import Room from './components/Room'

const developerKey = import.meta.env.VITE_DEVELOPER_KEY;
const userId = Math.floor(Math.random() * 1000).toString()

export default function App() {
	return (
		<SuperVizRoomProvider
			developerKey={developerKey}
			group={{
				id: 'demos-react-flow-group',
				name: 'Demos: React Flow',
			}}
			participant={{
				id: userId,
				name: userId + ' Participant',
			}}
			environment='dev'
			roomId='react-flow-demo'
		>
			<Room />
		</SuperVizRoomProvider>
	)
}