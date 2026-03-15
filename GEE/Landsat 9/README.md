# Landsat-9 LULC Classification – Coimbatore (2023–2024)

## Overview

This project performs **Land Use / Land Cover (LULC) classification** of the Coimbatore region using satellite imagery from Landsat-9. The classification is implemented using a **Support Vector Machine (SVM) machine learning algorithm** within Google Earth Engine.

The analysis identifies major land cover classes and generates a **high-resolution land cover map** for the period **2023–2024**.

---

## Dataset

**Satellite:** Landsat 9
**Collection:** `LANDSAT/LC09/C02/T1_L2`

**Temporal Range**

* 1 January 2023 – 1 December 2024

**Spatial Extent**

* Coimbatore region (cbe boundary)

**Cloud Filter**

* Images with **less than 5% cloud cover**

**Spatial Resolution**

* 30 meters

---

## Land Cover Classes

The classification identifies five major land cover types.

| Class ID | Land Cover Type |
| -------- | --------------- |
| 0        | Vegetation      |
| 1        | Water           |
| 2        | Cropland        |
| 3        | Barren Land     |
| 4        | Built-up Area   |

Training samples for these classes were collected as **feature collections** in Google Earth Engine.

---

## Spectral Bands Used

The following Landsat-9 surface reflectance bands were used:

| Band  | Description          |
| ----- | -------------------- |
| SR_B1 | Coastal/Aerosol      |
| SR_B2 | Blue                 |
| SR_B3 | Green                |
| SR_B4 | Red                  |
| SR_B5 | Near Infrared        |
| SR_B6 | Shortwave Infrared 1 |
| SR_B7 | Shortwave Infrared 2 |

These bands help distinguish vegetation, water bodies, soil moisture, and built-up surfaces.

---

## Methodology

### 1. Image Collection

Landsat-9 images were filtered based on:

* Study area boundary
* Date range
* Cloud cover threshold (<5%)

The images were then composited using the **mean reducer** to produce a representative image.

---

### 2. Training Data Preparation

Training samples from multiple land cover types were merged into a single dataset:

```
Vegetation
Water
Cropland
Barren Land
Built-up
```

These samples serve as **reference data for supervised classification**.

---

### 3. Machine Learning Classification

The classification process follows these steps:

1. Select spectral bands from Landsat imagery.
2. Extract training samples using `sampleRegions`.
3. Randomly split the dataset into:

   * Training set
   * Testing set
4. Train a **Support Vector Machine (SVM)** classifier.
5. Apply the classifier to the satellite image to generate the LULC map.

---

## Accuracy Assessment

Classification accuracy is evaluated using a **confusion matrix**.

The following metrics are calculated:

| Metric              | Description                                    |
| ------------------- | ---------------------------------------------- |
| Overall Accuracy    | Percentage of correctly classified pixels      |
| Kappa Coefficient   | Agreement between predicted and reference data |
| Producer's Accuracy | Accuracy of each land cover class              |
| Consumer's Accuracy | Reliability of classified results              |

These metrics validate the classification performance.

---

## Output

The final output is a **LULC classification map of Coimbatore for 2023–2024**.

### LULC Map

<img width="2480" height="3507" alt="Coimbatore Lulc" src="https://github.com/user-attachments/assets/d03ea436-c64b-42b1-801a-6eee8c21f5e8" />


<p align="center">
  <em>Figure 1: LULC map of Coimbatore derived from Landsat 9 imagery.</em>
</p>


---

## Export Parameters

| Parameter          | Value        |
| ------------------ | ------------ |
| Format             | GeoTIFF      |
| Spatial Resolution | 30 m         |
| Projection         | EPSG:32644   |
| Export Location    | Google Drive |
| Maximum Pixels     | 1e13         |

---

## Applications

The LULC map can support several geospatial analyses, including:

* Urban expansion monitoring
* Agricultural land assessment
* Environmental change detection
* Sustainable urban planning
* Land resource management

---

## Workflow Summary

```
Landsat-9 Image Collection
        ↓
Filtering (Date + Cloud Cover)
        ↓
Band Selection
        ↓
Training Data Preparation
        ↓
SVM Classification
        ↓
Accuracy Assessment
        ↓
LULC Map Export
```


---

# Spectral Reflectance Curve Analysis

## Overview

This section analyzes the **spectral reflectance characteristics of different land cover classes** in Coimbatore using Landsat-9 satellite imagery.
Spectral signatures help understand how various surfaces reflect electromagnetic radiation across different wavelengths.

Each land cover type exhibits a **unique spectral response**, which is useful for remote sensing classification and environmental monitoring.

---

## Purpose of the Analysis

The spectral reflectance curve helps to:

* Understand spectral behavior of different land cover types
* Identify distinguishing wavelength patterns
* Support supervised classification methods such as SVM
* Validate training samples used in LULC classification

---

## Dataset

Satellite data used in this analysis:

Satellite: Landsat 9
Collection: `LANDSAT/LC09/C02/T1_L2`

Time Period:

1 January 2024 – 31 December 2024

Spatial Resolution:

30 meters

Study Area:

Coimbatore, Tamil Nadu, India

---

## Land Cover Classes Analyzed

Five land cover classes were analyzed for spectral behavior.

| Land Cover Type | Description                                   |
| --------------- | --------------------------------------------- |
| Vegetation      | Forests, plantations, and natural green cover |
| Water           | Rivers, lakes, and reservoirs                 |
| Cropland        | Agricultural fields                           |
| Barren Land     | Exposed soil or rocky surfaces                |
| Built-up Area   | Urban settlements and infrastructure          |

Training polygons representing these classes were used to extract mean reflectance values.

---

## Spectral Bands Used

The spectral curves were generated using Landsat-9 surface reflectance bands.

| Band  | Wavelength Region    |
| ----- | -------------------- |
| SR_B1 | Coastal / Aerosol    |
| SR_B2 | Blue                 |
| SR_B3 | Green                |
| SR_B4 | Red                  |
| SR_B5 | Near Infrared (NIR)  |
| SR_B6 | Shortwave Infrared 1 |
| SR_B7 | Shortwave Infrared 2 |

---

## Methodology

### 1. Satellite Image Preparation

Landsat-9 imagery was filtered based on:

* Study area boundary
* Date range
* Cloud cover threshold (<10%)

A **mean composite image** was generated to represent the study area.

---

### 2. Land Cover Feature Collection

Training polygons representing each land cover class were defined and merged into a **FeatureCollection**.

These polygons represent sample areas used for spectral analysis.

---

### 3. Spectral Reflectance Extraction

Mean reflectance values were calculated for each band using:

`ui.Chart.image.regions()`

This function extracts **average reflectance values for each class across spectral bands**.

---

### 4. Spectral Curve Generation

The resulting chart displays:

* Reflectance values on the **Y-axis**
* Spectral bands on the **X-axis**
* Separate curves for each land cover class

This allows comparison of spectral behavior across land cover types.

---

## Output

The script generates a **spectral reflectance curve chart** showing how each land cover type responds across different wavelengths.



These curves are important for:

* Identifying spectral separability
* Improving classification accuracy
* Understanding surface characteristics

---

## Applications

Spectral signature analysis is useful for:

* Remote sensing classification
* Vegetation monitoring
* Water body detection
* Soil and barren land analysis
* Urban surface identification

---

## Workflow Summary

```
Landsat-9 Image Collection
        ↓
Cloud Filtering
        ↓
Band Selection
        ↓
Land Cover Feature Collection
        ↓
Mean Reflectance Extraction
        ↓
Spectral Signature Chart Generation
```

