export const tripsData = [
   // src/data/trips.js
{
  id: "himachal-backpacking",
  title: "Manali & Kasol Backpacking",
  duration: "3 Days / 2 Nights",
  pickup: "Delhi to Delhi",
  price: 6499,
  
  // FIX: This object was not closed properly in your screenshot
  occupancy: {
    quad: 5000,
    triple: 5500,
    double: 6000
  },

  // FIX: Move these OUTSIDE of the occupancy object
  batches: [
    "14th Mar - 17th Mar",
    "21st Mar - 24th Mar",
    "28th Mar - 31st Mar"
  ],

  highlights: [
    { icon: "Hotel", text: "3-Star Stay" },
    { icon: "Utensils", text: "MAP Meals" },
    { icon: "Bus", text: "AC Volvo" },
    { icon: "Camera", text: "Sightseeing" }
  ],


  itinerary: [
    {
      day: 0,
      title: "Departure from Delhi",
      desc: "Gather at the meeting point in Delhi by 6:00 PM. Board the AC Volvo for an overnight journey to Manali.",
      image: "/delhi-bus.jpg"
    },
  {
    day: 1,
    title: "Manali Arrival & Local Exploration",
    desc: "Reach Manali in the morning. Check-in to your hotel and freshen up. Visit the iconic Hadimba Devi Temple, Vashisht Temple, and spend your evening strolling through the vibrant Mall Road.",
    image: "/k-s1.jpg"
  },
  {
    day: 2,
    title: "Solang Valley & Rohtang Pass",
    desc: "After breakfast, head towards Solang Valley for adventure sports like paragliding and zorbing. If weather permits, we'll head to Rohtang Pass for an unforgettable snow experience.",
    image: "/snow-valley.jpg"
  },
  {
    day: 3,
    title: "Kasol Sightseeing & Manikaran Sahib",
    desc: "Drive to the 'Mini Israel of India' - Kasol. Visit the Manikaran Sahib Gurudwara and take a dip in the natural hot springs. Explore the riverside cafes before boarding the evening bus back to Delhi.",
    image: "/kasol-river.jpg"
  },
    // ... rest of your itinerary days
  ],
  reviews: [
    {
      name: "Tripti Singh",
      rating: 5,
      comment: "Best weekend ever! Day 0 bus was so energetic. Hadimba temple and Kasol cafes are highly recommended.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", // Student photo
      date: "Mar 2024"
    },
    {
      name: "Rahul Mehra",
      rating: 4,
      comment: "Great experience for students. The trip captain was super helpful. Snow in Solang Valley was amazing!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      date: "Feb 2024"
    }
  ],
  image: "/k-s8.jpg",
  gallery: [
      { src: "/k-s5.jpg", alt: "Manali Group" }, // Looks for public/m1.jpg
      { src: "/k-s3.jpg", alt: "Kasol Cafe" },
      { src: "/k-s4.jpg", alt: "Mountain View" },
      { src: "/k-s2.jpg", alt: "Mountain View" }
    ]
},
  


  
 {
  id: 'mcleodganj-dharamshala',
  stateId: 'himachal',
  title: 'McLeodganj & Triund Trek',
  location: 'Himachal Pradesh, India',
  duration: '5 Days / 4 Nights',
  price: '5000',
  originalPrice: '7500',
  rating: '4.7',
  reviews: 98,
  image: '/Mcleod Ganj.jpg',

  description:
    'Experience the beauty of McLeodganj and the famous Triund Trek. Explore Tibetan monasteries, vibrant cafes, Bhagsu waterfalls, and enjoy breathtaking views of the Dhauladhar mountain range. Perfect for adventure lovers and nature seekers.',

  inclusions: [
    'Delhi to McLeodganj and return transport via Volvo / Tempo Traveller',
    '1 Night Hotel stay in McLeodganj',
    '1 Night camping stay at Triund',
    '2 Breakfasts and 2 Dinners',
    'Guided Triund Trek',
    'Local sightseeing in McLeodganj',
    'Trip Captain / Tour Coordinator',
    'Bonfire & group activities (subject to weather)'
  ],

  exclusions: [
    'Lunch during the trip',
    'Personal expenses (shopping, cafe bills, etc.)',
    'Porter or horse charges during the trek',
    'Taxi from McLeodganj to Dharamkot trek base',
    'Adventure activities not mentioned in itinerary',
    'Travel insurance',
    'Anything not mentioned in inclusions'
  ],
  batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],

  itinerary: [
    {
      day: 1,
      title: 'Departure from Delhi',
      description:
        'Meet the group and trip captain at the Delhi boarding point in the evening. Start your overnight journey towards McLeodganj in a comfortable Volvo or Tempo Traveller. Enjoy music, games, and group interaction during the journey.'
    },

    {
      day: 2,
      title: 'Arrival in McLeodganj & Local Sightseeing',
      description:
        'Arrive in McLeodganj in the morning and check into your hotel. After freshening up, explore local attractions like Bhagsu Nag Temple, Bhagsu Waterfall, and Dharamkot village. Enjoy cafe hopping and explore the vibrant Tibetan markets of McLeodganj. Dinner and overnight stay at the hotel.'
    },

    {
      day: 3,
      title: 'Triund Trek & Camping',
      description:
        'After breakfast, start the famous Triund Trek (approx. 9 km). The trek passes through beautiful forests and scenic mountain trails. Reach Triund by afternoon and enjoy stunning sunset views of the Dhauladhar range. Spend the night camping under the stars at Triund campsite.'
    },

    {
      day: 4,
      title: 'Sunrise at Triund & Return to McLeodganj',
      description:
        'Wake up early to witness a breathtaking Himalayan sunrise. After breakfast, trek down from Triund to McLeodganj. Spend some free time exploring cafes or shopping before departing for Delhi in the evening.'
    },

    {
      day: 5,
      title: 'Arrival in Delhi',
      description:
        'Reach Delhi in the morning with unforgettable memories of mountains, trekking adventures, and amazing group experiences.'
    }
  ],

  gallery: [
    '/gallery/mcleodganj1.jpg',
    '/gallery/mcleodganj2.jpg',
    '/gallery/mcleodganj3.jpg',
    '/gallery/mcleodganj4.jpg'
  ]
},
  {
    id: 'shimla-kufri',
    stateId: 'himachal',
    title: 'Shimla & Kufri Getaway',
    location: 'Himachal Pradesh, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '7,800',
    rating: '4.6',
    reviews: 115,
    image: '/Shimla.jpg',
    description: 'A classic Himalayan retreat. Enjoy the colonial charm of Shimla and the exciting adventure activities in Kufri.',
    inclusions: ['2 Nights Hotel Stay', 'Breakfast & Dinner', 'Sightseeing Transfers'],
    exclusions: ['Adventure activity tickets in Kufri', 'Personal shopping'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & The Ridge', description: 'Arrive in Shimla, check-in, and spend the evening strolling down the famous Mall Road and The Ridge.' },
      { day: 2, title: 'Kufri Adventure', description: 'Full day excursion to Kufri. Enjoy horseback riding, the Himalayan Nature Park, and snow activities (seasonal).' },
      { day: 3, title: 'Jakhoo Temple & Departure', description: 'Hike up to Jakhoo Temple to see the giant Hanuman statue, then depart for home.' }
    ]
    
  },
  {
    id: 'kasol-kheerganga',
    stateId: 'himachal',
    title: 'Kasol & Kheerganga Trek',
    location: 'Himachal Pradesh, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '8,000',
    rating: '4.9',
    reviews: 210,
    image: '/Kheer Ganga.jpg',
    description: 'Trek through lush green pine forests, soak in the natural hot springs of Kheerganga, and camp under a sky full of stars.',
    inclusions: ['2 Nights Camp Stay', 'Trekking Guide', 'Meals during trek', 'Permits'],
    exclusions: ['Porter for personal bags', 'Transport to Kasol'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival in Kasol', description: 'Reach Kasol, check into your riverside camps, and explore the local market and cafes.' },
      { day: 2, title: 'Trek to Kheerganga', description: 'Drive to Barshaini and start the 12km trek to Kheerganga. Take a dip in the hot springs at the top and enjoy a bonfire dinner.' },
      { day: 3, title: 'Descent & Departure', description: 'Wake up to mountain views, trek back down to Barshaini, and depart for your onward journey.' }
    ]
  },
  {
    id: 'jibhi-tirthan',
    stateId: 'himachal',
    title: 'Jibhi & Tirthan Valley',
    location: 'Himachal Pradesh, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '8,500',
    rating: '4.8',
    reviews: 134,
    image: '/Jibhi.jpg',
    description: 'Escape the crowds in this offbeat Himalayan paradise. Crystal clear rivers, wooden homestays, and untouched nature.',
    inclusions: ['2 Nights Homestay', 'Home-cooked Meals', 'Trip Captain'],
    exclusions: ['Travel to Jibhi', 'Personal expenses'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Jibhi Waterfall', description: 'Arrive in Jibhi, check into a cozy wooden homestay, and take a short hike to the pristine Jibhi Waterfall.' },
      { day: 2, title: 'Jalori Pass & Serolsar Lake', description: 'Drive up to the high-altitude Jalori Pass and embark on a beautiful trek to the sacred Serolsar Lake hidden in the forest.' },
      { day: 3, title: 'Tirthan River & Departure', description: 'Spend a relaxing morning by the Tirthan River, enjoy breakfast, and begin your journey home.' }
    ]
  },
  , // Don't forget this comma to separate from the previous trip!
  {
    id: 'kasol-tosh',
    stateId: 'himachal',
    title: 'Kasol & Tosh Cafe Hopping',
    location: 'Himachal Pradesh, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '7,500',
    rating: '4.8',
    reviews: 156,
    image: '/tosh.jpg',
    description: 'A chill backpacker vibe trip. Explore the famous cafes of Kasol, walk along the Parvati River, and hike up to the beautiful, remote village of Tosh for epic mountain views.',
    inclusions: ['2 Nights Accommodation (Camp/Homestay)', 'Breakfast & Dinner', 'Trip Captain', 'Local Transfers'],
    exclusions: ['Travel to Basecamp', 'Personal Expenses', 'Lunch'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival in Kasol & Manikaran', description: 'Reach Kasol in the morning. Check into your camps, visit the holy Manikaran Sahib, and spend the evening cafe hopping in Kasol market.' },
      { day: 2, title: 'Hike to Tosh Village', description: 'After breakfast, take a short drive to Barshaini and begin the easy hike to Tosh village. Experience the traditional wooden houses and stunning glacier views.' },
      { day: 3, title: 'Parvati Valley & Departure', description: 'Enjoy a peaceful morning in the mountains, hike back down, and start your return journey home.' }
    ]
  },
  {
    id: 'mcleodganj-triund',
    stateId: 'himachal',
    title: 'McLeodganj & Triund Trek',
    location: 'Himachal Pradesh, India',
    duration: '3 Days / 2 Nights',
    price: '5,800',
    originalPrice: '7,000',
    rating: '4.9',
    reviews: 245,
    image: '/triund.jpg',
    description: 'The perfect beginner trek! Hike up to the famous Triund ridge, camp directly under the stars, and wake up to the massive Dhauladhar mountains right in your face.',
    inclusions: ['1 Night Hotel, 1 Night Dome Camp', 'Trekking Guide', 'Meals during trek', 'Sleeping Bags'],
    exclusions: ['Transport to Dharamshala', 'Personal Porter'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'McLeodganj Sightseeing', description: 'Arrive in McLeodganj, check in, and explore the Dalai Lama Temple, Bhagsu Waterfall, and the vibrant Tibetan markets.' },
      { day: 2, title: 'The Triund Trek', description: 'Start your trek from Dharamkot. Hike through beautiful oak and rhododendron forests to reach the Triund top. Enjoy a bonfire and camp under the stars.' },
      { day: 3, title: 'Descent & Departure', description: 'Wake up to a breathtaking sunrise over the peaks, trek back down to McLeodganj, and depart.' }
    ]
  },
  {
    id: 'bir-billing',
    stateId: 'himachal',
    title: 'Bir Billing Paragliding',
    location: 'Himachal Pradesh, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '9,000',
    rating: '4.9',
    reviews: 312,
    image: '/billing.jpg',
    description: 'Calling all adrenaline junkies! Experience the thrill of flying at Asia\'s highest paragliding site, explore ancient monasteries, and enjoy spectacular sunsets.',
    inclusions: ['2 Nights Stay', 'Paragliding Flight (15-20 mins)', 'GoPro Video of Flight', 'Breakfast & Dinner'],
    exclusions: ['Travel to Bir', 'Extra adventure activities'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Monastery Tour', description: 'Arrive in the beautiful Tibetan colony of Bir. Check in, rent a bicycle, and explore the gorgeous Chokling and Sherab Ling monasteries.' },
      { day: 2, title: 'The Ultimate Flight', description: 'Drive up to Billing. Take the leap of faith and enjoy a mesmerizing paragliding flight over the lush green valleys. Land in Bir and celebrate at local cafes.' },
      { day: 3, title: 'Hidden Waterfall & Departure', description: 'Take a short morning hike to the hidden Bangoru Waterfall, enjoy brunch, and head back home.' }
    ]
  },
  {
    id: 'sethan-valley',
    stateId: 'himachal',
    title: 'Sethan Igloo Village',
    location: 'Himachal Pradesh, India',
    duration: '3 Days / 2 Night',
    price: '5,000',
    originalPrice: '6,500',
    rating: '4.7',
    reviews: 88,
    image: '/Tirthan.jpg',
    description: 'An offbeat winter wonderland just above Manali. Experience staying in a snowy paradise away from the crowded tourist spots.',
    inclusions: ['1 Night Stay in Sethan', 'Breakfast & Dinner', 'Snow Activities (Seasonal)'],
    exclusions: ['Travel to Manali', 'Heater charges (if applicable)'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival in Sethan', description: 'Reach Manali and take a specialized 4x4 vehicle up the snowy roads to Sethan Village. Enjoy snowboarding/skiing (seasonal) and a cozy bonfire night.' },
      { day: 2, title: 'Snow Trek & Departure', description: 'Go for a morning snow walk with majestic views of the Kullu valley. Head back down to Manali for your onward journey.' }
    ]
  },
  , // Don't forget this comma to separate from the last Himachal trip!
  {
    id: 'rishikesh-camping',
    stateId: 'uttarakhand',
    title: 'Rishikesh Rafting & Camping',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Night',
    price: '5,000',
    originalPrice: '5,500',
    rating: '4.8',
    reviews: 420,
    image: '/Rishikesh.jpg',
    description: 'Experience the ultimate adrenaline rush with white water rafting on the Ganges, followed by riverside beach camping, bonfires, and acoustic music under the stars.',
    inclusions: ['1 Night Riverside Camp Stay', '16km River Rafting', 'All 3 Meals', 'Cliff Jumping & Body Surfing'],
    exclusions: ['Travel to Rishikesh', 'Personal Expenses'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Riverside Camping', description: 'Arrive at the campsite in Shivpuri. Enjoy a welcome drink, play camp games, take a nature walk, and spend the evening around the bonfire with snacks and dinner.' },
      { day: 2, title: 'River Rafting & Departure', description: 'After breakfast, head to the starting point for a thrilling 16km rafting expedition. Experience cliff jumping before finishing your trip at Laxman Jhula.' }
    ]
  },
  {
    id: 'kedarnath-yatra',
    stateId: 'uttarakhand',
    title: 'Kedarnath Yatra Trek',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '10,500',
    rating: '4.9',
    reviews: 550,
    image: '/kedarnathyatra.jpg',
    description: 'A deeply spiritual and physically rewarding journey to the majestic Kedarnath Temple. Trek through the breathtaking Garhwal Himalayas to seek the blessings of Lord Shiva.',
    inclusions: ['3 Nights Accommodation', 'Transport from Haridwar/Rishikesh', 'Breakfast & Dinner', 'Experienced Trek Guide'],
    exclusions: ['Helicopter/Mule/Pony charges', 'VIP Darshan Tickets', 'Lunch'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Haridwar to Guptkashi', description: 'Meet the group in Haridwar and drive along the Mandakini river to reach Guptkashi. Check in and rest for the trek.' },
      { day: 2, title: 'Trek to Kedarnath', description: 'Early morning drive to Sonprayag/Gaurikund. Begin the 16km steep trek to the Kedarnath shrine. Attend the mesmerizing evening Aarti and stay overnight near the temple.' },
      { day: 3, title: 'Morning Darshan & Descent', description: 'Wake up early for the main Darshan. Feel the spiritual energy, then trek back down to Gaurikund and drive to your hotel in Guptkashi.' },
      { day: 4, title: 'Return to Haridwar', description: 'After breakfast, begin the scenic drive back to Haridwar, carrying unforgettable memories and blessings.' }
    ]
  },
  {
    id: 'auli-snow',
    stateId: 'uttarakhand',
    title: 'Auli Snow Expedition',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '12,000',
    rating: '4.8',
    reviews: 215,
    image: '/Auli.jpg',
    description: 'Visit the premier skiing capital of India. Ride Asia\'s longest cable car, walk through frozen landscapes, and witness 360-degree panoramic views of the Nanda Devi peak.',
    inclusions: ['3 Nights Stay (Joshimath/Auli)', 'Breakfast & Dinner', 'Transport from Rishikesh'],
    exclusions: ['Skiing Equipment/Lessons', 'Auli Cable Car Tickets (approx ₹1000)'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Drive to Joshimath', description: 'Start from Rishikesh, driving through the beautiful mountain roads of Devprayag and Rudraprayag to reach Joshimath by evening.' },
      { day: 2, title: 'Auli Skiing & Cable Car', description: 'Take the famous ropeway from Joshimath to Auli. Spend the day playing in the snow, trying out skiing, and enjoying the magnificent Himalayan views.' },
      { day: 3, title: 'Gorson Bugyal Trek', description: 'Go for a guided snow trek to Gorson Bugyal, a massive alpine meadow offering some of the best mountain vistas in Uttarakhand. Return to Joshimath.' },
      { day: 4, title: 'Return Journey', description: 'Check out after breakfast and drive back down to Rishikesh to conclude the trip.' }
    ]
  },
  {
    id: 'chopta-tungnath',
    stateId: 'uttarakhand',
    title: 'Chopta & Tungnath Trek',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '6,800',
    rating: '4.9',
    reviews: 180,
    image: '/Chopta.jpg',
    description: 'Known as the "Mini Switzerland of India", Chopta offers lush meadows and a relatively easy trek to Tungnath, the highest Shiva temple in the world, and further to the Chandrashila peak.',
    inclusions: ['2 Nights Swiss Camp Stay', 'All Meals during Trek', 'Trek Leader', 'Forest Permits'],
    exclusions: ['Travel to Basecamp (Chopta)', 'Personal Porter'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival in Chopta', description: 'Reach the beautiful meadows of Chopta. Check into your camps, acclimatize to the altitude, and enjoy a sunset walk followed by dinner around the bonfire.' },
      { day: 2, title: 'Tungnath & Chandrashila Summit', description: 'Start the trek early. Trek through rhododendron forests to reach Tungnath Temple. Push further to the Chandrashila summit for an unbelievable 360-degree Himalayan panorama.' },
      { day: 3, title: 'Descent & Departure', description: 'Wake up to a crisp mountain morning, enjoy breakfast, and start your journey back home.' }
    ]
  },
  , // Don't forget the comma!
  {
    id: 'nainital-weekend',
    stateId: 'uttarakhand',
    title: 'Nainital Lake City Weekend',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '5,500',
    rating: '4.7',
    reviews: 310,
    image: '/Discover Nainital.jpg',
    description: 'Escape to the breathtaking "Lake District of India". Enjoy boating on the Naini Lake, explore the vibrant Mall Road, and witness spectacular Himalayan viewpoints.',
    inclusions: ['2 Nights Hotel Stay', 'Breakfast & Dinner', 'Local Sightseeing Cab'],
    exclusions: ['Boating/Cable Car Tickets', 'Travel to Nainital', 'Lunch'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Lake Tour', description: 'Arrive in Nainital and check into your hotel. Spend the afternoon boating on Naini Lake, visit the Naina Devi Temple, and stroll along the famous Mall Road at sunset.' },
      { day: 2, title: 'Scenic Viewpoints & Lakes', description: 'After breakfast, drive to Snow View Point, Tiffin Top, and the beautiful eco-cave gardens. In the evening, explore the Tibetan market.' },
      { day: 3, title: 'Bhimtal Excursion & Departure', description: 'Check out and take a short drive to the neighboring Bhimtal and Sattal lakes before starting your journey back home.' }
    ]
  },
  {
    id: 'mussoorie-getaway',
    stateId: 'uttarakhand',
    title: 'Mussoorie Queen of Hills',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '4,999',
    originalPrice: '6,200',
    rating: '4.8',
    reviews: 425,
    image: '/Mussoorie.jpg',
    description: 'Experience the colonial charm of Mussoorie. Walk through misty pine forests, visit cascading waterfalls, and enjoy panoramic views of the Doon Valley.',
    inclusions: ['2 Nights Premium Stay', 'Breakfast & Dinner', 'Kempty Fall Visit'],
    exclusions: ['Travel to Dehradun/Mussoorie', 'Entry fees to tourist spots'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival in Mussoorie', description: 'Drive up the winding roads from Dehradun. Check in, relax, and spend the evening exploring the cafes and shops along Camel\'s Back Road and the Mall.' },
      { day: 2, title: 'Waterfalls & Viewpoints', description: 'Visit the famous Kempty Falls for a refreshing dip. Later, take the ropeway to Gun Hill point for a spectacular sunset over the Himalayan ranges.' },
      { day: 3, title: 'Landour Bakery & Departure', description: 'Take a quiet morning walk up to the cantonment area of Landour. Grab breakfast at the iconic bakehouse before departing.' }
    ]
  },
  {
    id: 'jim-corbett-safari',
    stateId: 'uttarakhand',
    title: 'Jim Corbett Wildlife Safari',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '7,000',
    rating: '4.9',
    reviews: 280,
    image: '/JimCorbett.jpg', // Royal Bengal Tiger
    description: 'Dive deep into the wilderness of India\'s oldest national park. Stay in luxury jungle resorts and embark on an open jeep safari to spot the majestic Royal Bengal Tiger.',
    inclusions: ['2 Nights Resort Stay', 'All 3 Meals', '1 Open Jeep Safari', 'Resort Pool & Activities'],
    exclusions: ['Travel to Ramnagar', 'Extra Safari zones'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Jungle Resort Arrival', description: 'Arrive in Ramnagar and check into your luxury jungle resort. Enjoy the swimming pool, play indoor games, and have a lavish buffet dinner.' },
      { day: 2, title: 'The Great Safari', description: 'Wake up early for an exhilarating open jeep safari deep into the Corbett tiger reserve. Return for breakfast, relax, and visit the Garjiya Devi temple in the evening.' },
      { day: 3, title: 'Corbett Museum & Departure', description: 'After breakfast, visit the Jim Corbett museum to learn about the park\'s history, check out, and head home.' }
    ]
  },
  {
    id: 'chakrata-hidden-gem',
    stateId: 'uttarakhand',
    title: 'Chakrata Hidden Gem',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '6,500',
    rating: '4.8',
    reviews: 145,
    image: '/chakrata.jpg',
    description: 'Tired of crowded hill stations? Escape to the secluded cantonment town of Chakrata. Trek to massive hidden waterfalls and camp in raw, untouched alpine meadows.',
    inclusions: ['2 Nights Camp/Homestay', 'Breakfast & Dinner', 'Tiger Falls Trek Guide'],
    exclusions: ['Travel to Base', 'Personal Expenses'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Acclimatization', description: 'Drive up the scenic routes past Dehradun to reach Chakrata. Check into your cozy camp/homestay, enjoy a bonfire, and soak in the absolute silence of the mountains.' },
      { day: 2, title: 'Tiger Falls Expedition', description: 'Trek down through dense oak and rhododendron forests to witness Tiger Falls, one of the highest direct waterfalls in India. Enjoy a picnic lunch by the pristine water.' },
      { day: 3, title: 'Chilmiri Neck & Departure', description: 'Drive up to Chilmiri Neck, the highest peak in Chakrata, for a sweeping view of the Himalayas before starting your descent back home.' }
    ]
  },
  , // Comma to separate from the previous batch
  {
    id: 'lansdowne-quiet',
    stateId: 'uttarakhand',
    title: 'Lansdowne Cantonment Retreat',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '5,200',
    rating: '4.7',
    reviews: 95,
    image: '/landsdown.jpg',
    description: 'One of the quietest hill stations in India. Explore the clean, pine-covered hills of this military cantonment, visit the Tip-in-Top viewpoint, and enjoy the serene Bhulla Lake.',
    inclusions: ['2 Nights Hotel Stay', 'Breakfast & Dinner', 'Visit to Army Museum'],
    exclusions: ['Travel to Lansdowne', 'Boating fees'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Sunset Walk', description: 'Reach Lansdowne by afternoon. Visit the St. John\'s Church and walk to Tip-in-Top for a magnificent sunset over the snow-clad peaks.' },
      { day: 2, title: 'Lakes & Museums', description: 'Spend your morning at Bhulla Lake for boating. Later, visit the Garhwal Rifles Regimental Museum and the Tarkeshwar Mahadev Temple situated amidst thick cedar forests.' },
      { day: 3, title: 'Nature Trail & Departure', description: 'Enjoy a peaceful morning nature walk through the pine trails before starting your return journey.' }
    ]
  },
  {
    id: 'harsil-valley',
    stateId: 'uttarakhand',
    title: 'Harsil: The Mini Switzerland',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '11,000',
    rating: '4.9',
    reviews: 64,
    image: '/Harsil.jpg',
    description: 'An untouched paradise on the banks of the Bhagirathi river. Famous for its apple orchards and dense deodar forests, Harsil is the perfect getaway for peace seekers.',
    inclusions: ['3 Nights Riverside Stay', 'All Meals', 'Guided Village Walk', 'Gartang Gali Visit'],
    exclusions: ['Travel to Harsil', 'Personal Expenses'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Drive to Harsil', description: 'Drive from Rishikesh/Uttarkashi through the scenic winding roads along the Ganga. Check into your riverside stay in Harsil.' },
      { day: 2, title: 'Gartang Gali & Gangotri', description: 'Visit the historic wooden skywalk of Gartang Gali. Later, drive to the holy Gangotri temple and witness the Bhagirathi river at its origin.' },
      { day: 3, title: 'Village Exploration', description: 'Explore the traditional wooden houses of Bagori village, visit Mukhba, and enjoy a peaceful picnic by the river.' },
      { day: 4, title: 'Return Journey', description: 'Say goodbye to the apple orchards and begin your scenic drive back down to the plains.' }
    ]
  },
  {
    id: 'do-dham-yatra',
    stateId: 'uttarakhand',
    title: 'Do Dham: Kedarnath & Badrinath',
    location: 'Uttarakhand, India',
    duration: '3 Days / 2 Nights',
    price: '5,000',
    originalPrice: '17,500',
    rating: '5.0',
    reviews: 210,
    image: '/dham.jpg',
    description: 'A complete spiritual circuit covering two of the most significant shrines in the Himalayas. Journey through the high-altitude landscapes of Kedarnath and the divine architecture of Badrinath.',
    inclusions: ['5 Nights Accommodation', 'Haridwar to Haridwar Transport', 'Breakfast & Dinner', 'Registration Assistance'],
    exclusions: ['Helicopter/Mule charges', 'VIP Darshan', 'Lunch'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Haridwar to Guptkashi', description: 'Scenic drive along the Alaknanda and Mandakini rivers.' },
      { day: 2, title: 'Kedarnath Trek', description: 'A spiritual trek to the Kedarnath shrine. Overnight stay near the temple.' },
      { day: 3, title: 'Kedarnath to Guptkashi', description: 'Morning Aarti and trek back down to Guptkashi.' },
      { day: 4, title: 'Drive to Badrinath', description: 'Travel to the holy town of Badrinath. Visit Mana Village, the last Indian village before the Tibet border.' },
      { day: 5, title: 'Badrinath to Rudraprayag', description: 'Morning bath in Tapt Kund and Darshan of Badrinath ji. Drive to the confluence at Rudraprayag.' },
      { day: 6, title: 'Return to Haridwar', description: 'Visit Rishikesh on the way back to Haridwar.' }
    ]
  },
  {
    id: 'char-dham-full',
    stateId: 'uttarakhand',
    title: 'Ultimate Char Dham Yatra',
    location: 'Uttarakhand, India',
    duration: '10 Days / 9 Nights',
    price: '24,000',
    originalPrice: '28,500',
    rating: '5.0',
    reviews: 430,
    image: '/chardham.jpg',
    description: 'The most sacred pilgrimage in India. Visit Yamunotri, Gangotri, Kedarnath, and Badrinath in one life-changing expedition through the Himalayas.',
    inclusions: ['9 Nights Standard Hotel Stay', 'Tempo Traveller/Bus Transport', 'Breakfast & Dinner', 'Experienced Yatra Captain'],
    exclusions: ['Pony/Palki charges', 'Aarti Tickets', 'Personal Medical Kit'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Start from Haridwar', description: 'Drive to Barkot via Mussoorie and Kempty Falls.' },
      { day: 2, title: 'Yamunotri Dham', description: 'First Dham visit. Trek to the source of the Yamuna river.' },
      { day: 3, title: 'Drive to Uttarkashi', description: 'Visit Vishwanath Temple and stay by the Bhagirathi.' },
      { day: 4, title: 'Gangotri Dham', description: 'Second Dham visit. Take a dip in the holy Bhagirathi at Gangotri.' },
      { day: 5, title: 'Drive to Guptkashi', description: 'Long scenic drive to the base of the Kedarnath region.' },
      { day: 6, title: 'Kedarnath Trek', description: 'Third Dham visit. Spiritual trek to the abode of Lord Shiva.' },
      { day: 7, title: 'Descent to Guptkashi', description: 'Trek back and rest for the final leg.' },
      { day: 8, title: 'Drive to Badrinath', description: 'Fourth Dham visit. Witness the majesty of the Neelkanth peak.' },
      { day: 9, title: 'Badrinath to Rishikesh', description: 'Drive down to the Yoga capital.' },
      { day: 10, title: 'Conclusion at Haridwar', description: 'Final drop at Haridwar station with blessings and memories.' }
    ]
  },
  , // Comma to separate from the Uttarakhand section
  {
    id: 'udaipur-city-lakes',
    stateId: 'rajasthan',
    title: 'Udaipur: City of Lakes',
    location: 'Rajasthan, India',
    duration: '3 Days / 2 Nights',
    price: '5000',
    originalPrice: '7,200',
    rating: '4.9',
    reviews: 215,
    image: '/Udaipur.jpg',
    description: 'The Venice of the East. Experience the royal grandeur of City Palace, peaceful boat rides on Lake Pichola, and the beautiful architecture of Jag Mandir.',
    inclusions: ['2 Nights Heritage Hotel Stay', 'Breakfast & Dinner', 'Boat Ride on Lake Pichola', 'Guided City Tour'],
    exclusions: ['Travel to Udaipur', 'Entry tickets to Palaces', 'Lunch'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Lake Pichola', description: 'Arrive in Udaipur and check into your heritage stay. In the evening, enjoy a magical boat ride on Lake Pichola and witness the sunset over the Lake Palace.' },
      { day: 2, title: 'City Palace & Saheliyon ki Bari', description: 'Explore the massive City Palace complex, the crystal museum, and the beautiful gardens of Saheliyon ki Bari. Spend the evening at Ambrai Ghat.' },
      { day: 3, title: 'Fateh Sagar & Departure', description: 'Visit the Fateh Sagar lake and the Jagdish temple before heading to the airport/station for your journey home.' }
    ]
  },
  {
    id: 'jaipur-pink-city',
    stateId: 'rajasthan',
    title: 'Jaipur: The Pink City Tour',
    location: 'Rajasthan, India',
    duration: '3 Days / 2 Nights',
    price: '4,999',
    originalPrice: '6,500',
    rating: '4.8',
    reviews: 380,
    image: '/Jaipur.jpg',
    description: 'A journey through the royal history of the Rajputs. From the iconic Hawa Mahal to the majestic Amer Fort, experience the vibrant culture and colors of Jaipur.',
    inclusions: ['2 Nights Stay', 'Breakfast & Dinner', 'Private AC Cab for Sightseeing'],
    exclusions: ['Travel to Jaipur', 'Elephant/Jeep ride at Amer Fort'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Hawa Mahal & Markets', description: 'Check in and visit the Hawa Mahal (Palace of Winds). Spend your evening shopping for authentic jewelry and textiles in Johari Bazaar.' },
      { day: 2, title: 'Amer Fort & Nahargarh', description: 'Visit the stunning Amer Fort in the morning. Later, head to Nahargarh Fort for a panoramic view of the entire Pink City at sunset.' },
      { day: 3, title: 'City Palace & Departure', description: 'Visit the City Palace and Jantar Mantar observatory before concluding your trip.' }
    ]
  },
  {
    id: 'jaisalmer-desert-safari',
    stateId: 'rajasthan',
    title: 'Jaisalmer: Golden City & Desert',
    location: 'Rajasthan, India',
    duration: '3 Days / 2 Nights',
    price: '6,500',
    originalPrice: '8,000',
    rating: '4.9',
    reviews: 290,
    image: '/The Golden City -Jaisalmer.jpg',
    description: 'Explore the living fort of Jaisalmer and head deep into the Thar Desert for a night under the stars in traditional luxury camps.',
    inclusions: ['1 Night Hotel, 1 Night Desert Camp', 'Camel Safari & Jeep Dune Bashing', 'Traditional Rajasthani Folk Music', 'All Meals in Desert'],
    exclusions: ['Travel to Jaisalmer', 'Personal Tips'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Jaisalmer Fort & Havelis', description: 'Explore the Golden Fort, Patwon ki Haveli, and Gadisar Lake. Witness how the yellow sandstone glows at sunset.' },
      { day: 2, title: 'Sam Sand Dunes Expedition', description: 'Drive to the Sam Sand Dunes. Enjoy a camel safari, thrilling jeep dune bashing, and an evening of folk dance and music at the desert camp.' },
      { day: 3, title: 'Kuldhara & Departure', description: 'Visit the haunted village of Kuldhara on your way back to the city for departure.' }
    ]
  },
  , // Comma to separate from the previous batch
  {
    id: 'jodhpur-blue-city',
    stateId: 'rajasthan',
    title: 'Jodhpur: The Blue City',
    location: 'Rajasthan, India',
    duration: '3 Days / 2 Nights',
    price: '4,999',
    originalPrice: '6,000',
    rating: '4.8',
    reviews: 195,
    image: '/Jodhpur.jpg',
    description: 'Dominated by the massive Mehrangarh Fort, explore the sea of blue houses in the old city and the magnificent Umaid Bhawan Palace.',
    inclusions: ['2 Nights Boutique Stay', 'Breakfast & Dinner', 'Guided Walk in Blue City'],
    exclusions: ['Travel to Jodhpur', 'Zipline (Flying Fox) at Fort'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Mehrangarh & Jaswant Thada', description: 'Explore one of the largest forts in India and the serene marble cenotaph of Jaswant Thada.' },
      { day: 2, title: 'Old City & Stepwells', description: 'Walk through the narrow blue lanes, visit the Toorji Ka Jhalra stepwell, and enjoy the vibrant Clock Tower market.' },
      { day: 3, title: 'Umaid Bhawan & Departure', description: 'Visit the royal museum at Umaid Bhawan Palace before heading to the airport or station.' }
    ]
  },
  {
    id: 'pushkar-holy-town',
    stateId: 'rajasthan',
    title: 'Pushkar: Spiritual & Vibrant',
    location: 'Rajasthan, India',
    duration: '2 Days / 1 Night',
    price: '2,999',
    originalPrice: '3,800',
    rating: '4.7',
    reviews: 150,
    image: '/Pushkar.jpg',
    description: 'Visit the only Brahma Temple in the world and experience the magical evening Aarti at the Pushkar Ghats.',
    inclusions: ['1 Night Stay', 'Breakfast & Dinner', 'Desert Camel Ride'],
    exclusions: ['Travel to Pushkar', 'Personal Shopping'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Brahma Temple & Ghats', description: 'Arrive and visit the holy lake. Experience the evening Aarti at Varaha Ghat followed by a stroll through the hippie markets.' },
      { day: 2, title: 'Savitri Temple Hike', description: 'Early morning hike or ropeway to Savitri Temple for a sunrise view of the town. Depart by afternoon.' }
    ]
  },
  {
    id: 'jawai-leopard-safari',
    stateId: 'rajasthan',
    title: 'Jawai: The Leopard Hills',
    location: 'Rajasthan, India',
    duration: '3 Days / 2 Nights',
    price: '5000',
    originalPrice: '14,000',
    rating: '4.9',
    reviews: 82,
    image: '/Jawai.jpg',
    description: 'Witness the unique harmony between leopards and the local Rabari tribe in the rocky granite landscapes of Jawai.',
    inclusions: ['2 Nights Luxury Tent Stay', 'All Meals', '2 Private Jeep Safaris', 'Crocodile Sighting'],
    exclusions: ['Travel to Jawai', 'Alcoholic Beverages'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Village Walk', description: 'Check into your luxury camp. Evening walk through the Rabari village to understand local culture.' },
      { day: 2, title: 'Leopard Safaris', description: 'Morning and evening safaris to track the wild leopards on the granite hills. Visit Jawai Dam for crocodile spotting.' },
      { day: 3, title: 'Breakfast & Departure', description: 'Enjoy a lavish bush breakfast before heading back to the nearest station.' }
    ]
  },
  {
    id: 'ranthambore-wildlife',
    stateId: 'rajasthan',
    title: 'Ranthambore: Tiger Territory',
    location: 'Rajasthan, India',
    duration: '3 Days / 2 Nights',
    price: '7,999',
    originalPrice: '9,500',
    rating: '4.8',
    reviews: 310,
    image: '/download.jpg',
    description: 'A former royal hunting ground, Ranthambore is now one of the best places in India to spot tigers in the wild.',
    inclusions: ['2 Nights Resort Stay', 'Breakfast & Dinner', '1 Canter/Jeep Safari'],
    exclusions: ['Travel to Sawai Madhopur', 'National Park Entry Fees'],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: 'Arrival & Ranthambore Fort', description: 'Arrive in Sawai Madhopur and visit the UNESCO World Heritage Ranthambore Fort within the park.' },
      { day: 2, title: 'Into the Wild', description: 'Early morning safari into the core zone. Spend the afternoon relaxing at the resort pool. Optional evening safari.' },
      { day: 3, title: 'Departure', description: 'Breakfast and check out. Transfer to the station for your journey home.' }
    ]
  },
