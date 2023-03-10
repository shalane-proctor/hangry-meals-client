import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { deleteIngredient } from '../../utils/data/ingredientsData';
import { createPantryIngredient, getSinglePantryIngredients } from '../../utils/data/pantryIngredientsData';

export default function IngredientCards({ ingredient, pantry, onUpdate }) {
  const deleteThisIngredient = () => {
    deleteIngredient(ingredient?.id).then(() => onUpdate());
  };

  const [inPantry, setInPantry] = useState();

  useEffect(() => {
    getSinglePantryIngredients(ingredient?.id).then(setInPantry);
  }, [ingredient]);

  console.log(inPantry);

  const handleClick = (e) => {
    e.preventDefault();
    const payload = {
      pantry: pantry?.id,
      ingredient: ingredient?.id,
    };
    createPantryIngredient(payload).then(() => onUpdate());
  };

  return (
    <>
      <ListGroup className="list-group-flush">
        <ListGroup.Item as="li" key={ingredient?.id}>
          {inPantry?.id === undefined ? (
            <Button variant="primary" type="button" className="my-buttons mb-3" onClick={handleClick}>
              🫙
            </Button>
          ) : (
            ''
          )}
          {ingredient.in_stock ? ' ✅ ' : ''}
          {ingredient.name}
          <Button
            variant="primary"
            type="button"
            className="my-buttons mb-3"
            style={{
              background: 'none',
              border: 'none',
              color: 'black',
              margin: '0px !important',
            }}
            onClick={deleteThisIngredient}
          >
            X
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

IngredientCards.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    in_stock: PropTypes.bool,
  }),
  pantry: PropTypes.shape({
    id: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

IngredientCards.defaultProps = {
  ingredient: PropTypes.shape({
    id: 0,
    name: '...',
    in_stock: false,
  }),
  pantry: {
    id: 0,
  },
};
