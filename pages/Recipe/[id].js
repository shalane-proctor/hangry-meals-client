import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IngredientCards from '../../components/Cards/ingredientCard';
import RecipeCards from '../../components/Cards/recipeDetails';
import IngredientModal from '../../components/Forms/ingredientModal';
import { useAuth } from '../../utils/context/authContext';
import { getSingleRecipe } from '../../utils/data/recipeData';
import { getRecipeIngredientsByRecipe } from '../../utils/data/recipeIngredientsData';

export default function SingleRecipe() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getAllRecipeIngredients = () => {
    getRecipeIngredientsByRecipe(id).then(setIngredients);
  };

  useEffect(() => {
    getSingleRecipe(id).then(setRecipe);
    getAllRecipeIngredients();
  }, [id]);

  return (
    <>
      <RecipeCards recipe={recipe} />
      {ingredients?.map((data) => (<IngredientCards key={data?.ingredient?.id} ingredient={data?.ingredient} onUpdate={getAllRecipeIngredients} />))}
      <IngredientModal recipeId={recipe?.id} user={user} onUpdate={getAllRecipeIngredients} />
    </>
  );
}
