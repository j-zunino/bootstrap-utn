const container = document.getElementById('reaction-test');
const titleTest = document.getElementById('title-test');
const textTest = document.getElementById('text-test');

const iconBolt = document.getElementById('icon-bolt');
const iconDots = document.getElementById('icon-dots');
const iconTime = document.getElementById('icon-time');
const iconAlert = document.getElementById('icon-alert');

let startTime;
let greenTime;

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startTest = () => {
    const delay = randomNumber(1000, 10000);

    container.classList.add('bg-danger');

    titleTest.innerText = 'Espera';
    textTest.style.visibility = 'hidden';

    iconBolt.classList.add('d-none');
    iconTime.classList.add('d-none');
    iconAlert.classList.add('d-none');
    iconDots.classList.remove('d-none');

    startTime = Date.now();

    timeoutTest = setTimeout(() => {
        container.classList.remove('bg-danger');
        container.classList.add('bg-success');

        titleTest.innerText = 'Click!';
        textTest.style.visibility = 'hidden';

        greenTime = Date.now();
    }, delay);
};

const stopTest = () => {
    const clickTime = Date.now();

    const reactionTime = clickTime - greenTime;

    container.classList.remove('bg-success');

    iconDots.classList.add('d-none');
    iconTime.classList.remove('d-none');

    titleTest.innerText = `${reactionTime}ms`;

    textTest.style.visibility = 'visible';
    textTest.innerText = 'Haga click para continuar.';
};

const earlyTest = () => {
    clearTimeout(timeoutTest);
    container.classList.remove('bg-danger');

    iconDots.classList.add('d-none');
    iconAlert.classList.remove('d-none');

    titleTest.innerText = 'Muy pronto!';

    textTest.style.visibility = 'visible';
    textTest.innerText = 'Haga click para re intentar.';
};

const errorTest = () => {
    container.classList.remove('bg-danger');
    container.classList.remove('bg-success');

    iconBolt.classList.add('d-none');
    iconDots.classList.add('d-none');
    iconTime.classList.add('d-none');
    iconAlert.classList.remove('d-none');

    titleTest.innerText = 'Algo salio mal, vuelva a intentarlo';
    textTest.style.visibility = 'hidden';
};

const reactionTest = () => {
    const bgStatus = window.getComputedStyle(container).backgroundColor;
    const initial = 'rgb(13, 110, 253)';
    const waiting = 'rgb(220, 53, 69)';
    const running = 'rgb(25, 135, 84)';

    switch (bgStatus) {
        case initial:
            startTest();
            break;
        case waiting:
            earlyTest();
            break;
        case running:
            stopTest();
            break;
        default:
            errorTest();
            break;
    }
};

container.addEventListener('click', reactionTest);
