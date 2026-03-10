var L1 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
var image2 = L1.filterBounds(table)
.filterDate('2024-03-01','2024-05-30')
.mean()
.clip(table);

print(image2);
Map.addLayer(image2, {}, 'Landsat_8')

function cloudMaskLandsat(image){
  var qa = image.select('QA_PIXEL');
  var dilated = 1<<1; //bit 1 for dilated clouds
  var cirrus = 1<<2; //bit 2 for cirrus clouds
  var cloud = 1<<3; //bit 3 for regular clouds
  var shadow = 1<<4; //bit 4 for cloud shadows
 
  //create mask based on QA_PIXEL
  var mask = qa.bitwiseAnd(dilated).eq(0)
    .and(qa.bitwiseAnd(cirrus).eq(0))
    .and(qa.bitwiseAnd(cloud).eq(0))
    .and(qa.bitwiseAnd(shadow).eq(0))
 
  return image.updateMask(mask);

}

var image = L1.filterBounds(table)
.filterDate('2024-03-01','2024-05-30')
.map(cloudMaskLandsat)
.median()
.clip(table);

Map.setCenter(76.214729,10.530345,10)

print(image);
Map.addLayer(image);

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
