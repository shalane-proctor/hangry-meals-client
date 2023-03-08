import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../utils/data/recipeData';

const recipeInitialState = {
  id: 0,
  user: 0,
  name: '',
  instructions: '',
};

export default function RecipeForm({ recipe }) {
  const [formInput, setFormInput] = useState();
  const { user } = useAuth();

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
        ...formInput,
      };
      updateRecipe(payload).then();
    } else {
      const payload = {
        name: recipe.name,
        instructions: recipe.instructions,
        user: user.uid,
      };
      createRecipe(payload).then();
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
    name: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
  }),
  // ingredients: PropTypes.shape({
  //   id: PropTypes.number,
  //   user: PropTypes.shape({}),
  //   ingredientname: PropTypes.string,
  //   in_stock: PropTypes.string,
  // }),
};

RecipeForm.defaultProps = {
  recipe: {
    recipeInitialState,
  },
  // ingredients: {
  //   initialState,
  // },
};
