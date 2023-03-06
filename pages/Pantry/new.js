import Head from 'next/head';
import PantryForm from '../../components/Forms/pantryForm';

export default function NewTrade() {
  return (
    <>
      <Head>
        <title>Hangry Meals - Add to Pantry</title>
        <meta name="Add to Pantry" content="Pantry" />
      </Head>
      <PantryForm />
    </>
  );
}
