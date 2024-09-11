function updateGauge(targetSpeed) {
    const gaugeBar = document.getElementById('gauge-fill');
    const speedDisplay = document.getElementById('speed-display');
    const gaugeNeedle = document.getElementById('gauge-needle');

    // Calculate the circumference of the gauge
    const radius = 40; // radius of the gauge in the SVG
    const circumference = 2 * Math.PI * radius;

    // Animation parameters
    const duration = 5000; // Animation duration in milliseconds
    const updateInterval = 20; // Interval between updates in milliseconds
    const steps = duration / updateInterval;
    let currentStep = 0;

    // Initial values
    let currentSpeed = 0;
    const maxSpeed = 100; // Set maximum speed (adjustable)
    const maxAngle = 180; // Maximum rotation angle for the needle (in degrees)

    function calculateNeedleAngle(speed) {
        // Calculate the angle based on the speed
        return (speed / maxSpeed) * maxAngle;
    }

    function animate() {
        currentStep++;
        // Apply jitter to speed and ensure it doesn't exceed the target
        currentSpeed = Math.min(
            currentSpeed + targetSpeed / steps,
            targetSpeed
        );
        // Ensure the speed is within bounds
        currentSpeed = Math.max(currentSpeed, 0);

        // Calculate the percentage of the gauge to fill based on current speed
        const currentPercentage = Math.min(currentSpeed / maxSpeed, 1);
        const dashArray = `${circumference * currentPercentage}, ${
            circumference * (1 - currentPercentage)
        }`;
        gaugeBar.setAttribute('stroke-dasharray', dashArray);

        // Update the displayed speed value
        speedDisplay.textContent = `${Math.round(currentSpeed)} Mbps`;

        // Update needle position
        const angle = calculateNeedleAngle(currentSpeed);
        gaugeNeedle.style.transform = `translate3d(-50%, -50%, 0) rotate(${angle}deg)`;

        if (currentStep < steps) {
            setTimeout(animate, updateInterval);
        }
    }

    animate();
}

// Example usage: update gauge to a random speed between 40 and 100 Mbps
const randomSpeed = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
updateGauge(randomSpeed);
