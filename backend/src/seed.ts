import { query } from './config/database';
import { initializeDatabase } from './config/init-db'; // Keep the import, but don't call it here

const experiences = [
    {
        id: 'exp_kayaking_001',
        title: 'Kayaking Adventure',
        description: 'Experience the thrill of kayaking through crystal-clear waters. This curated small-group experience includes all safety gear, certified guides, and stunning views. Perfect for both beginners and experienced kayakers. Navigate through scenic waterways while learning proper techniques from our expert instructors.',
        location: 'Goa, India',
        price: 999,
        duration: '3 hours',
        category: 'Adventure',
        rating: 4.8,
        reviews: 127,
        max_group_size: 8,
        images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
            'https://images.unsplash.com/photo-1503481766315-7a586b20f66d?w=800',
            'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800',
        ],
        highlights: [
            'Professional kayaking equipment provided',
            'Certified guide with 10+ years experience',
            'Safety briefing and basic training included',
            'Scenic waterway exploration',
            'Small group size for personalized attention',
        ],
        included: [
            'All kayaking equipment (kayak, paddle, life jacket)',
            'Safety gear and helmets',
            'Professional guide',
            'Waterproof bag for belongings',
            'Complimentary photos',
            'Refreshments and water',
        ],
    },
    {
        id: 'exp_sunrise_002',
        title: 'Nandi Hills Sunrise Trek',
        description: 'Wake up early and witness a breathtaking sunrise from Nandi Hills. This guided trek takes you through scenic trails to reach the summit just in time for dawn. Experience the magical transformation as the sky changes colors and the city below awakens. A perfect experience for nature lovers and photography enthusiasts.',
        location: 'Nandi Hills, Bangalore',
        price: 599,
        duration: '4 hours',
        category: 'Nature',
        rating: 4.9,
        reviews: 243,
        max_group_size: 15,
        images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        ],
        highlights: [
            'Watch a stunning sunrise from the hilltop',
            'Guided trek through beautiful trails',
            'Photography opportunities at multiple viewpoints',
            'Learn about local flora and fauna',
            'Hot tea and breakfast at the summit',
        ],
        included: [
            'Professional trekking guide',
            'Hot beverages (tea/coffee)',
            'Light breakfast',
            'First aid kit',
            'Trekking pole (if needed)',
        ],
    },
    {
        id: 'exp_coffee_003',
        title: 'Coffee Plantation Trail',
        description: 'Immerse yourself in the aromatic world of coffee. Walk through lush coffee plantations, learn about the cultivation process from bean to cup, and enjoy fresh brews. This guided tour offers insights into sustainable farming practices and includes hands-on coffee tasting sessions with expert sommeliers.',
        location: 'Coorg, Karnataka',
        price: 799,
        duration: '5 hours',
        category: 'Food & Drink',
        rating: 4.7,
        reviews: 189,
        max_group_size: 12,
        images: [
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
            'https://images.unsplash.com/photo-1442411210769-b95c455a1b3e?w=800',
        ],
        highlights: [
            'Walk through scenic coffee plantations',
            'Learn the complete coffee-making process',
            'Hands-on coffee picking experience',
            'Professional coffee tasting session',
            'Meet local farmers and learn sustainable practices',
        ],
        included: [
            'Guided plantation tour',
            'Coffee tasting session (5 varieties)',
            'Traditional Coorg lunch',
            'Fresh coffee beans sample pack',
            'Transportation within plantation',
        ],
    },
    {
        id: 'exp_yoga_004',
        title: 'Beach Sunrise Yoga',
        description: 'Start your day with peace and tranquility through a sunrise yoga session on the beach. Feel the sand beneath your feet, breathe in the fresh ocean air, and practice yoga as the sun rises over the horizon. Suitable for all levels, from complete beginners to advanced practitioners.',
        location: 'Varkala, Kerala',
        price: 499,
        duration: '2 hours',
        category: 'Wellness',
        rating: 4.9,
        reviews: 312,
        max_group_size: 20,
        images: [
            'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
            'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
        ],
        highlights: [
            'Yoga session during magical sunrise hours',
            'Guided meditation by certified instructor',
            'Beach setting with ocean sounds',
            'All skill levels welcome',
            'Relaxation and breathing techniques',
        ],
        included: [
            'Yoga mat and props',
            'Certified yoga instructor',
            'Meditation session',
            'Herbal tea after class',
            'Beach towel',
        ],
    },
    {
        id: 'exp_cooking_005',
        title: 'Traditional Cooking Class',
        description: 'Learn to cook authentic Indian dishes from experienced local chefs. This hands-on cooking class covers traditional recipes passed down through generations. Prepare a complete meal from appetizers to desserts, and enjoy your creations with fellow food enthusiasts.',
        location: 'Jaipur, Rajasthan',
        price: 1299,
        duration: '4 hours',
        category: 'Food & Drink',
        rating: 4.8,
        reviews: 156,
        max_group_size: 10,
        images: [
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
            'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        ],
        highlights: [
            'Learn 5 authentic Rajasthani dishes',
            'Hands-on cooking experience',
            'Professional chef instruction',
            'Visit local spice market',
            'Enjoy the meal you prepare',
        ],
        included: [
            'All cooking ingredients and equipment',
            'Recipe booklet to take home',
            'Spice kit with traditional blends',
            'Welcome drink and appetizers',
            'Chef apron and certificate',
        ],
    },
    {
        id: 'exp_heritage_006',
        title: 'Heritage Walk & Street Food',
        description: 'Explore the historic lanes of Old Delhi while sampling the best street food the city has to offer. This walking tour combines cultural heritage with culinary delights, taking you to hidden gems known only to locals. Experience the vibrant markets, ancient monuments, and mouth-watering flavors.',
        location: 'Old Delhi, Delhi',
        price: 699,
        duration: '3.5 hours',
        category: 'Cultural',
        rating: 4.7,
        reviews: 278,
        max_group_size: 12,
        images: [
            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
            'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
        ],
        highlights: [
            'Visit 8+ street food vendors',
            'Explore historic monuments and lanes',
            'Learn about Delhi\'s rich history',
            'Taste authentic local delicacies',
            'Small group for better interaction',
        ],
        included: [
            'Professional guide with historical expertise',
            'All food tastings (8-10 items)',
            'Bottled water',
            'Monument entry fees',
            'Digital photo album',
        ],
    },
];

