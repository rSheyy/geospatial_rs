// -------------------------------------------------------------
// Landsat 8 Cloud Masking using QA_PIXEL Band
// Google Earth Engine Implementation
// Study Area: Coimbatore, Tamil Nadu, India
// -------------------------------------------------------------

// 1. Load Landsat 8 Image Collection

var L1 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2");

// Create composite image without cloud masking
var image2 = L1.filterBounds(table)
.filterDate('2024-03-01','2024-05-30')
.mean()
.clip(table);

print(image2);

// Display raw Landsat 8 composite
Map.addLayer(image2, {}, 'Landsat_8');

// 2. Cloud Masking Function using QA_PIXEL band

function cloudMaskLandsat(image){

  // Select QA_PIXEL band
  var qa = image.select('QA_PIXEL');

  // Bit positions used for cloud detection
  var dilated = 1<<1;   // Bit 1 → Dilated Clouds
  var cirrus = 1<<2;    // Bit 2 → Cirrus Clouds
  var cloud = 1<<3;     // Bit 3 → Cloud
  var shadow = 1<<4;    // Bit 4 → Cloud Shadow
 
  // Create mask to remove cloud pixels
  var mask = qa.bitwiseAnd(dilated).eq(0)
    .and(qa.bitwiseAnd(cirrus).eq(0))
    .and(qa.bitwiseAnd(cloud).eq(0))
    .and(qa.bitwiseAnd(shadow).eq(0));
 
  // Apply mask to image
  return image.updateMask(mask);

}

// 3. Apply Cloud Masking

var image = L1.filterBounds(table)
.filterDate('2024-03-01','2024-05-30')
.map(cloudMaskLandsat)   // Apply masking function
.median()                // Create cloud-free composite
.clip(table);

// Set map view to study area
Map.setCenter(76.214729,10.530345,10);

print(image);

// Display cloud-masked image
Map.addLayer(image);

// 4. Export Results

// Export raw Landsat composite (before masking)
Export.image.toDrive({
  image: image2.float(),  
  description: 'Coimbatore',  
  folder: 'pic',  
  fileNamePrefix: 'Cloud_Masking',  
  region: table,  
  scale: 30,  
  crs: 'EPSG:32644',  
  maxPixels: 1e13  
});

// Export cloud-masked Landsat composite
Export.image.toDrive({
  image: image.float(),  
  description: 'Coimbatore',  
  folder: 'pic',  
  fileNamePrefix: 'Cloud_Masking',  
  region: table,  
  scale: 30,  
  crs: 'EPSG:32644',  
  maxPixels: 1e13  
});
