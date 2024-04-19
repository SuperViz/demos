const menuItems = [
	'./assets/icons/send-on_sm.svg',
	'./assets/icons/plus_sm.svg',
	'./assets/icons/group_5625.svg',
	'./assets/icons/group_5624.svg',
	'./assets/icons/group_5623.svg',
	'./assets/icons/group_5626.svg',
	'./assets/icons/drawing_md.svg',
	'./assets/icons/group_5627.svg',
	'./assets/icons/group_5628.svg',
]

export default function FloatMenu() {
	return (
		<div className="floating-menu">
			{menuItems.map((item, index) => (
				<button key={index} className="menu-item">
					<img src={item} />
				</button>
			))}
		</div>
	)
}

export { FloatMenu }
