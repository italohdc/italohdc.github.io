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

if (window.location.pathname === '/') {
	document.getElementById("nav-blog").classList.add("nav-selected");
} else if (window.location.pathname === '/about/') {
	document.getElementById("nav-about").classList.add("nav-selected");
}

window.addEventListener('scroll', resizeHeaderOnScroll);
document.addEventListener("touchstart", function(){}, true);
