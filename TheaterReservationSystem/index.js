let user;
const seatingGrid = document.getElementById('seatingGrid');
const reservationInfo = document.getElementById('reservationInfo');
const userDetails = document.getElementById('userDetails');
const adminControls = document.getElementById('adminInterface');
const userControls= document.getElementById('userInterface');
const setSeatingButton = document.getElementById('setSeating');
const confirmReservation=document.getElementById('confirmReservation');

document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;

    user = {
        name,   
        surname,
        email,
        phone,
        age,
        role: email === 'admin@admin.com' ? 'admin' : 'user',
        ticketPrice: getTicketPrice(age)
    };


    if (user.role === 'admin') {
        adminControls.classList.remove('d-none');
    } else {
        userControls.classList.remove('d-none');
        createSeatingGrid(5, 5); // Standart olarak 5x5 oturma düzeni oluştur
    }

    reservationDetails();
});


setSeatingButton.addEventListener('click', function() {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);

    // Satır ve sütun sayısının sınırlar içinde olduğundan emin olun
    if (rows < 1 || rows > 9|| columns < 1 || columns > 9) {
        alert('Rows and columns must be between 1 and 9.');
        return;
    }

    createSeatingGrid(rows, columns);
});

function createSeatingGrid(rows, columns) {
    

    seatingGrid.innerHTML = ''; // Önceki oturma düzenini temizle

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < columns; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.innerText = 'Empty';
            seat.addEventListener('click', selectSeat);
            row.appendChild(seat);
        }
        seatingGrid.appendChild(row);
    }

    userControls.classList.remove('d-none');
    confirmReservation.classList.remove('d-none');
    reservationInfo.classList.remove('d-none');

    reservationDetails();
}

function selectSeat(event) {
    const seat = event.target;
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        seat.innerText = 'Empty';
    } else {
        seat.classList.add('selected');
        seat.innerText = 'Reserved';
    }

    reservationDetails();
}

function reservationDetails() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    let seatCount = selectedSeats.length;
    let totalPrice = seatCount * user.ticketPrice;
    
    let selectedSeatNumbers = [];
    selectedSeats.forEach(seat => {
        let rowIndex = Array.from(seat.parentNode.parentNode.children).indexOf(seat.parentNode) + 1;
        let seatIndex = Array.from(seat.parentNode.children).indexOf(seat) + 1;
        selectedSeatNumbers.push(`Row ${rowIndex} Seat ${seatIndex}`);
    });

    userDetails.innerText = `User: ${user.name} ${user.surname}`;
    document.getElementById('selectedSeats').innerText = `Selected Seats: ${selectedSeatNumbers.join(', ')}`;
    document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice}`;
}

confirmReservation.addEventListener('click', function() {
    alert(`Reservation Confirmed!\nUser: ${user.name} ${user.surname}\nSeats: ${document.getElementById('selectedSeats').innerText}\nTotal Price: ${document.getElementById('totalPrice').innerText}`);
});

function getTicketPrice(age) {
    if (age < 18 || age >= 65) {
        return 10;
    } else if (age >= 18 && age < 26) {
        return 15;
    } else if (age >= 26 && age < 65) {
        return 25;
    }
    return 0;
}
