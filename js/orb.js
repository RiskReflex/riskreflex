const orb = document.querySelector('.orb-core');

let angle = 0;

function animateOrb(){

    angle += 0.4;

    orb.style.transform =
        `rotate(${angle}deg) scale(${1 + Math.sin(angle/20)*0.02})`;

    requestAnimationFrame(animateOrb);
}

animateOrb();
