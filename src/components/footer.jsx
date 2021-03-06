import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSearchContext } from "../contexts/search-context";

const countryObj = {
  ind: "INDIA",
  usa: "USA",
};

const currencyObj = {
  ind: "inr",
  usa: "usd",
};

export default function AppFooter({ hasFixedBottom = true }) {
  const [selectCountry, setSelectCountry] = useState(false);
  const [country, setCountry] = useState("ind");

  const handleChangeCountry = (country) => {
    setCountry(country);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className={`mt-5 ${hasFixedBottom ? "fixed-bottom" : ""}`}
    >
      <Container>
        {/* <Navbar.Brand href="#" as={Link} to="/">
          Etsy
        </Navbar.Brand> */}
        <Nav className="mx-auto">
          <Nav.Link onClick={() => setSelectCountry(true)}>
            Select Country
          </Nav.Link>
          {country !== "" && (
            <>
              <Nav.Link>Your Country: {countryObj[country]}</Nav.Link>
              <Nav.Link>Current Currency: {currencyObj[country]}</Nav.Link>
            </>
          )}
        </Nav>
        <CountryModal
          show={selectCountry}
          onHide={() => setSelectCountry(false)}
          country={country}
          handleChangeCountry={handleChangeCountry}
        />
      </Container>
    </Navbar>
  );
}

function CountryModal(props) {
  return (
    <Modal {...props} size="lg" centered key={"country-modal"}>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Select Country</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="select_country">Select Country</label>
          <select
            name=""
            id="select_country"
            className="form-control"
            value={props.country}
            onChange={(e) => props.handleChangeCountry(e.target.value)}
          >
            <option value="">-------</option>
            <option value="usa">USA</option>
            <option value="ind">INDIA</option>
          </select>
        </div>
      </Modal.Body>
    </Modal>
  );
}
