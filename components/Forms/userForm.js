import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';
import { registerUser } from '../../utils/auth';
import { updateUserProfile } from '../../utils/data/userData';

export default function UserForm({ user, updateUser }) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();

  useEffect(() => {
    if (user.id) {
      setFormInput(user);
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user?.id) {
      updateUserProfile(formInput).then(() => router.push('/'));
    } else {
      registerUser(user, formInput).then(() => updateUser(user.uid));
      router.push('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="form-titles">{user?.id ? 'Update' : 'Create'} Username</h1>
        <FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="username" name="username" value={formInput?.username} onChange={handleChange} required />
        </FloatingLabel>
        <Button variant="info" size="lg" className="my-buttons" type="submit">
          {user?.id ? 'Update' : 'Create'} Profile
        </Button>
      </Form>
    </>
  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};
