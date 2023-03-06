import Head from 'next/head';
import React from 'react';
import UserForm from '../../../components/Forms/userForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditProfile() {
  const user = useAuth();
  return (
    <>
      <Head>
        <title>Hangry Meals - Create Username</title>
        <meta name="Username" content="Individual username page" />
      </Head>
      <div className="center-page">
        <UserForm user={user} />
      </div>
    </>
  );
}
