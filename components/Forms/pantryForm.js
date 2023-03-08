import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';
import { createIngredient } from '../../utils/data/ingredientsData';
import { createPantryIngredient } from '../../utils/data/pantryIngredientsData';
import { getPantriesByUser } from '../../utils/data/pantryData';
import { useAuth } from '../../utils/context/authContext';

export default function PantryForm() {
  const [formInput, setFormInput] = useState();
  const [pantry, setPantry] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPantriesByUser(user.id).then(setPantry);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formInput.name,
      user: user.uid,
      in_stock: isChecked,
    };
    createIngredient(payload).then((ingredientId) => {
      const pantryPayload = {
        pantry: pantry.id,
        ingredient: ingredientId?.id,
      };
      createPantryIngredient(pantryPayload).then(() => router.push(`/Pantry/${user.id}`));
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  console.log(user, pantry, isChecked, formInput);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="form-titles">Add Item in Pantry</h1>
        <FloatingLabel controlId="floatingTextarea" label="Ingredient" className="mb-3 all-my-form-labels">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Pantry Item" name="name" value={formInput?.ingredient} onChange={handleChange} required />
        </FloatingLabel>
        <div>
          <label>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            In Stock?
          </label>
        </div>
        <Button variant="info" size="lg" className="my-buttons" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
}
