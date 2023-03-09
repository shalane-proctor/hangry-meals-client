import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getRecipesByUser } from '../../utils/data/recipeData';
import {
  createWeek, getSingleWeek, updateWeek,
} from '../../utils/data/weekData';
import { useAuth } from '../../utils/context/authContext';

export default function WeekForm({ week }) {
  const [selectedWeek, setSelectedWeek] = useState({});
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getRecipesByUser(user?.id).then(setRecipes);
    if (week.id) {
      getSingleWeek(week?.id).then(setSelectedWeek);
    }
  }, [user]);

  //   if (recipes.length < 14) {
  //     alert('Please add at least 14 recipes before generating a meal plan.');
  //     if (window.confirm(router.push))
  //   }

  //   const newWeeks = async (daysWithRecipe) => {
  //     const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  //     const currentWeek = [];
  //     const nextWeek = [];
  //     if (current.length === 2) {
  //       daysOfWeek.forEach((recipe, index) => {
  //         if (index < 7) {
  //           currentWeek[daysOfWeek[index]] = daysWithRecipe[index];
  //         } else {
  //           nextWeek[daysOfWeek[index - 7]] = daysWithRecipe[index];
  //         }
  //       });
  //       const week1 = {
  //         id: current[0].id,
  //         user: user.uid,
  //         monday: currentWeek[0],
  //         tuesday: currentWeek[1],
  //         wednesday: currentWeek[2],
  //         thursday: currentWeek[3],
  //         friday: currentWeek[4],
  //         saturday: currentWeek[5],
  //         sunday: currentWeek[6],
  //       };
  //       const week2 = {
  //         id: current[1].id,
  //         user: user.uid,
  //         monday: currentWeek[0],
  //         tuesday: currentWeek[1],
  //         wednesday: currentWeek[2],
  //         thursday: currentWeek[3],
  //         friday: currentWeek[4],
  //         saturday: currentWeek[5],
  //         sunday: currentWeek[6],
  //       };
  //       const promises = [updateWeek(week1), updateWeek(week2)];
  //       await Promise.all(promises);
  //     } else {
  //       daysOfWeek.forEach((recipe, index) => {
  //         if (index < 7) {
  //           currentWeek[daysOfWeek[index]] = recipe;
  //         } else {
  //           nextWeek[daysOfWeek[index - 7]] = recipe;
  //         }
  //       });
  //       const week1 = {
  //         user: user.uid,
  //         monday: currentWeek[0],
  //         tuesday: currentWeek[1],
  //         wednesday: currentWeek[2],
  //         thursday: currentWeek[3],
  //         friday: currentWeek[4],
  //         saturday: currentWeek[5],
  //         sunday: currentWeek[6],
  //       };
  //       const week2 = {
  //         user: user.uid,
  //         monday: currentWeek[0],
  //         tuesday: currentWeek[1],
  //         wednesday: currentWeek[2],
  //         thursday: currentWeek[3],
  //         friday: currentWeek[4],
  //         saturday: currentWeek[5],
  //         sunday: currentWeek[6],
  //       };
  //       const promises = [createWeek(week1), createWeek(week2)];
  //       await Promise.all(promises);
  //     }
  //   };

  //   // const reRoll = async () => {
  //   //   const currentWeek = daysWithRecipe.slice(0, 7);
  //   //   await updateWeek(currentWeek).then();
  //   // };

  const handleClick = () => {
    const goingOut = recipes[0];
    const daysWithRecipe = Array.from({ length: 7 }, () => []);
    const goingOutDay1 = Math.floor(Math.random() * 7);
    daysWithRecipe[goingOutDay1] = goingOut.id;
    // eslint-disable-next-line no-unused-vars
    let dayIndex = 0;
    daysWithRecipe.forEach((day, i) => {
      if (day !== goingOut) {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        daysWithRecipe[i] = randomRecipe.id;
        dayIndex += 1;
      }
      dayIndex %= 7;
    });
    console.log(daysWithRecipe);
    if (week?.id) {
      const payload = {
        id: selectedWeek.id,
        user: user.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      console.log('update!', payload);
      updateWeek(payload).then(() => router.push(`/Week/${week?.id}`));
    } else {
      const payload = {
        user: user.uid,
        monday: daysWithRecipe[0],
        tuesday: daysWithRecipe[1],
        wednesday: daysWithRecipe[2],
        thursday: daysWithRecipe[3],
        friday: daysWithRecipe[4],
        saturday: daysWithRecipe[5],
        sunday: daysWithRecipe[6],
      };
      console.log('created!', payload);
      createWeek(payload).then((data) => router.push(`/Week/${data?.id}`));
    }
  };

  //   const handleClickWeekWith2WC = () => {
  //     const goingOut = recipes[0];
  //     const daysWithRecipe = Array.from({ length: 14 }, () => []);
  //     const goingOutDay1 = Math.floor(Math.random() * 7);
  //     const goingOutDay2 = Math.floor(Math.random() * 7);
  //     const goingOutDay3 = Math.floor(Math.random() * 7) + 7;
  //     const goingOutDay4 = Math.floor(Math.random() * 7) + 7;
  //     daysWithRecipe[goingOutDay1] = goingOut;
  //     daysWithRecipe[goingOutDay2] = goingOut;
  //     daysWithRecipe[goingOutDay3] = goingOut;
  //     daysWithRecipe[goingOutDay4] = goingOut;
  //     // eslint-disable-next-line no-unused-vars
  //     let dayIndex = 0;
  //     daysWithRecipe.forEach((day, i) => {
  //       if (day !== goingOut) {
  //         const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  //         daysWithRecipe[i] = randomRecipe.id;
  //         dayIndex += 1;
  //       }
  //       dayIndex %= 7;
  //     });
  //     newWeeks(daysWithRecipe);
  //   };

  //   const handleClickWithNoWC = () => {
  //     const goingOut = recipes[0];
  //     const daysWithRecipe = Array.from({ length: 14 }, () => []);
  //     // eslint-disable-next-line no-unused-vars
  //     let dayIndex = 0;
  //     daysWithRecipe.forEach((day, i) => {
  //       if (day !== goingOut) {
  //         const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  //         daysWithRecipe[i] = randomRecipe.id;
  //         dayIndex += 1;
  //       }
  //       dayIndex %= 7;
  //     });
  //     newWeeks(daysWithRecipe);
  //   };

  //   const handleClickSingle = () => {
  //     const randomMeal = Math.floor(Math.random() * recipes.length);
  //     getSingleRecipe(randomMeal).then(() => router.push(`/Recipe/${randomMeal}`));
  //   };

  return (
    <>
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClick}>
        Click for New Meals for the Week
      </Button>{' '}
      {/* <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickWeekWith2WC}>
        <h2>New Meals with Extra Wild Card</h2>
        <h6>Extra Order Out Day</h6>
      </Button>{' '}
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickWithNoWC}>
        <h2>New Meals with No Wild Card</h2>
        <h6>No Order Out Day</h6>
      </Button>
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClickSingle}>
        Click for One Meal
      </Button> */}
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
  }),
};

WeekForm.defaultProps = {
  week: {
    monday: 0,
    Tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    id: 0,
    uid: '',
  },
};
