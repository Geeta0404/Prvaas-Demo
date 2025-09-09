const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Utility: Slugify hotel name
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .replace(/\s+/g, '-')     // spaces to dashes
    .replace(/-+/g, '-');     // collapse multiple dashes
}

// ✅ Fixed Utility: Convert camelCase keys to snake_case (handle acronyms properly)
function toSnakeCase(obj) {
  const result = {};
  for (const key in obj) {
    // Handle acronyms like INR, ID, URL → inr, id, url
    const snakeKey = key
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // camelCase → snake_case
      .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1_$2') // split acronyms correctly
      .toLowerCase();
    result[snakeKey] = obj[key];
  }
  return result;
}

// Format multiple rows into clean hotel list format
function processHotelRows(rows, type) {
  const hotelMap = {};

  rows.forEach(row => {
    if (!hotelMap[row.id]) {
      hotelMap[row.id] = {
        id: row.id,
        type,
        name: row.name,
        slug: slugify(row.name),
        totalPriceINR: row.total_price_inr,
        hostName: row.host_name,
        address: row.address,
        city: row.city,
        email: row.email,
        phone: row.phone,
        mainDescription: row.main_description,
        shortDescription: row.short_description,
        state: row.state,
        bedrooms: row.bedrooms,
        country: row.country,
        totalPriceInr: row.total_price_inr,
        doubleOccupationPrice: row.double_occupation_price,
        singleOccupationPrice: row.single_occupation_price,
        checkInTime: row.check_in_time,
        checkOutTime: row.check_out_time,
        images: [],
      };
    }

    if (row.image_url) {
      hotelMap[row.id].images.push(`http://localhost:5000/uploads/${row.image_url}`);
    }
  });

  return Object.values(hotelMap);
}

// Format full detail hotel view
function formatHotelData(baseRow, rows, type) {
  return {
    id: baseRow.id,
    type,
    name: baseRow.name,
    slug: slugify(baseRow.name),
    totalPriceINR: baseRow.total_price_inr,
    hostName: baseRow.host_name,
    email: baseRow.email,
    phone: baseRow.phone,
    address: baseRow.address,
    city: baseRow.city,
    state: baseRow.state,
    country: baseRow.country,
    mainDescription: baseRow.main_description,
    shortDescription: baseRow.short_description,
    bedrooms: baseRow.bedrooms,
    singleBeds: baseRow.single_beds,
    doubleBeds: baseRow.double_beds,
    livingRooms: baseRow.living_rooms,
    otherSpaces: baseRow.other_spaces,
    adultsAllowed: baseRow.adults_allowed,
    childrenAllowed: baseRow.children_allowed,
    childAgeLimit: baseRow.child_age_limit,
    numberOfChildrenAllowed: baseRow.number_of_children_allowed,
    maxGuestsAllowed: baseRow.max_guests_allowed,
    basicFacilities: baseRow.basic_facilities,
    entertainmentFacilities: baseRow.entertainment_facilities,
    cookingCleaningFacilities: baseRow.cooking_cleaning_facilities,
    breakfastAvailable: baseRow.breakfast_available,
    checkInTime: baseRow.check_in_time,
    checkOutTime: baseRow.check_out_time,
    rules: baseRow.rules,
    singleOccupationPrice: baseRow.single_occupation_price,
    doubleOccupationPrice: baseRow.double_occupation_price,
    extraBedPrice: baseRow.extra_bed_price,
    adultBreakfastPrice: baseRow.adult_breakfast_price,
    adultLunchPrice: baseRow.adult_lunch_price,
    adultDinnerPrice: baseRow.adult_dinner_price,
    childBreakfastPrice: baseRow.child_breakfast_price,
    childLunchPrice: baseRow.child_lunch_price,
    childDinnerPrice: baseRow.child_dinner_price,
    images: rows.map(row => ({
      url: row.image_url ? `http://localhost:5000/uploads/${row.image_url}` : '',
      caption: row.caption || '',
      is_featured: row.is_featured || 0
    }))
  };
}

// Categories mapping
const categories = [
  { table: 'hillstation_hotels', imageTable: 'hillstation_hotel_images', type: 'hillstation' },
  { table: 'roadtrip_hotels', imageTable: 'roadtrip_hotel_images', type: 'roadtrip' },
  { table: 'adventure_hotels', imageTable: 'adventure_hotel_images', type: 'adventure' },
  { table: 'nightlife_hotels', imageTable: 'nightlife_hotel_images', type: 'nightlife' },
  { table: 'beaches_hotels', imageTable: 'beaches_hotel_images', type: 'beaches' }
];

/**
 * GET all hotels from all categories
 */
