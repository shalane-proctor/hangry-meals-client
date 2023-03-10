import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getRecipesByUser, getSingleRecipe } from '../../utils/data/recipeData';
import {
  createWeek, updateWeek,
} from '../../utils/data/weekData';
import { useAuth } from '../../utils/context/authContext';

export default function WeekForm({ week }) {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getRecipesByUser(user?.id).then(setRecipes);
  }, [user]);

  const handleClick = () => {
    const goingOut = recipes[0];
    const daysWithRecipe = Array.from({ length: 7 }, () => []);
    const goingOutDay = Math.floor(Math.random() * 7);
    daysWithRecipe[goingOutDay] = goingOut?.id;
    // eslint-disable-next-line no-unused-vars
    let dayIndex = 0;
    daysWithRecipe.forEach((day, i) => {
      if (i !== goingOutDay) {
        const randomRecipe = recipes[Math.floor(Math.random() * (recipes.length - 1)) + 1];
        daysWithRecipe[i] = randomRecipe?.id;
        dayIndex += 1;
      }
    });
    if (week?.id) {
      const payload = {
        id: week?.id,
        user: user.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      updateWeek(payload).then(() => router.push('/'));
    } else {
      const payload = {
        user: user?.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      createWeek(payload).then(() => router.push('/'));
    }
  };

  const handleClickWeekWith2WC = () => {
    const goingOut = recipes[0].id;
    const daysWithRecipe = Array.from({ length: 7 }, () => []);
    const goingOutDay1 = Math.floor(Math.random() * 7);
    let goingOutDay2 = Math.floor(Math.random() * 7);
    while (goingOutDay2 === goingOutDay1) {
      goingOutDay2 = Math.floor(Math.random() * 7);
    }
    daysWithRecipe[goingOutDay1] = goingOut;
    daysWithRecipe[goingOutDay2] = goingOut;
    // eslint-disable-next-line no-unused-vars
    let dayIndex = 0;
    daysWithRecipe.forEach((day, i) => {
      if (day !== goingOut) {
        const randomRecipe = recipes[Math.floor(Math.random() * (recipes.length - 1)) + 1];
        daysWithRecipe[i] = randomRecipe?.id;
        dayIndex += 1;
      }
    });
    if (week?.id) {
      const payload = {
        id: week?.id,
        user: user?.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      updateWeek(payload).then(() => router.push('/'));
    } else {
      const payload = {
        user: user?.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      createWeek(payload).then(() => router.push('/'));
    }
  };

  const handleClickWithNoWC = () => {
    const goingOut = recipes[0];
    const daysWithRecipe = Array.from({ length: 7 }, () => []);
    // eslint-disable-next-line no-unused-vars
    let dayIndex = 0;
    daysWithRecipe.forEach((day, i) => {
      if (day === goingOut) {
        return;
      }
      const randomRecipe = recipes[Math.floor(Math.random() * (recipes.length - 1)) + 1];
      daysWithRecipe[i] = randomRecipe?.id;
      dayIndex += 1;
    });
    if (week?.id) {
      const payload = {
        id: week?.id,
        user: user.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      updateWeek(payload).then(() => router.push('/'));
    } else {
      const payload = {
        user: user?.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      createWeek(payload).then(() => router.push('/'));
    }
  };

  const handleClickSingle = () => {
    const randomMealIndex = Math.floor(Math.random() * recipes?.length);
    const randomMeal = recipes[randomMealIndex];
    getSingleRecipe(randomMeal?.id).then(() => router.push(`/Recipe/${randomMeal.id}`));
  };

  return (
    <>
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClick}>
        <h2>Click for New Meals for the Week</h2>
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
        <h2>Click for One Meal</h2>
      </Button>
    </>
  );
}

WeekForm.propTypes = {
  week: PropTypes.shape({
    monday: PropTypes.shape({}),
    Tuesday: PropTypes.shape({}),
    wednesday: PropTypes.shape({}),
    thursday: PropTypes.shape({}),
    friday: PropTypes.shape({}),
    saturday: PropTypes.shape({}),
    sunday: PropTypes.shape({}),
    id: PropTypes.number,
    uid: PropTypes.string,
  }),
};

WeekForm.defaultProps = {
  week: {
    monday: {},
    Tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
    id: 0,
    uid: '',
  },
};
