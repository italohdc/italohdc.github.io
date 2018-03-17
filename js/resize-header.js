function resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 200,
        headerEl = document.getElementById('js-header');

    if (distanceY > shrinkOn) {
        headerEl.classList.remove("header-full-size");
    } else {
        headerEl.classList.add("header-full-size");
    }
}

window.addEventListener('scroll', resizeHeaderOnScroll);