router.get('/', async (req, res) => {
  try {
    const results = [];
    for (const cat of categories) {
      const [rows] = await pool.query(`
        SELECT h.id, h.name, h.total_price_inr, h.host_name, h.address, h.email, 
        h.phone, h.main_description, h.short_description, h.bedrooms,
        h.single_occupation_price, h.double_occupation_price, h.total_price_inr,
        h.check_in_time, h.check_out_time, h.city, h.state, h.country, i.image_url
        FROM ${cat.table} h
        LEFT JOIN ${cat.imageTable} i ON h.id = i.hotel_id
      `);
      results.push(...processHotelRows(rows, cat.type));
    }
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching hotels:', err);
    res.status(500).json({ error: 'Server error while fetching hotels' });
  }
});

/**
 * GET hotels category-wise
 */
router.get('/category/:type', async (req, res) => {
  const { type } = req.params;
  const category = categories.find(c => c.type === type.toLowerCase());

  if (!category) {
    return res.status(400).json({ error: 'Invalid category type' });
  }

  try {
    const [rows] = await pool.query(`
      SELECT h.id, h.name, h.total_price_inr, h.host_name, h.address, h.email,
      h.phone, h.main_description, h.short_description, h.bedrooms,
      h.single_occupation_price, h.double_occupation_price, h.total_price_inr,
      h.check_in_time, h.check_out_time, h.city, h.state, h.country, i.image_url
      FROM ${category.table} h
      LEFT JOIN ${category.imageTable} i ON h.id = i.hotel_id
    `);

    res.json(processHotelRows(rows, category.type));
  } catch (err) {
    console.error(`❌ Error fetching ${type} hotels:`, err);
    res.status(500).json({ error: 'Server error while fetching category hotels' });
  }
});

/**
 * GET single hotel by slug
 */
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    for (const source of categories) {
      const [rows] = await pool.query(`
        SELECT h.*, i.image_url, i.caption, i.is_featured
        FROM ${source.table} h
        LEFT JOIN ${source.imageTable} i ON h.id = i.hotel_id
        WHERE REPLACE(LOWER(h.name), ' ', '-') = ?
      `, [slug]);

      if (rows.length > 0) {
        const hotel = formatHotelData(rows[0], rows, source.type);
        return res.json(hotel);
      }
    }

    res.status(404).json({ error: 'Hotel not found' });
  } catch (err) {
    console.error('❌ Error fetching hotel by slug:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * UPSERT (Update if exists, Insert if not) hotel by category and ID
 */
router.put('/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const category = categories.find(c => c.type === type.toLowerCase());

  if (!category) {
    return res.status(400).json({ error: 'Invalid category type' });
  }

  try {
    let body = toSnakeCase(req.body);

    // 🔹 Remove fields not in DB
    const forbiddenKeys = ['id', 'type', 'slug', 'images'];
    body = Object.fromEntries(
      Object.entries(body).filter(([key]) => !forbiddenKeys.includes(key))
    );

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    const keys = Object.keys(body);

    // Check if record exists
    const [existing] = await pool.query(
      `SELECT id FROM \`${category.table}\` WHERE id = ?`,
      [id]
    );

    if (existing.length > 0) {
      // --- UPDATE ---
      const setClause = keys.map(key => `\`${key}\` = ?`).join(', ');
      const values = keys.map(key => body[key]);

      await pool.query(
        `UPDATE \`${category.table}\` SET ${setClause} WHERE id = ?`,
        [...values, id]
      );
    } else {
      // --- INSERT ---
      body.id = id;
      const insertKeys = Object.keys(body);
      const insertValues = insertKeys.map(key => body[key]);
      const placeholders = insertKeys.map(() => '?').join(', ');

      await pool.query(
        `INSERT INTO \`${category.table}\` (${insertKeys.map(k => `\`${k}\``).join(', ')})
         VALUES (${placeholders})`,
        insertValues
      );
    }

    // Fetch updated/inserted row
    const [rows] = await pool.query(
      `SELECT * FROM \`${category.table}\` WHERE id = ?`,
      [id]
    );

    return res.json(processHotelRows(rows, category.type)[0]);

  } catch (err) {
    console.error('❌ Error upserting hotel:', err);
    res.status(500).json({ error: 'Server error while upserting hotel' });
  }
});

/**
 * DELETE hotel by category and ID
 */
router.delete('/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const category = categories.find(c => c.type === type.toLowerCase());

  if (!category) {
    return res.status(400).json({ error: 'Invalid category type' });
  }

  try {
    await pool.query(`DELETE FROM ${category.imageTable} WHERE hotel_id = ?`, [id]);
    const [result] = await pool.query(`DELETE FROM ${category.table} WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Hotel not found or already deleted' });
    }

    res.json({ message: 'Hotel and related images deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting hotel:', err);
    res.status(500).json({ error: 'Server error while deleting hotel' });
  }
});

module.exports = router;
