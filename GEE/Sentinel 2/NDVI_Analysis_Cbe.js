// -------------------------------------------------------------
// NDVI Calculation using Sentinel-2 Satellite Imagery
// Google Earth Engine Implementation
// Study Area: Coimbatore, Tamil Nadu, India
// Dataset: Sentinel-2 Surface Reflectance (COPERNICUS/S2_SR_HARMONIZED)
// -------------------------------------------------------------

// 1. Load Sentinel-2 Image Collection

var data = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
.filterBounds(table)                         // Filter by study area
.filterDate("2024-01-01", "2024-12-31")      // Select time range
.filterMetadata("CLOUDY_PIXEL_PERCENTAGE", "less_than", 10) // Remove cloudy scenes
.mean()                                      // Create composite image
.clip(table);                                // Clip to area of interest

print(data);

// 2. Select Spectral Bands

// Sentinel-2 Bands used for NDVI calculation
var RED = data.select("B4");   // Red band
var NIR = data.select("B8");   // Near Infrared band

// 3. NDVI Calculation

// NDVI Formula
// NDVI = (NIR - RED) / (NIR + RED)

var NDVI = (NIR.subtract(RED)).divide(NIR.add(RED));

// Clip NDVI image to study area
var NDVI_Coimbatore = NDVI.clip(table);

// Display NDVI map
Map.addLayer(NDVI_Coimbatore, {min:-1, max:1, palette:['blue','white','green']}, "NDVI Map");

// 4. Export NDVI Image

Export.image.toDrive({
  image: NDVI_Coimbatore,
  description: 'NDVI_Cbe',  
  region: table,
  scale: 30
});
