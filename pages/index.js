/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import WeekOverview from '../components/Cards/weekOverview';
import StarterWeekForm from '../components/Forms/starterWeek';
import { useAuth } from '../utils/context/authContext';
import { getRecipesByUser } from '../utils/data/recipeData';
import { getWeeksByUser } from '../utils/data/weekData';

function Home() {
  const [recipe, setRecipe] = useState([]);
  const { user } = useAuth();
  const [week, setWeek] = useState([]);
  const getAllWeeksByUser = () => {
    getWeeksByUser(user?.id).then(setWeek);
    getRecipesByUser(user.id).then(setRecipe);
  };
  useEffect(() => {
    getAllWeeksByUser();
  }, [user]);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Shalane Proctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hangry Meals</title>
      </Head>
      {recipe === [] || recipe?.length <= 6 ? (
        <>
          <h1>Welcome to Hangry Meals! Please add some recipes. Please add at least 7 meals so we can set you off right for your meal plan!</h1><h3>Pssst! If you need some ideas, here!</h3><h3>Quick and Easy Meals</h3><h3>✨<a href="https://www.allrecipes.com/recipes/1947/everyday-cooking/quick-and-easy/">allrecipes</a>✨</h3>
          <Link href="/Recipe/new" passHref><Button>Add Recipe</Button></Link>
        </>
      ) : (
        <>
          <h1>Weeks Dashboard</h1>
          <h3>Week 1</h3>
          {/* if week.length less than 1, show roll */}
          {week[0] === undefined ? (
            <div>
              <StarterWeekForm onUpdate={getAllWeeksByUser} />
            </div>
          ) : (
            <div>
              <Link href={`/Week/Current/${week[0]?.id}`} passHref>
                <Button>View Week</Button>
              </Link>
              <WeekOverview key={week[0]?.id} week={week[0]} />
            </div>
          )}
          <h3>Week 2</h3>
          {/* if week.length less than 2, show roll */}
          {week[1] === undefined ? (
            <div>
              <StarterWeekForm onUpdate={getAllWeeksByUser} />
            </div>
          ) : (
            <div>
              <Link href={`/Week/Next/${week[1]?.id}`} passHref>
                <Button>View Week</Button>
              </Link>
              <WeekOverview key={week[1]?.id} week={week[1]} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
