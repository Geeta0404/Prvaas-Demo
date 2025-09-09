// routes/roadtrip.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../config/db');

// Utility: Slugify hotel name
function slugify(str) {
    return str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
}

// Storage setup for hotel images
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage }).fields([{ name: 'images[]', maxCount: 10 }]);

// ========================
// ADD HOTEL
// ========================
router.post('/add-hotel', (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            const data = req.body;
            const slug = slugify(data.name);
            const imagesFiles = req.files['images[]']?.map(file => file.filename) || [];

            // Insert hotel
            const [hotelResult] = await pool.query(
                `INSERT INTO roadtrip_hotels
                (name, host_name, email, phone, address, city, state, country, main_description,
                short_description, bedrooms, single_beds, double_beds, living_rooms, other_spaces,
                adults_allowed, children_allowed, child_age_limit, number_of_children_allowed, max_guests_allowed,
                basic_facilities, entertainment_facilities, cooking_cleaning_facilities, breakfast_available,
                check_in_time, check_out_time, rules, total_price_inr, single_occupation_price,
                double_occupation_price, extra_bed_price, adult_breakfast_price, adult_lunch_price, adult_dinner_price,
                child_breakfast_price, child_lunch_price, child_dinner_price )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.name, data.host_name, data.email, data.phone, data.address, data.city, data.state, data.country,
                    data.main_description, data.short_description, data.bedrooms, data.single_beds, data.double_beds,
                    data.living_rooms, data.other_spaces, data.adults_allowed, data.children_allowed, data.child_age_limit,
                    data.number_of_children_allowed, data.max_guests_allowed, data.basic_facilities, data.entertainment_facilities,
                    data.cooking_cleaning_facilities, data.breakfast_available, data.check_in_time, data.check_out_time,
                    data.rules, data.total_price_inr, data.single_occupation_price, data.double_occupation_price,
                    data.extra_bed_price, data.adult_breakfast_price, data.adult_lunch_price, data.adult_dinner_price,
                    data.child_breakfast_price, data.child_lunch_price, data.child_dinner_price
                ]
            );

            const hotelId = hotelResult.insertId;

            // Insert images
            for (const img of imagesFiles) {
                await pool.query(
                    "INSERT INTO roadtrip_hotel_images (hotel_id, image_url) VALUES (?, ?)",
                    [hotelId, img]
                );
            }

            res.json({ message: "Hotel added successfully", hotel_id: hotelId });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    });
});

// ========================
// GET ALL HOTELS WITH FORMATTED IMAGES
// ========================
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT h.*, i.image_url
            FROM roadtrip_hotels h
            LEFT JOIN roadtrip_hotel_images i ON h.id = i.hotel_id
        `);

        const hotelMap = {};

        rows.forEach(row => {
            if (!hotelMap[row.id]) {
                hotelMap[row.id] = {
                    id: row.id,
                    name: row.name,
                    slug: slugify(row.name),
                    totalPriceINR: row.total_price_inr || 0,
                    host_name: row.host_name,
                    address: row.address,
                    city: row.city,
                    state: row.state,
                    country: row.country,
                    main_description: row.main_description,
                    short_description: row.short_description,
                    bedrooms: row.bedrooms,
                    singleBeds: row.single_beds,
                    doubleBeds: row.double_beds,
                    livingRooms: row.living_rooms,
                    otherSpaces: row.other_spaces,
                    adultsAllowed: row.adults_allowed,
                    childrenAllowed: row.children_allowed,
                    childAgeLimit: row.child_age_limit,
                    numberOfChildrenAllowed: row.number_of_children_allowed,
                    maxGuestsAllowed: row.max_guests_allowed,
                    basicFacilities: row.basic_facilities,
                    entertainmentFacilities: row.entertainment_facilities,
                    cookingCleaningFacilities: row.cooking_cleaning_facilities,
                    breakfastAvailable: row.breakfast_available,
                    checkInTime: row.check_in_time,
                    checkOutTime: row.check_out_time,
                    rules: row.rules,
                    singleOccupationPrice: row.single_occupation_price,
                    doubleOccupationPrice: row.double_occupation_price,
                    extraBedPrice: row.extra_bed_price,
                    adultBreakfastPrice: row.adult_breakfast_price,
                    adultLunchPrice: row.adult_lunch_price,
                    adultDinnerPrice: row.adult_dinner_price,
                    childBreakfastPrice: row.child_breakfast_price,
                    childLunchPrice: row.child_lunch_price,
                    childDinnerPrice: row.child_dinner_price,
                    images: [],
                };
            }

            if (row.image_url) {
                hotelMap[row.id].images.push({
                    url: `http://localhost:5000/uploads/${row.image_url}`
                });
            }
        });

        res.json(Object.values(hotelMap));
    } catch (err) {
        console.error("❌ Error fetching roadtrip hotels:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ========================
// GET SINGLE HOTEL BY SLUG
// ========================
router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const [hotels] = await pool.query("SELECT * FROM roadtrip_hotels");
        const matchedHotel = hotels.find(hotel => slugify(hotel.name) === slug);

        if (!matchedHotel) return res.status(404).json({ error: "Hotel not found" });

        const [images] = await pool.query(
            "SELECT image_url FROM roadtrip_hotel_images WHERE hotel_id = ?",
            [matchedHotel.id]
        );

        const formattedImages = images.map(img => ({
            url: `http://localhost:5000/uploads/${img.image_url}`
        }));

        res.json({
            ...matchedHotel,
            slug: slugify(matchedHotel.name),
            images: formattedImages
        });

    } catch (err) {
        console.error("❌ Error fetching hotel:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
