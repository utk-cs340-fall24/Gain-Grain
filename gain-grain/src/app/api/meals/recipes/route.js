import { NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ success: false, message: 'URL is required' }, { status: 400 });
    }

    const { data } = await axios.get(url);
    const $ = load(data);

    // Extracting the recipe name
    const name = $('h1').text() || $('.recipe-title').text() || $('meta[property="og:title"]').attr('content');

    // Enhanced ingredient extraction
    const ingredients = [];
    /*
    // Try various selectors for ingredients
    const ingredientSelectors = [
      'div[data-testid="IngredientList"] > div',
      '.ingredient',
      '.ingredients-item',
      '.recipe-ingredients li',
      '.ingredient-description',
      '[itemprop="recipeIngredient"]',
      '[class*="ingredient"]' // Catch-all for any class containing "ingredient"
    ];

    ingredientSelectors.forEach((selector) => {
      $(selector).each((i, elem) => {
        // Extract the ingredient text, removing extra spaces
        const ingredientText = $(elem).text().trim();

        // Extract the amount and name separately if possible
        const amount = $(elem).find('.Amount, .ingredient-amount').text().trim();
        const ingredientName = ingredientText.replace(amount, '').trim() || ingredientText;

        // Add only non-empty ingredients to the array
        if (ingredientText) {
          ingredients.push({ amount, name: ingredientName });
        }
      });
    });

    // If no ingredients were found with the specified selectors, try a broader search
    if (ingredients.length === 0) {
      $('li').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text.toLowerCase().includes('ingredient')) {
          ingredients.push({ name: text });
        }
      });
    }*/

    // Extract calories from various possible locations
    let calories = null;
    const calorieSelectors = [
      '.calories',
      '.nutrition-calories',
      '.calorie-count',
      'meta[itemprop="calories"]',
      'meta[property="og:calories"]',
      'meta[name="calories"]'
    ];

    calorieSelectors.some((selector) => {
      const element = $(selector);
      if (element.length) {
        calories = element.text().trim() || element.attr('content');
        return true; // Exit loop if we find calories
      }
      return false;
    });

    // Check if calories were found in the text, and if not, try parsing the whole page for any keyword match
    if (!calories) {
      const caloriePattern = /(\d+)\s*(kcal|calories|cal\b)/i;
      const match = caloriePattern.exec(data);
      if (match) {
        calories = match[1];
      }
    }

    // Final return with structured data
    return NextResponse.json({ success: true, name, ingredients, calories });
  } catch (error) {
    console.error('Error parsing the recipe:', error);
    return NextResponse.json({ success: false, message: 'Failed to parse recipe', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
}
