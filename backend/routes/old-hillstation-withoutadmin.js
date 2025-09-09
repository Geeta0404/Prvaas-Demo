const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// 🔠 Slugify Function
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .replace(/\s+/g, "-");   // replace spaces with hyphens
}

// 📂 Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });




// ✅ GET all resorts with images
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        h.id, h.name, h.total_price_inr, h.host_name, h.address,
        h.city, h.state, h.country,
        i.image_url, i.caption
      FROM hillstation_hotels h
      LEFT JOIN hillstation_hotel_images i ON h.id = i.hotel_id
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
          images: [],
        };
      }

      if (row.image_url) {
        hotelMap[row.id].images.push({
          url: `http://localhost:5000/uploads/${row.image_url}`,
          caption: row.caption || "",
        });
      }
    });

    res.json(Object.values(hotelMap));
  } catch (err) {
    console.error("Error fetching resorts:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET single resort by slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const [hotels] = await db.query(`
      SELECT * FROM hillstation_hotels
      WHERE LOWER(REPLACE(REPLACE(name, ' ', '-'), ',', '')) = ?
    `, [slug]);

    if (hotels.length === 0) {
      return res.status(404).json({ error: "Resort not found" });
    }

    const hotel = hotels[0];

    const [images] = await db.query(`
      SELECT image_url, caption FROM hillstation_hotel_images WHERE hotel_id = ?
    `, [hotel.id]);

    const formattedImages = images.map(img => ({
      url: `http://localhost:5000/uploads/${img.image_url}`,
      caption: img.caption || "",
    }));

    res.json({
      id: hotel.id,
      name: hotel.name,
      slug: slugify(hotel.name),
      totalPriceINR: hotel.total_price_inr || 0,
      host_name: hotel.host_name,
      email: hotel.email,
      phone: hotel.phone,
      address: hotel.address,
      city: hotel.city,
      state: hotel.state,
      country: hotel.country,
      images: formattedImages,
      main_description: hotel.main_description,
      short_description: hotel.short_description,
      bedrooms: hotel.bedrooms,
      singleBeds: hotel.single_beds,
      doubleBeds: hotel.double_beds,
      livingRooms: hotel.living_rooms,
      otherSpaces: hotel.other_spaces,
      adultsAllowed: hotel.adults_allowed,
      childrenAllowed: hotel.children_allowed,
      numberOfChildrenAllowed: hotel.number_of_children_allowed,
      childAgeLimit: hotel.child_age_limit,
      maxGuestsAllowed: hotel.max_guests_allowed,
      basicFacilities: hotel.basic_facilities,
      entertainmentFacilities: hotel.entertainment_facilities,
      cookingCleaningFacilities: hotel.cooking_cleaning_facilities,
      breakfastAvailable: hotel.breakfast_available,
      checkInTime: hotel.check_in_time,
      checkOutTime: hotel.check_out_time,
      rules: hotel.rules,
      singleOccupationPrice: hotel.single_occupation_price,
      doubleOccupationPrice: hotel.double_occupation_price,
      extraBedPrice: hotel.extra_bed_price,
      adultBreakfastPrice: hotel.adult_breakfast_price,
      adultLunchPrice: hotel.adult_lunch_price,
      adultDinnerPrice: hotel.adult_dinner_price,
      childBreakfastPrice: hotel.child_breakfast_price,
      childLunchPrice: hotel.child_lunch_price,
      childDinnerPrice: hotel.child_dinner_price,
    });
  } catch (err) {
    console.error("Error fetching resort by slug:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ POST - Add New Resort (hillstation_hotels)
router.post("/", upload.none(), async (req, res) => {
  try {
    const data = req.body;

    // Convert numeric fields from strings to numbers (optional but recommended)
    data.total_price_inr = Number(data.total_price_inr) || 0;

    const query = `INSERT INTO hillstation_hotels (
      name, host_name, email, phone, address,
      city, state, country, main_description, short_description,
      bedrooms, single_beds, double_beds, living_rooms, other_spaces,
      adults_allowed, children_allowed, child_age_limit, number_of_children_allowed, max_guests_allowed,
      basic_facilities, entertainment_facilities, cooking_cleaning_facilities,
      breakfast_available, check_in_time, check_out_time, rules,
      total_price_inr, single_occupation_price, double_occupation_price, extra_bed_price,
      adult_breakfast_price, adult_lunch_price, adult_dinner_price,
      child_breakfast_price, child_lunch_price, child_dinner_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


    const values = [
      data.name, data.host_name, data.email, data.phone, data.address,
      data.city, data.state, data.country, data.main_description, data.short_description,
      data.bedrooms, data.single_beds, data.double_beds, data.living_rooms, data.other_spaces,
      data.adults_allowed, data.children_allowed, data.child_age_limit, data.number_of_children_allowed, data.max_guests_allowed,
      data.basic_facilities, data.entertainment_facilities, data.cooking_cleaning_facilities,
      data.breakfast_available, data.check_in_time, data.check_out_time, data.rules,
      data.total_price_inr, data.single_occupation_price, data.double_occupation_price, data.extra_bed_price,
      data.adult_breakfast_price, data.adult_lunch_price, data.adult_dinner_price,
      data.child_breakfast_price, data.child_lunch_price, data.child_dinner_price
    ];

    const [result] = await db.query(query, values);

    res.status(201).json({ message: "Resort added successfully!", resort_id: result.insertId });
  } catch (err) {
    console.error("Error saving resort:", err.message);
    res.status(500).json({ error: "Failed to save resort" });
  }
});


// ✅ POST - Upload Single Image (hillstation_hotel_images)
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const { hotel_id, caption } = req.body;
    const image_url = req.file.filename;

    await db.query(
      `INSERT INTO hillstation_hotel_images (hotel_id, image_url, caption) VALUES (?, ?, ?)`,
      [hotel_id, image_url, caption || ""]
    );

    res.status(201).json({
      message: "Image uploaded and saved successfully!",
      imageUrl: `http://localhost:5000/uploads/${image_url}`,
    });
  } catch (err) {
    console.error("Error uploading image:", err.message);
    res.status(500).json({ error: "Image upload failed" });
  }
});

// ✅ POST - Upload Multiple Images from JSON
router.post("/images", async (req, res) => {
  try {
    const { hotel_id, images } = req.body;

    if (!Array.isArray(images) || !hotel_id) {
      return res.status(400).json({ error: "Invalid request format" });
    }

    const values = images.map(img => [hotel_id, img.image_url, img.caption || ""]);

    const query = `
      INSERT INTO hillstation_hotel_images (hotel_id, image_url, caption)
      VALUES ?
    `;

    await db.query(query, [values]);

    res.status(201).json({ message: "Images added successfully!" });
  } catch (err) {
    console.error("Error inserting images:", err.message);
    res.status(500).json({ error: "Failed to insert images" });
  }
});

module.exports = router;
