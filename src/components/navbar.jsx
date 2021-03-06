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

export default function AppNavbar({ hasSearch = true }) {
  const searchCtx = useSearchContext();
  const [showFilter, setShowFilter] = useState(false);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#" as={Link} to="/">
          Etsy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/favs">
              <i class="fa fa-heart-o" aria-hidden="true" />
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <i class="fa fa-shopping-cart" aria-hidden="true" />
            </Nav.Link>
            <NavDropdown
              title={<i className="fa fa-user-circle" />}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/init-shop">
                Shop
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/purchases">
                Purchases
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/item-category">
                Item Category
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {hasSearch && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchCtx.data.searchVal}
                onChange={(e) => searchCtx.handleSearchVal(e.target.value)}
              />
              <i
                class="fa fa-filter pointer d-flex align-items-center mx-3"
                aria-hidden="true"
                onClick={() => setShowFilter(true)}
              />
            </Form>
          )}

          <FilterModal
            show={showFilter}
            onHide={() => setShowFilter(false)}
            searchCtx={searchCtx}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function FilterModal(props) {
  const searchCtx = props.searchCtx;

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Search Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h4>Sort</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="sort_key">Sort Key</label>
                <select
                  name=""
                  id="sort_key"
                  className="form-control"
                  value={searchCtx.data.sort.sortKey}
                  onChange={(e) => searchCtx.handleSortKey(e.target.value)}
                >
                  <option>-------</option>
                  <option value="price">Price</option>
                  <option value="quantity">Quantity</option>
                  <option value="salesCount">Sales Count</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="sort_order">Sort Order</label>
                <select
                  name=""
                  id="sort_order"
                  className="form-control"
                  value={searchCtx.data.sort.sortOrder}
                  onChange={(e) => searchCtx.handleSortOrder(e.target.value)}
                >
                  <option>-------</option>
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <h4>Price Range</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="min_price">Min Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={
                    searchCtx.data.priceRange.min === 0
                      ? ""
                      : searchCtx.data.priceRange.min
                  }
                  onChange={(e) => searchCtx.handleMinPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="max_price">Max Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={
                    searchCtx.data.priceRange.max === 0
                      ? ""
                      : searchCtx.data.priceRange.max
                  }
                  onChange={(e) => searchCtx.handleMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <h4>Exclude Out of Stock Items</h4>
          <div className="form-check-inline">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={searchCtx.data.isOutOfStock}
                onChange={(e) => searchCtx.handleIsOutOfStock(e.target.checked)}
              />
              {"  "}
              Exclude out of Stock Items
            </label>
          </div>
        </div>
        <hr />
        <button
          className="btn btn-danger"
          onClick={() => searchCtx.handleReset()}
        >
          Reset
        </button>
      </Modal.Body>
    </Modal>
  );
}
