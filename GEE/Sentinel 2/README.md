# Sentinel-2 NDVI Analysis – Coimbatore

## Overview

This script computes the **Normalized Difference Vegetation Index (NDVI)** for the **Coimbatore region** using imagery from Sentinel-2. NDVI is used to analyze vegetation health and density using red and near-infrared reflectance.

The analysis uses **Sentinel-2 Surface Reflectance Harmonized data** available in Google Earth Engine.

---

## Dataset

**Satellite:** Sentinel-2
**Data Collection:** `COPERNICUS/S2_SR_HARMONIZED`

**Temporal Range**

* 1 January 2024 – 31 December 2024

**Cloud Filter**

* Images with **less than 10% cloud cover**

**Spatial Extent**

* Coimbatore boundary (`table` feature collection)

---

## Methodology

### 1. Image Collection

A Sentinel-2 image collection is filtered based on:

* Study area boundary
* Time period
* Cloud coverage

The filtered images are then composited using the **mean reducer**.

### 2. Band Selection

The NDVI calculation uses:

| Band | Description        |
| ---- | ------------------ |
| B4   | Red band           |
| B8   | Near Infrared band |

---

### 3. NDVI Calculation

NDVI is calculated using the standard formula:

```
NDVI = (NIR − RED) / (NIR + RED)
```

Where:

* **NIR** = Near Infrared band (B8)
* **RED** = Red band (B4)

NDVI values range between **−1 and +1**.

Interpretation:

| NDVI Value | Land Cover                     |
| ---------- | ------------------------------ |
| < 0        | Water / non-vegetated surfaces |
| 0 – 0.2    | Bare soil / built-up areas     |
| 0.2 – 0.5  | Sparse vegetation              |
| > 0.5      | Dense vegetation               |

---

## Processing Steps

1. Load Sentinel-2 harmonized surface reflectance dataset.
2. Filter images by:

   * study region
   * date range
   * cloud percentage.
3. Generate a mean composite image.
4. Extract **Red (B4)** and **NIR (B8)** bands.
5. Compute NDVI using band math.
6. Clip output to Coimbatore boundary.
7. Visualize NDVI in the map.
8. Export NDVI raster to Google Drive.

---

## Output

The NDVI map for Coimbatore is exported as a **GeoTIFF raster**.

### NDVI Map

<img width="2480" height="3507" alt="Coimbatore NDVI" src="https://github.com/user-attachments/assets/d3334a62-365d-4014-a92d-29052fbbc0a1" />

<p align="center">
  <em>Figure 1: NDVI map of Coimbatore derived from Sentinel-2 imagery (2024).</em>
</p>


---

## Export Parameters

| Parameter       | Value               |
| --------------- | ------------------- |
| Export format   | GeoTIFF             |
| Scale           | 30 m                |
| Region          | Coimbatore boundary |
| Output location | Google Drive        |

---

## Applications

The NDVI output can be used for:

* Vegetation monitoring
* Agricultural assessment
* Urban green cover analysis
* Land degradation studies
* Environmental monitoring