// MUST START WITH 'export'
  {
    id: "kedarkantha", 
    stateId: "uttarakhand",
    title: "Kedarkantha Snow Trek",
    price: "5000", // [cite: 5, 62]
    location: "Sankri, Uttarakhand", 
    duration: "5 Days / 4 Nights", 
    logo: "/logo.png",
    image: "/Kedarkantha.png",
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { 
        day: 1, 
        title: "Dehradun to Sankri (Drive)", 
        desc: "7-8 hour drive passing through Mussoorie and Kempty Falls. Overnight stay at Sankri homestay.", 
        image: "/fri.jpg"
      },
      { 
        day: 2, 
        title: "Sankri to Juda-ka-Talab", 
        desc: "4-5 hour trek through dense oak and pine forests to a serene lake campsite.", 
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"
      },
      { 
        day: 3, 
        title: "Juda-ka-Talab to Kedarkantha Base", 
        desc: "4-5 hour trek with stunning views of snow mountains. Camp at 10,600 feet.", 
        image: "https://images.unsplash.com/photo-1589779267444-60efd3200729"
      },
      { 
        day: 4, 
        title: "Summit & Descend to Hargaon", 
        desc: "3-4 hour climb to the peak for panoramic Himalayan views, then descend to Hargaon.", 
        image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b"
      },
      { 
        day: 5, 
        title: "Sankri to Dehradun (Drive)", 
        desc: "7-8 hour drive back to Dehradun marking the end of the journey.", 
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
      }
    ],
    inclusions: [
      "Dehradun to Dehradun Transport", 
      "Homestay & Tents (Shared)", 
      "4-time Daily Meals", 
      "Forest Permits & Camping Charges", 
      "Expert Team Captain & Guide" 
    ]
  },
  {
  id: "himachal-backpacking", // MUST match the URL: /trip/himachal-backpacking
  category: "backpacking",
  title: "Ultimate Himachal Backpacking",
  desc: "A 3 Days journey through Spiti, Jibhi, and Kasol designed for students.",
  price: "5000",
  duration: "2 Nights / 3 Days",
   image: "/himachalbackpacking.jpg",
  
  // TRIP GALLERY (Using your traveler photos)
  gallery: [
    { src: "/himachal-group1.png", alt: "Group at Rohtang Pass" },
    { src: "/himachal-group2.png", alt: "Students in Old Manali" },
    { src: "/himachal-group3.png", alt: "Café hopping in Kasol" }
  ],
  batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],

  // DAILY ITINERARY
  itinerary: [
    {
      day: 1,
      title: "Delhi to Manali (Overnight Journey)",
      desc: "Gather at the meeting point and start your journey towards the mountains.",
      image: "fri.jpg" // Referenced from your public folder
    },
    {
      day: 2,
      title: "Manali Arrival & Local Exploration",
      desc: "Check-in to the hostel and visit Hadimba Temple and Mall Road.",
      image: "manali-local.png"
    }
  ]
},
{
  id: "chopta-tungnath-rishikesh",
  category: "himachal-backpacking", // Matches your Category Link
  title: "Chopta Tungnath & Rishikesh Adventure",
  duration: "3 Days / 2 Nights",
  price: "5000",
  image: "/choptarishikesh.jpg",
  location: "Uttarakhand",
  
  // Photo Gallery - Ensure these images are in your /public folder
  gallery: [
    { src: "/images/chopta-main.jpg", alt: "Chopta Valley" },
    { src: "/images/tungnath-temple.jpg", alt: "Tungnath Temple" },
    { src: "/images/rishikesh-rafting.jpg", alt: "Rafting in Rishikesh" }
  ],
  batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],

  itinerary: [
    {
      day: "Day 0",
      title: "Departure from Delhi/Dehradun",
      description: "Meet the team and start the overnight journey to the mountains."
    },
    {
      day: "Day 1",
      title: "Arrival in Chopta & Acclimatization",
      description: "Check into the campsites. Enjoy a short trek to Deoriatal Lake. Overnight stay in camps with bonfire."
    },
    {
      day: "Day 2",
      title: "Tungnath & Chandrashila Summit",
      description: "Early morning trek to Tungnath (highest Shiva temple) and further to Chandrashila Peak for a 360-degree Himalayan view."
    },
    {
      day: "Day 3",
      title: "Rishikesh Exploration & Departure",
      description: "Drive to Rishikesh. Experience white water rafting and the evening Ganga Aarti before heading back home."
    }
  ]
},
{
    id: "rishikesh-mussoorie",
    category: "backpacking",
    title: "Rishikesh & Mussoorie: The Queen of Hills",
    location: "Uttarakhand",
    duration: "3 Days / 2 Nights",
    price: "5000",
    image: "/Rishikesh.jpg",
    inclusions: [
      "AC Transportation (Delhi to Delhi)",
      "Stay: 3-Star Hotels/Camps (Triple Sharing)",
      "Meals: 3 Breakfasts & 3 Dinners",
      "River Rafting (12 KM)",
      "Guided Sightseeing in Mussoorie",
      "Ganga Aarti Experience",
      "Professional Trip Coordinator"
    ],
    batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],
    itinerary: [
      { day: 1, title: "Arrival & Camping", desc: "Riverside camping and bonfire.", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450" },
      { day: 2, title: "Rafting & Aarti", desc: "12km rafting and Ganga Aarti.", image: "https://images.unsplash.com/photo-1597034442534-7164923f03b8" },
      // ... add the rest of the days here ...
    ]
  },
 {
  id: "kashmir-srinagar-budget",
  stateId: "kashmir",
  title: "Srinagar & Gulmarg Budget Trip",
  location: "Srinagar – Gulmarg – Srinagar",
  duration: "4 Nights / 5 Days",
  price: "6999",
  originalPrice: "9999",
  rating: "4.8",
  reviews: 95,
  image: "/kashmir1.jpg",
  batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],

  itinerary: [
    {
      day: 1,
      title: "Arrival in Srinagar",
      desc: "Arrive in Srinagar and check into your hotel. Enjoy the famous Dal Lake and evening Shikara ride.",
      image: "/k2.jpg"
    },
    {
      day: 2,
      title: "Gulmarg Excursion",
      desc: "Visit Gulmarg meadow and optional Gondola ride. Experience snow activities.",
      image: "/k3.jpg"
    },
    {
      day: 3,
      title: "Mughal Gardens",
      desc: "Explore Nishat Bagh, Shalimar Bagh and Shankaracharya Temple.",
      image: "/k4.jpg"
    },
    {
      day: 4,
      title: "Local Market",
      desc: "Explore Lal Chowk market and enjoy Kashmiri cuisine.",
      image: "/k6.jpg"
    },
    {
      day: 5,
      title: "Departure",
      desc: "Breakfast and checkout. Trip ends with unforgettable memories.",
      image: "/k8.jpg"
    }
  ]
},

