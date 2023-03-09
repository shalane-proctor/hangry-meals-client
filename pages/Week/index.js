import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import WeekOverview from '../../components/Cards/weekOverview';
import { useAuth } from '../../utils/context/authContext';
import { getWeeksByUser } from '../../utils/data/weekData';

function NextWeek() {
  const [week, setWeek] = useState([]);
  const { user } = useAuth();
  const getAllWeeksByUser = () => {
    getWeeksByUser(user.id).then(setWeek);
  };
  useEffect(() => {
    getAllWeeksByUser();
  }, [user]);

  console.log(week);
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Shalane Proctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hangry Meals</title>
      </Head>
      <h1>Weeks Dashboard</h1>
      <h3>Week 1</h3>
      {/* if week.length less than 1, show roll */}
      <Link href={`/Week/Current-Week/${week[0]?.id}`} passHref>
        <Button>View Week</Button>
      </Link>
      <WeekOverview key={week[0]?.id} week={week[0]} />
      <h3>Week 2</h3>
      {/* if week.length less than 2, show roll */}
      <Link href={`/Week/Next-Week/${week[0]?.id}`} passHref>
        <Button>View Week</Button>
      </Link>
      <WeekOverview key={week[1]?.id} week={week[1]} />
    </>
  );
}

export default NextWeek;
