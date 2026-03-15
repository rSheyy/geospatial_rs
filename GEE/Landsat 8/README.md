# Landsat-8 Cloud Masking – Coimbatore

## Overview

This project performs **cloud masking on Landsat-8 imagery** for the Coimbatore region using satellite data from Landsat 8. The processing and analysis are implemented using the **JavaScript API** of Google Earth Engine.

Cloud masking removes pixels affected by clouds, cirrus, and cloud shadows, resulting in a cleaner image suitable for further remote sensing analysis such as land-use classification, vegetation analysis, or change detection.

---

## Dataset

**Satellite:** Landsat 8
**Collection:** `LANDSAT/LC08/C02/T1_L2`

**Temporal Range**

* 1 March 2024 – 30 May 2024

**Spatial Extent**

* Coimbatore administrative boundary (`table` feature collection)

**Spatial Resolution**

* 30 meters

---

## Methodology

### 1. Image Collection

A Landsat-8 image collection is filtered based on:

* Study area boundary
* Date range

The images are composited using the **mean reducer** to generate an initial image.

---

### 2. Cloud Masking

Clouds and atmospheric artifacts are removed using the **QA_PIXEL band**.

The following cloud-related pixels are masked:

| Bit | Description    |
| --- | -------------- |
| 1   | Dilated Clouds |
| 2   | Cirrus Clouds  |
| 3   | Clouds         |
| 4   | Cloud Shadows  |

A bitwise operation is used to detect and remove these pixels.

The mask is applied using:

```
image.updateMask(mask)
```

---

### 3. Median Composite

After masking clouds, the filtered images are combined using a **median reducer** to create a cloud-free composite image.

---

## Processing Workflow

1. Load Landsat-8 surface reflectance image collection.
2. Filter images by study area and date range.
3. Generate a **mean composite image**.
4. Extract the **QA_PIXEL band**.
5. Identify cloud-affected pixels using bitwise operations.
6. Apply the cloud mask.
7. Generate a **median composite image** after masking.
8. Clip the output to the Coimbatore boundary.
9. Display results in the map viewer.
10. Export images to Google Drive.

---

## Outputs

Two images are exported:

### 1. Original Composite Image

Mean composite without cloud masking.

### 2. Cloud-Masked Image

Median composite after removing cloud-affected pixels.

### Example Output

<img width="3507" height="2480" alt="Cloud masking" src="https://github.com/user-attachments/assets/83981ea0-cddd-4d22-81b4-ac4b49f3f584" />

<p align="center">
  <em>Figure 1: Cloud-masking comparison of before and after Landsat-8 composite image of Coimbatore.</em>
</p>

---

## Export Parameters

| Parameter          | Value        |
| ------------------ | ------------ |
| Format             | GeoTIFF      |
| Spatial Resolution | 30 m         |
| Coordinate System  | EPSG:32644   |
| Output Location    | Google Drive |
| Maximum Pixels     | 1e13         |

---

## Applications

Cloud-masked Landsat imagery can be used for:

* Land Use / Land Cover (LULC) classification
* NDVI and vegetation analysis
* Urban expansion studies
* Environmental monitoring
* Time-series analysis

---

* `L8_CBE_original_composite`
* `L8_CBE_cloud_masked`