{
  id: "kashmir-volvo-special",
  stateId: "kashmir",
  title: "Delhi to Kashmir Volvo Trip",
  location: "Delhi – Srinagar – Gulmarg – Delhi",
  duration: "5 Nights / 6 Days",
  price: 8999,
  originalPrice: 11999,

  image: "/kashmir1.jpg",

  gallery: [
    { src: "/k2.jpg" },
    { src: "/k3.jpg" },
    { src: "/k4.jpg" },
    { src: "/k6.jpg" },
    { src: "/k8.jpg" }
  ],
  batches: [
{
date: "14 Mar 2026",
price: 6999,
seats: 6
},
{
date: "21 Mar 2026",
price: 6999,
seats: 4
},
{
date: "28 Mar 2026",
price: 7499,
seats: 8
}
],

  itinerary: [
    {
      day: 0,
      title: "Departure from Delhi",
      desc: "Board Volvo from Delhi in evening and start overnight journey."
    },
    {
      day: 1,
      title: "Arrival in Srinagar",
      desc: "Check-in to hotel and explore Dal Lake."
    },
    {
      day: 2,
      title: "Gulmarg Day Trip",
      desc: "Visit Gulmarg and optional Gondola ride."
    },
    {
      day: 3,
      title: "Srinagar Sightseeing",
      desc: "Visit Mughal Gardens and Shankaracharya Temple."
    },
    {
      day: 4,
      title: "Local Market",
      desc: "Explore Lal Chowk and Kashmiri markets."
    },
    {
      day: 5,
      title: "Return Journey",
      desc: "Volvo journey back to Delhi."
    }
  ],

  inclusions: [
    "Volvo Transport",
    "Hotel Stay",
    "Breakfast & Dinner",
    "Local Sightseeing"
  ],

  exclusions: [
    "Gondola Ride",
    "Personal Expenses",
    "Anything not mentioned"
  ]
}
];

