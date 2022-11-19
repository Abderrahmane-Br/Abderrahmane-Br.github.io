let nav = document.querySelector("nav");
let sections = document.querySelectorAll("main>section:not(:first-of-type, .intro), .projects");
let navLinks = document.querySelectorAll(".nav__link");
let main = document.querySelector("main");
let scheduled = false;
let scrollSched = false;

main.addEventListener('scroll', () => {

    if (!scheduled) {
        setTimeout(() => {
            activateInViewPort(0, sections.length - 1);
            scheduled = false;
        }, 250);
        scheduled = true;
    }

    if (!scrollSched) {
        setTimeout(() => {
            if (main.scrollTop > 50)
                nav.classList.add("onSide");
            else if (nav.classList.contains("onSide")) {
                nav.classList.remove("onSide");
                scrollSched = false;
            }
        }, 50);
        scheduled = true;
    }
}
);

nav.addEventListener("click", (e) => {
    let target;
    if (e.target.tagName === "A")
        target = e.target;
    else if (e.target.tagName === "SPAN")
        target = e.target.parentElement;

    if (target) {
        nav.querySelector(".active")?.classList.remove("active");
        target.classList.add("active");
    }

})


function activateInViewPort(l, r) {
    let scr = window.scrollY;
    // console.log("started");
    if (l < r) {
        let m = parseInt((r + l) / 2);
        activateInViewPort(l, m);
        activateInViewPort(m + 1, r);
    }

    else {
        navLinks[l].classList.remove("active");
        let pos = sections[l].getBoundingClientRect();
        if (scr + 450 < pos.bottom && scr + 450 > pos.top)
            navLinks[l].classList.add("active")
        return;
    }
};