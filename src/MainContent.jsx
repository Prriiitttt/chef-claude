import { useEffect, useState, useRef } from "react";
import ClaudeRecipe from "./components/ClaudeRecipe";
import IngredientsList from "./components/IngredientsList";
import { getRecipeFromGemma } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false)
  const recipeSection = useRef(null)

  // console.log(recipeSection)

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({behavior : "smooth"})
    } 
  }, [recipe])
  

  async function getRecipe() {
    setLoading(true)
    const recipeMD = await getRecipeFromGemma(ingredients);
    setRecipe(recipeMD);
    setLoading(false)
  }

  function handleSubmit(formData, event) {
    const newIngredient = formData.get("ingredient");
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }

  function reset () {
    setIngredients([])
    setRecipe("")
  }

  return (
    <main>
      <form className="ingredientForm" action={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. pasta"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>+ Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} loading={loading}/>
      )}

      {loading && <p className="loading">Loading your recipe...</p>}
      {!loading && recipe && <ClaudeRecipe recipe={recipe} ref={recipeSection}/>}
      {recipe && <button className="resetBtn" onClick={reset}>Start over</button>}
    </main>
  );
}
