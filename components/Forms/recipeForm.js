import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../utils/data/recipeData';
import { createIngredient } from '../../utils/data/ingredientsData';
import { createRecipeIngredient, getRecipeIngredientsByRecipe } from '../../utils/data/recipeIngredientsData';

const recipeInitialState = {
  id: '',
  user: '',
  name: '',
  instructions: '',
};

const initialState = {
  id: '',
  user: '',
  name: '',
  in_stock: false,
};
export default function RecipeForm({ recipe }) {
  const [formInput, setFormInput] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (recipe.id) {
      setFormInput(recipe);
      getRecipeIngredientsByRecipe(recipe.id).then(setIngredientsArray);
    }
  }, [recipe, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setIngredientsArray([...ingredientsArray, ingredient]);
    setIngredient('');
    const payload = {
      ...ingredient,
      user: user.uid,
      in_stock: isChecked,
    };
    createIngredient(payload).then(() => {});
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
      createRecipe(payload).then((recipeId) => {
        const recipeIngredientsPromises = ingredientsArray.map((item) => {
          const recipeIngredient = {
            recipe: recipeId.id,
            name: item.id,
          };
          return createRecipeIngredient(recipeIngredient);
        });
        // Use Promise.all() to wait for all of the recipeIngredientsPromises to resolve:
        return Promise.all(recipeIngredientsPromises);
      })
        .then((recipeIngredients) => {
          console.log('Created recipe ingredients:', recipeIngredients);
        })
        .catch((error) => {
          console.error('Error creating recipe:', error);
        });
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
        <div>
          <input type="checkbox" name="in_stock" value="in_stock" onChange={(e) => setIsChecked(e.currentTarget.checked)} checked={isChecked} />
          <button type="button" onClick={() => setIsChecked(!isChecked)}>
            In Stock?
          </button>
        </div>
        <FloatingLabel controlId="floatingTextarea" label="Ingredient" className="mb-3">
          <Form.Control className="all-my-form-input" as="textarea" placeholder="Ingredient" name="name" value={ingredient?.name} onChange={handleChange} required />
        </FloatingLabel>
        <ListGroup as="ul">
          {ingredientsArray.map((data) => (!data?.in_stock ? (
            <ListGroup.Item as="li" key={data?.id}>
              {data}
              <Button variant="primary" type="button" className="my-buttons mb-3">
                X
              </Button>
            </ListGroup.Item>
          ) : (
            <ListGroup.Item as="li" disabled>
              {data}
              <Button variant="primary" type="button" className="my-buttons mb-3">
                X
              </Button>
            </ListGroup.Item>
          )))}
        </ListGroup>
        <Button variant="primary" type="button" className="my-buttons mb-3" onClick={handleClick}>
          Add ingredients
        </Button>
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
  ingredients: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({}),
    name: PropTypes.string,
    in_stock: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  recipe: {
    recipeInitialState,
  },
  ingredients: {
    initialState,
  },
};
