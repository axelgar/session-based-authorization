'use strict';

const main = () => {
  const form = document.querySelector('.recipe-form');
  const listRecipes = document.querySelector('.recipe-list');

  const addEventsToDelete = () => {
    const deleteButtons = document.querySelectorAll('article button');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        // request axios post delete ---> delete en db
        const id = event.target.id;
        await axios.post(`/api/recipes/${id}/delete`);
        // delete article de la recipe
        const article = event.target.parentElement;
        article.remove();
      });
    });
  };

  addEventsToDelete();

  // Add recipe
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const recipe = {
      title: event.srcElement.title.value,
      duration: event.srcElement.duration.value,
      cuisine: event.srcElement.cuisine.value,
      level: event.srcElement.level.value
    };
    const response = await axios.post('/api/recipes', recipe);
    form.reset();
    const newRecipe = response.data;
    const article = document.createElement('article');
    const button = document.createElement('button');
    button.setAttribute('id', newRecipe._id);
    button.innerText = 'Delete';
    const p = document.createElement('p');
    p.innerText = `${newRecipe.title} - ${newRecipe.level}`;

    article.appendChild(p);
    article.appendChild(button);
    listRecipes.appendChild(article);
    addEventsToDelete();
  });

  // Delete recipe
};

window.addEventListener('load', main);
