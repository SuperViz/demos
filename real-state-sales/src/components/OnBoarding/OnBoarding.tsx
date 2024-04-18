import React, { useState } from 'react'
import { DemoTour } from 'shared/components'
import { onBoardingSteps } from 'src/constants'

type OnBoardingProps = {
	skipTour?: boolean
}

export const OnBoarding: React.FC<OnBoardingProps> = ({ skipTour }) => {
	const [tourOpen, setTourOpen] = useState(!skipTour)
	const [position, setPosition] = useState<'bottom' | 'top'>('bottom')

	const onStepChange = (step: number) => {
		if (step === 1) {
			setPosition('top')
		}
	}

	return (
		<DemoTour
			handleStepChange={onStepChange}
			extraOverlay={{
				opacity: 15,
				position: position === 'top' ? 'bottom' : 'top',
			}}
			maskClassName={`dark dark-${position} tour-mask`}
			isOpen={tourOpen}
			onRequestClose={() => setTourOpen(false)}
			steps={onBoardingSteps}
			isAbsolute
			arrowAlignments={['right-start', 'right-start', 'right-end', 'right-start']}
			hiddenArrowSteps={[0, 2]}
		/>
	)
}
