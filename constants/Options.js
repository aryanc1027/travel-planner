import { Ionicons } from '@expo/vector-icons';

export const SelectTravelerOptions = [
  {
    id: 1,
    title: 'Just Me',
    description: 'Fly solo, discover more!',
    icon: () => <Ionicons name="person-circle" size={32} color="#4B9CD3" />,
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    description: 'Make unforgettable memories together!',
    icon: () => <Ionicons name="heart-circle" size={32} color="#FF69B4" />,
    people: '2',
  },
  {
    id: 3,
    title: 'A Family',
    description: 'Create lasting memories with your loved ones!',
    icon: () => <Ionicons name="home" size={32} color="#4CAF50" />,
    people: '3 to 6',
  },
  {
    id: 4,
    title: 'A Group',
    description: 'Explore the world together!',
    icon: () => <Ionicons name="people-circle" size={32} color="#FFA500" />,
    people: '3+',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cost Effective',
    description: 'Budget-friendly travel',
    icon: () => <Ionicons name="wallet-outline" size={32} color="#4CAF50" />,
  },
  {
    id: 2,
    title: 'Mid-Range',
    description: 'Comfortable travel that won\'t break the bank',
    icon: () => <Ionicons name="card-outline" size={32} color="#4B9CD3" />,
  },
  {
    id: 3,
    title: 'Luxury',
    description: 'Experience the best of the best',
    icon: () => <Ionicons name="diamond-outline" size={32} color="#FFD700" />,
  },
];
