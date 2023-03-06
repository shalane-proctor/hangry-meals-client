import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAuth } from '../../utils/context/authContext';
import { updateIngredient } from '../../utils/data/ingredientsData';
import { deletePantryIngredient, getPantryIngredientsByUser } from '../../utils/data/pantryIngredientsData';

export default function Pantry() {
  const [pantryIngredient, SetPantryIngredient] = useState([]);
  const [inStock, setInStock] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getPantryIngredientsByUser(user.id).then(SetPantryIngredient);
  }, [user]);

  const toggleStock = () => {
    setInStock((prevValue) => !prevValue);
    getPantryIngredientsByUser(user.id).then(SetPantryIngredient);
  };

  return (
    <ListGroup defaultActiveKey="#link1">
      {pantryIngredient.map((data) => (!inStock ? (
        <ListGroup.Item as="li" key={data?.ingredient?.id} action onClick={updateIngredient(pantryIngredient?.ingredient?.id).then(toggleStock)}>
          {data?.ingredient?.name}
          <Button variant="primary" type="button" className="my-buttons mb-3" onClick={deletePantryIngredient(data?.ingredient?.id).then(() => getPantryIngredientsByUser)}>
            X
          </Button>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item as="li" action onClick={toggleStock}>
          {data}
          <Button variant="primary" type="button" className="my-buttons mb-3" onClick={deletePantryIngredient(data?.ingredient?.id).then(() => getPantryIngredientsByUser)}>
            X
          </Button>
        </ListGroup.Item>
      )))}
    </ListGroup>
  );
}
