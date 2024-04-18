import React from 'react'
import { useSearchParams } from 'react-router-dom'

export const Badge: React.FC = () => {
	const [searchParams] = useSearchParams()

	const participantType = searchParams.get('participant-type') || ''

	return (
		<div className='badge'>
			<span className='badge-content'>{!participantType ? 'You are the agent' : `Client's view (Richard)`}</span>
		</div>
	)
}
