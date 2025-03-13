document.addEventListener("DOMContentLoaded", function () {
    let counterElement = document.getElementById("counter");
    let count = 1;

    function updateCounter() {
        if (count <= 5) {
            counterElement.textContent = count;
            count++;
            setTimeout(updateCounter, 400);
        }
    }

    updateCounter();
});

document.addEventListener("DOMContentLoaded", function () {
    let counterElement = document.getElementById("counter2");
    let count = 1;

    function updateCounter() {
        if (count <= 15) {
            counterElement.textContent = count;
            count++;
            setTimeout(updateCounter, 200);
        }
    }

    updateCounter();
});

import data from './data.js'; 
const teamContainer = document.getElementById("teamContainer");

data.team.forEach(member => {
    const teamCard = document.createElement("div");
    teamCard.classList.add("col-lg-3", "col-md-4", "col-sm-6");

    teamCard.innerHTML = `
        <div class="team-card">
            <img src="${member.image}" alt="${member.name}" class="team-img">
            <h3 class="team-name">${member.name}</h3>
            <p class="team-position">${member.role}</p>
        </div>
    `;

    teamContainer.appendChild(teamCard);
});