import Head from 'next/head';
import { useEffect, useState } from 'react';
import WeekCards from '../components/Cards/weekDetails';
import { getWeeksByUser } from '../utils/data/weekData';

function Home() {
  const [week, setWeek] = useState([]);
  const getAllWeeksByUser = () => {
    getWeeksByUser().then(setWeek[0]);
  };
  useEffect(() => {
    getAllWeeksByUser();
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
      <WeekCards key={week.id} week={week} />
    </>
  );
}

export default Home;
