import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getRecipesByUser, getSingleRecipe } from '../../utils/data/recipeData';
import {
  createWeek, getWeeksByUser, updateWeek,
} from '../../utils/data/weekData';
import { useAuth } from '../../utils/context/authContext';

export default function WeekForm() {
  const [current, SetCurrent] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getRecipesByUser(user?.id).then(setRecipes);
    getWeeksByUser(user?.id).then(SetCurrent);
  }, [user]);

  if (recipes.length < 14) {
    alert('Please add at least 14 recipes before generating a meal plan.');
  }

  const newWeeks = async () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentWeek = {};
    const nextWeek = {};
    daysOfWeek.forEach((recipe, index) => {
      if (index < 7) {
        currentWeek[daysOfWeek[index]] = recipe;
      } else {
        nextWeek[daysOfWeek[index - 7]] = recipe;
      }
    });
    const promises = current === null || current === undefined ? [createWeek(currentWeek), createWeek(nextWeek)] : [updateWeek(currentWeek), updateWeek(nextWeek)];
    await Promise.all(promises);
  };

  // const reRoll = async () => {
  //   const currentWeek = daysWithRecipe.slice(0, 7);
  //   await updateWeek(currentWeek).then();
  // };

  const handleClick = () => {
    // eslint-disable-next-line no-unused-vars
    let dayIndex = 0;
    const daysWithRecipe = Array.from({ length: 14 }, () => []);
    const goingOutDay1 = Math.floor(Math.random() * 7);
    const goingOutDay2 = Math.floor(Math.random() * 7) + 7;
    daysWithRecipe[goingOutDay1] = 'Going out to eat';
    daysWithRecipe[goingOutDay2] = 'Going out to eat';

    daysWithRecipe.forEach((day, i) => {
      if (day !== 'Going out to eat') {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        daysWithRecipe[i] = randomRecipe.id;
        dayIndex += 1;
      }
      dayIndex %= 7;
    });
    setMealPlan(daysWithRecipe);
    newWeeks();
  };

  const handleClickWeekWith2WC = () => {
    const daysWithRecipe = Array.from({ length: 14 }, () => []);
    const goingOutDay1 = Math.floor(Math.random() * 7);
    const goingOutDay2 = Math.floor(Math.random() * 7);
    const goingOutDay3 = Math.floor(Math.random() * 7) + 7;
    const goingOutDay4 = Math.floor(Math.random() * 7) + 7;
    daysWithRecipe[goingOutDay1] = 'Going out to eat';
    daysWithRecipe[goingOutDay2] = 'Going out to eat';
    daysWithRecipe[goingOutDay3] = 'Going out to eat';
    daysWithRecipe[goingOutDay4] = 'Going out to eat';
    // eslint-disable-next-line no-unused-vars
    let dayIndex = 0;
    daysWithRecipe.forEach((day, i) => {
      if (day !== 'Going out to eat') {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        daysWithRecipe[i] = randomRecipe.id;
        dayIndex += 1;
      }
      dayIndex %= 7;
    });
    setMealPlan(daysWithRecipe);
    newWeeks();
  };

  const handleClickWithNoWC = () => {
    const daysWithRecipe = Array.from({ length: 14 }, () => []);
    // eslint-disable-next-line no-unused-vars
    let dayIndex = 0;
    daysWithRecipe.forEach((day, i) => {
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      daysWithRecipe[i] = randomRecipe.id;
      dayIndex += 1;
      dayIndex %= 7;
    });
    setMealPlan(daysWithRecipe);
    newWeeks(mealPlan);
  };

  const handleClickSingle = () => {
    const randomMeal = Math.floor(Math.random() * recipes.length);
    getSingleRecipe(randomMeal).then(() => router.push(`/Recipe/${randomMeal}`));
  };

  return (
    <>
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClick}>
        Click for New Meals for the Week
      </Button>{' '}
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickWeekWith2WC}>
        <h2>New Meals with Extra Wild Card</h2>
        <h6>Extra Order Out Day</h6>
      </Button>{' '}
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickWithNoWC}>
        <h2>New Meals with No Wild Card</h2>
        <h6>No Order Out Day</h6>
      </Button>
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickSingle}>
        Click for One Meal
      </Button>
    </>
  );
}

WeekForm.propTypes = {
  week: PropTypes.shape({
    monday: PropTypes.number,
    Tuesday: PropTypes.number,
    wednesday: PropTypes.number,
    thursday: PropTypes.number,
    friday: PropTypes.number,
    saturday: PropTypes.number,
    sunday: PropTypes.number,
    id: PropTypes.number,
    uid: PropTypes.string,
  }).isRequired,
};
