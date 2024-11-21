import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import CartContext from "../../context/CartContext";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const cartItemsCount = cartList.length;

        return cartItemsCount > 0 ? (
          <span className="cart-count-badge">{cartItemsCount}</span>
        ) : null;
      }}
    </CartContext.Consumer>
  );

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://ik.imagekit.io/6nnzgbkjv4/Logo.png?updatedAt=1732168705771"
              alt="website logo"
            />
          </Link>

          <Popup
            className="logout-poup"
            modal
            trigger={
              <button type="button" className="nav-mobile-btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                  alt="nav logout"
                  className="nav-bar-img"
                />
              </button>
            }
          >
            {(close) => (
              <div className="modal-container">
                <p className="modal-description">
                  Are you sure you want to Logout?
                </p>
                <div className="popup-buttons-container">
                  <button
                    type="button"
                    data-testid="close-button"
                    className="close-button"
                    onClick={close}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="confirm-button"
                    onClick={onClickLogout}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://ik.imagekit.io/6nnzgbkjv4/Logo.png?updatedAt=1732168705771"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
          <Popup
            className="logout-poup"
            modal
            trigger={
              <button type="button" className="logout-desktop-btn">
                Logout
              </button>
            }
          >
            {(close) => (
              <div className="modal-container">
                <p className="modal-description">
                  Are you sure you want to Logout?
                </p>
                <div className="popup-buttons-container">
                  <button
                    type="button"
                    data-testid="close-button"
                    className="close-button"
                    onClick={close}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="confirm-button"
                    onClick={onClickLogout}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
