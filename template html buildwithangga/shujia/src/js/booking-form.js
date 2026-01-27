document.querySelector('input[type="tel"]').addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9+]/g, "");
});
document.getElementsByClassName("post-code")["0"].addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9+]/g, "");
});
