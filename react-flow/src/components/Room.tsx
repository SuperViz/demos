import { MousePointers, WhoIsOnline, useHTMLPin, Comments, useComments, useMouse } from '@superviz/react-sdk'
import { ReactFlowComponent } from './ReactFlow/ReactFlow'
import { useViewport } from 'reactflow'
import { useEffect } from 'react'

export default function Room() {
	const { x, y, zoom } = useViewport()
	const { openThreads } = useComments()

	const { pin } = useHTMLPin({
		containerId: 'reactflow',
		dataAttributeName: 'data-id',
		dataAttributeValueFilters: [/.*null-(target|source)$/],
	})

	const handleOpenThreads = () => {
		openThreads()
	}

	const onMountComments = () => {
		openThreads()
	}

	const { transform } = useMouse();

	useEffect(() => {
		if (transform) {
			transform({ translate: { x, y }, scale: zoom })
		}
	}, [x, y, zoom, transform])

	return (
		<>
			<div id='comments'></div>
			<WhoIsOnline />
			<Comments pin={pin} onPinActive={handleOpenThreads} onMount={onMountComments} position='left' />
			<MousePointers elementId='reactflow' transform={{ translate: { x, y }, scale: zoom }} />
			<ReactFlowComponent />
		</>
	)
}
