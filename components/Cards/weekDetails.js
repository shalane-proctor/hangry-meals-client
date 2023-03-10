import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function WeekCards({ week }) {
  return (
    <>
      <Card className="Monday">
        <Card.Header>Monday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.monday?.name}</Card.Title>
          <Link href={`/Recipe/${week?.monday?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Tuesday">
        <Card.Header>Tuesday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.tuesday?.name}</Card.Title>
          <Link href={`/Recipe/${week?.tuesday?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Wednesday">
        <Card.Header>Wednesday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.wednesday?.name}</Card.Title>
          <Link href={`/Recipe/${week?.thursday?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Thursday">
        <Card.Header>Thursday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.thursday?.name}</Card.Title>
          <Link href={`/Recipe/${week?.thursday?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Friday">
        <Card.Header>Friday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.friday?.name}</Card.Title>
          <Link href={`/Recipe/${week?.friday?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Saturday">
        <Card.Header>Saturday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.saturday?.name}</Card.Title>
          <Link href={`/Recipe/${week?.saturday?.id}`} passHref>
            <Button variant="primary">Go to Recipe</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="Sunday">
        <Card.Header>Sunday</Card.Header>
        <Card.Body>
          <Card.Title>{week?.sunday?.name}</Card.Title>
          <Link href={`/Recipe/${week?.sunday?.id}`} passHref>
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
      id: PropTypes.number,
      name: PropTypes.string,
      instructions: PropTypes.string,
    }),
    tuesday: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      instructions: PropTypes.string,
    }),
    wednesday: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      instructions: PropTypes.string,
    }),
    thursday: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      instructions: PropTypes.string,
    }),
    friday: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      instructions: PropTypes.string,
    }),
    saturday: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      instructions: PropTypes.string,
    }),
    sunday: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      instructions: PropTypes.string,
    }),
  }),
};

WeekCards.defaultProps = {
  week: ({
    id: 0,
    monday: {
      name: 'No Recipes Yet',
    },
    tuesday: {
      name: 'No Recipes Yet',
    },
    wednesday: {
      name: 'No Recipes Yet',
    },
    thursday: {
      name: 'No Recipes Yet',
    },
    friday: {
      name: 'No Recipes Yet',
    },
    saturday: {
      name: 'No Recipes Yet',
    },
    sunday: {
      name: 'No Recipes Yet',
    },
  }),
};
