import { Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = (productId) => {
    this.setState((prevState) => {
      const updatedCartList = prevState.cartList.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
      return { cartList: updatedCartList }
    })
  }

  decrementCartItemQuantity = (productId) => {
    this.setState((prevState) => {
      const updatedCartList = prevState.cartList
        .map((item) => {
          if (item.id === productId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
      return { cartList: updatedCartList }
    })
  }

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  addCartItem = (product) => {
    const { cartList } = this.state
    const index = cartList.findIndex(
      (eachProduct) => eachProduct.id === product.id
    )
    if (index === -1) {
      this.setState({ cartList: [...cartList, product] })
    } else {
      cartList.splice(index, 1)
      this.setState({ cartList })
    }
  }

  removeCartItem = (productId) => {
    const { cartList } = this.state
    const updatedCartList = cartList.filter((product) => product.id !== productId)
    this.setState({ cartList: updatedCartList })
  }

  render() {
    const { cartList } = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductItemDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </CartContext.Provider>
    )
  }
}

export default App
