import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';
import { registerUser } from '../../utils/auth';
import { updateUserProfile } from '../../utils/data/userData';

export default function UserForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updateUserProfile(formInput).then(() => router.push('/'));
    } else {
      registerUser(formInput).then();
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
        <h1 className="form-titles">{obj?.id ? 'Update' : 'Add'} Item in Pantry</h1>
        <FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Pantry Item" name="pantryingredient" value={formInput?.ingredient} onChange={handleChange} required />
        </FloatingLabel>
        <Button variant="info" size="lg" className="my-buttons" type="submit">
          {obj?.id ? 'Update' : 'Add'}
        </Button>
      </Form>
    </>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    pantry: PropTypes.string,
    ingredient: PropTypes.string,
  }).isRequired,
};
