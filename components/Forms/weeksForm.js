// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// // import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
// import { getRecipes } from '../../utils/data/recipeData';

// export default function MealForm({}) {
//   const [mealPlan, setMealPlan] = useState([]);
//   const [single, setSingle] = useState();
//   const [recipes, setRecipes] = useState([]);
//   const router = useRouter();

//   const handleClickWeekOne = () => {
//     getRecipes().then(setRecipes);
//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//     const chosenRecipes = {};

//     // Choose a random day of the week to "go out to eat"
//     const goingOutDayIndex = Math.floor(Math.random() * daysOfWeek.length);
//     const goingOutDay = daysOfWeek[goingOutDayIndex];

//     // Choose a random recipe for each day of the week
//     daysOfWeek.forEach((day) => {
//       if (day === goingOutDay) {
//         chosenRecipes[day] = 'Going out to eat!';
//       } else {
//         const randomIndex = Math.floor(Math.random() * recipes.length);
//         const chosenRecipe = recipes[randomIndex];
//         chosenRecipes[day] = chosenRecipe;
//         recipes.splice(randomIndex, 1);
//       }
//     });
//     setMealPlan(chosenRecipes);
//   };

//   const handleClickWeekWith2WC = () => {
//     getRecipes().then(setRecipes);
//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//     const chosenRecipes = {};

//     // Choose two random days of the week to "go out to eat"
//     const goingOutDays = [];
//     while (goingOutDays.length < 2) {
//       const randomIndex = Math.floor(Math.random() * daysOfWeek.length);
//       const randomDay = daysOfWeek[randomIndex];
//       if (!goingOutDays.includes(randomDay)) {
//         goingOutDays.push(randomDay);
//       }
//     }

//     // Choose a random recipe for each day of the week
//     daysOfWeek.forEach((day) => {
//       if (goingOutDays.includes(day)) {
//         chosenRecipes[day] = 'Going out to eat!';
//       } else {
//         const randomIndex = Math.floor(Math.random() * recipes.length);
//         const chosenRecipe = recipes[randomIndex];
//         chosenRecipes[day] = chosenRecipe;
//         recipes.splice(randomIndex, 1);
//       }
//     });
//     setMealPlan(chosenRecipes);
//   };

//   const handleClickWithNoWC = () => {
//     getRecipes().then(setRecipes);
//     const chosenRecipes = [];
//     const goingOutDay = Math.floor(Math.random() * 6);

//     recipes.forEach((recipe, index) => {
//       if (index === goingOutDay) {
//         chosenRecipes.push({ name: 'Going out to eat!', instructions: '' });
//       } else {
//         const randomIndex = Math.floor(Math.random() * recipes.length);
//         chosenRecipes.push(recipes[randomIndex]);
//         recipes.splice(randomIndex, 1);
//       }
//     });
//     setMealPlan(chosenRecipes);
//   };

//   const handleClickSingle = () => {
//     getRecipes().then(setRecipes);
//     const chosenRecipes = [];
//     const goingOutDay = Math.floor(Math.random() * 6);

//     recipes.forEach((recipe, index) => {
//       if (index === goingOutDay) {
//         chosenRecipes.push({ name: 'Going out to eat!', instructions: '' });
//       } else {
//         const randomIndex = Math.floor(Math.random() * recipes.length);
//         chosenRecipes.push(recipes[randomIndex]);
//         recipes.splice(randomIndex, 1);
//       }
//     });
//     setSingle(chosenRecipes);
//   };

//   // const mealPlanList = mealPlan.map((meal, index) => <li key={index}>{meal}</li>);

//   return (
//     <>
//       <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickWeekOne}>
//         Click for New Meals for the Week
//       </Button>{' '}
//       <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickWeekWith2WC}>
//         <h2>New Meals with Extra Wild Card</h2>
//         <h6>Extra Order Out Day</h6>
//       </Button>{' '}
//       <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickWithNoWC}>
//         <h2>New Meals with No Wild Card</h2>
//         <h6>No Order Out Day</h6>
//       </Button>
//       <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickSingle}>
//         Click for One Meal
//       </Button>
//     </>
//   );
// }

// // MealForm.propTypes = {
// //   user: PropTypes.shape({
// //     id: PropTypes.number,
// //     uid: PropTypes.string,
// //     username: PropTypes.string,
// //   }).isRequired,
// // };
