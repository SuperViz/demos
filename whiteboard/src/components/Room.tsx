import { Comments, MousePointers, WhoIsOnline, useCanvasPin } from '@superviz/react-sdk'
import { useCallback, useRef } from 'react'

import Canvas from './Canvas'
import { FloatMenu } from './FloatingMenu'

export default function Room() {
	const cameraOffset = useRef({ x: 0, y: 0 })

	const changeCamera = useCallback((coordinates: { x: number; y: number }) => {
		cameraOffset.current.x = coordinates.x
		cameraOffset.current.y = coordinates.y
	}, [])

	const { pin } = useCanvasPin({
		canvasId: 'canvas-whiteboard',
		onGoToPin: changeCamera,
	})

	return (
		<>
			<WhoIsOnline position="header" />
			<MousePointers elementId="canvas-whiteboard"/>
			<Comments pin={pin as any} buttonLocation='header' position='right' offset={{ top: 64 }} />

			<div className='whiteboard-demo'>
				<div id='header' />
				<FloatMenu />
				<Canvas cameraOffset={cameraOffset}/>
			</div>
		</>
	)
}
