import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import WeekCards from '../../../components/Cards/weekDetails';
import { getSingleWeek } from '../../../utils/data/weekData';

export default function CurrentWeek() {
  const [week, setWeek] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const getWeek = () => {
    getSingleWeek(id).then(setWeek);
  };
  useEffect(() => {
    getWeek();
  }, [id]);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Shalane Proctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hangry Meals</title>
      </Head>
      <Link href={`/Week/Current/Reroll/${week?.id}`} passHref>
        <Button>Roll for Weeks</Button>
      </Link>
      <WeekCards key={week?.id} week={week} onUpdate={getWeek} />
    </>
  );
}
