import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import MyOrder from './screens/MyOrder';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Bootstrap installation imports
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import {CartProvider} from './components/ContextReducer';
import CheckoutSuccess from './components/CheckoutSuccess';

export default function App() {
  return (
    <CartProvider>  {/*To make addToCart functionality global*/}

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/checkout-success" element={<CheckoutSuccess />} />
          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}
