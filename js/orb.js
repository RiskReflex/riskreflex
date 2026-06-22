const orb = document.querySelector('.orb-core');

document.addEventListener('mousemove', (e) => {

```
const x =
    (window.innerWidth / 2 - e.clientX) / 60;

const y =
    (window.innerHeight / 2 - e.clientY) / 60;

orb.style.marginLeft = `${-x}px`;
orb.style.marginTop = `${-y}px`;
```

});
