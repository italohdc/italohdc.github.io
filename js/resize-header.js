function resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 60,
        headerEl = document.getElementById('js-header');

    if (distanceY > shrinkOn) {
        headerEl.classList.remove("header-full-size");
    } else {
        headerEl.classList.add("header-full-size");
    }
}

window.addEventListener('scroll', resizeHeaderOnScroll);
document.addEventListener("touchstart", function(){}, true);