const generateSlots = () => {
    const slots = [];
    const today = new Date();

    for (const exp of experiences) {
        // Generate slots for next 30 days
        for (let day = 0; day < 30; day++) {
            const date = new Date(today);
            date.setDate(date.getDate() + day);
            const dateStr = date.toISOString().split('T')[0];

            // Morning slot
            slots.push({
                id: `slot_${exp.id}_${dateStr}_morning`,
                experience_id: exp.id,
                date: dateStr,
                start_time: '07:00:00',
                end_time: '10:00:00',
                total_spots: exp.max_group_size,
                available_spots: Math.floor(Math.random() * exp.max_group_size) + 1,
                price: exp.price,
            });

            // Afternoon slot
            slots.push({
                id: `slot_${exp.id}_${dateStr}_afternoon`,
                experience_id: exp.id,
                date: dateStr,
                start_time: '14:00:00',
                end_time: '17:00:00',
                total_spots: exp.max_group_size,
                available_spots: Math.floor(Math.random() * exp.max_group_size) + 1,
                price: exp.price,
            });

            // Evening slot (if duration allows)
            if (exp.duration.includes('2') || exp.duration.includes('3')) {
                slots.push({
                    id: `slot_${exp.id}_${dateStr}_evening`,
                    experience_id: exp.id,
                    date: dateStr,
                    start_time: '17:30:00',
                    end_time: '19:30:00',
                    total_spots: exp.max_group_size,
                    available_spots: Math.floor(Math.random() * exp.max_group_size),
                    price: exp.price * 1.2, // Evening premium
                });
            }
        }
    }

    return slots;
};

const promoCodes = [
    { code: 'SAVE10', type: 'PERCENTAGE', value: 10, active: true },
    { code: 'FLAT100', type: 'FLAT', value: 100, active: true },
    { code: 'WELCOME20', type: 'PERCENTAGE', value: 20, active: true },
    { code: 'FIRSTBOOKING', type: 'FLAT', value: 150, active: true },
    { code: 'EARLYBIRD', type: 'PERCENTAGE', value: 15, active: true },
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // 🚨 CRITICAL CHANGE: The 'await initializeDatabase();' line was removed here.
        // It's already handled by 'npm start' and causes the "relation already exists" error.

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await query('DELETE FROM bookings');
        await query('DELETE FROM slots');
        await query('DELETE FROM experiences');
        await query('DELETE FROM promo_codes');

        // Insert experiences
        console.log('📦 Inserting experiences...');
        for (const exp of experiences) {
            await query(
                `INSERT INTO experiences (
          id, title, description, location, price, duration, category,
          rating, reviews, max_group_size, images, highlights, included
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [
                    exp.id,
                    exp.title,
                    exp.description,
                    exp.location,
                    exp.price,
                    exp.duration,
                    exp.category,
                    exp.rating,
                    exp.reviews,
                    exp.max_group_size,
                    exp.images,
                    exp.highlights,
                    exp.included,
                ]
            );
        }
        console.log(`✅ Inserted ${experiences.length} experiences`);

        // Insert slots
        console.log('📅 Generating and inserting slots...');
        const slots = generateSlots();
        for (const slot of slots) {
            await query(
                `INSERT INTO slots (
          id, experience_id, date, start_time, end_time,
          total_spots, available_spots, price
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    slot.id,
                    slot.experience_id,
                    slot.date,
                    slot.start_time,
                    slot.end_time,
                    slot.total_spots,
                    slot.available_spots,
                    slot.price,
                ]
            );
        }
        console.log(`✅ Inserted ${slots.length} slots`);

        // Insert promo codes
        console.log('🎟️  Inserting promo codes...');
        for (const promo of promoCodes) {
            await query(
                `INSERT INTO promo_codes (code, type, value, active)
         VALUES ($1, $2, $3, $4)`,
                [promo.code, promo.type, promo.value, promo.active]
            );
        }
        console.log(`✅ Inserted ${promoCodes.length} promo codes`);

        console.log('');
        console.log('='.repeat(60));
        console.log('🎉 Database seeded successfully!');
        console.log('='.repeat(60));
        console.log('');
        console.log('📊 Summary:');
        console.log(`   Experiences: ${experiences.length}`);
        console.log(`   Slots: ${slots.length}`);
        console.log(`   Promo Codes: ${promoCodes.length}`);
        console.log('');
        console.log('🎟️  Available Promo Codes:');
        promoCodes.forEach(promo => {
            const discount = promo.type === 'PERCENTAGE' ? `${promo.value}%` : `₹${promo.value}`;
            console.log(`   ${promo.code} - ${discount} off`);
        });
        console.log('');
        console.log('='.repeat(60));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();