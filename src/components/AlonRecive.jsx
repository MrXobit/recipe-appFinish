import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const AlonRecive = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  const fetchRecipe = async () => {
    try {
      setLoading(true); 
      const response = await fetch(`http://localhost:5000/${id}`);
      if (!response.ok) {
        throw new Error('Не вдалося завантажити рецепт');
      }
      const data = await response.json();
      setRecipe(data); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>; 

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>Категорія: {recipe.category}</p>
      <img 
        src={`http://localhost:5000/static/${recipe.image}`} 
        alt={recipe.name} 
        style={{ width: '300px' }} 
      />
      <h3>Інгредієнти:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Інструкції:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default AlonRecive;
