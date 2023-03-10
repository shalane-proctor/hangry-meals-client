import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../utils/context/authContext';
import { deleteRecipe, getRecipesByUser } from '../../utils/data/recipeData';

export default function RecipeDetails({ recipe }) {
  const router = useRouter();
  const { user } = useAuth();
  const [goingOut, setGoingOut] = useState({});
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipe?.name}?`)) {
      deleteRecipe(recipe?.id).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    getRecipesByUser(user.id).then((data) => setGoingOut(data[0]));
  }, [user]);

  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{recipe?.name}</Card.Title>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>{recipe?.instructions}</Card.Text>
          {recipe?.id === goingOut?.id ? ''
            : (
              <div><Card.Link href={`/Recipe/edit/${recipe?.id}`}>Edit</Card.Link>
                <Button style={{ background: 'white', border: 'none', color: 'black' }} onClick={deleteThisRecipe}>Delete</Button>
              </div>
            )}
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
