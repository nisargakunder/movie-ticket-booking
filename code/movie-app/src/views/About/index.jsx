import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AboutView = () => {
	return (
		<div style={{ marginTop: 32 }}>
			<h3>About View</h3>
			<hr style={{ margin: '12px 0px' }} />
			<NavLink to={'/login'}>Login</NavLink>
		</div>
	)
}

export default AboutView
