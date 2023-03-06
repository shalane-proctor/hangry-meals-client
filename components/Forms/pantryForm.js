import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';
import { createIngredient } from '../../utils/data/ingredientsData';
import { createPantryIngredient } from '../../utils/data/pantryIngredientsData';

export default function PantryForm({ pantryId }) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createIngredient(formInput).then((ingredientId) => {
      createPantryIngredient(ingredientId, pantryId).then(() => router.push('/pantry'));
    });
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
        <h1 className="form-titles">Add Item in Pantry</h1>
        <FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Pantry Item" name="pantryingredient" value={formInput?.ingredient} onChange={handleChange} required />
        </FloatingLabel>
        <Button variant="info" size="lg" className="my-buttons" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
}

PantryForm.propTypes = {
  pantryId: PropTypes.number.isRequired,
};
