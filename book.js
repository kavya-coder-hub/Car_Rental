let selectedCarPrice = 0;

window.bookCar = function(carName, price) {
  selectedCarPrice = price;
  const form = document.getElementById('bookingForm');
  form.classList.remove('hidden');
  
  document.getElementById('selectedCar').value = carName;
  document.getElementById('days').value = 1;
  updateTotalPrice();
}

window.handleSubmit = function(event) {
  event.preventDefault();
  
  const formData = {
    car: document.getElementById('selectedCar').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    pickupDate: document.getElementById('pickupDate').value,
    days: document.getElementById('days').value,
    totalPrice: document.getElementById('totalPrice').value
  };
  
  alert(`Booking Confirmed!\n\nDetails:\nCar: ${formData.car}\nName: ${formData.name}\nPickup Date: ${formData.pickupDate}\nTotal: ${formData.totalPrice}`);
  
  event.target.reset();
  document.getElementById('bookingForm').classList.add('hidden');
}

document.getElementById('days').addEventListener('input', updateTotalPrice);

function updateTotalPrice() {
  const days = document.getElementById('days').value;
  const total = selectedCarPrice * days;
  document.getElementById('totalPrice').value = `$${total}`;
}

