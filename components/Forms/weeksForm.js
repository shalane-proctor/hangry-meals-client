// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import Form from 'react-bootstrap/Form';
// import { Button, FloatingLabel } from 'react-bootstrap';
// import { registerUser } from '../../utils/auth';
// import { updateUserProfile } from '../../utils/data/userData';

// export default function MealForm({}) {
//   const [mealPlan, setMealPlan] = useState([]);
//   const [mealPlanW2, setMealPlanW2] = useState([]);
//   const [mealPlanWN, setMealPlanWN] = useState([]);
//   const [single, setSingle] = useState();
//   const router = useRouter();

//   useEffect(() => {
//     const recipes = [
//       'Spaghetti and Meatballs',
//       'Chicken Stir Fry',
//       'Taco Salad',
//       'Pesto Pasta',
//       'Grilled Cheese and Tomato Soup',
//       'Beef Stroganoff',
//       'Fried Rice'
//     ];

//     let goingOutDay;
//     const chosenRecipes = [];

//     recipes.forEach((recipe, index) => {
//       if (index === Math.floor(Math.random() * 6)) {
//         chosenRecipes.push('Going out to eat!');
//         goingOutDay = index;
//       } else {
//         const randomIndex = Math.floor(Math.random() * recipes.length);
//         chosenRecipes.push(recipes[randomIndex]);
//         recipes.splice(randomIndex, 1);
//       }
//     });

//     setMealPlan(chosenRecipes);
//   }, []);

//   const mealPlanList = mealPlan.map((meal, index) => <li key={index}>{meal}</li>);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (user?.id) {
//       updateUserProfile(formInput).then(() => router.push('/'));
//     } else {
//       registerUser(user, formInput).then(() => updateUser(user.uid));
//       router.push('/');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <h1 className="form-titles">{user?.id ? 'Update' : 'Create'} Username</h1>
//         <FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3 all-my-form-labels">
//           <Form.Control className="all-my-form-input" as="textarea" placeholder="username" name="username" value={formInput?.username} onChange={handleChange} required />
//         </FloatingLabel>
//         <Button variant="info" size="lg" className="my-buttons" type="submit">
//           {user?.id ? 'Update' : 'Create'} Profile
//         </Button>
//       </Form>
//     </>
//   );
// }

// MealForm.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.number,
//     uid: PropTypes.string,
//     username: PropTypes.string,
//   }).isRequired,
//   updateUser: PropTypes.func.isRequired,
// };
