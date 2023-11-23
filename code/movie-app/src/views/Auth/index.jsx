import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../contexts/AppContext'

const LoginView = () => {
	let { setUserInfo } = useContext(AppContext)
	const [authType, setAuthType] = useState('login') //login | signup

	const [lUserName, setLUserName] = useState('')
	const [lPassword, setLPassword] = useState('')

	const [sName, setSName] = useState('')
	const [sMobileNumber, setSMobileNumber] = useState('')
	const [sEmail, setSEmail] = useState('')
	const [sUserName, setSUserName] = useState('')
	const [sPassword, setSPassword] = useState('')

	const [loginError, setLoginError] = useState(false)
	const [signupError, setSignupError] = useState(false)

	const navigate = useNavigate()

	const handleSignUpBtnClick = (e) => {
		if (!sName || !sMobileNumber || !sEmail || !sUserName || !sPassword) {
			setSignupError(true)
			return
		} else {
			setSignupError(false)
		}
		axios
			.post('http://localhost:3001/signup', {
				name: sName,
				mobileNumber: sMobileNumber,
				email: sEmail,
				username: sUserName,
				password: sPassword
			})
			.then((response) => {
				console.log(response)
				navigate('/home')
			})
	}

	const handleLoginBtnClick = (e) => {
		setUserInfo({ name: 'Pranathi' })
		navigate('/home')
	}

	return (
		<>
			<div className='auth-view'>
				<div className='auth-form-wrap'>
					{authType == 'login' ? (
						<div>
							<div style={{ fontSize: 28 }}>Sign In</div>
							{loginError && <label style={{ color: 'red' }}>Please Fill all fields</label>}
							<Form>
								<Form.Group className='mb-3'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter username'
										value={lUserName ? lUserName : ''}
										onChange={(e) => {
											setLUserName(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Password'
										value={lPassword ? lPassword : ''}
										onChange={(e) => {
											setLPassword(e.target.value)
										}}
									/>
								</Form.Group>
								<Button variant='primary' type='button' onClick={handleLoginBtnClick}>
									Submit
								</Button>
							</Form>
							<Button
								variant='link'
								type='button'
								onClick={(e) => {
									setAuthType('signup')
								}}
							>
								+ Create New Account
							</Button>
						</div>
					) : (
						<div>
							<div style={{ fontSize: 28 }}>Registration</div>
							{signupError && <label style={{ color: 'red' }}>Please Fill all fields</label>}
							<Form>
								<Form.Group className='mb-3'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter name'
										value={sName ? sName : ''}
										onChange={(e) => {
											setSName(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3'>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										value={sEmail ? sEmail : ''}
										onChange={(e) => {
											setSEmail(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3'>
									<Form.Label>Mobile Number</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter mobile number'
										value={sMobileNumber ? sMobileNumber : ''}
										onChange={(e) => {
											setSMobileNumber(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type='text'
										placeholder='Username'
										value={sUserName ? sUserName : ''}
										onChange={(e) => {
											setSUserName(e.target.value)
										}}
									/>
								</Form.Group>

								<Form.Group className='mb-3'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Password'
										value={sPassword ? sPassword : ''}
										onChange={(e) => {
											setSPassword(e.target.value)
										}}
									/>
								</Form.Group>

								<Button variant='primary' type='button' onClick={handleSignUpBtnClick}>
									Submit
								</Button>
							</Form>
							<span>
								Already Registered?
								<Button
									variant='link'
									type='button'
									onClick={(e) => {
										setAuthType('login')
									}}
								>
									Login
								</Button>
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default LoginView
