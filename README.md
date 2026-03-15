# 🛰️ Remote Sensing Analysis using Google Earth Engine

[![Platform](https://img.shields.io/badge/Platform-Google%20Earth%20Engine-4285F4?logo=google&logoColor=white)](https://earthengine.google.com/)
[![Sensors](https://img.shields.io/badge/Sensors-Landsat%207%20%7C%208%20%7C%209%20%7C%20Sentinel--2-green)](https://www.usgs.gov/landsat-missions)
[![Language](https://img.shields.io/badge/Language-JavaScript%20%7C%20Python-yellow)](https://developers.google.com/earth-engine/guides/getstarted)
[![Status](https://img.shields.io/badge/Status-Academic%20Project-brightgreen)](https://github.com/)
[![Program](https://img.shields.io/badge/Program-MTech%20Geoinformatics-orange)](https://github.com/)

This repository contains **remote sensing workflows developed using Google Earth Engine (GEE)** for analyzing satellite imagery from multiple Earth observation missions.  
The scripts demonstrate **satellite data preprocessing, vegetation analysis, and land use/land cover (LULC) classification**.

The study area used in the workflows is **Coimbatore, Tamil Nadu, India**.

---

# 📌 Table of Contents

- Overview
- Sensors & Data Sources
- Repository Structure
- Methodology
- LULC Classification
- Example Outputs
- Tools & Technologies
- Requirements
- Author

---

# Overview

This repository documents **practical remote sensing analysis workflows implemented in Google Earth Engine** using multiple satellite datasets.

The work focuses on:

- Satellite image preprocessing
- Cloud masking of optical imagery
- Vegetation analysis using NDVI
- Land Use Land Cover (LULC) classification
- Change detection using multi-temporal imagery

The scripts are written primarily in **Google Earth Engine JavaScript API**, with optional Python-based analysis.

---

# Sensors & Data Sources

| Sensor | Satellite | Spatial Resolution | Purpose |
|------|------|------|------|
| ETM+ | Landsat 7 | 30 m (15 m pan) | LULC classification and change detection |
| OLI/TIRS | Landsat 8 | 30 m | Cloud masking and preprocessing |
| OLI-2/TIRS-2 | Landsat 9 | 30 m | LULC classification (2023–2024) |
| MSI | Sentinel-2 | 10 m / 20 m | NDVI vegetation analysis |

All imagery was accessed through the **Google Earth Engine Data Catalog**.

---

# Repository Structure

```
remote-sensing-analysis/
│
├── GEE/
│   │
│   ├── Landsat7/
│   │   └── ChangeDetection_Cbe.js
│   │
│   ├── Landsat8/
│   │   └── CloudMasking_Cbe.js
│   │
│   ├── Landsat9/
│   │   └── LULC_Classification_Cbe_2023_2024.js
│   │
│   └── Sentinel2/
│       └── NDVI_Analysis_Cbe.js
│
├── README.md
└── LICENSE
```

---

# Methodology

## 1. Data Filtering

Satellite image collections were filtered using:

- Area of Interest (Coimbatore region)
- Date range selection
- Cloud cover threshold

Example:

```
var dataset = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
              .filterBounds(aoi)
              .filterDate('2023-01-01','2024-01-01')
              .filterMetadata('CLOUD_COVER','less_than',10);
```

---

## 2. Preprocessing

### Landsat-8 Cloud Masking

Cloud and cloud shadow pixels were removed using the **QA_PIXEL band**.

Steps:

- Extract QA band
- Identify cloud pixels
- Mask unwanted pixels
- Generate clean imagery for analysis

---

### Sentinel-2 Preprocessing

Sentinel-2 imagery was used to compute vegetation indices such as **NDVI**.

---

## 3. Vegetation Analysis

NDVI was computed using Sentinel-2 spectral bands:

```
NDVI = (NIR - Red) / (NIR + Red)
```

Where:

| Band | Description |
|----|----|
| NIR | Near Infrared Band |
| Red | Red Band |

NDVI helps identify vegetation health and density across the study area.

---

## 4. LULC Classification

Supervised classification was implemented using **Support Vector Machine (SVM)**.

Training samples were collected from representative land cover types.

Typical classes used in the classification include:

| Class | Description |
|------|------|
| Water Bodies | Rivers, lakes and reservoirs |
| Vegetation | Forest and dense vegetation |
| Agricultural Land | Crop fields and plantations |
| Built-up | Urban areas and infrastructure |
| Barren Land | Exposed soil and rocky terrain |

---

# Example Outputs

Outputs generated from the scripts include:

- NDVI vegetation maps
- Cloud-masked Landsat imagery
- LULC classification maps
- Land cover change maps for Coimbatore region

Example visual outputs may include:

- NDVI distribution maps
- Classified LULC maps
- Satellite imagery composites

---

# Tools & Technologies

The following tools were used in the workflows:

- Google Earth Engine (GEE)
- JavaScript API
- Satellite imagery from Landsat and Sentinel missions
- Python (optional analysis)

---

# Requirements

To run the scripts:

1. Create a **Google Earth Engine account**  
   https://earthengine.google.com/signup/

2. Use the **Google Earth Engine Code Editor**

https://code.earthengine.google.com/

3. Copy any `.js` script from this repository and run it inside the editor.

Optional Python packages:

```bash
pip install earthengine-api geemap numpy pandas matplotlib
```

---

# Author

**Harshidha M**  
M.Tech Geoinformatics  
National Institute of Technology Warangal  

Email: hm25cem5r04@student.nitw.ac.in  

---

This repository contains **academic exercises and experiments in remote sensing and geospatial analysis using satellite imagery.**
