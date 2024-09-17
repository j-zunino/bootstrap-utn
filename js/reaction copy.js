const containerReact = document.getElementById('reaction-test');
const titleTestReact = document.getElementById('title-test');
const textTestReact = document.getElementById('text-test');

const iconBoltReact = document.getElementById('icon-bolt');
const iconDotsReact = document.getElementById('icon-dots');
const iconTimeReact = document.getElementById('icon-time');
const iconAlertReact = document.getElementById('icon-alert');

let startTime;
let greenTime;

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startTest = () => {
    const delay = randomNumber(1000, 10000);

    containerReact.classList.add('bg-danger');

    titleTestReact.innerText = 'Espera';
    textTestReact.style.visibility = 'hidden';

    iconBoltReact.classList.add('d-none');
    iconTimeReact.classList.add('d-none');
    iconAlertReact.classList.add('d-none');
    iconDotsReact.classList.remove('d-none');

    startTime = Date.now();

    timeoutTest = setTimeout(() => {
        containerReact.classList.remove('bg-danger');
        containerReact.classList.add('bg-success');

        titleTestReact.innerText = 'Click!';
        textTestReact.style.visibility = 'hidden';

        greenTime = Date.now();
    }, delay);
};

const stopTest = () => {
    const clickTime = Date.now();

    const reactionTime = clickTime - greenTime;

    containerReact.classList.remove('bg-success');

    iconDotsReact.classList.add('d-none');
    iconTimeReact.classList.remove('d-none');

    titleTestReact.innerText = `${reactionTime}ms`;

    textTestReact.style.visibility = 'visible';
    textTestReact.innerText = 'Haga click para continuar.';
};

const earlyTest = () => {
    clearTimeout(timeoutTest);
    containerReact.classList.remove('bg-danger');

    iconDotsReact.classList.add('d-none');
    iconAlertReact.classList.remove('d-none');

    titleTestReact.innerText = 'Muy pronto!';

    textTestReact.style.visibility = 'visible';
    textTestReact.innerText = 'Haga click para re intentar.';
};

const errorTest = () => {
    containerReact.classList.remove('bg-danger');
    containerReact.classList.remove('bg-success');

    iconBoltReact.classList.add('d-none');
    iconDotsReact.classList.add('d-none');
    iconTimeReact.classList.add('d-none');
    iconAlertReact.classList.remove('d-none');

    titleTestReact.innerText = 'Algo salio mal, vuelva a intentarlo';
    textTestReact.style.visibility = 'hidden';
};

const reactionTest = () => {
    const bgStatus = window.getComputedStyle(containerReact).backgroundColor;
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

containerReact.addEventListener('click', reactionTest);
