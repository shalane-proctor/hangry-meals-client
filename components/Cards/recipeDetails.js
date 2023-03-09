import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { deleteRecipe } from '../../utils/data/recipeData';

export default function RecipeDetails({ recipe }) {
  const router = useRouter();
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipe?.name}?`)) {
      deleteRecipe(recipe?.id).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{recipe?.name}</Card.Title>
          <Card.Text>{recipe?.instructions}</Card.Text>
          <Card.Link href={`/Recipe/edit/${recipe?.id}`}>Edit</Card.Link>
          <Button onClick={deleteThisRecipe}>Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    instructions: PropTypes.string,
  }),
};

RecipeDetails.defaultProps = {
  recipe: {
    id: '',
    name: 'Add Name',
    instructions: 'Please add instructions',
  },
};
