import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';
import { deleteIngredient } from '../../utils/data/ingredientsData';

export default function IngredientCards({ ingredient, onUpdate }) {
  const deleteThisIngredient = () => {
    deleteIngredient(ingredient?.id).then(() => onUpdate());
  };

  return (
    <>
      <ListGroup className="list-group-flush">
        <ListGroup.Item as="li" key={ingredient?.id}>
          {ingredient.in_stock ? '✅ ' : ''}
          {ingredient.name}
          <Button
            variant="primary"
            type="button"
            className="my-buttons mb-3"
            style={{
              background: 'none', border: 'none', color: 'black', margin: '0px !important',
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
  onUpdate: PropTypes.func.isRequired,
};

IngredientCards.defaultProps = {
  ingredient: PropTypes.shape({
    id: 0,
    name: '...',
    in_stock: false,
  }),
};
