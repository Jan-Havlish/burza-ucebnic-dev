import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SharedLayout from "./pages/SharedLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import UcebniceVyber from "./pages/UcebniceVyber";
import Error from "./pages/Error";
import DostupneKategorieUcebnic from "./components/DostupneKategorieUcebnic";
import SpecificSchollBook from "./components/SpecificSchollBook";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";
import Logout from "./pages/Logout";
import AddSchoolBook from "./pages/AddSchoolBook";

// https://docs.google.com/document/d/1pPhj56B_XYnTKNOXjq2QV3wJej35gDcNRLUIpPRTfDs/edit?pli=1

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/ucebnice" element={<DostupneKategorieUcebnic />} />
          <Route path="/ucebnice/:kategorie" element={<UcebniceVyber />} />
          <Route
            path="/ucebnice/:kategorie/:BookID"
            element={<SpecificSchollBook />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/o" element={<About />} />
          <Route path="/add_school_book" element={<AddSchoolBook />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
