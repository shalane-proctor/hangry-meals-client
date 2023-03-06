import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/Forms/recipeForm';
import { useAuth } from '../../../utils/context/authContext';
import { getRecipesByUser, getSingleRecipe } from '../../../utils/data/recipeData';

export default function NewTrade() {
  const [editRecipe, setEditRecipe] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecipe(id).then(setEditRecipe);
  }, [id]);

  return (
    <>
      <Head>
        <title>Hangry Meals - Edit Recipe</title>
        <meta name="Edit Recipe" content="Recipe Form" />
      </Head>
      <RecipeForm user={user} recipe={editRecipe} onUpdate={getRecipesByUser} />
    </>
  );
}
