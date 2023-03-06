import Head from 'next/head';
import { useEffect, useState } from 'react';
import RecipeCards from '../../components/Cards/recipeDetails';
import { getRecipesByUser } from '../../utils/data/recipeData';

function Recipe() {
  const [recipe, setRecipe] = useState([]);
  const getAllRecipesByUser = () => {
    getRecipesByUser().then(setRecipe);
  };
  useEffect(() => {
    getAllRecipesByUser();
  }, []);
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Shalane Proctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hangry Meals</title>
      </Head>
      {recipe.map((data) => (
        <RecipeCards key={data.id} recipe={data} onUpdate={getAllRecipesByUser} />))}
    </>
  );
}

export default Recipe;
