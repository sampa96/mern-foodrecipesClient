import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID(); //Get suerid from local storage

  //Function to fetch all the recipes.
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://mern-foodrecipeapp-63da2ba29bd3.herokuapp.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    //Function to fetch recepies saved by a particular user. It passes ${userid} as argument and returns the list of recepies.
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mern-foodrecipeapp-63da2ba29bd3.herokuapp.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  //Function to save a receipe. User creates a recipes and then review it before saving it in databse.
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://mern-foodrecipeapp-63da2ba29bd3.herokuapp.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
