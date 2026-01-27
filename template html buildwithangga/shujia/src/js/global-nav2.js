window.addEventListener("scroll", function () {
    const containerNav = document.getElementById("ContainerNav");
    const back = document.getElementById("Back");
    const title = document.getElementById("Title");
    const backA = document.getElementById("BackA");

    if (window.scrollY > 0) {
        backA.classList.add("left-[16px]");
        title.classList.remove("text-white");
        back.classList.add("border", "border-shujia-graylight");
        containerNav.classList.add("bg-white", "rounded-[22px]", "shadow-[0px_12px_20px_0px_#0305041C]");
        backA.classList.remove("left-0");
    } else {
        title.classList.add("text-white");
        backA.classList.remove("left-[16px]");
        back.classList.remove("border", "border-shujia-graylight");
        backA.classList.add("left-0");
        containerNav.classList.remove("bg-white", "rounded-[22px]", "shadow-[0px_12px_20px_0px_#0305041C]");
    }
});
