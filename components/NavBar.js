/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getRecipesByUser } from '../utils/data/recipeData';

export default function NavBar() {
  const { user } = useAuth();
  const { recipes, setRecipes } = useState();

  useEffect(() => {
    getRecipesByUser(user.id).then(setRecipes);
  }, [user]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Hangry Meals</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {recipes?.length <= 7 ? (
            <Nav className="me-auto">
              <Link passHref href="/">
                <Nav.Link>Current Week</Nav.Link>
              </Link>
              <Link passHref href="/Week/">
                <Nav.Link>Next Week</Nav.Link>
              </Link>
              <Link passHref href={`/Pantry/${user.id}`}>
                <Nav.Link>Pantry</Nav.Link>
              </Link>
              <Link passHref href="/Recipe/">
                <Nav.Link>Recipes</Nav.Link>
              </Link>
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Link passHref href={`/Pantry/${user.id}`}>
                <Nav.Link>Pantry</Nav.Link>
              </Link>
              <Link passHref href="/Recipe/">
                <Nav.Link>Recipes</Nav.Link>
              </Link>
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
