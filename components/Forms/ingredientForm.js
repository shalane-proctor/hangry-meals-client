// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { Button, ListGroup } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { createIngredient } from '../../utils/data/ingredientsData';

// const initialState = {
//   id: '',
//   user: '',
//   name: '',
//   in_stock: false,
// };
// export default function IngredientForm([recipeIngredients]) {
//   const [isChecked, setIsChecked] = useState(false);
//   const [ingredient, setIngredient] = useState('');
//   const { user } = useAuth();

//   useEffect(() => {

//   }, [recipeIngredients, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setIngredient((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = {
//       name: ingredient.name,
//       user: user.uid,
//       in_stock: isChecked,
//     };
//     createIngredient(payload).then();
//   };

//   return (
//     <Form onSubmit={handleSubmit} style={{ color: 'slategrey' }}>
//       <FloatingLabel controlId="floatingTextarea" label="Ingredient" className="mb-3">
//         <Form.Control className="all-my-form-input" as="textarea" placeholder="Ingredient" name="ingredientname" value={newIngredient} onChange={handleNewIngredientChange} />
//       </FloatingLabel>

//       <Button variant="primary" type="button" className="my-buttons mb-3" onClick={handleAddIngredient}>
//         Add ingredients
//       </Button>
//       <div>
//         <label>
//           <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
//           In Stock?
//         </label>
//       </div>
//       <ListGroup as="ul">
//         {ingredientsArray.map((item, index) => (
//           <ListGroup.Item as="li" key={item.id}>
//             {item.ingredientname}
//             <Button variant="primary" type="button" className="my-buttons mb-3" onClick={() => handleDeleteIngredient(index)}>
//               X
//             </Button>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Form>
//   );
// }

// IngredientForm.propTypes = {
//   ingredients: PropTypes.shape({
//     id: PropTypes.number,
//     user: PropTypes.shape({}),
//     name: PropTypes.string,
//     in_stock: PropTypes.string,
//   }),
// };

// IngredientForm.defaultProps = {
//   ingredients: {
//     initialState,
//   },
// };
