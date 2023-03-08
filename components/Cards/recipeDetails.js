import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { getSingleIngredient } from '../../utils/data/ingredientsData';
import { deleteRecipe } from '../../utils/data/recipeData';
import { getRecipeIngredientsByRecipe } from '../../utils/data/recipeIngredientsData';

export default function RecipeCards({ recipe, onUpdate }) {
  const [ingredients, setIngredients] = useState([]);
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipe?.name}?`)) {
      deleteRecipe(recipe?.id).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getRecipeIngredientsByRecipe(recipe.id).then((data) => {
      data.map((ing) => getSingleIngredient(ing?.ingredient).then(setIngredients));
    });
  }, [recipe]);

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>{recipe.instructions}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {ingredients.map((data) => (
            <ListGroup.Item as="li" key={data?.id}>
              {data}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Body>
          <Card.Link href={`/Recipe/edit/${recipe.id}`}>Edit</Card.Link>
          <Button onClick={deleteThisRecipe}>Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

RecipeCards.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    instructions: PropTypes.string,
  }),
  ingredients: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

RecipeCards.defaultProps = {
  recipe: {
    id: '',
    name: 'Add Name',
    instructions: 'Please add instructions',
  },
  ingredients: {
    id: 0,
    name: 'no name',
  },
};
