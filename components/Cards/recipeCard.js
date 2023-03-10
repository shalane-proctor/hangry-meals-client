import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function RecipeCards({ recipe }) {
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{recipe?.name}</Card.Title>
          <Card.Text className="allRecipeInstruct">{recipe?.instructions}</Card.Text>
          <Link href={`/Recipe/${recipe?.id}`} passHref><Button>View</Button></Link>
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
};

RecipeCards.defaultProps = {
  recipe: {
    id: '',
    name: 'Add Name',
    instructions: 'Please add instructions',
  },
};
