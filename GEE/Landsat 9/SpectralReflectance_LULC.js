// -------------------------------------------------------------
// Spectral Reflectance Curve Analysis using Landsat 9
// Google Earth Engine Implementation
// Study Area: Coimbatore, Tamil Nadu, India
// Purpose: To analyze spectral signatures of different land cover classes
// -------------------------------------------------------------

// 1. Load Landsat 9 Image Collection

var image = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
.filterBounds(table)                     // Filter by study area
.filterDate("2024-01-01", "2024-12-31")  // Select time range
.filterMetadata("CLOUD_COVER", "less_than", 10) // Remove cloudy scenes
.mean()                                  // Create composite image
.clip(table);                            // Clip to area of interest

// Display satellite composite
Map.addLayer(image);

// 2. Define Land Cover Classes

// Assign each training polygon a class label
var Vegetation = ee.Feature(Vegetation.geometry(), {class: 'Vegetation'});
var Water = ee.Feature(Water.geometry(), {class: 'Water'});
var Cropland = ee.Feature(Cropland.geometry(), {class: 'Cropland'});
var BarrenLand = ee.Feature(BarrenLand.geometry(), {class: 'BarrenLand'});
var BuiltUp = ee.Feature(BuiltUp.geometry(), {class: 'BuiltUp'});

// Combine all classes into a single FeatureCollection
var LULC_Class = ee.FeatureCollection([
  Vegetation,
  Water,
  Cropland,
  BarrenLand,
  BuiltUp
]);

// 3. Select Spectral Bands

// Landsat 9 surface reflectance bands used for spectral analysis
var bands = ['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'];

var input = image.select(bands);

// 4. Sample Regions for Spectral Analysis

var trainImage = image.select(bands).sampleRegions({
      collection: input,
      properties:['Class'],
      scale: 60
  });

// 5. Generate Spectral Reflectance Chart

// Create spectral signature chart for each land cover class
var spectral_chart = ui.Chart.image.regions({
  image: input,
  regions: LULC_Class,
  reducer: ee.Reducer.mean(),
  scale: 30,
  seriesProperty: 'class'
}).setOptions({
  title: 'SPECTRAL REFLECTANCE CURVE OF COIMBATORE (TAMILNADU)',
  hAxis: {title: 'Wavelength Band'},
  vAxis: {title: 'Mean Reflectance'},
  legend: {position: 'right'}
});

// Display chart
print(spectral_chart);
