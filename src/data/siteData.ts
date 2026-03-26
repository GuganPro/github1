export const business = {
  name: 'Gold Gym Kumbakonam',
  address: '[Update Address]',
  phone: '[Update Phone Number]',
  email: '[Update Email Address]',
  whatsapp: '[Update WhatsApp Link]',
  map: '[Update Google Maps Link]',
};

export const counters = [
  { label: 'Members Trained', value: 1200 },
  { label: 'Transformations', value: 450 },
  { label: 'Expert Trainers', value: 12 },
  { label: 'Years of Service', value: 8 },
];

export const features = ['Certified Trainers','Modern Equipment','Transformation Support','Strength & Cardio Programs','Personalized Guidance','Friendly Training Environment','Clean and Motivating Space'];

export const programs = [
  'Weight Training','Cardio Training','Personal Training','Group Classes','Functional Fitness','Boxing / Fitness Sessions','Body Transformation Program','Beginner Fitness Program'
].map((title) => ({ title, description: 'Structured sessions with trainer-guided progression and safety-first coaching.' }));

export const trainers = [
  {
    name: 'Suresh',
    role: 'Certified Trainer',
    bio: 'Certified fitness trainer focused on strength development, disciplined coaching, and transformation-based results.',
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1200&auto=format&fit=crop',
  },
];

export const plans = [
  { name: 'Monthly Plan', price: 'Contact for details', recommended: false },
  { name: 'Quarterly Plan', price: 'Contact for details', recommended: true },
  { name: 'Personal Training Plan', price: 'Custom plans available', recommended: false },
];

export const testimonials = [
  { name: 'Arun K.', text: 'Best gym in Kumbakonam for discipline and consistent coaching. I lost weight safely and gained confidence.' },
  { name: 'Priya S.', text: 'Supportive trainers, clean space, and professional plans. Great fitness center in Kumbakonam.' },
  { name: 'Vignesh R.', text: 'Excellent strength training setup and personal trainer guidance. Highly recommended.' },
];
