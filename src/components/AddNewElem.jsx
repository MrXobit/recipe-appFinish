import React, { useState } from 'react';
import axios from 'axios';

const AddNewElem = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    category: '',
    ingredients: '',
    instructions: '',
  });
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('description', recipe.description);
    formData.append('category', recipe.category);
    formData.append('ingredients', recipe.ingredients.split(','));
    formData.append('instructions', recipe.instructions);
    
    if (image) {
      formData.append('picture', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/addrecipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Recipe added:', response.data);

      setRecipe({
        name: '',
        description: '',
        category: '',
        ingredients: '',
        instructions: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={e => setRecipe(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={e => setRecipe(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>
        <div>
        <select value={recipe.category}
            onChange={e => setRecipe(prev => ({ ...prev, category: e.target.value }))}
            required
            name="dish-category" id="dish-category"
             >
          <option value="appetizer">Appetizer</option>
          <option value="main-course">Main Course</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
          <option value="snack">Snack</option>
        </select>
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={e => setRecipe(prev => ({ ...prev, ingredients: e.target.value }))}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={e => setRecipe(prev => ({ ...prev, instructions: e.target.value }))}
            required
          />
        </div>
        <div>
          <label>Recipe Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit">Add Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewElem;
