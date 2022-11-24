fetch('http://165.22.49.123:5000/api/v1/mainapp/course/')
  .then(response => response.json())
  .then(result => console.log(result));


  // function getModal(id) {
  //   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     modal.style.display = 'flex';
  //     modal.innerHTML = `
  //       <h2 class="recipe-modal__title">${data.meals[0].strMeal}</h2>
  //       <p class="recipe-modal__text">${data.meals[0].strInstructions}</p>
  //       <img src="${data.meals[0].strMealThumb}" alt="meal image" class="recipe-modal__img">
  //       <button class="recipe-modal__close-button" onclick="modalClose()">CLOSE</button>
  //     `;
  // })
  // }