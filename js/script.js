const header = document.querySelector('.page-header');
const toggleBtn = document.querySelector('.nav-toggle');

toggleBtn.addEventListener('click', () => {
	header.classList.toggle('open');
});
