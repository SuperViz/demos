import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import { textElements } from 'src/assets/constants'

interface CanvasProps {
	cameraOffset: MutableRefObject<{ x: number; y: number }>
}

export default function Canvas({ cameraOffset }: CanvasProps) {
	const isDragging = useRef(false)
	const dragStart = useRef({ x: 0, y: 0 })
	const lastZoom = useRef(1)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const cameraZoom = useRef(1)
	

	const drawTextsOnCanvas = () => {
		const ctx = canvasRef.current!.getContext('2d')!

		textElements.forEach((t) => {
			ctx.font = `${t.fontWeight} ${t.fontSize}px ${t.fontFamily}`
			ctx.fillText(t.content, t.x, t.y)
		})
	}

	const drawGrid = (ctx: CanvasRenderingContext2D, step: number, color: string) => {
		ctx.save()
		ctx.strokeStyle = color
		ctx.lineWidth = cameraZoom.current / 2

		const lineOffset = {
			x: (cameraOffset.current.x % step) - step,
			y: (cameraOffset.current.y % step) - step,
		}

		for (let x = lineOffset.x; x < ctx.canvas.width; x += step) {
			ctx.beginPath()
			ctx.moveTo(x, 0)
			ctx.lineTo(x, ctx.canvas.height)
			ctx.stroke()
		}

		for (let y = lineOffset.y; y < ctx.canvas.height; y += step) {
			ctx.beginPath()
			ctx.moveTo(0, y)
			ctx.lineTo(ctx.canvas.width, y)
			ctx.stroke()
		}

		ctx.restore()
	}

	const draw = useCallback(async () => {
		if (!canvasRef.current) return
		
		const canvas = canvasRef.current!
		const ctx = canvas.getContext('2d')!

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		drawGrid(ctx, cameraZoom.current * 20, '#ddd')

		ctx.translate(window.innerWidth / 2, window.innerHeight / 2)
		ctx.scale(cameraZoom.current, cameraZoom.current)
		ctx.translate(-window.innerWidth / 2 + cameraOffset.current.x, -window.innerHeight / 2 + cameraOffset.current.y)

		drawTextsOnCanvas()

		ctx.save()
		requestAnimationFrame(draw)
	}, [cameraZoom, cameraOffset])

	const getEventLocation = (e: TouchEvent & MouseEvent) => {
		if (e.touches && e.touches.length == 1) {
			return { x: e.touches[0].clientX, y: e.touches[0].clientY }
		} else if (e.clientX && e.clientY) {
			return { x: e.clientX, y: e.clientY }
		}
		return { y: 0, x: 0 }
	}

	const onPointerDown = (e: any) => {
		isDragging.current = true
		dragStart.current.x = getEventLocation(e).x / cameraZoom.current - cameraOffset.current.x
		dragStart.current.y = getEventLocation(e).y / cameraZoom.current - cameraOffset.current.y
	}

	const onPointerUp = () => {
		isDragging.current = false
		lastZoom.current = cameraZoom.current
	}

	const onPointerMove = (e: any) => {
		if (isDragging.current) {
			cameraOffset.current.x = getEventLocation(e).x / cameraZoom.current - dragStart.current.x
			cameraOffset.current.y = getEventLocation(e).y / cameraZoom.current - dragStart.current.y
		}
	}

	const onMouseWheel = (e: WheelEvent) => {
		if (e.deltaY < 0) {
			cameraZoom.current = cameraZoom.current + 0.1
		} else {
			if (cameraZoom.current <= 0.6) return
			cameraZoom.current = cameraZoom.current - 0.1
		}
	}

	useEffect(() => {
		const canvas = canvasRef.current!

		canvas.addEventListener('mousedown', onPointerDown)
		canvas.addEventListener('mouseup', onPointerUp)
		canvas.addEventListener('mousemove', onPointerMove)
		canvas.addEventListener('wheel', onMouseWheel)

		return () => {
			canvas.removeEventListener('mousedown', onPointerDown)
			canvas.removeEventListener('mouseup', onPointerUp)
			canvas.removeEventListener('mousemove', onPointerMove)
			canvas.removeEventListener('wheel', onMouseWheel)
		}
	}, [])

	useEffect(() => {
		draw()
	}, [])

	return (
		<div className='canvas-whiteboard'>
			<canvas id='canvas-whiteboard' ref={canvasRef} width={innerWidth} height={innerHeight} />
		</div>
	)
}

