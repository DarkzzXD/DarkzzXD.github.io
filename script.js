function logCenteredText(text) {
    const consoleWidth = 80;
    const padding = Math.max(0, Math.floor((consoleWidth - text.length) / 2));
    const paddedText = ' '.repeat(padding) + text + ' '.repeat(padding);
    console.log(`%c${paddedText}`, 'font-size: 16px; font-family: "Comic Sans MS", "Comic Sans", cursive;');
}

logCenteredText('          Oh hey!');
logCenteredText('Watcha doing here bro?');

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

function sineInOut(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}

let startColor1 = [59, 0, 102];
let startColor2 = [0, 0, 0];
let endColor1 = [179, 0, 255];
let endColor2 = [0, 0, 0];
let duration = 5000;
let startTime;

function animateGradient(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = (timestamp - startTime) / duration;
    if (progress > 1) {
        progress = 1;
        startTime = timestamp;
    }

    let sineProgress = sineInOut(progress);

    let currentColor1 = startColor1.map((start, i) => lerp(start, endColor1[i], sineProgress));
    let currentColor2 = startColor2.map((start, i) => lerp(start, endColor2[i], sineProgress));

    document.body.style.background = `linear-gradient(180deg, rgb(${currentColor1.join(',')}), rgb(${currentColor2.join(',')}))`;

    if (progress < 1) {
        requestAnimationFrame(animateGradient);
    } else {
        [startColor1, endColor1] = [endColor1, startColor1];
        [startColor2, endColor2] = [endColor2, startColor2];
        startTime = null;
        requestAnimationFrame(animateGradient);
    }
}

requestAnimationFrame(animateGradient);

function createDots() {
    const dotsContainer = document.getElementById('dots-container');
    const numDots = 30;
    const dots = [];
    const margin = 50;

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        

        dot.style.top = `${Math.random() * (document.body.scrollHeight - margin * 2) + margin + 1}px`;
        dot.style.left = `${Math.random() * (document.body.scrollWidth - margin * 2) + margin}px`;

        dotsContainer.appendChild(dot);
        dots.push(dot);
    }


    function moveDots() {
        dots.forEach(dot => {
            const newX = Math.random() * (document.body.scrollWidth - margin * 2) + margin;
            const newY = Math.random() * (document.body.scrollHeight - margin * 2) + margin;
            animateDot(dot, newX, newY);
        });


        setTimeout(moveDots, 5000);
    }

    moveDots();
}

function animateDot(dot, newX, newY) {
    const duration = 5000;
    const startX = dot.offsetLeft;
    const startY = dot.offsetTop;
    const deltaX = newX - startX;
    const deltaY = newY - startY;
    let startTime;

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const sineProgress = -(Math.cos(Math.PI * progress) - 1) / 2;

        dot.style.left = `${startX + deltaX * sineProgress}px`;
        dot.style.top = `${startY + deltaY * sineProgress}px`;

        if (progress < 1) {
            requestAnimationFrame(animationStep);
        }
    }

    requestAnimationFrame(animationStep);
}
document.addEventListener('DOMContentLoaded', createDots);

function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    if (sideMenu.style.right === '0px') {
        sideMenu.style.right = '-300px';
    } else {
        sideMenu.style.right = '0px';
    }
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
