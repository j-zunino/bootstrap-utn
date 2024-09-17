const containerReact = document.querySelector('#reaction > #reaction-test');

let startTime;
let greenTime;

const reactionTest = () => {
    const bgStatus = window.getComputedStyle(containerReact).backgroundColor;
    const initial = 'rgb(13, 110, 253)';
    const waiting = 'rgb(220, 53, 69)';
    const running = 'rgb(25, 135, 84)';

    const titleTest = document.querySelector('#reaction-test > #title-test');
    const textTest = document.querySelector('#reaction-test > #text-test');

    const iconBolt = document.querySelector('#reaction-test > #icon-bolt');
    const iconDots = document.querySelector('#reaction-test > #icon-dots');
    const iconTime = document.querySelector('#reaction-test > #icon-time');
    const iconAlert = document.querySelector('#reaction-test > #icon-alert');

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const startTest = () => {
        const delay = randomNumber(1000, 10000);

        containerReact.classList.add('bg-danger');

        titleTest.innerText = 'Espera';
        textTest.style.visibility = 'hidden';

        iconBolt.classList.add('d-none');
        iconTime.classList.add('d-none');
        iconAlert.classList.add('d-none');
        iconDots.classList.remove('d-none');

        startTime = Date.now();

        timeoutTest = setTimeout(() => {
            containerReact.classList.remove('bg-danger');
            containerReact.classList.add('bg-success');

            titleTest.innerText = 'Click!';
            textTest.style.visibility = 'hidden';

            greenTime = Date.now();
        }, delay);
    };

    const stopTest = () => {
        const clickTime = Date.now();

        const reactionTime = clickTime - greenTime;

        containerReact.classList.remove('bg-success');

        iconDots.classList.add('d-none');
        iconTime.classList.remove('d-none');

        titleTest.innerText = `${reactionTime}ms`;

        textTest.style.visibility = 'visible';
        textTest.innerText = 'Haga click para continuar.';
    };

    const earlyTest = () => {
        clearTimeout(timeoutTest);
        containerReact.classList.remove('bg-danger');

        iconDots.classList.add('d-none');
        iconAlert.classList.remove('d-none');

        titleTest.innerText = 'Muy pronto!';

        textTest.style.visibility = 'visible';
        textTest.innerText = 'Haga click para re intentar.';
    };

    const errorTest = () => {
        containerReact.classList.remove('bg-danger');
        containerReact.classList.remove('bg-success');

        iconBolt.classList.add('d-none');
        iconDots.classList.add('d-none');
        iconTime.classList.add('d-none');
        iconAlert.classList.remove('d-none');

        titleTest.innerText = 'Algo salio mal, vuelva a intentarlo';
        textTest.style.visibility = 'hidden';
    };

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
