const orb = document.querySelector('.orb-core');

document.addEventListener('mousemove', (e) => {

    const x =
        (window.innerWidth / 2 - e.pageX) / 40;

    const y =
        (window.innerHeight / 2 - e.pageY) / 40;

    orb.style.transform =
        `translate(${x}px, ${y}px)`;
});
