const orb = document.querySelector('.orb');

document.addEventListener('mousemove',(e)=>{

    let x = (window.innerWidth/2 - e.pageX)/40;
    let y = (window.innerHeight/2 - e.pageY)/40;

    orb.style.transform =
        `translate(${x}px,${y}px)`;
});
