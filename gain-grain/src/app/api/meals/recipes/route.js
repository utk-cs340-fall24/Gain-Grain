// pages/api/recipes/parse.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    // Fetch the webpage content
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract the recipe details (update selectors based on the recipe page structure)
    const name = $('h1.recipe-title').text().trim();
    const ingredients = [];
    $('ul.ingredients-list li').each((i, elem) => {
      ingredients.push($(elem).text().trim());
    });
    const calories = $('span.calories').text().trim(); // Adjust selector as needed
    const macronutrients = {
      protein: $('span.protein').text().trim(), // Adjust selector as needed
      carbs: $('span.carbs').text().trim(),     // Adjust selector as needed
      fats: $('span.fats').text().trim(),       // Adjust selector as needed
    };

    res.status(200).json({ name, ingredients, calories, macronutrients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to parse the recipe.' });
  }
}
