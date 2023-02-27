import Head from 'next/head';
import React from 'react';
import UserForm from '../../../components/Forms/userForm';

export default function newProfile() {
  return (
    <>
      <Head>
        <title>Hangry Meals - Create Username</title>
        <meta name="Username" content="Individual username page" />
      </Head>
      <div className="center-page">
        <UserForm />
      </div>
    </>
  );
}
