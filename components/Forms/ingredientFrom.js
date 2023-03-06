import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createIngredient } from '../../utils/data/ingredientsData';

const initialState = {
  id: '',
  user: '',
  name: '',
  in_stock: false,
};
export default function IngredientForm([recipeIngredients]) {
  const [isChecked, setIsChecked] = useState(false);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (recipeIngredients) {
      setIngredientsArray([recipeIngredients]);
    }
  }, [recipeIngredients, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIngredientsArray([...ingredientsArray, ingredient]);
    setIngredient('');
    const payload = {
      ...ingredient,
      user: user.uid,
      in_stock: isChecked,
    };
    createIngredient(payload).then(() => {});
  };
  return (
    <Form>
      <div>
        <input type="checkbox" name="in_stock" value="in_stock" onChange={(e) => setIsChecked(e.currentTarget.checked)} checked={isChecked} />
        <button type="button" onClick={() => setIsChecked(!isChecked)}>
          In Stock?
        </button>
      </div>
      <FloatingLabel controlId="floatingTextarea" label="Ingredient" className="mb-3">
        <Form.Control className="all-my-form-input" as="textarea" placeholder="Ingredient" name="name" value={ingredient?.name} onChange={handleChange} required />
      </FloatingLabel>
      <Button
        variant="primary"
        type="button"
        className="my-buttons mb-3"
        onClick={handleClick}
      >
        Add ingredients
      </Button>
      <ListGroup as="ul">
        {ingredientsArray.map((data) => (
          (!data?.in_stock ? (
            <ListGroup.Item as="li" key={data?.id}>
              {data}
            </ListGroup.Item>
          ) : (
            <ListGroup.Item as="li" disabled>
              {data}
            </ListGroup.Item>
          ))
        ))}
      </ListGroup>
    </Form>
  );
}

IngredientForm.propTypes = {
  ingredients: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({}),
    name: PropTypes.string,
    in_stock: PropTypes.string,
  }),
};

IngredientForm.defaultProps = {
  ingredients: {
    initialState,
  },
};
