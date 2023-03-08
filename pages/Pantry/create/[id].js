import Head from 'next/head';
import { useRouter } from 'next/router';
import PantryForm from '../../../components/Forms/pantryForm';

export default function NewPantryIngredient() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Hangry Meals - Add to Pantry</title>
        <meta name="Add to Pantry" content="Pantry" />
      </Head>
      <PantryForm pantryId={id} />
    </>
  );
}
