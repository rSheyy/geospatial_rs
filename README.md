# 🛰️ Land Use Land Cover (LULC) Classification using Multi-Sensor Remote Sensing

[![Platform](https://img.shields.io/badge/Platform-Google%20Earth%20Engine-4285F4?logo=google&logoColor=white)](https://earthengine.google.com/)
[![Sensors](https://img.shields.io/badge/Sensors-Landsat%207%20%7C%208%20%7C%209%20%7C%20Sentinel--2-green)](https://www.usgs.gov/landsat-missions)
[![Language](https://img.shields.io/badge/Language-JavaScript%20%7C%20Python-yellow)](https://developers.google.com/earth-engine/guides/getstarted)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/)
[![MTech](https://img.shields.io/badge/Academic-MTech%20Geoinformatics-orange)](https://github.com/)

> Multi-temporal, multi-sensor LULC classification workflows developed in Google Earth Engine (GEE) using Landsat 7 ETM+, Landsat 8 OLI/TIRS, Landsat 9 OLI-2/TIRS-2, and Sentinel-2 MSI imagery. This repository documents classification pipelines, preprocessing steps, and accuracy assessments for land cover mapping.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Sensors & Data Sources](#sensors--data-sources)
- [Repository Structure](#repository-structure)
- [Methodology](#methodology)
- [Classification Algorithms Used](#classification-algorithms-used)
- [LULC Classes](#lulc-classes)
- [How to Use](#how-to-use)
- [Results & Accuracy](#results--accuracy)
- [Requirements](#requirements)
- [Contributing](#contributing)
- [About](#about)

---

## Overview

This repository contains remote sensing scripts and workflows for **Land Use Land Cover (LULC) classification** across multiple satellite platforms. The work explores:

- Comparative analysis of classification accuracy across different sensors
- Multi-temporal change detection
- Supervised and unsupervised classification techniques using cloud-based GEE infrastructure
- Spectral band analysis and index computation (NDVI, NDWI, MNDWI, NDBI, etc.)

All scripts are implemented in **Google Earth Engine JavaScript API**, with some supplementary analysis in Python.

---

## Sensors & Data Sources

| Sensor | Satellite | Resolution | Bands Used | Archive |
|--------|-----------|------------|------------|---------|
| ETM+ | Landsat 7 | 30m (15m pan) | B1–B7 | 1999–present |
| OLI/TIRS | Landsat 8 | 30m (15m pan) | B2–B7, B10 | 2013–present |
| OLI-2/TIRS-2 | Landsat 9 | 30m (15m pan) | B2–B7, B10 | 2021–present |
| MSI | Sentinel-2 | 10m/20m | B2–B8A, B11, B12 | 2015–present |

All data accessed via **Google Earth Engine Data Catalog** — no local downloads required.

---

## Repository Structure

```
remote-sensing-lulc/
│
├── README.md
│
├── GEE/                              # Google Earth Engine Scripts (JavaScript)
│   ├── Landsat7/
│   │   ├── preprocessing.js          # Cloud masking, SR correction
│   │   ├── classification.js         # Supervised classification
│   │   └── index_computation.js      # NDVI, NDWI etc.
│   │
│   ├── Landsat8/
│   │   ├── preprocessing.js
│   │   ├── classification.js
│   │   └── change_detection.js
│   │
│   ├── Landsat9/
│   │   ├── preprocessing.js
│   │   └── classification.js
│   │
│   └── Sentinel2/
│       ├── preprocessing.js          # SCL cloud masking
│       ├── classification.js
│       └── composite_generation.js
│
├── Python/                           # Python-based analysis (if any)
│   ├── accuracy_assessment.py
│   └── visualization.py
│
├── docs/
│   ├── methodology.md                # Detailed methodology notes
│   ├── accuracy_reports/             # Confusion matrices, Kappa values
│   └── sample_outputs/               # Exported map screenshots
│
└── LICENSE
```

---

## Methodology

### 1. Data Acquisition & Filtering
- Filter image collections by date range, area of interest (AOI), and cloud cover threshold
- Select best available imagery for the target season/period

### 2. Preprocessing
- **Landsat 7/8/9**: Apply `USGS Landsat Surface Reflectance` product + `QA_PIXEL` cloud masking
- **Sentinel-2**: Use `Scene Classification Layer (SCL)` for cloud/shadow masking; apply `s2cloudless` where needed
- Generate seasonal or annual median/mean composites

### 3. Feature Engineering
Key spectral indices computed:

| Index | Formula | Purpose |
|-------|---------|---------|
| NDVI | (NIR - Red) / (NIR + Red) | Vegetation density |
| NDWI | (Green - NIR) / (Green + NIR) | Water bodies |
| MNDWI | (Green - SWIR1) / (Green + SWIR1) | Modified water index |
| NDBI | (SWIR1 - NIR) / (SWIR1 + NIR) | Built-up areas |
| EVI | 2.5 × (NIR - Red) / (NIR + 6×Red - 7.5×Blue + 1) | Enhanced vegetation |
| BSI | ((SWIR1 + Red) - (NIR + Blue)) / ... | Bare soil |

### 4. Training Sample Collection
- Digitized training polygons using GEE's geometry tools
- Minimum 50 samples per class; stratified random sampling where applicable

### 5. Classification
- Algorithms: Random Forest, CART, SVM, K-Means (unsupervised)
- Feature stack: spectral bands + indices + texture (optional GLCM)

### 6. Accuracy Assessment
- 70/30 or 80/20 train/test split
- Metrics: **Overall Accuracy**, **Kappa Coefficient**, **Producer's & User's Accuracy**
- Confusion matrix exported and documented

---

## Classification Algorithms Used

- **Random Forest (RF)** — primary classifier; 100–500 trees
- **CART** — fast baseline classifier
- **Support Vector Machine (SVM)** — kernel-based, used for Sentinel-2 high-res data
- **K-Means** — unsupervised, for exploratory classification
- **Minimum Distance / Maximum Likelihood** — traditional comparative benchmarks

---

## LULC Classes

> *(Adapt based on your study area — example below)*

| Class No. | Class Name | Description |
|-----------|------------|-------------|
| 1 | Water Bodies | Rivers, lakes, reservoirs |
| 2 | Dense Vegetation | Forest, dense tree cover |
| 3 | Agricultural Land | Croplands, fallow fields |
| 4 | Built-up Area | Urban, peri-urban structures |
| 5 | Barren Land | Exposed soil, rocky surfaces |
| 6 | Wetlands | Marshy/waterlogged areas |

---

## How to Use

### Running GEE Scripts

1. Open [Google Earth Engine Code Editor](https://code.earthengine.google.com/)
2. Create a new script or open an existing one
3. Copy-paste the contents of any `.js` file from this repo
4. Update the following variables to match your study area:

```javascript
// Update your Area of Interest
var aoi = ee.FeatureCollection('users/YOUR_USERNAME/your_shapefile');

// Update date range
var startDate = '2022-01-01';
var endDate   = '2022-12-31';
```

5. Click **Run**

## Results & Accuracy


| Sensor | Year | OA (%) | Kappa |
|--------|------|--------|-------|
| Landsat 7 | 2005 | — | — |
| Landsat 8 | 2020 | — | — |
| Landsat 9 | 2023 | 83.5 | 79.1 |
| Sentinel-2 | 2023 | — | — |

Sample outputs and confusion matrices are available in the [`docs/accuracy_reports/`](./docs/accuracy_reports/) folder.

---

## Requirements

- **Google Earth Engine Account** (free for research/academic use) → [Sign up here](https://earthengine.google.com/signup/)
- **Google Earth Engine JavaScript API** (no installation needed — runs in browser)
- Optional for Python scripts:
  - Python 3.8+
  - `earthengine-api`, `geemap`, `numpy`, `pandas`, `matplotlib`

```bash
pip install earthengine-api geemap numpy pandas matplotlib
```

---

## About

**Author:** [Harshidha M]  
**Program:** M.Tech Geoinformatics  
**Institution:** [National Institute of Technology, Warangal]  
**Contact:** [hm25cem5r04@student.nitw.ac.in]  
**LinkedIn:** [linkedin.com/in/yourprofile](https://linkedin.com)  
**GEE Portfolio:** [code.earthengine.google.com](https://code.earthengine.google.com/)

---

> 📌 *This repository is part of my academic work and personal learning in geospatial analysis, remote sensing, and land cover mapping.* 