// FLAT ARRAY FOR MANALI-KASOL
export const manaliKasolGallery = [
  { src: "/k-s1.jpg"  },
  { src: "/k-s3.jpg"},
  { src: "/k-s4.jpg"},
  { src: "/k-s5.jpg"},
];
export const realTripGallery = [
  { src: "/backpack.jpg" },
  { src: "/adventure.jpg" },
  { src: "/billing.jpg" },
  { src: "/goa-banner.jpg" }, { src: "/corporate.jpg" }, { src: "/CD1.jpg" },{ src: "/CD2.jpg" },{ src: "/CD3.jpg" },{ src: "/CD4.jpg" },{ src: "/CD5.jpg" },
  { src: "/CD6.jpg" }, { src: "/CD8.jpg" }, { src: "/CD11.jpg" }, { src: "/CD12.jpg" }, { src: "/CD13.jpg" }, { src: "/CD14.jpg" },
  { src: "/CD15.jpg" }, { src: "/CD16.jpg" }, { src: "/CD17.jpg" }, { src: "/CD18.jpg" }, { src: "/CD19.jpg" }, { src: "/CD20.jpg" },
  { src: "/CD21.jpg" }, { src: "/CD22.jpg" }, { src: "/CD23.jpg" }, { src: "/CD24.jpg" }, { src: "/CD25.jpg" }, { src: "/CD26.jpg" },
  { src: "/CD27.jpg" },{ src: "/CD28.jpg" },{ src: "/CD29.jpg" },{ src: "/CD30.JPG" },{ src: "/CD31.JPG" },{ src: "/CD32.JPG" },
  { src: "/CD33.JPG" }, { src: "/CD34.JPG" }, { src: "/CD35.JPG" }, { src: "/CD36.jpg" }, { src: "/CD37.jpg" }, { src: "/CD38.jpg" }, { src: "/CD39.jpg" },
  { src: "/CD40.jpg" }, { src: "/CD41.JPG" }, { src: "/CD43.JPG" }
 
  
 
 
 
];



