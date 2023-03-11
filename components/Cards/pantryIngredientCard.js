import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';
import { deletePantryIngredient } from '../../utils/data/pantryIngredientsData';

export default function PantryIngredientCards({ ingredient, pantryIngredient, onUpdate }) {
  const deleteThisIngredient = () => {
    deletePantryIngredient(pantryIngredient).then(() => onUpdate());
  };

  return (
    <>
      <ListGroup className="list-group-flush">
        <ListGroup.Item as="li" key={ingredient?.id}>
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

PantryIngredientCards.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    in_stock: PropTypes.bool,
  }),
  pantry: PropTypes.shape({
    id: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
  pantryIngredient: PropTypes.number,
};

PantryIngredientCards.defaultProps = {
  ingredient: PropTypes.shape({
    id: 0,
    name: '...',
    in_stock: false,
  }),
  pantry: {
    id: 0,
  },
  pantryIngredient: 0,
};
