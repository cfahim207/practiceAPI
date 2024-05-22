const mealcontainer = document.getElementById("meal");


const loadAllMeal = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals == null) {
        mealcontainer.innerHTML = `<h1> Not found ${name}</h1>`;
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

    const div = document.createElement("div");
    div.classList.add("mealCard");
    div.innerHTML = `
    <img class="card-img" src=${meal.strMealThumb} alt="">
    <h2>Name: ${meal.strMeal}</h2>
    <h4> Catagory: ${meal.strCategory}</h4>
    <p>${meal.strInstructions.slice(0, 200)}</p>
                                
    <button onclick="mealDetails('${meal.idMeal}')">Details</button>

   `;


    mealcontainer.appendChild(div);
  });
};




const mealDetails = (id) => {
  const modalSection = document.getElementById("modal-section");

  modalSection.style.visibility = 'visible';
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.meals[0]);
      modalmeal(data.meals[0])

    }
    );

}

const modalmeal = (mealid) => {
  const modalSection = document.getElementById("modal-section");
  const div = document.createElement("div");
  div.classList.add("mealinfo");
  div.innerHTML = `
  <img class="modalimg" src=${mealid.strMealThumb} alt="">
    <h2>Name: ${mealid.strMeal}</h2>
    <h4> Catagory: ${mealid.strCategory}</h4>
    <h4> Area: ${mealid.strArea}</h4>
    <h4> Tegs: ${mealid.strTags}</h4>
    <p>${mealid.strInstructions.slice(0, 250)}</p>
                                
    <button class="modalbtn"  onclick="closepopup()" >Close</button>
  `;

  modalSection.appendChild(div);
}

const closepopup = () => {
  const modalSection = document.getElementById("modal-section");
  modalSection.style.visibility = "hidden";
}



loadAllMeal("");