import { useState } from "react";
import ClaudeRecipe from "./components/ClaudeRecipe";
import IngredientsList from "./components/IngredientsList";

export default function Main() {
  const [ingredients, setIngredients] = useState([
    "all the main spices",
    "pasta",
    "ground beef",
    "tomato paste",
  ]);

  const [recipeShown, setRecipeShown] = useState(false);

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

  function toggleRecipe() {
    setRecipeShown((prevShown) => !prevShown);
  }

  return (
    <>
      <main>
        <form className="ingredientForm" action={handleSubmit}>
          <input
            type="text"
            placeholder="e.g. wheat flour"
            aria-label="Add ingredient"
            name="ingredient"
          />
          <button>+ Add ingredient</button>
        </form>

        {ingredients.length > 0 && (
          <IngredientsList
            ingredients={ingredients}
            recipeShown={recipeShown}
            toggleRecipe={toggleRecipe}
          />
        )}

        {recipeShown && <ClaudeRecipe />}
      </main>
    </>
  );
}
