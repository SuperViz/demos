import ReactFlow, { useNodesState, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes = [
	{ id: '1', position: { x: 381, y: 265 }, data: { label: 'Start' } },
	{ id: '2', position: { x: 556, y: 335 }, data: { label: 'Action' } },
	{ id: '3', position: { x: 701, y: 220 }, data: { label: 'Process' } },
	{ id: '4', position: { x: 823, y: 333 }, data: { label: 'End' } },
]

export function ReactFlowComponent() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

	return (
		<div id='reactflow'>
			<ReactFlow nodes={nodes} onNodesChange={onNodesChange}>
				<Controls showFitView={false} />
				<Background />
			</ReactFlow>
		</div>
	)
}
