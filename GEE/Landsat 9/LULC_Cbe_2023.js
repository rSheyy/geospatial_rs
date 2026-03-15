// -------------------------------------------------------------
// Land Use Land Cover (LULC) Classification using Landsat 9
// Google Earth Engine Implementation
// Study Area: Coimbatore, Tamil Nadu, India
// Method: Support Vector Machine (SVM)
// -------------------------------------------------------------

// 1. Define Study Area

var cbe = table;

Map.addLayer(cbe);
Map.centerObject(cbe, 10);

// 2. Load Landsat 9 Image Collection

var L1 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2");

// Filter satellite imagery based on:
// - Area of interest
// - Time period
// - Cloud cover threshold
var image = L1.filterBounds(cbe)
              .filterDate('2023-01-01','2024-12-01')
              .filterMetadata('CLOUD_COVER','less_than',5)
              .mean()           // Create composite image
              .clip(cbe);       // Clip to study area
             
print(image);

// Display composite image
Map.addLayer(image);

// 3. Merge Training Samples

// Combine feature collections representing land cover classes
var Training = Vegetation
                .merge(Water)
                .merge(Cropland)
                .merge(BarrenLand)
                .merge(BuiltUp);

print(Training);

// 4. Select Spectral Bands

// Landsat 9 Surface Reflectance bands used for classification
var bands = ['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'];

var input = image.select(bands);

// 5. Generate Training Samples

var trainimage = image.select(bands).sampleRegions({
      collection: Training,     // Training polygons
      properties:['Class'],     // Class label
      scale: 60
  });

print(trainimage);

// 6. Split Data into Training and Testing Sets

// Add random column for data splitting
var trainData = trainimage.randomColumn()

// 80% training data
var trainset = trainData.filter(ee.Filter.gte('random',0.8));

// 20% testing data
var testset = trainData.filter(ee.Filter.lte('random',0.2));

// 7. Train SVM Classifier

var classifier = ee.Classifier.libsvm().train({
    features: trainset,
    classProperty: 'Class',
    inputProperties: bands
});

// 8. Perform LULC Classification

var classified = image.classify(classifier);

print(classified);

// Display classified LULC map
Map.addLayer(
  classified,
  {min: 0, max:4, palette: ['darkgreen', 'lightblue', 'lightgreen', 'yellow', 'red']},
  'Classified LULC'
);

// 9. Accuracy Assessment

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

// Producer’s accuracy
var pA = error_matrix.producersAccuracy();

// Consumer’s accuracy
var ca = error_matrix.consumersAccuracy();

print(pA);
print(ca);

// 10. Export Classified Map

Export.image.toDrive({
  image: classified,  
  description: 'LULC_Classification_Cbe',  
  folder: 'pic',  
  fileNamePrefix: 'LULC_CbeMap',  
  region: cbe,  
  scale: 30,  
  crs: 'EPSG:32644',  
  maxPixels: 1e13  
});
