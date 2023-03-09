import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import IngredientCards from '../../components/Cards/ingredientCard';
import { getPantriesByUser } from '../../utils/data/pantryData';
import { AllPantryIngredientsByPantry } from '../../utils/data/pantryIngredientsData';

export default function Pantry() {
  const [pantry, setPantry] = useState({});
  const [pantryIngredient, setPantryIngredient] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getAllPantryIngredients = () => {
    AllPantryIngredientsByPantry(pantry?.id).then(setPantryIngredient);
  };

  useEffect(() => {
    getPantriesByUser(id).then((data) => {
      setPantry(data);
      AllPantryIngredientsByPantry(data?.id).then(setPantryIngredient);
    });
  }, [id]);

  return (
    <>
      <Link href={`/Pantry/create/${pantry?.id}`} passHref>
        <Button>Add Pantry Item</Button>
      </Link>
      <ListGroup>
        {pantryIngredient?.map((data) => (
          <IngredientCards key={data?.ingredient?.id} ingredient={data?.ingredient} onUpdate={getAllPantryIngredients} />
        ))}
      </ListGroup>
    </>
  );
}
