const mealcontainer = document.getElementById("meal");


const loadAllMeal = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals == null) {
        mealcontainer.innerHTML = `<h1>Not found ${name}</h1>`;
      }
      else {
        displayMeal(data.meals);
      }


    });
};



const inputMeal = document.getElementById("input-meal");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  let inputValue = inputMeal.value;
  loadAllMeal(inputValue);

});

const displayMeal = (meals) => {

  mealcontainer.innerHTML = '';

  meals.forEach((meal) => {
    console.log(meal);
    const div = document.createElement("div");
    div.classList.add("mealCard");
    div.innerHTML = `
    <img class="card-img" src=${meal.strMealThumb} alt="">
    <h2>Name: ${meal.strMeal}</h2>
    <h4> Catagory: ${meal.strCategory}</h4>
    <p>${meal.strInstructions.slice(0, 200)}</p>
                                
    <button>Details</button>

   `;


    mealcontainer.appendChild(div);
  });
};


loadAllMeal("");