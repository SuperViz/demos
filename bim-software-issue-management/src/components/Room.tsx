/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { AutodeskViewer, WhoIsOnline, Comments, useAutodeskPin } from '@superviz/react-sdk'

const forgeClientId = import.meta.env.VITE_FORGE_CLIENT
const forgeClientSecret = import.meta.env.VITE_FORGE_SECRET

export default function Room() {
	const [viewerInstance, setViewerInstance] = useState<any>(null)
	const [viewerLoaded, setViewerLoaded] = useState<boolean>(false)

	const { pin } = useAutodeskPin({
		autodeskInstance: viewerInstance,
	})


	useEffect(() => {
		if (viewerInstance && viewerLoaded) {
			viewerInstance.loadExtension('Autodesk.ViewCubeUi').then((viewCubeUi: any) => {
				new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
					viewCubeUi.setViewCube('front')
				})
			})
		}
	}, [viewerLoaded, viewerInstance])

	return (
		<>
			<WhoIsOnline position='header' />
			<Comments pin={pin} buttonLocation='header' position='left' offset={{ top: 64 }} />

			<section>
				<div id='header' />
				<div className='canvas-container'>
					<AutodeskViewer
						onViewerInitialized={({ viewer }) => {
							setViewerInstance(viewer)
							viewer.setTheme('dark-theme')
							viewer.setQualityLevel(false, false)
							viewer.setGhosting(false)
							viewer.setGroundShadow(false)
							viewer.setGroundReflection(false)
							viewer.setOptimizeNavigation(true)
							viewer.setProgressiveRendering(true)
							viewer.setLightPreset(2)
						}}
						onDocumentLoadSuccess={(doc: any) => {
							const viewable = doc.getRoot().getDefaultGeometry()
							if (viewable) {
								setViewerLoaded(true)
							}
						}}
						isAvatarsEnabled={false}
						isLaserEnabled={false}
						className='canvas'
						modelUrn='urn:adsk.objects:os.object:031adb62-49cc-481a-8fde-b878e43fd956/1683202300280-031adb62-49cc-481a-8fde-b878e43fd956.ifc'
						clientId={forgeClientId}
						clientSecret={forgeClientSecret}
					/>
				</div>
			</section>
		</>
	)
}
