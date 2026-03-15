// -------------------------------------------------------------
// Flood Detection using Sentinel-1 SAR Backscatter Difference
// Google Earth Engine Implementation
// Study Area: Coimbatore Region
// Dataset: Sentinel-1 Ground Range Detected (GRD)
// -------------------------------------------------------------

// 1. Display Study Area

Map.addLayer(table);

// 2. Load Sentinel-1 SAR Image Collection

var sat = ee.ImageCollection("COPERNICUS/S1_GRD")
.filterBounds(table)
.filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV")) // Select VV polarization
.select("VV"); // Use VV band for flood detection

// 3. Create Before and After Flood Images

// Before flood period
var B_S = sat.filterDate("2020-10-9","2020-11-01").mosaic();

// After flood period
var A_S = sat.filterDate("2019-12-01","2020-12-08").mosaic();

// Clip images to study area
var B = B_S.clip(table);
var A = A_S.clip(table);

// 4. Speckle Noise Reduction

// Apply median filter to reduce SAR speckle noise
var B_smooth = B.focal_median(30,"circle","meters");
var A_smooth = A.focal_median(30,"circle","meters");

// 5. Backscatter Difference Calculation

// Difference between before and after flood images
var diff = A_smooth.subtract(B_smooth);

// Threshold to identify flooded areas
var T = diff.lt(-3);

// Mask flooded pixels
var flood = T.updateMask(T);

// 6. Visualization

// Flooded area map
Map.addLayer(flood, {min:-30, max:0}, "Flooded Area");

// Difference image
Map.addLayer(diff, {min:-30, max:0}, "Difference");

// Before flood SAR image
Map.addLayer(B, {min:-30, max:0}, "Before Flood");

// After flood SAR image
Map.addLayer(A, {min:-30, max:0}, "After Flood");

// 7. Flooded Area Estimation

// Calculate pixel area
var pixelArea = ee.Image.pixelArea();

// Mask pixel area with flood map
var Flooded_Area = pixelArea.updateMask(flood);

// Compute total flooded area
var flood_stat = Flooded_Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: table,
  scale: 10,
  maxPixels: 1e13
});

print("Flooded Area (sq meters):", flood_stat);

// -------------------------------------------------------------
// Notes on Band Combinations for Visualization
// -------------------------------------------------------------

// Landsat 7: 3,2,1 (True Color)
// Landsat 8 / Landsat 9 / Sentinel-2: 4,3,2

// Color interpretation:
// R → Vegetation
// G → Plant health
// B → Water
