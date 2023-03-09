import Head from 'next/head';
import WeekForm from '../../../components/Forms/weeksForm';

export default function NewTrade() {
  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Randomizer" content="Week Randomizer" />
      </Head>
      <WeekForm />
    </>
  );
}
