{/* <div class="team-container">
<div class="team-name">Team A</div>
<div class="team-field"></div>
<a href="edit.html" class="edit-button">Edit</a>
</div> */}
let allTeams;
async function getTeams() {
  const response = await fetch('http://localhost:8000/teams');
  allTeams = await response.json();
  console.log(allTeams);
  createTeamList(allTeams);
  showData(1);
}
getTeams();

function createTeamList(allTeams) {
  const team_list = document.getElementById('team-list');
  for (let i = 0; i < allTeams.length; i++) {
    htmlToRepeat = `      
    <div class="team-item" data-team="${i + 1}">
      <span class="team-name">Team Number ${i + 1}</span>
      <button class="edit-btn">Edit</button>
    </div>`    // Write a method to create a team list
    team_list.insertAdjacentHTML('beforeend', htmlToRepeat);
  }
  addEventListenerToTeamList();
}

function addEventListenerToTeamList() {
  const team_number = document.querySelectorAll(".team-item");

  team_number.forEach(team => {
    team.addEventListener('click', () => {
      showData(team.attributes.getNamedItem('data-team').textContent);
    })
  });
}





function showData(index) {
  const content_div = document.getElementById('football-field');
  content_div.innerHTML = '';
  const teams = allTeams[index - 1]
  if (teams == null)
    content_div.textContent = 'No Teams';
  else {
    const html = `    <div class="field">
    <div class="player-spot gk" data-player="Goalkeeper">
      <span class="player-name">${teams.gk1}</span>
    </div>
    <div class="player-spot def left" data-player="Defender 1">
      <span class="player-name">${teams.df1}</span>
    </div>
    <div class="player-spot def right" data-player="Defender 2">
      <span class="player-name">${teams.df2}</span>
    </div>
    <div class="player-spot fwd left" data-player="Forward 1">
      <span class="player-name">${teams.fw1}</span>
    </div>
    <div class="player-spot fwd right" data-player="Forward 2">
      <span class="player-name">${teams.fw2}</span>
    </div>
  </div>`;
    console.log(html);
    content_div.insertAdjacentHTML('beforeend', html);

  }
}

function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return null;
}
