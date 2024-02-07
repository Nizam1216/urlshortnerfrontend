import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Domain from "./components/Domain";
import View from "./pages/View";

function App() {
  const isLoggedIn =
    localStorage.getItem("user") !== null &&
    localStorage.getItem("user") !== "";

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            exact
            path="/sign-up"
            element={isLoggedIn ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            exact
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route exact path="/:shortId" element={<Domain />} />
          <Route
            exact
            path="/edit/:shortId"
            element={isLoggedIn ? <View /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
