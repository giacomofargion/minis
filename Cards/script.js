const panels = document.querySelectorAll('.panel');


// panels.forEach(() => {
//   console.log(panels);
// });

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses()
    panel.classList.add('active')
  })
})

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active')
  })
};
