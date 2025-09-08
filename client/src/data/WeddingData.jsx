import img1 from '../assets/gujrati-wedding.webp';
import img2 from '../assets/south indian wedding.jpeg';
import img3 from '../assets/Bengali+Wedding.jpg';
import img4 from '../assets/northwedding2.jpg';
import img5 from '../assets/maharashtrian wed.jpeg';
import img6 from '../assets/kashmiri.jpeg';
import img7 from '../assets/kerelian.jpg';
import img8 from '../assets/rajasthani-wedding.jpg';

const WeddingData = [
  {
    id: 4,
    title: 'Gujarati Wedding',
    image: img1,
    description: 'Gujarati weddings are...',
    ceremonies: ['Grah Shanti', 'Pithi', 'Garba', 'Mandap Muhurat', 'Jaimala', 'Kanyadaan', 'Pheras', 'Vidaai']
  },
  {
    id: 2,
    title: 'South Indian Wedding',
    image: img2,
    description: 'South Indian weddings...',
    ceremonies: ['Nischayathartham', 'Kashi Yatra', 'Oonjal', 'Kanyadaan', 'Mangalya Dharanam', 'Saptapadi']
  },
  {
        id: 3,
        title: 'Bengali Wedding',
        image: img3,
        description: 'Bengali weddings feature distinctive rituals, with the bride wearing the traditional red and white saree. These weddings emphasize cultural aspects and typically include elaborate feasts with unique Bengali cuisine.',
        ceremonies: ['Aiburo Bhaat', 'Dodhi Mangal', 'Gaye Holud', 'Shubho Drishti', 'Saat Paak', 'Sindoor Daan', 'Bou Bhaat']
},
      {
        id: 1,
        title: 'North Indian Wedding',
        image: img4,
        description: 'North Indian weddings, particularly Punjabi ones, are known for their energetic atmosphere with bhangra dancing, elaborate meals, and colorful ceremonies including Mehndi, Sangeet, and Baraat processions.',
        ceremonies: ['Roka', 'Engagement', 'Mehndi', 'Sangeet', 'Haldi', 'Baraat', 'Pheras', 'Vidaai']
      },
      
      {
        id: 5,
        title: 'Maharashtrian Wedding',
        image: img5,
        description: 'Maharashtrian weddings are simpler and more traditional, with the bride wearing the Nauvaree saree. Ceremonies emphasize practical rituals and traditional values.',
        ceremonies: ['Sakhar Puda', 'Kelvan', 'Haldi', 'Simant Puja', 'Antarpat', 'Mangalashtak', 'Kanya Daan', 'Karmasampati']
      },
      {
        id: 6,
        title: 'Kashmiri Wedding',
        image: img6,
        description: 'Kashmiri weddings blend Hindu and Muslim traditions with distinctive attire including the traditional Pheran. The ceremonies include unique rituals and Wazwan feasts.',
        ceremonies: ['Livun', 'Wanvun', 'Mehndi Raat', 'Yenivol', 'Duribael', 'Pheras', 'Satraat']
      },
      {
        id: 7,
        title: 'Kerala Wedding',
        image: img7,
        description: 'Kerala Hindu weddings are simple and elegant, with the bride wearing the traditional Kerala Kasavu saree. Ceremonies take place in the morning and emphasize traditional values.',
        ceremonies: ['Nischayam', 'Pallum Vangal', 'Madhuram Veppu', 'Thalikettu', 'Nirapara', 'Grihapravesham']
      },
      {
        id: 8,
        title: 'Rajasthani Wedding',
        image: img8,
        description: 'Rajasthani weddings are grand affairs with royal influences, colorful attire, and elaborate ceremonies. They often take place in palaces or heritage venues with traditional folk music and dance.',
        ceremonies: ['Pitha Dastoor', 'Ganesh Sthapana', 'Mehendi', 'Sangeet', 'Baraat', 'Jai Mala', 'Pheras', 'Bidaai']
      }
  // ...add all remaining weddings
];

export default WeddingData;
