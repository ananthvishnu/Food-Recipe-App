import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const APP_ID = '';
  const APP_KEY = '';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
    }
    getRecipes();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className="App">
      <div class="heading">
     <h1 className="title">My Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar forms" value={search} onChange={updateSearch} placeholder="Search for recipes..."/>
        <button type="submit" className="search-button forms">Search</button>
      </form>
      </div>
      <div className="recipes">
        {recipes.map(recipe => (
          <div className="recipe" key={recipe.recipe.uri}>
            <div class="flex-container">
            <div class="flex-item-left">
            <img src={recipe.recipe.image} alt={recipe.recipe.label} className="recipe-img images"/>
            </div>
            <div class="flex-item-right text">
            <h2 className="recipe-title">{recipe.recipe.label}</h2>
            <p className="recipe-ingredients">
              {recipe.recipe.ingredients.map(ingredient => (
                <li key={ingredient.foodId} className="recipe-ingredient">{ingredient.text}</li>
              ))}
            </p>
            <a href={recipe.recipe.url} className="recipe-link" target="_blank" rel="noopener noreferrer">See recipe</a>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;