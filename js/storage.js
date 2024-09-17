const getStoredResults = () => {
    return {
        reactionTest: JSON.parse(localStorage.getItem('reactionTestResults')) || { attempts: 0, average: 0, best: 0, worst: 0 },
        clickTest: JSON.parse(localStorage.getItem('clickTestResults')) || { attempts: 0, average: 0, best: 0, worst: 0 }
    };
};

const saveResults = (reactionResults, clickResults) => {
    if (reactionResults) {
        localStorage.setItem('reactionTestResults', JSON.stringify(reactionResults));
    }
    if (clickResults) {
        localStorage.setItem('clickTestResults', JSON.stringify(clickResults));
    }
};

const updateReactionTestResults = (reactionTime) => {
    let results = getStoredResults().reactionTest;

    const newAttempts = results.attempts + 1;
    const newAverage = ((results.average * results.attempts) + reactionTime) / newAttempts;
    const newBest = Math.min(results.best || reactionTime, reactionTime);
    const newWorst = Math.max(results.worst, reactionTime);

    const updatedReactionTestResults = {
        attempts: newAttempts,
        average: newAverage.toFixed(2),
        best: newBest.toFixed(2),
        worst: newWorst.toFixed(2)
    };

    saveResults(updatedReactionTestResults, null);

    updateResultsSection();
};

const updateClickTestResults = (clickCount, cps) => {
    let results = getStoredResults().clickTest;

    const newAttempts = results.attempts + 1;
    const newAverage = ((results.average * results.attempts) + parseFloat(cps)) / newAttempts;
    const newBest = Math.max(results.best, parseFloat(cps));
    const newWorst = results.worst === 0 ? parseFloat(cps) : Math.min(results.worst, parseFloat(cps));

    const updatedClickTestResults = {
        attempts: newAttempts,
        average: newAverage.toFixed(2),
        best: newBest.toFixed(2),
        worst: newWorst.toFixed(2)
    };

    saveResults(null, updatedClickTestResults);

    updateResultsSection();
};

const updateResultsSection = () => {
    const results = getStoredResults();

    document.querySelector('#result .reaction-attempts').innerText = results.reactionTest.attempts;
    document.querySelector('#result .reaction-average').innerText = `${results.reactionTest.average} ms`;
    document.querySelector('#result .reaction-best').innerText = `${results.reactionTest.best} ms`;
    document.querySelector('#result .reaction-worst').innerText = `${results.reactionTest.worst} ms`;

    document.querySelector('#result .click-attempts').innerText = results.clickTest.attempts;
    document.querySelector('#result .click-average').innerText = `${results.clickTest.average} clicks/sec`;
    document.querySelector('#result .click-best').innerText = `${results.clickTest.best} clicks/sec`;
    document.querySelector('#result .click-worst').innerText = `${results.clickTest.worst} clicks/sec`;
};

document.addEventListener('DOMContentLoaded', updateResultsSection);
