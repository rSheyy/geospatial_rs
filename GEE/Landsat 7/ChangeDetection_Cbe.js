// -------------------------------------------------------------
// Land Use Land Cover (LULC) Classification using Landsat 7
// Google Earth Engine Implementation
// Study Area: Coimbatore, Tamil Nadu, India
// Method: Support Vector Machine (SVM) Classification
// -------------------------------------------------------------

// Display study area boundary
Map.addLayer(Coimbatore);
Map.centerObject(Coimbatore, 10);

// 1. Load Landsat 7 Image Collection

var L1 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2");

// Filter images based on
// - Study area
// - Time period
// - Cloud cover threshold
var image = L1.filterBounds(Coimbatore)
              .filterDate('2010-01-01','2020-12-12')
              .filterMetadata('CLOUD_COVER','less_than',20)
              .mean()                // Create composite image
              .clip(Coimbatore);     // Clip to study area

print(image);

// Display satellite composite
Map.addLayer(image);

// 2. Merge Training Data

// Combine multiple training feature collections
// representing different land cover classes
var Training = Vegetation
                .merge(Water)
                .merge(Cropland)
                .merge(Barrenland)
                .merge(Builtup);

print(Training);

// 3. Select Spectral Bands

// Landsat 7 Surface Reflectance bands used for classification
var bands = ['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'];

var input = image.select(bands);

// 4. Generate Training Samples

var trainimage = image.select(bands).sampleRegions({
      collection: Training,      // Training polygons
      properties:['Class'],      // Land cover class label
      scale: 60                  // Sampling resolution
  });

print(trainimage);

// 5. Split Data into Training and Testing Sets

// Add random column to divide dataset
var trainData = trainimage.randomColumn()

// 80% training data
var trainset = trainData.filter(ee.Filter.gte('random',0.8));

// 20% testing data
var testset = trainData.filter(ee.Filter.lte('random',0.2));

// 6. Train SVM Classifier

var classifier = ee.Classifier.libsvm().train({
    features: trainset,
    classProperty: 'Class',
    inputProperties: bands
});

// 7. Perform Image Classification

var classified = image.classify(classifier);

print(classified);

// Display classified LULC map
Map.addLayer(
  classified,
  {min: 0, max:4, palette: ['darkgreen', 'lightblue', 'lightgreen', 'yellow', 'red']},
  'Classified LULC'
);

// 8. Accuracy Assessment

// Classify testing dataset
var classified_Valid = testset.classify(classifier);

// Generate confusion matrix
var error_matrix = classified_Valid.errorMatrix({
  actual:'Class',
  predicted:'classification'
});

print(error_matrix);

// Overall accuracy
var accuracy = error_matrix.accuracy();
print(accuracy);

// Kappa coefficient
var kappa = error_matrix.kappa();
print(kappa);

// Producer's accuracy
var pA = error_matrix.producersAccuracy();

// Consumer's accuracy
var ca = error_matrix.consumersAccuracy();

print(pA);
print(ca);

// 9. Export Classified Map

Export.image.toDrive({
  image: classified,  
  description: 'LULC_Classification_Cbe',  
  folder: 'pic',  
  fileNamePrefix: 'LULC_CbeMap',  
  region: Coimbatore,  
  scale: 30,  
  crs: 'EPSG:32644',  
  maxPixels: 1e13   
});
