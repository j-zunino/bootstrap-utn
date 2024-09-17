const containerClick = document.querySelector('#click > #click-test');

const clickTest = () => {
    const bgStatus = window.getComputedStyle(containerClick).backgroundColor;
    const initial = 'rgb(13, 110, 253)';
    const waiting = 'rgb(220, 53, 69)';
    const running = 'rgb(25, 135, 84)';

    const titleTest = document.querySelector('#click-test > #title-test');
    const textTest = document.querySelector('#click-test > #text-test');

    const iconClick = document.querySelector('#click-test > #icon-click');
    const iconDots = document.querySelector('#click-test > #icon-dots');
    const iconTime = document.querySelector('#click-test > #icon-time');
    const iconAlert = document.querySelector('#click-test > #icon-alert');

    let clickCount = 0;
    let testDuration = 5000;
    let cooldownDuration = 3000;
    let timeoutTest;
    let cooldownTimeout;

    const startTest = () => {
        containerClick.classList.add('bg-success');

        clickCount = 0;
        titleTest.innerText = `${clickCount}`;
        textTest.style.visibility = 'hidden';

        iconClick.classList.add('d-none');
        iconTime.classList.add('d-none');
        iconAlert.classList.add('d-none');
        iconDots.classList.remove('d-none');

        containerClick.addEventListener('click', incrementClickCount);

        timeoutTest = setTimeout(() => {
            stopTest();
        }, testDuration);
    };

    const stopTest = () => {
        containerClick.classList.remove('bg-success');

        const cps = (clickCount / (testDuration / 1000)).toFixed(2);

        titleTest.innerText = `Haz hecho click ${clickCount} veces! (${cps} CPS)`;
        textTest.style.visibility = 'visible';
        textTest.innerText = 'Click para volver a intentar!';

        iconDots.classList.add('d-none');
        iconTime.classList.remove('d-none');

        containerClick.removeEventListener('click', incrementClickCount);

        containerClick.classList.add('cooldown');
        cooldownTimeout = setTimeout(() => {
            containerClick.classList.remove('cooldown');
        }, cooldownDuration);

        updateClickTestResults(clickCount, cps);
    };

    const incrementClickCount = () => {
        clickCount++;
        titleTest.innerText = `${clickCount}`;
    };

    if (containerClick.classList.contains('cooldown')) {
        return;
    }

    switch (bgStatus) {
        case initial:
            startTest();
            break;
        case waiting:
            break;
        case running:
            break;
        default:
            break;
    }
};

containerClick.addEventListener('click', clickTest);
