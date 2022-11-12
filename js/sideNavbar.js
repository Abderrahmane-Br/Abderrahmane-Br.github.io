let nav = document.querySelector("nav");
let main = document.querySelector("main");


main.addEventListener('scroll', () => {
    let h = parseInt(window.getComputedStyle(nav).height) + 10;
    if (main.scrollTop > h)
        nav.classList.add("onSide");
    else if (nav.classList.contains("onSide")) {
        nav.classList.remove("onSide")
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
