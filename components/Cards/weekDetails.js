import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function WeekCards({ week }) {
  return (
    <>
      <Link href="Week/new" passHref>
        <Button>Roll for Weeks</Button>
      </Link>
      <Card className="Monday">
        <Card.Header>Monday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.monday?.recipe?.name}</Card.Title>
          <Link href={`/Recipe/${week?.monday?.recipe?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Tuesday">
        <Card.Header>Tuesday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.tuesday?.recipe?.name}</Card.Title>
          <Link href={`/Recipe/${week?.tuesday?.recipe?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Wednesday">
        <Card.Header>Wednesday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.wednesday?.recipe?.name}</Card.Title>
          <Link href={`/Recipe/${week?.thursday?.recipe?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Thursday">
        <Card.Header>Thursday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.thursday?.recipe?.name}</Card.Title>
          <Link href={`/Recipe/${week?.thursday?.recipe?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Friday">
        <Card.Header>Friday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.friday?.recipe?.name}</Card.Title>
          <Link href={`/Recipe/${week?.friday?.recipe?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Saturday">
        <Card.Header>Saturday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.saturday?.recipe?.name}</Card.Title>
          <Link href={`/Recipe/${week?.saturday?.recipe?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Sunday">
        <Card.Header>Sunday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.sunday?.recipe?.name}</Card.Title>
          <Link href={`/Recipe/${week?.sunday?.recipe?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

WeekCards.propTypes = {
  week: PropTypes.shape({
    id: PropTypes.number,
    monday: PropTypes.shape({
      recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    tuesday: PropTypes.shape({
      recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    wednesday: PropTypes.shape({
      recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    thursday: PropTypes.shape({
      recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    friday: PropTypes.shape({
      recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    saturday: PropTypes.shape({
      recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    sunday: PropTypes.shape({
      recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  }),
};

WeekCards.defaultProps = {
  week: ({
    id: 0,
    monday: {
      recipe: { name: 'No Recipes Yet' },
    },
    tuesday: {
      recipe: { name: 'No Recipes Yet' },
    },
    wednesday: {
      recipe: { name: 'No Recipes Yet' },
    },
    thursday: {
      recipe: { name: 'No Recipes Yet' },
    },
    friday: {
      recipe: { name: 'No Recipes Yet' },
    },
    saturday: {
      recipe: { name: 'No Recipes Yet' },
    },
    sunday: {
      recipe: { name: 'No Recipes Yet' },
    },
  }),
};
