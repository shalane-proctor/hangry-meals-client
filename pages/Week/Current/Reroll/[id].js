import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WeekForm from '../../../../components/Forms/weeksForm';
import { getSingleWeek } from '../../../../utils/data/weekData';

export default function RerollCurrentWeek() {
  const [week, setWeek] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleWeek(id).then(setWeek);
  }, [id]);

  return (
    <>
      <Head>
        <title>Uncrafted - Trade</title>
        <meta name="Randomizer" content="Week Randomizer" />
      </Head>
      <WeekForm week={week} />
    </>
  );
}
