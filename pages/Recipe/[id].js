import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IngredientCards from '../../components/Cards/ingredientCard';
import RecipeCards from '../../components/Cards/recipeDetails';
import IngredientModal from '../../components/Forms/ingredientModal';
import { useAuth } from '../../utils/context/authContext';
import { getPantriesByUser } from '../../utils/data/pantryData';
import { getSingleRecipe } from '../../utils/data/recipeData';
import { getRecipeIngredientsByRecipe } from '../../utils/data/recipeIngredientsData';

export default function SingleRecipe() {
  const [recipe, setRecipe] = useState({});
  const [pantry, setPantry] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getAllRecipeIngredients = () => {
    getRecipeIngredientsByRecipe(id).then(setIngredients);
  };

  useEffect(() => {
    getPantriesByUser(user.id).then(setPantry);
    getSingleRecipe(id).then(setRecipe);
    getAllRecipeIngredients();
  }, [id]);

  return (
    <>
      <RecipeCards recipe={recipe} />
      {ingredients?.map((data) => (
        <IngredientCards key={data?.ingredient?.id} ingredient={data?.ingredient} onUpdate={getAllRecipeIngredients} pantry={pantry} />
      ))}
      <IngredientModal recipeId={recipe?.id} user={user} onUpdate={getAllRecipeIngredients} />
    </>
  );
}
