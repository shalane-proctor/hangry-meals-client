import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../utils/data/recipeData';

const recipeInitialState = {
  id: 0,
  user: {},
  name: '',
  instructions: '',
};

export default function RecipeForm({ recipe }) {
  const [formInput, setFormInput] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (recipe.id) {
      setFormInput(recipe);
    }
  }, [recipe, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipe.id) {
      const payload = {
        id: recipe.id,
        name: formInput.name,
        instructions: formInput.instructions,
        user: user.uid,
      };
      updateRecipe(payload).then(() => router.push(`/Recipe/${recipe.id}`));
    } else {
      const payload = {
        name: formInput.name,
        instructions: formInput.instructions,
        user: user.uid,
      };
      createRecipe(payload).then((data) => router.push(`/Recipe/${data.id}`));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ color: 'slategrey' }}>
        <h1 style={{ color: 'aqua' }}>{recipe.id ? 'Update' : 'Create'} a Recipe</h1>
        <FloatingLabel controlId="floatingTextarea" label="Recipe Name" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Name" name="name" value={formInput?.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Instructions" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Instructions" name="instructions" value={formInput?.instructions} onChange={handleChange} required />
        </FloatingLabel>
        <Button variant="primary" type="submit" className="my-buttons mb-3">
          {recipe.id ? 'Update' : 'Create'} Recipe
        </Button>
      </Form>
    </>
  );
}

RecipeForm.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({}),
    name: PropTypes.string,
    instructions: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  recipe: {
    recipeInitialState,
  },
};
