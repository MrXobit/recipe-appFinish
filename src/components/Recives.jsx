import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Recives = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(7);
  const [filterX, setFilter] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState([]); // Стан для вибраних рецептів

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000');
      if (!response.ok) {
        throw new Error('Не вдалося завантажити рецепти');
      }
      const data = await response.json();
      setRecipes(data);
      setFilter(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filterX.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilter = (e) => {
    if (e.target.value) {
      const filterRecives = recipes.filter(recipe => recipe.category === e.target.value);
      setFilter(filterRecives);
    } else {
      setFilter(recipes);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      setFilter(recipes);
    } else {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilter(filteredRecipes);
    }
  };

  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipes(prevSelected => {
      if (prevSelected.includes(recipeId)) {
        return prevSelected.filter(id => id !== recipeId); // Видалити рецепт з вибраних
      } else {
        return [...prevSelected, recipeId]; // Додати рецепт до вибраних
      }
    });
  };

  const selectedRecipesList = recipes.filter(recipe => selectedRecipes.includes(recipe._id));

  const calculateIngredients = () => {
    const allIngredients = [];
    selectedRecipesList.forEach(recipe => {
      allIngredients.push(...recipe.ingredients); // Додаємо інгредієнти з кожного рецепту
    });
    return allIngredients;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterX.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  return (
    <div>
      <h1>Додати новий рецепт</h1>
      <Link to="/newrecive">
        <button>Додати рецепт</button>
      </Link>

      <input 
        type="text" 
        style={{width: "90%", margin: '10px'}} 
        value={query}  
        onChange={handleSearch}  
        placeholder="Пошук за назвою рецепту"
      />

      <h1><label htmlFor="filter">Фільтрувати</label></h1>
      <select onChange={handleFilter} name="" id="filter" defaultValue="">
        <option value="">Всі рецепти</option>
        <option value="appetizer">Закуски</option>
        <option value="main-course">Основні страви</option>
        <option value="dessert">Десерти</option>
        <option value="beverage">Напої</option>
        <option value="snack">Перекуси</option>
      </select>
      {selectedRecipesList.length > 0 && (
        <div>
          <h2>Обрані рецепти</h2>
          <ul>
            {selectedRecipesList.map((recipe) => (
              <li key={recipe._id}>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h3>Усі інгредієнти для вибраних рецептів</h3>
          <ul>
            {calculateIngredients().map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
      <h2>Всі рецепти</h2>

      <div>
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe) => (
            <div key={recipe._id} style={{ marginBottom: '20px' }}>
              <input 
                type="checkbox" 
                checked={selectedRecipes.includes(recipe._id)} 
                onChange={() => handleSelectRecipe(recipe._id)} 
              />
              <h3>{recipe.name}</h3>
              <img src={`http://localhost:5000/static/${recipe.image}`} alt={recipe.name} />
              <p>{recipe.description}</p>
              <Link to={`/recipe/${recipe._id}`}>
                <button>Переглянути</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Рецепти не знайдено</p>
        )}
      </div>



      <div>
        {pageNumbers.length > 7 && currentPage > 4 && (
          <button onClick={() => paginate(1)}>1</button>
        )}
        {pageNumbers.length > 7 && currentPage > 5 && <span>...</span>}

        {pageNumbers.slice(Math.max(currentPage - 4, 0), currentPage + 3).map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}

        {pageNumbers.length > 7 && currentPage < pageNumbers.length - 4 && <span>...</span>}
        {pageNumbers.length > 7 && currentPage < pageNumbers.length - 5 && (
          <button onClick={() => paginate(pageNumbers.length)}>{pageNumbers.length}</button>
        )}
      </div>
    </div>
  );
};

export default Recives;
