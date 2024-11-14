import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"; // Importing Login component from the components folder
import Form from "./Components/Form"; // Importing Form component from the components folder
import List from "./Components/List"; // Importing Form component from the components folder

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login route */}
        <Route path="/form" element={<Form />} /> {/* Form route after login */}
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
};

export default App;
