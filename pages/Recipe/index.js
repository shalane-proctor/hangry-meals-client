import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import RecipeCards from '../../components/Cards/recipeCard';
import { useAuth } from '../../utils/context/authContext';
import { getRecipesByUser } from '../../utils/data/recipeData';

export default function Recipe() {
  const [recipe, setRecipe] = useState([]);
  const { user } = useAuth();
  const getAllRecipesByUser = () => {
    getRecipesByUser(user.id).then(setRecipe);
  };
  useEffect(() => {
    getAllRecipesByUser();
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
      <Link href="/Recipe/new" passHref>
        <Button>Add Recipe</Button>
      </Link>
      {recipe.map((data, index) => (index === 0 ? '' : (<RecipeCards key={data.id} recipe={data} onUpdate={getAllRecipesByUser} />)))}
    </>
  );
}
