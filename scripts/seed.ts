import { createClient } from '@supabase/supabase-js';
import truthDareData from '../data/truth_dare.json';
import drinkingData from '../data/drinking_prompts.json';
import triviaData from '../data/trivia/general.json';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Seed truth/dare cards
    console.log('📝 Seeding truth/dare cards...');
    const truthDareCards = truthDareData.map(card => ({
      type: card.type,
      intensity: card.intensity,
      text: card.text,
      metadata: { id: card.id }
    }));

    const { error: truthDareError } = await supabase
      .from('cards')
      .upsert(truthDareCards);

    if (truthDareError) {
      console.error('Error seeding truth/dare cards:', truthDareError);
    } else {
      console.log(`✅ Seeded ${truthDareCards.length} truth/dare cards`);
    }

    // Seed drinking prompts
    console.log('🍺 Seeding drinking prompts...');
    const drinkingCards = drinkingData.map(prompt => ({
      type: prompt.category,
      intensity: prompt.intensity,
      text: prompt.text,
      metadata: { id: prompt.id, category: prompt.category }
    }));

    const { error: drinkingError } = await supabase
      .from('cards')
      .upsert(drinkingCards);

    if (drinkingError) {
      console.error('Error seeding drinking cards:', drinkingError);
    } else {
      console.log(`✅ Seeded ${drinkingCards.length} drinking prompts`);
    }

    // Seed trivia questions
    console.log('🧠 Seeding trivia questions...');
    const triviaQuestions = triviaData.map(question => ({
      category: question.category,
      difficulty: question.difficulty,
      question: question.question,
      choices: question.choices,
      answer_index: question.answer_index
    }));

    const { error: triviaError } = await supabase
      .from('trivia_questions')
      .upsert(triviaQuestions);

    if (triviaError) {
      console.error('Error seeding trivia questions:', triviaError);
    } else {
      console.log(`✅ Seeded ${triviaQuestions.length} trivia questions`);
    }

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();