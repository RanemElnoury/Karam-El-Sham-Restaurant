import data from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    const locationSelect = document.getElementById("location-select");
    const locationText = document.getElementById("location-text");
    const mapIframe = document.querySelector("#map iframe");

    data.branches.forEach((branch, index) => {
        const option = document.createElement("option");
        option.value = branch.location;
        option.textContent = branch.name;
        locationSelect.appendChild(option);
    });

    if (data.branches.length > 0) {
        const firstBranch = data.branches[0];
        locationSelect.value = firstBranch.location;
        locationText.textContent = firstBranch.address;
        mapIframe.src = firstBranch.location;
    }

    locationSelect.addEventListener("change", function () {
        const selectedBranch = data.branches.find(branch => branch.location === this.value);
        locationText.textContent = selectedBranch.address;
        mapIframe.src = selectedBranch.location;
    });
});


document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    let storedData = JSON.parse(localStorage.getItem("contactData")) || [];

    storedData.push({
        name: name,
        email: email,
        phone: phone,
        message: message
    });

    localStorage.setItem("contactData", JSON.stringify(storedData));

    alert("Your message has been sent successfully!");
    document.getElementById("contactForm").reset();
});

