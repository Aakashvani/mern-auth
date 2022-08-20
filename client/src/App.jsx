import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import { PrivateRoute } from "./middleware/PrivateRoute";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Welcome />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
