import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/Forms/recipeForm';
import { getSingleRecipe } from '../../../utils/data/recipeData';
import { getRecipeIngredientsByRecipe } from '../../../utils/data/recipeIngredientsData';

export default function EditRecipe() {
  const [editRecipe, setEditRecipe] = useState({});
  const [ingredients, setIngredient] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const getRecipe = () => {
    getSingleRecipe(id).then(setEditRecipe);
    getRecipeIngredientsByRecipe(id).then(setIngredient);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      <Head>
        <title>Hangry Meals - Edit Recipe</title>
        <meta name="Edit Recipe" content="Recipe Form" />
      </Head>
      <RecipeForm key={id} recipe={editRecipe} ingredients={ingredients} onUpdate={getRecipe} />
    </>
  );
}
