window.addEventListener("scroll", function () {
    const containerNav = document.getElementById("ContainerNav");
    const title = document.getElementById("Title");

    if (window.scrollY > 0) {
        title.classList.remove("text-white");
        containerNav.classList.add("bg-white", "shadow-[0px_12px_20px_0px_#0305041C]");
    } else {
        title.classList.add("text-white");
        containerNav.classList.remove("bg-white", "shadow-[0px_12px_20px_0px_#0305041C]");
    }
});
