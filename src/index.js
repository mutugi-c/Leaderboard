import './styles.css';

const refreshBtn = document.getElementById('refresh-btn');
const addScoreForm = document.getElementById('add-score-form');
const scoresTable = document.getElementById('scores-table');

refreshBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WUuOnoz8VP2uepBIRJdR/scores/',
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
    alert('Error in fetching scores', error);
  }
});

addScoreForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userInput = document.getElementById('user-input').value;
  const scoreInput = document.getElementById('score-input').value;

  if (!userInput || !scoreInput) {
    return;
  }

  const data = {
    user: userInput,
    score: parseInt(scoreInput, 10),
  };

  try {
    await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WUuOnoz8VP2uepBIRJdR/scores/',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    addScoreForm.reset();
  } catch (error) {
    alert('Error in adding scores', error);
  }
});
