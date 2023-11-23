import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import AppContext from '../../contexts/AppContext'
import config from './../../conf'

const TicketView = () => {
	const navigate = useNavigate()
	const { selectedMovieInfo } = useContext(AppContext)

	const onBookAnotherBtnClick = () => {
		navigate('/home')
	}

	const renderDate = function () {
		let d = new Date()

		return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getYear()
	}

	return (
		<div style={{ marginTop: 32 }}>
			<h3>Ticket View</h3>
			<hr style={{ margin: '12px 0px 32x' }} />

			<div style={{ display: 'flex' }}>
				<div style={{ flex: 1 }}>
					<div style={{ width: 280, height: 350, position: 'relative', marginBottom: 24 }}>
						<img src={'/img/movies/' + selectedMovieInfo.image} className='movie-image' />
					</div>

					<h4>{selectedMovieInfo.name}</h4>
				</div>
				<div style={{ marginLeft: 24, flex: 2 }}>
					<div className='ticket-wrap'>
						<div style={{ fontSize: 20, fontWeight: 'bold' }}>Thank you!!! You have booked the ticket successfully!!!</div>
						<p style={{ marginTop: 20 }}>Following are the ticket details</p>
						<div style={{ border: '1px solid #ececec', padding: 12, marginBottom: 24, display: 'flex', width: '100%' }}>
							<div style={{ width: 240 }}>
								<img src={'/img/ticket/qr-code.png'} style={{ width: 200, height: 200 }} />
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedMovieInfo.name}</div>
								<div style={{ fontSize: 16 }}> Seats: &nbsp; 17, 18</div>
								<div style={{ fontSize: 16 }}> Theater: &nbsp; test</div>
								<div style={{ fontSize: 16 }}> Date: &nbsp; {renderDate()}</div>
								<div style={{ fontSize: 16 }}> Show Time: &nbsp; {'12.30PM'}</div>
							</div>
						</div>
						<span>Want to watch another movie?</span> &nbsp;
						<Button onClick={onBookAnotherBtnClick}>Book Another Ticket</Button>
					</div>
				</div>
			</div>

			<div style={{ clear: 'both' }}></div>
		</div>
	)
}

export default TicketView
