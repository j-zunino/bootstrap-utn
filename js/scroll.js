const navbar = document.querySelector('nav');

const floatingNav = () => {
    if (window.scrollY > window.innerHeight * 0.1) {
        navbar.classList.add('navbar-float');
    } else {
        navbar.classList.remove('navbar-float');
    }
};

window.addEventListener('scroll', floatingNav);
