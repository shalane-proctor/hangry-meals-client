import Head from 'next/head';
import RecipeForm from '../../components/Forms/recipeForm';

export default function NewRecipe() {
  return (
    <>
      <Head>
        <title>Hangry Meals - New Recipe</title>
        <meta name="Add Recipe" content="Recipe Form" />
      </Head>
      <RecipeForm />
    </>
  );
}
