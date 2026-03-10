# Landsat-7 LULC Classification & Change Analysis – Coimbatore

## Overview

This project performs **Land Use / Land Cover (LULC) classification** for the Coimbatore region using satellite imagery from **Landsat-7**. The analysis is conducted using **machine learning classification (Support Vector Machine)** within Google Earth Engine.

The objective is to identify major land cover classes and support **land-use change analysis over time**.

---

## Dataset

**Satellite:** Landsat 7
**Collection:** `LANDSAT/LE07/C02/T1_L2`

**Temporal Range**

* 2010 – 2020

**Spatial Extent**

* Coimbatore region

**Spatial Resolution**

* 30 meters

---

## Land Cover Classes

The classification identifies the following five classes:

| Class ID | Land Cover Type |
| -------- | --------------- |
| 0        | Vegetation      |
| 1        | Water           |
| 2        | Cropland        |
| 3        | Barren Land     |
| 4        | Built-up Area   |

Training samples for each class were manually collected using feature collections.

---

## Spectral Bands Used

The following Landsat-7 surface reflectance bands were used:

| Band  | Description          |
| ----- | -------------------- |
| SR_B1 | Blue                 |
| SR_B2 | Green                |
| SR_B3 | Red                  |
| SR_B4 | Near Infrared        |
| SR_B5 | Shortwave Infrared 1 |
| SR_B7 | Shortwave Infrared 2 |

These bands provide information about vegetation health, moisture, and surface properties.

---

## Methodology

### 1. Image Collection

Landsat-7 images are filtered by:

* Study area boundary
* Date range
* Cloud cover (< 20%)

The filtered images are composited using the **mean reducer**.

---

### 2. Training Data Preparation

Training samples from different land cover classes are merged into a single training dataset:

```
Vegetation
Water
Cropland
Barren land
Built-up
```

These samples are used to train the classification model.

---

### 3. Machine Learning Classification

The classification uses the **Support Vector Machine (SVM)** algorithm.

Steps:

1. Select spectral bands.
2. Extract training samples from the image.
3. Split dataset into **training and testing sets**.
4. Train the classifier using training samples.
5. Apply classifier to generate the LULC map.

---

## Accuracy Assessment

Model performance is evaluated using a **confusion matrix**.

The following metrics are calculated:

| Metric              | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| Overall Accuracy    | Percentage of correctly classified pixels                  |
| Kappa Coefficient   | Agreement between classification and reference data        |
| Producer's Accuracy | Probability that a reference pixel is correctly classified |
| Consumer's Accuracy | Reliability of classified pixels                           |

These metrics help validate the classification results.

---

## Output

The final output is a **LULC classified map** of Coimbatore.

### LULC Classification Map

<img width="940" height="1329" alt="image" src="https://github.com/user-attachments/assets/85104f8b-846d-49de-a7c0-251129bbe45f" />
<p align="center">
  <em>Figure 1: LULC map of Coimbatore 2010-2020</em>
</p>
<img width="940" height="1329" alt="image" src="https://github.com/user-attachments/assets/7469f42f-0e21-44f2-a525-df1df8ebbbdf" />
<p align="center">
  <em>Figure 1: LULC map of Coimbatore after 2020</em>
</p>


---

## Export Settings

| Parameter          | Value        |
| ------------------ | ------------ |
| Format             | GeoTIFF      |
| Spatial Resolution | 30 m         |
| Projection         | EPSG:32644   |
| Export Location    | Google Drive |

---

## Applications

The LULC classification can be used for:

* Urban growth analysis
* Land use change detection
* Environmental monitoring
* Agricultural land assessment
* Urban planning studies

---

## Workflow Summary

```
Landsat-7 Images
      ↓
Image Filtering (Date + Cloud)
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
