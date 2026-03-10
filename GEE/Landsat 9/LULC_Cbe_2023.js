var cbe = table;
Map.addLayer(cbe);
Map.centerObject(cbe, 10);
var L1 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2");
var image = L1.filterBounds(cbe)
              .filterDate('2023-01-01','2024-12-01')
              .filterMetadata('CLOUD_COVER','less_than',5)
              .mean()
              .clip(cbe);
             
print(image);
Map.addLayer(image);
var Training = Vegetation.merge(Water).merge(Cropland).merge(BarrenLand).merge(BuiltUp);
print(Training);
var bands = ['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'];
var input = image.select(bands);
var trainimage = image.select(bands).sampleRegions({
      collection: Training,
      properties:['Class'],
      scale: 60
  });
 
print(trainimage);

var trainData = trainimage.randomColumn()
var trainset = trainData.filter(ee.Filter.gte('random',0.8));
var testset = trainData.filter(ee.Filter.lte('random',0.2));
var classifier = ee.Classifier.libsvm().train({
    features: trainset,
    classProperty: 'Class',
    inputProperties: bands
    });
   
var classified = image.classify(classifier);
print(classified);

Map.addLayer(classified, {min: 0, max:4, palette: ['darkgreen', 'lightblue', 'lightgreen', 'yellow', 'red']},'Classified LULC');


var classified_Valid = testset.classify(classifier);

var error_matrix = classified_Valid.errorMatrix({
  actual:'Class',
  predicted:'classification'
});
print(error_matrix);

var accuracy = error_matrix.accuracy();
print(accuracy);
var kappa = error_matrix.kappa();
print(kappa);
var pA = error_matrix.producersAccuracy();
var ca = error_matrix.consumersAccuracy();
print(pA);
print(ca);

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
