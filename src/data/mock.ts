export type CarsClassesType = typeof CarsClasses[0];
export const CarsClasses = [
  {
    id: 'UberX-123',
    title: 'Adekunle Ayomide',
    multiplier: 1,
    driverInfo: 'Cab Driver Available for rides Within Bowen University',
    paymentInfo: 'Bank Name: Zenith Bank Account Number: 2052191505 ',
    phoneNumber: '+2348101033175',
    image: require('../../assets/images/cars/UberLux.webp'),
    price: 'Bowen',
    roundImage: require('./man.jpg'),
  },
  {
    id: 'UberXL-456',
    title: 'Godwin Olatunde',
    multiplier: 1.5,
    driverInfo: 'Cab Driver Available for rides from Bowen University to Iwo Park.',
    phoneNumber: '+1234567890',
    image: require('../../assets/images/cars/UberLux.webp'),
    price: 'O/B',
    roundImage: require('./man.jpg'),
  },
  {
    id: 'UberLUX-789',
    title: 'Olayemi Matthew',
    multiplier: 2,
    driverInfo: 'Adaswift Transport Available for rides Outside Bowen University',
    phoneNumber: '+1234567890',
    image: require('../../assets/images/cars/UberLux.webp'),
    price: 'Bowen',
    roundImage: require('./man.jpg'),
  },
  {
    id: 'UberLUX-202',
    title: 'David',
    multiplier: 2,
    driverInfo: 'Adaswift Transport Available for rides Outside Bowen University',
    phoneNumber: '+1234567890',
    image: require('../../assets/images/cars/UberLux.webp'),
    price: '0utside',
    roundImage: require('./man.jpg'),
  },
];


export type RecentRidesType = typeof RecentRides[0];

export const RecentRides = [
  {
    id: '1',
    title: 'Within Bowen University',
    address: 'Price: ₦750 -> Call Available Driver',
    phoneNumber: '08037603294'
  },
  {
    id: '2',
    title: 'Bowen - Iwo Park',
    address: 'Find Driver',
    phoneNumber: '08037603294'
  },
  
  {
    id: '3',
    title: 'Bowen - Ibadan',
    address: 'Find Driver',
    phoneNumber: '08037603294'
  },
  {
    id: '4',
    title: 'Bowen - Lagos',
    address: 'Find Driver',
  },
  {
    id: '5',
    title: 'Bowen - Ekiti',
    address: 'Find Driver',
  },
  {
    id: '6',
    title: 'Bowen - Abuja',
    address: 'Find Driver',
  },
  {
    id: '7',
    title: 'Custom Ride',
    address: 'Find Driver',
  },

];
