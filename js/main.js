const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
});


// Close menu when a link is clicked
navItems.forEach(item => {
  item.addEventListener('click', () => {
    links.classList.remove('active');
  });
});



