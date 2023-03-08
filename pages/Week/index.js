import Head from 'next/head';
import { useEffect, useState } from 'react';
import WeekCards from '../../components/Cards/weekDetails';
import { useAuth } from '../../utils/context/authContext';
import { getWeeksByUser } from '../../utils/data/weekData';

function NextWeek() {
  const [week, setWeek] = useState([]);
  const { user } = useAuth();
  const getAllWeeksByUser = () => {
    getWeeksByUser(user.id).then(setWeek[1]);
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
      <WeekCards key={week.id} week={week[0]} onUpdate={getAllWeeksByUser} />
      <WeekCards key={week.id} week={week[1]} onUpdate={getAllWeeksByUser} />
    </>
  );
}

export default NextWeek;
