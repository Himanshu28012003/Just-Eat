import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerRestaurants from "./pages/owner/OwnerRestaurants";
import OwnerMenu from "./pages/owner/OwnerMenu";
import OwnerOrders from "./pages/owner/OwnerOrders";

import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const App = () => {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =================================================
                    PUBLIC
                ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/restaurants"
          element={<Restaurants />}
        />

        <Route
          path="/restaurants/:restaurantId"
          element={<RestaurantDetails />}
        />


        {/* =================================================
                    CUSTOMER
                ================================================= */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CUSTOMER",
              ]}
            >
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CUSTOMER",
              ]}
            >
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CUSTOMER",
              ]}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:orderId"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CUSTOMER",
              ]}
            >
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CUSTOMER",
              ]}
            >
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CUSTOMER",
              ]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/preferences"
          element={
            <ProtectedRoute
              allowedRoles={[
                "CUSTOMER",
              ]}
            >
              <Preferences />
            </ProtectedRoute>
          }
        />


        {/* =================================================
                    OWNER
                ================================================= */}

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "OWNER",
              ]}
            >
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/restaurants"
          element={
            <ProtectedRoute
              allowedRoles={[
                "OWNER",
              ]}
            >
              <OwnerRestaurants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/restaurants/:restaurantId/menu"
          element={
            <ProtectedRoute
              allowedRoles={[
                "OWNER",
              ]}
            >
              <OwnerMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/restaurants/:restaurantId/orders"
          element={
            <ProtectedRoute
              allowedRoles={[
                "OWNER",
              ]}
            >
              <OwnerOrders />
            </ProtectedRoute>
          }
        />


        {/* =================================================
                    UNAUTHORIZED
                ================================================= */}

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =================================================
                    404
                ================================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;