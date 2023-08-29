import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // For webpage designing 
import { Navbar } from "./components/navbar"; // Load navigation design from Navbar
import { Auth } from "./pages/auth"; // Modules for user authentication . User base is configured in mongodb
import { CreateRecipe } from "./pages/create-recipe"; // Module to create new recepie
import { Home } from "./pages/home"; // module to render home page where all the saved recepies are listed .
import { SavedRecipes } from "./pages/saved-recipes"; //Webpage to render all the saved recepies .

//Function with different route modules. To add any new route we can update here. React routes the flow as per the URL context.
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
