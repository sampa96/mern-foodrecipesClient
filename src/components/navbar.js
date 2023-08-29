//import dependencies 
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // to work with react router dom
import { useCookies } from "react-cookie"; // to work with access token

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

//logout module. Removes user access token when user clicks on logout button and redirects to login page/
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  //list of navigation bar options and routing page
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes">Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};
