// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./pages/Detail";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import AddProduct from "./pages/AddProduct";
import AddTopping from "./pages/AddTopping";
import IncomeTransaction from "./pages/IncomeTransaction";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import "./assets/styles.css";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/admin");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/product/:id" element={<Detail />} />
        <Route exact path="/admin" element={<IncomeTransaction />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/add-toping" element={<AddTopping />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
