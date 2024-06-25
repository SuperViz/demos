import { useRealtime } from '@superviz/react-sdk'
import { useCallback, useEffect, useRef } from 'react'
import ReactFlow, { useNodesState, Controls, Background, OnConnect, ConnectionLineType, addEdge, useEdgesState, ConnectionMode } from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes = [
	{ id: '1', position: { x: 381, y: 265 }, data: { label: 'Start' } },
	{ id: '2', position: { x: 556, y: 335 }, data: { label: 'Action' } },
	{ id: '3', position: { x: 701, y: 220 }, data: { label: 'Process' } },
	{ id: '4', position: { x: 823, y: 333 }, data: { label: 'End' } },
]

const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2', type: ConnectionLineType.SmoothStep, animated: true },
	{ id: 'e2-3', source: '2', target: '3', type: ConnectionLineType.SmoothStep, animated: true },
	{ id: 'e3-4', source: '3', target: '4', type: ConnectionLineType.SmoothStep, animated: true },
]

export function ReactFlowComponent({ participantId }: { participantId: string }) {
	const { isReady, subscribe, unsubscribe, publish } = useRealtime('default')
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

	const subscribed = useRef(false)

	const onConnect: OnConnect = useCallback(
		(params) => {
			const edge = {
				...params,
				type: ConnectionLineType.SmoothStep,
				animated: true,
			};

			setEdges((eds) => addEdge(edge, eds));

			publish('new-edge', {
				edge,
			});
		},
		[setEdges, publish]
	);

	const onNodeDrag = useCallback(
		(_: any, node: any) => {
			publish('node-drag', { node });
		},
		[publish]
	);

	useEffect(() => {
		if (!isReady || subscribed.current) return

		const centerNodes = () => {
			const centerButton = document.querySelector('.react-flow__controls-fitview') as HTMLButtonElement
			centerButton?.click()
		}

		centerNodes()

		subscribe(
			'new-edge',
			({ data, participantId: senderId }: any) => {
				if (senderId === participantId) return;

				setEdges((eds) => addEdge(data.edge, eds));
			}
		);

		subscribe('node-drag', ({ data, participantId: senderId }: any) => {
			if (senderId === participantId) return;

			setNodes((nds: { id: string }[]) =>
				nds.map((node: { id: string }) => (node.id === data.node.id ? data.node : node))
			);
		});

		subscribed.current = true;
	}, [isReady, setEdges, setNodes, unsubscribe, subscribe, participantId])

	const onDragOver = useCallback(
		(event: React.DragEvent<HTMLButtonElement | HTMLDivElement | any>) => {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';
		},
		[]
	);

	useEffect(() => {
		const element = document.querySelector('.react-flow__pane')

		if (!element) return

		element.setAttribute('data-superviz-id', 'plane')
	}, [])

	return (
		<div id='reactflow'>
			<ReactFlow nodes={nodes}
				onNodeDrag={onNodeDrag}
				edges={edges}
				onConnect={onConnect}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onDragOver={onDragOver}
				connectionMode={ConnectionMode.Loose}>
				<Controls showFitView={false} />
				<Background />
			</ReactFlow>
		</div>
	)
}
