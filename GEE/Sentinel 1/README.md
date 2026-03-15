# 🌊 Flood Mapping using Sentinel-1 SAR Data in Google Earth Engine

[![Platform](https://img.shields.io/badge/Platform-Google%20Earth%20Engine-4285F4?logo=google\&logoColor=white)](https://earthengine.google.com/)
[![Dataset](https://img.shields.io/badge/Dataset-Sentinel--1%20SAR-blue)](https://sentinel.esa.int/)
[![Language](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developers.google.com/earth-engine/guides/getstarted)
[![Status](https://img.shields.io/badge/Status-Academic%20Project-brightgreen)](https://github.com/)

This file demonstrates **flood detection using Sentinel-1 Synthetic Aperture Radar (SAR) imagery** within **Google Earth Engine (GEE)**.

The workflow identifies flooded regions by analyzing **changes in radar backscatter between pre-flood and post-flood satellite images**.

The study area used in this project is **Coimbatore, Tamil Nadu, India**.

---

# 📌 Table of Contents

* Overview
* Dataset
* Methodology
* Workflow
* Output
* Flood Area Estimation
* Requirements
* Author

---

# Overview

Flood mapping is essential for **disaster management, damage assessment, and environmental monitoring**.

Unlike optical satellites, **Synthetic Aperture Radar (SAR)** can capture images **through clouds and during nighttime**, making it highly effective for flood monitoring.

This project uses **Sentinel-1 GRD SAR imagery** to detect flood events by analyzing **changes in radar backscatter intensity**.

---

# Dataset

Satellite data used:

| Dataset        | Satellite        | Resolution | Type                     |
| -------------- | ---------------- | ---------- | ------------------------ |
| Sentinel-1 GRD | Sentinel-1A / 1B | 10 m       | Synthetic Aperture Radar |

Dataset Source:

**COPERNICUS/S1_GRD**

Available through the **Google Earth Engine Data Catalog**.

Polarization used:

VV polarization (Vertical transmit – Vertical receive)

---

# Methodology

The flood detection workflow follows these steps:

### 1. Data Acquisition

Sentinel-1 SAR images were filtered based on:

* Study area boundary
* VV polarization
* Date ranges representing **before and after flood events**

---

### 2. Image Preparation

Two images were created:

* **Before Flood Image**
* **After Flood Image**

These images were clipped to the study area.

---

### 3. Speckle Noise Reduction

SAR images contain speckle noise due to radar signal interference.

A **focal median filter (30 meters)** was applied to reduce noise and improve image quality.

---

### 4. Backscatter Difference Analysis

Flooded areas typically show **lower radar backscatter values** due to smooth water surfaces.

The difference between images was calculated:

Difference = After Flood – Before Flood

Pixels with large negative differences were classified as **flooded areas**.

---

### 5. Flood Detection Threshold

A threshold of **−3 dB** was applied to identify flooded pixels.

Pixels meeting this condition were classified as flood zones.

---

# Workflow

The processing workflow implemented in Google Earth Engine includes:

1. Load Sentinel-1 SAR dataset
2. Filter images by study area and polarization
3. Generate before-flood and after-flood composites
4. Apply speckle noise filtering
5. Compute backscatter difference
6. Detect flooded areas using thresholding
7. Visualize flood extent
8. Estimate total flooded area

---

# Output

The script generates the following outputs:

* Sentinel-1 SAR image before flood
* Sentinel-1 SAR image after flood
* Backscatter difference image
* Flood extent map

Example visualization layers include:

* Flooded Area
* Difference Map
* Before Flood Image
* After Flood Image

---

# Flood Area Estimation

Flooded area was calculated using the **pixel area method**.

Each pixel represents an area on the ground. The total flooded region was estimated by summing the areas of all detected flood pixels.

The final output provides:

Total flooded area in **square meters**.

---

# Requirements

To run this project:

1. Create a **Google Earth Engine account**

https://earthengine.google.com/signup/

2. Open the **Google Earth Engine Code Editor**

https://code.earthengine.google.com/

3. Copy the script and run it inside the editor.

---

# Author

**Harshidha M**  
M.Tech Geoinformatics  
National Institute of Technology Warangal  

Email: [hm25cem5r04@student.nitw.ac.in](mailto:hm25cem5r04@student.nitw.ac.in)
