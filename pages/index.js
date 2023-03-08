import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getRecipesByUser } from '../utils/data/recipeData';

function Home() {
  const { user } = useAuth();
  const { recipes, setRecipes } = useState();

  useEffect(() => {
    getRecipesByUser(user.id).then(setRecipes);
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
      {recipes?.length > 7 ? (<h1>Welcome Back! We hope you are enjoying your meal plans so far!</h1>)
        : (
          <>
            <h1>Welcome to Hangry Meals! Please start by adding some recipes. Please add at least 7 meals so we can set you off right for your meal plan!</h1><h3>Pssst! If you need some ideas, here is a link to</h3> <h3>✨<a href="https://www.allrecipes.com/recipes/1947/everyday-cooking/quick-and-easy/">allrecipes</a>✨</h3> <h3>Quick and Easy Meals</h3>
            <Link href="/Recipe/new" passHref><Button>Add Recipe</Button></Link>
          </>
        )}
    </>
  );
}

export default Home;
