function validateAndShowResultBooking(event) {
    event.preventDefault();
    const bookingTrxId = document.getElementById("bookingTrxId").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();

    if (bookingTrxId === "" || emailAddress === "" || !emailAddress.includes("@")) {
        return false;
    } else {
        document.getElementById("ResultBooking").classList.remove("hidden");
        document.getElementById("NotFound").classList.add("hidden");
    }
}
