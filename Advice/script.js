const adviceElement = document.getElementById('advice');
const adviceBtn = document.getElementById('adviceBtn');

adviceBtn.addEventListener('click', generateAdvice);

generateAdvice();

async function generateAdvice() {
  const response = await fetch('https://api.adviceslip.com/advice');
  const data = await response.json();
  adviceElement.innerHTML = data.slip.advice
}

// USING .then()
// function generateAdvice() {
//   fetch('https://api.adviceslip.com/advice')
//   .then((response) => response.json())
//   .then((data) => {
//     adviceElement.innerHTML = data.slip.advice;
//   })
// };
