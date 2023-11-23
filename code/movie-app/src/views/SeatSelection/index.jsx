//https://codesandbox.io/s/movie-seat-booking-xcmdj?file=/src/styles.css:0-2324
import './styles.css'
import { useEffect, useState, useContext } from 'react'
import clsx from 'clsx'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import AppContext from '../../contexts/AppContext'
import config from './../../conf'

import Modal from 'react-bootstrap/Modal'

const movies = [
	{
		name: 'Avenger',
		price: 200
	}
]

const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

export default function App() {
	const { selectedMovieInfo } = useContext(AppContext)
	const [selectedMovie, setSelectedMovie] = useState(selectedMovieInfo)
	const [selectedSeats, setSelectedSeats] = useState([])
	const [showPaymentModal, setShowPaymentModal] = useState(false)

	const navigate = useNavigate()

	const onClickPayBtn = (e) => {
		setShowPaymentModal(false)
		navigate('/ticket')
	}

	const handlePaymentModal = () => {
		setShowPaymentModal(true)
	}

	const handleClose = () => {
		setShowPaymentModal(false)
	}

	return (
		<div style={{ marginTop: 32 }}>
			<h3>Seat Selection</h3>
			<hr style={{ margin: '12px 0px 32px' }} />

			<div style={{ display: 'flex' }}>
				<div style={{ flex: 1 }}>
					<div style={{ width: 280, height: 350, position: 'relative', marginBottom: 24 }}>
						<img src={'/img/movies/' + selectedMovieInfo.image} className='movie-image' />
					</div>

					<h4>{selectedMovieInfo.name}</h4>
				</div>
				<div className='theater-movie-info-wrap' style={{ marginLeft: 24, flex: 2 }}>
					{/* <p>{selectedMovieInfo.description}</p> */}
					<div className='seat-select-wrap'>
						<ShowCase />
						<Cinema movie={selectedMovie} selectedSeats={selectedSeats} onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)} />

						<p className='info'>
							You have selected <span className='count'>{selectedSeats.length}</span> seats for the price of <span className='total'>{selectedSeats.length * selectedMovie.price}₹</span>
						</p>

						<Button disabled={selectedSeats.length ? false : true} onClick={handlePaymentModal}>
							Continue for Payment
						</Button>
					</div>
				</div>
			</div>

			<div style={{ clear: 'both' }}></div>

			<Modal show={showPaymentModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Payment</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, thank you for booking the ticket. Please press 'Pay' to pay and confirm the ticket!</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='primary' onClick={onClickPayBtn}>
						Pay
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

function ShowCase() {
	return (
		<ul className='ShowCase'>
			<li>
				<span className='seat' /> <small>N/A</small>
			</li>
			<li>
				<span className='seat selected' /> <small>Selected</small>
			</li>
			<li>
				<span className='seat occupied' /> <small>Occupied</small>
			</li>
		</ul>
	)
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
	function handleSelectedState(seat) {
		const isSelected = selectedSeats.includes(seat)
		if (isSelected) {
			onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat !== seat))
		} else {
			onSelectedSeatsChange([...selectedSeats, seat])
		}
	}

	return (
		<div className='Cinema'>
			<div className='screen' />

			<div className='seats'>
				{seats.map((seat) => {
					const isSelected = selectedSeats.includes(seat)
					const isOccupied = false //movie.occupied.includes(seat)
					return (
						<span
							tabIndex='0'
							key={seat}
							className={clsx('seat', isSelected && 'selected', isOccupied && 'occupied')}
							onClick={isOccupied ? null : () => handleSelectedState(seat)}
							onKeyPress={
								isOccupied
									? null
									: (e) => {
											if (e.key === 'Enter') {
												handleSelectedState(seat)
											}
									  }
							}
						/>
					)
				})}
			</div>
		</div>
	)
}
