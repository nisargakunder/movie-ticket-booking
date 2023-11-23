import { useContext } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import AppContext from '../contexts/AppContext'

const AppLayout = () => {
	const { userInfo, setSelectedMovieInfo, setUserInfo } = useContext(AppContext)

	const navigate = useNavigate()

	const handleLogoutClick = (e) => {
		setSelectedMovieInfo(null)
		setUserInfo(null)
		navigate('/')
	}

	const handleLoginClick = (e) => {
		navigate('/auth')
	}

	return (
		<div>
			<Navbar className='app-nav-bar'>
				<Container>
					<Navbar.Brand href='/'>
						<span style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
							Popcorn <span style={{ color: 'red' }}>Films</span>
						</span>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						{userInfo && userInfo.name ? (
							<Navbar.Text style={{ marginRight: 24 }}>
								<span style={{ color: '#FFF' }}>Welcome {userInfo.name}</span>
								<span style={{ borderRight: '1px solid rgba(255, 255, 255, 0.7)', marginLeft: 24, color: '#FFF' }}></span>
							</Navbar.Text>
						) : null}

						<Navbar.Text style={{ marginRight: 24 }}>
							<span style={{ cursor: 'pointer', color: '#FFF' }}>About</span>
						</Navbar.Text>
						{userInfo && userInfo.name ? (
							<Navbar.Text onClick={handleLogoutClick}>
								<span style={{ cursor: 'pointer', color: '#FFF' }}>Logout</span>
							</Navbar.Text>
						) : (
							<Navbar.Text onClick={handleLoginClick}>
								<span style={{ cursor: 'pointer', color: '#FFF' }}>Login</span>
							</Navbar.Text>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className='app-content container'>
				<Outlet />
			</div>
		</div>
	)
}

export default AppLayout
