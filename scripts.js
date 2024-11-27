// Find the menu toggle button and the nav element
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

// Check if these elements are being found
console.log('menuToggle:', menuToggle);
console.log('nav:', nav);

// Add event listener to the menu toggle
menuToggle.addEventListener('click', () => {
  console.log('Menu toggle clicked'); // Check if the click event is triggered
  nav.classList.toggle('active'); // Toggle the active class
});


