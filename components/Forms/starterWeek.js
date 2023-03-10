import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getRecipesByUser } from '../../utils/data/recipeData';
import { createWeek } from '../../utils/data/weekData';
import { useAuth } from '../../utils/context/authContext';

export default function StarterWeekForm({ onUpdate }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getRecipesByUser(user?.id)
      .then((data) => {
        if (isMounted) {
          setRecipes(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
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
    createWeek(payload).then(() => onUpdate());
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Button variant="info" size="lg" className="my-buttons" type="button" onClick={handleClick}>
        <h2>Click for Starter Week</h2>
      </Button>{' '}
    </>
  );
}

StarterWeekForm.propTypes = {
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
  onUpdate: PropTypes.func.isRequired,
};

StarterWeekForm.defaultProps = {
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
