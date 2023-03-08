import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../utils/context/authContext';
import { createIngredient } from '../../utils/data/ingredientsData';
import { createRecipeIngredient } from '../../utils/data/recipeIngredientsData';

function IngredientModal({ recipeId }) {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formInput, setFormInput] = useState();
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formInput.name,
      user: user.uid,
      in_stock: isChecked,
    };
    createIngredient(payload).then((ingredientId) => {
      const recipePayload = {
        recipe: recipeId,
        ingredient: ingredientId?.id,
      };
      createRecipeIngredient(recipePayload).then(() => handleClose);
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Ingredient
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ingredient</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingTextarea" label="Ingredient" className="mb-3 all-my-form-labels">
            <Form.Control className="all-my-form-input" as="textarea" placeholder="Ingredient" name="name" value={formInput?.name} onChange={handleChange} required />
          </FloatingLabel>
          <div>
            <label>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              In Stock?
            </label>
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" size="lg" className="my-buttons" type="submit">
            Add Ingredient
          </Button>
        </Form>
      </Modal>
    </>
  );
}

IngredientModal.propTypes = {
  ingredients: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({}),
    name: PropTypes.string,
    in_stock: PropTypes.bool,
  }),
  recipeId: PropTypes.number.isRequired,
};

IngredientModal.defaultProps = {
  ingredients: {
    id: 0,
    user: 1,
    name: 'No Name',
    in_stock: false,
  },
};
