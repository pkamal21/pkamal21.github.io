let currentPlayerSpot;
const playerInput = document.getElementById("playerInput");
const suggestionsList = document.getElementById("suggestionsList");

const okButton = document.getElementById("okButton");
okButton.addEventListener("click", function () {
  const modal = document.getElementById("playerDetailsModal");
  modal.style.display = "none";
  currentPlayerSpot.querySelector(".player-name").textContent = playerInput.value;
});

function showBanner() {
  const banner = document.querySelector('.success-banner');
  banner.style.opacity = '1';
  banner.style.visibility = 'visible';

  setTimeout(() => {
    banner.style.opacity = '0';
    banner.style.visibility = 'hidden';
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  const playerSpots = document.querySelectorAll(".player-spot");
  const modal = document.getElementById("playerDetailsModal");
  const closeButton = document.getElementsByClassName("close")[0];
  const saveButton = document.getElementById("saveButton");

  playerSpots.forEach(function (playerSpot) {
    playerSpot.addEventListener("click", function () {
      currentPlayerSpot = this;
      openPlayerDetailsModal(this);
    });
  });

  saveButton.addEventListener("click", function () {
    let playersStr = "";
    console.log("Save button triggered");
    const playerSpots = document.querySelectorAll(".player-spot");
    playerSpots.forEach(function (playerSpot) {
      playersStr += playerSpot.querySelector(".player-name").textContent + ",";
    });
    console.log(playersStr);
    setCookie("team", playersStr, 7);
    showBanner
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  });

  function openPlayerDetailsModal(playerSpot) {
    okButton.style.display = "block";
    const playerName = document.getElementById("playerName");
    playerName.textContent = playerSpot.querySelector(".player-name").textContent;
    modal.style.display = "block";
  }
});

playerInput.addEventListener("focus", (e) => {
  updateSuggestions(e.target.value);
});

playerInput.addEventListener("input", (e) => {
  updateSuggestions(e.target.value);
});

playerInput.addEventListener("blur", () => {
  setTimeout(() => {
    suggestionsList.style.display = "none";
  }, 200);
});

let selectedIndex = -1;

playerInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    selectedIndex = (selectedIndex + 1) % suggestionsList.children.length;
    updateSelectedSuggestion();
    e.preventDefault();
  } else if (e.key === "ArrowUp") {
    selectedIndex = (selectedIndex - 1 + suggestionsList.children.length) % suggestionsList.children.length;
    updateSelectedSuggestion();
    e.preventDefault();
  } else if (e.key === "Enter") {
    if (selectedIndex >= 0) {
      console.log("first");
      playerInput.value = suggestionsList.children[selectedIndex].textContent;
      suggestionsList.style.display = "none";
    }
    if (playerInput.value) {
      console.log("second");
      playerInput.value = suggestionsList.children[selectedIndex] ? 
          suggestionsList.children[selectedIndex].textContent : "Please select a stock from list";
      const modal = document.getElementById("playerDetailsModal");
      modal.style.display = "none";
      currentPlayerSpot.querySelector(".player-name").textContent = playerInput.value;
    }
    e.preventDefault();
  }
});


function updateSuggestions(value) {
  suggestionsList.innerHTML = "";
  selectedIndex = -1;

  if (!value) {
    suggestionsList.style.display = "none";
    return;
  }

  const filteredPlayers = stocks.filter(player =>
    player.toLowerCase().includes(value.toLowerCase())
  );

  if (filteredPlayers.length === 0) {
    suggestionsList.style.display = "none";
    return;
  }

  filteredPlayers.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player;
    li.addEventListener("click", () => {
      playerInput.value = player;
      suggestionsList.style.display = "none";
    });
    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = "block";
}

function updateSelectedSuggestion() {
  const items = suggestionsList.children;
  for (let i = 0; i < items.length; i++) {
    if (i === selectedIndex) {
      items[i].classList.add("selected");
    } else {
      items[i].classList.remove("selected");
    }
  }
}


function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
}