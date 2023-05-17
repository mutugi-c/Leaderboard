import './styles.css';

const refreshBtn = document.getElementById('refresh-btn');
const scoresTable = document.getElementById('scores-table');

refreshBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WUuOnoz8VP2uepBIRJdR/scores/'
    );
    const data = await response.json();

    scoresTable.innerHTML = '';

    data.result.forEach((score) => {
      const newScore = document.createElement('tr');
      newScore.innerHTML = `
    <td class='col-4'>${score.user}</td>
    <td class='col-6'>${score.score}</td>
  `;
      scoresTable.appendChild(newScore);
    });
  } catch (error) {
    console.error(error);
  }
});

