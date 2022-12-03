let moreProjectsBtn = document.querySelector("#moreProjects");
let projsSect = document.querySelector(".projects");

moreProjectsBtn.addEventListener("click", (e) => {
    let invProjs = document.querySelectorAll(".project.--toHide");
    invProjs.forEach(proj => proj.classList.toggle("invisible"));
    projsSect.classList.toggle("full");
    projsSect.classList.contains("full")
        ? e.currentTarget.innerText = "Less projects"
        : e.currentTarget.innerText = "More projects";
});