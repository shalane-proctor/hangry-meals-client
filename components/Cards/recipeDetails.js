import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { deleteRecipe } from '../../utils/data/recipeData';

export default function RecipeCards({ recipe, ingredients, onUpdate }) {
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipe?.name}?`)) {
      deleteRecipe(recipe?.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="Monday">
        <Card.Header />
        <Card.Body>
          <Card.Title />
          <Card.Text>{ingredients}</Card.Text>
          <Link href={`/Recipe/${recipe.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>{recipe.instructions}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {ingredients.map((data) => (!data?.in_stock ? (
            <ListGroup.Item as="li" key={data?.id}>
              {data}
            </ListGroup.Item>
          ) : (
            <ListGroup.Item as="li" disabled>
              {data}
            </ListGroup.Item>
          )))}
        </ListGroup>
        <Card.Body>
          <Card.Link href={`/Recipe/${recipe.id}`}>Edit</Card.Link>
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
  ingredients: PropTypes.arrayOf([]),
  onUpdate: PropTypes.func.isRequired,
};

RecipeCards.defaultProps = {
  recipe: PropTypes.shape({
    id: '',
    name: 'Add Name',
    instructions: 'Please add instructions',
  }),
  ingredients: [],
};
