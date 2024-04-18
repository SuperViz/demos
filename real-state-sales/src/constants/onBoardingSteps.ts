import { ReactourStep } from 'reactour'

export const onBoardingSteps: ReactourStep[] = [
	{
		content: `
      <h3>Agent’s viewpoint</h3>
      At the top of the screen, you can see the real estate agent's perspective and view the client's avatar while exploring the Matterport tour.
    `,
		style: {
			top: 'calc(25% - 111px)',
			left: 'calc(50% - 133px)',
		},
	},
	{
		content: `
			<h3>Follow me/Gather All</h3>
			Click the follow icon on your camera to have Richard follow you or come to your location.
		`,
		style: {
			left: 'calc(100vw - 300px)',
			top: '98px',
		},
	},
	{
		content: `
			<h3>Client viewpoint</h3>
			At the bottom of the screen, you can see Richard's perspective as he views your avatar.
		`,
		style: {
			left: 'calc(50% - 133px)',
			top: 'calc(75vh - 75px)',
		},
	},
]
