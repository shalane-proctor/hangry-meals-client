import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createIngredient } from '../../utils/data/ingredientsData';
import { getRecipesByUser } from '../../utils/data/recipeData';
import { createRecipeIngredient } from '../../utils/data/recipeIngredientsData';

export default function IngredientModal({ recipeId, onUpdate, user }) {
  const [show, setShow] = useState(false);
  const [goingOut, setGoingOut] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [formInput, setFormInput] = useState();

  useEffect(() => {
    getRecipesByUser(user.id).then((data) => setGoingOut(data[0]));
  }, [user]);

  const handleClose = () => {
    setFormInput('');
    setIsChecked(false);
    setShow(false);
  };
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
      user: user?.uid,
      in_stock: isChecked,
    };
    createIngredient(payload).then((ingredientId) => {
      const recipePayload = {
        recipe: recipeId,
        ingredient: ingredientId?.id,
      };
      createRecipeIngredient(recipePayload).then(() => onUpdate());
      handleClose();
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {recipeId === goingOut?.id ? 'Add Restraunt Ideas' : 'Add Ingredient'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{recipeId === goingOut?.id ? 'Add Restraunt Ideas' : 'Add Ingredient'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingTextarea" label={recipeId === goingOut?.id ? 'Add Restraunt Ideas' : 'Ingredient'} className="mb-3 all-my-form-labels">
            <Form.Control className="all-my-form-input" as="textarea" placeholder="Ingredient" name="name" value={formInput?.name} onChange={handleChange} required />
          </FloatingLabel>
          <div>
            <label>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              {recipeId === goingOut?.id ? 'Favorite' : 'In Stock?'}
            </label>
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" size="lg" className="my-buttons" type="submit">
            {recipeId === goingOut?.id ? 'Add Restraunt Ideas' : 'Add Ingredient'}
          </Button>
        </Form>
      </Modal>
    </>
  );
}

IngredientModal.propTypes = {
  ingredients: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    in_stock: PropTypes.bool,
  }),
  recipeId: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
  }).isRequired,
};

IngredientModal.defaultProps = {
  ingredients: {
    id: 0,
    user: 1,
    name: 'No Name',
    in_stock: false,
  },
  recipeId: 0,
};
