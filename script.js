let cantInteractWithAnything = false;

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
let gradientAnimation;
let dotsMoving = true;

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
        gradientAnimation = requestAnimationFrame(animateGradient);
    } else {
        [startColor1, endColor1] = [endColor1, startColor1];
        [startColor2, endColor2] = [endColor2, startColor2];
        startTime = null;
        gradientAnimation = requestAnimationFrame(animateGradient);
    }
}

gradientAnimation = requestAnimationFrame(animateGradient);

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
        if (!dotsMoving) return;
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

function toggleOptimization() {
	const sound = new Audio('./sounds/UndertaleAssets/ping.mp3');
    const star = document.createElement('img');
    star.src = './images/star.png';
    star.style.position = 'fixed';
    star.style.top = '50%';
    star.style.left = '50%';
    star.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    star.style.width = '0';
    star.style.height = '0';
    star.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, transform 2s ease-in-out';
    star.style.zIndex = '9999';
    document.body.appendChild(star);

    // Expand the star to fill the whole screen and rotate it
    setTimeout(() => {
		sound.play();
        star.style.width = '9999px';
        star.style.height = '9999px';
        star.style.transform = 'translate(-50%, -50%) rotate(360deg)';
    }, 0);

    // Fade out the star after 2 seconds delay
    setTimeout(() => {
		const dotsContainer = document.getElementById('dots-container');
        dotsContainer.style.display = 'none';
        dotsMoving = false;
        cancelAnimationFrame(gradientAnimation);
        document.body.style.background = '#420075';
        star.style.transition = 'opacity 1s ease-in-out';
        star.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(star);
        }, 1000);
    }, 3000); // 1 second expand + 2 seconds delay = 3 seconds
}

function hideScrollbars() {
    document.body.style.overflow = 'hidden';
    document.body.style.scrollbarWidth = 'none';
    document.body.style.msOverflowStyle = 'none';
}

function TobyFoxEasterEgg() {
	if (cantInteractWithAnything === false) {
		cantInteractWithAnything = true;
    document.body.innerHTML = '';
	hideScrollbars();
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'black';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    const image = document.createElement('img');
    image.src = './images/UndertaleAssets/tobyfox.gif';
    image.style.width = '110px';
    image.style.height = '100px';
    const textContainer = document.createElement('div');
    textContainer.style.color = 'white';
    textContainer.style.marginTop = '20px';
    textContainer.style.textAlign = 'center';
    textContainer.style.fontSize = '24px';
    textContainer.style.position = 'relative';
    overlay.appendChild(image);
    overlay.appendChild(textContainer);
    document.body.appendChild(overlay);
    const sound = new Audio('./sounds/UndertaleAssets/tobyfox.ogg');
    sound.loop = true;
    sound.play();
	}
}

(function() {
    let sequence = '';
    const targetSequence = 'tobyfox';
    document.addEventListener('keydown', function(event) {
        sequence += event.key.toLowerCase();
        if (sequence.length > targetSequence.length) {
            sequence = sequence.slice(-targetSequence.length);
        }
        if (sequence === targetSequence) {
            TobyFoxEasterEgg();
        }
    });
})();

