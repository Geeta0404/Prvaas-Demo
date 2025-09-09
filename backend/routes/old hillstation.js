const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Slugify function
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .replace(/\s+/g, "-");   // convert spaces to dashes
}

// ✅ GET all resorts
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
    console.error("Error fetching all resorts:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET single resort by slug (from hillstation_hotels)
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const [hotels] = await db.query(`SELECT * FROM hillstation_hotels`);

    const matchedHotel = hotels.find(hotel => slugify(hotel.name) === slug);

    if (!matchedHotel) {
      return res.status(404).json({ error: "Resort not found" });
    }

    const [images] = await db.query(`
      SELECT image_url, caption
      FROM hillstation_hotel_images
      WHERE hotel_id = ?
    `, [matchedHotel.id]);

    const formattedImages = images.map((img) => ({
      url: `http://localhost:5000/uploads/${img.image_url}`,
      caption: img.caption || "",
    }));

    res.json({
      id: matchedHotel.id,
      name: matchedHotel.name,
      totalPriceINR: matchedHotel.total_price_inr || 0,
      host_name: matchedHotel.host_name,
      address: matchedHotel.address,
      city: matchedHotel.city,
      state: matchedHotel.state,
      country: matchedHotel.country,
      images: formattedImages,

      // Guest details from hillstation_hotels table
      main_description: matchedHotel.main_description,
      short_description: matchedHotel.short_description,
      bedrooms: matchedHotel.bedrooms,
      singleBeds: matchedHotel.single_beds,
      doubleBeds: matchedHotel.double_beds,
      livingRooms: matchedHotel.living_rooms,
      otherSpaces: matchedHotel.other_spaces,
      adultsAllowed: matchedHotel.adults_allowed,
      childrenAllowed: matchedHotel.children_allowed,
      numberOfChildrenAllowed: matchedHotel.number_of_children_allowed,
      childAgeLimit: matchedHotel.child_age_limit,
      maxGuestsAllowed: matchedHotel.max_guests_allowed,
      basicFacilities: matchedHotel.basic_facilities,
      entertainmentFacilities: matchedHotel.entertainment_facilities,
      cookingCleaningFacilities: matchedHotel.cooking_cleaning_facilities,
      breakfastAvailable: matchedHotel.breakfast_available,
      checkInTime: matchedHotel.check_in_time,
      checkOutTime: matchedHotel.check_out_time,
      rules: matchedHotel.rules,
      totalPriceINR: matchedHotel.total_price_inr || 0,
      singleOccupationPrice: matchedHotel.single_occupation_price,
      doubleOccupationPrice: matchedHotel.double_occupation_price,
      extraBedPrice: matchedHotel.extra_bed_price,
      adultBreakfastPrice: matchedHotel.adult_breakfast_price,
      adultLunchPrice: matchedHotel.adult_lunch_price,
      adultDinnerPrice: matchedHotel.adult_dinner_price,
      childBreakfastPrice: matchedHotel.child_breakfast_price,
      childLunchPrice: matchedHotel.child_lunch_price,
      childDinnerPrice: matchedHotel.child_dinner_price,
    });

  } catch (err) {
    console.error("Error fetching resort details:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
