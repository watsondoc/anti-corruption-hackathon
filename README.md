# anti-corruption-hackathon
Data Against Corruption Hackathon

# Hackathon Data

For the hackathon, four primary resources are provided: three main datasets and a set of [Risk Indicators](#4-risk-indicators) curated by the CPC for use in the first challenge. Participants are also permitted to incorporate any publicly available additional datasets. If additional datasets are used, participants must provide proper source attribution and clear instructions for accessing them.

The main hackathon data is accessible [here](https://dac.hachathon.istc.am/final_data.zip) but is restricted to the ISTC network. Ensure you are connected to the ISTC Wi-Fi before attempting to download.

## Contents

1. [Declarations of Public Officials and Their Family Members: Assets, Income, Expenditures, Interests](#1-declarations-of-public-officials-and-their-family-members-assets-income-expenditures-interests)
    - Public Accessibility
    - Data Source
    - Preprocessing and Structure
    - JSON Structure Analysis
    - Quick Access Cheat Sheet

2. [Statements of Political Parties' Funds, Expenses, and Property](#2-statements-of-political-parties-funds-expenses-and-property)
    - Public Accessibility
    - Preprocessing and Structure

3. [Public Procurement Data](#3-public-procurement-data)
    - [Contracts](#31-contracts)
    - [Completed Procurement Procedures](#32-completed-procurement-procedures)
    - [Failed Procurement Procedures](#33-failed-procurement-procedures)
    - [Bid Reports](#34-bid-reports)
    - [Beneficial Ownership](#35-beneficial-ownership)

4. [Risk Indicators](#4-risk-indicators)

Below is an overview of the provided datasets. The descriptions are not exhaustive but are intended to help participants quickly familiarize themselves with the data.

---

## 1. Declarations of Public Officials and Their Family Members: Assets, Income, Expenditures, Interests

This dataset contains over **55,000 declarations** from more than **20,000 public officials and their family members**, covering the period from **June 1, 2021, to December 6, 2024**. These declarations provide detailed insights into assets, income, liabilities, and other financial aspects of public officials, which can serve as key indicators of their financial behavior and potential risks of corruption.

### Public Accessibility

The dataset is publicly accessible via the [declarations registry website](https://registry.cpcarmenia.am/).

### Data Source

The dataset was obtained through the **CPC API** and consists of two parts:
- **General Information**: API URL: https://file-online.cpcarmenia.am/armepdwebservice/v1/declarations
- **Detailed Declarations**: API URL: https://file-online.cpcarmenia.am/armepdwebservice/v1/declarations/details

### Preprocessing and Structure

To ensure faster access and avoid overloading the API server, the data has been pre-downloaded and provided in the `declarations` folder of the dataset. The data is organized by year, with two JSON files per year:
- **General Information**: e.g., `general_2021.json`
- **Detailed Declarations**: e.g., `details_2021.json`

The data is provided exactly as retrieved from the APIs, with no additional preprocessing. The structure of the JSON files mirrors the way data is visualized on the [declarations registry website](https://registry.cpcarmenia.am/), and participants are encouraged to explore the website to become familiar with the data format.

Additionally, a `.csv` dataset is provided, containing a mapping between the declaration ID (found in the `.json` files) and the declarant ID (`originalDeclarantId`). This mapping helps resolve ambiguities among declarations where multiple declarants share the same name. Please note that this dataset was generated in October, so some declarations may not have a corresponding mapping. For any unresolved ambiguities in the remaining declarations, it is recommended to exclude those entries from analysis.

### Dataset Structure Overview

The dataset is organized into several sections, each containing grids and
subsections that correspond to different types of information. For example:
- **General Information**: Includes declarant's personal details and family members.
- **Property Information**: Contains data on real estate, vehicles, securities and investments,
  loans and deposits, expensive property, financial means.
- **Income Information**: Covers revenues and additional income details.
- **Expense Information**: Details major expenses, such as travel, education, and property renovation.
- **Declaration of Interests**: Includes participation in commercial and non-commercial organizations, party memberships, and contracts.

The structure is hierarchical, and the JSON files contain data as presented on the declarations website.

#### JSON Structure Analysis

##### Root Level Structure
The JSON file has the following main fields:
- **`id`**: Unique identifier for the declaration.
- **`name`**: Declaration name in Armenian.
- **`preHeader`**: (Nullable) Preliminary header.
- **`header`**: Header for the declaration.
- **`content`**: List of sections containing the detailed data.

##### Navigating the `content` Field

The `content` field contains multiple sections. Each section has:
- **`title`**: The title of the section.
- **`grids`**: A list of grids, where each grid contains rows of detailed data.

###### Example: Accessing General Information (`content[0]`)

**Path to Access**:  
`content[0]` → `"title": "Ա. ԸՆԴՀԱՆՈՒՐ ՏՎՅԱԼՆԵՐ"` (General Information).

###### Grids in General Data
- **`grids[0]`**: Contains general profile information.
    - **Path**: `content[0] -> grids[0] -> rows`
    - **Data**:
        - Declarant personal details: **Name**, **Birth Date**, **Position**, etc.

###### Example: Accessing Property Information (`content[1]`)

**Path to Property Information**:  
`content[1]` → `"title": "Բ. ՀԱՅՏԱՐԱՐԱՏՈՒ ... ԳՈՒՅՔԸ"`.

###### Grids in Property Information
Each grid represents a category of asset. For example:
1. **`grids[0]`**: Real Estate.
    - **Path**: `content[1] -> grids[0] -> rows`
    - **Details**:
        - Property type, location, ownership type, area, acquisition details.
2. **`grids[1]`**: Vehicles.
    - **Path**: `content[1] -> grids[1] -> rows`
    - **Details**:
        - Vehicle type, make, model, purchase details.

###### Example: Accessing Income Information (`content[2]`)

**Path to Income Information**:  
`content[2]` → `"title": "Գ.1. ՀԱՅՏԱՐԱՐԱՏՈՒ ... ԵԿԱՄՈՒՏՆԵՐ"`.

###### Grids in Income Information
1. **`grids[0]`**: Revenue information.
    - **Path**: `content[2] -> grids[0] -> rows`
    - **Details**:
        - Revenue source, amount, and organization.

###### Example: Accessing Expense Information (`content[3]`)

**Path to Expense Information**:  
`content[3]` → `"title": "Դ. ՀԱՅՏԱՐԱՐԱՏՈՒ ... ԾԱԽՍԵՐ"`.

###### Grids in Expense Information
Each grid contains a specific type of expense. Example:
- **`grids[0]`**: Travel Expenses.
    - **Path**: `content[3] -> grids[0] -> rows`
    - **Details**:
        - Expense description, amount, and currency.

###### Example: Accessing Declaration of Interests (`content[4]`)

**Path to Declaration of Interests**:  
`content[4]` → `"title": "Ե. ՀԱՅՏԱՐԱՐԱՏՈՒ ... ՇԱՀԵՐԻ"`.

###### Grids in Interests
1. **`grids[0]`**: Commercial organizations.
    - **Path**: `content[4] -> grids[0] -> rows`
    - **Details**:
        - Organization name, role, shares.

##### General Pattern for Accessing Data

For all sections:
1. Navigate to the specific section in the `content` array.
2. Within that section, navigate to the appropriate grid (`grids`).
3. Access detailed data through the `rows` field in the grid.

##### Quick Access Cheat Sheet

| **Section**               | **Path to Access**                | **Key Fields**                                               |
|---------------------------|-----------------------------------|-------------------------------------------------------------|
| General Informatino       | `content[0]` → `grids`           | Declarant personal details, address, position              |
| Property Information      | `content[1]` → `grids`           | Real estate, vehicles, securities                          |
| Income Information        | `content[2]` → `grids`           | Salary, revenue, loan amounts                              |
| Expense Information       | `content[3]` → `grids`           | Travel, rent, education, major costs                       |
| Declaration of Interests  | `content[4]` → `grids`           | Commercial, non-commercial organizations, memberships      |

##### Important Note

Some sections or grids may not be available in every declaration. The presence of a section depends on the declaration type and its specific requirements.

The data can be easily parsed into a more structured format, such as a pandas DataFrame, for each relevant section, enabling streamlined analysis and manipulation.

---
---

## 2. Statements of Political Parties' Funds, Expenses, and Property

This dataset provides financial information on political parties in the Republic of Armenia (RA) for the years 2021 to 2023. The statements submitted by political parties include detailed records of annual donations from individuals, along with other financial data, reflecting the financial health and funding sources of the parties.

### Public Accessibility

The content of the dataset is publicly accessible via the [official website](https://www.azdarar.am/announcments/org/230/).

### Preprocessing and Structure

We have pre-downloaded the data and made it accessible in the `political_parties` folder which is organized into subfolders by year. Each year’s folder contains statements submitted by political parties. However, most of these statements are in `PDF` format, originally exported from Excel. Additionally, the fonts used in these PDFs are not in Unicode, making direct text extraction challenging.

To effectively utilize this dataset, it is recommended to parse the PDFs using an OCR engine such as Tesseract.

To aid participants, the `political_parties` folder also includes the Excel template that was used for filling out these statements. This template can provide insight into the structure and expected fields of the financial data.

---
---

## 3. Public Procurement Data

This dataset provides insights into public procurement activities, including the outcomes of bids, contract details, and beneficial ownership information. It spans the period from 2020 to 2024 and is organized into several parts:

1. [Contracts](https://armeps.am/ppcm/public/contracts)
2. [Completed Procurement Procedures](https://armeps.am/ppcm/public/reports#/report/f89dce4e-1f05-4a66-aa17-c1eff8c6b70e)
3. [Failed Procurement Procedures](https://armeps.am/ppcm/public/reports#/report/4399aa2f-d43b-4cc5-b357-83bea0283b98)
4. [Bid Reports](https://armeps.am/ppcm/public/bid-report)
5. [Beneficial Ownership](https://www.e-register.am/)


### 3.1. Contracts

This dataset contains information on contracts signed between ordering bodies and bid winners. Each contract is typically associated with a completed procurement procedure.

#### **Data Acquisition and Preprocessing**
- **Time Period:** 2020–2024
- **Method:** Manually downloaded CSV files, filtered year by year.
- **Preprocessing Steps:**
    - Annual CSV files were concatenated into a single dataset.
    - Data was sorted by:
        - "Պայմանագրի կնքման ամսաթիվ" (*Contract Signing Date*)
        - "Պայմանագրի ծածկագիրը" (*Contract Code*)

### 3.2. Completed Procurement Procedures

This dataset includes details of successfully completed procurement procedures, such as the participants, their bid amounts, and the winning bid. While most completed procedures have corresponding contracts, some discrepancies exist.

#### **Data Acquisition and Preprocessing**
- **Time Period:** 2020–2024
- **Method:** Manually downloaded Excel files, filtered year by year.
- **Preprocessing Steps:**
    - Annual Excel files were concatenated into a single dataset.
    - Data was sorted by:
        - "Տարեթիվ" (*Year*)
        - "Կատարման վերջնաժամկետ" (*Completion Deadline*)
        - "Գնման ընթացակարգի ծածկագիր" (*Procurement Procedure Code*)

### 3.3. Failed Procurement Procedures

This dataset tracks procurement procedures that were not completed, detailing reasons for failure. Note that some entries may have missing or incomplete reasons.

#### **Data Acquisition and Preprocessing**
- **Time Period:** 2020–2024
- **Method:** Manually downloaded Excel files, filtered year by year.
- **Preprocessing Steps:**
    - Annual Excel files were concatenated into a single dataset.
    - Data was sorted by:
        - "Տարեթիվ" (*Year*)
        - "Հայտերի բացման ամսաթիվ" (*Bid Opening Date*)
        - "Գնման ընթացակարգի ծածկագիր" (*Procurement Procedure Code*)

### 3.4. Bid Reports

This dataset provides detailed reports on bids, including bid packages available as zipped files. While ideally, each procurement procedure should have a corresponding bid report, inconsistencies exist, such as missing or unmatched reports.

#### **Data Acquisition and Preprocessing**
- **Time Period:** 2020–2024
- **Method:** Manually downloaded Excel files in 2-3 month intervals due to system limitations (downloading larger ranges caused failures).
- **Preprocessing Steps:**
    - All Excel files were concatenated into a single dataset.
    - Participants listed in separate columns were combined into a comma-separated list for each bid.
    - Data was sorted by:
        - "Հրատարակման/Հրավերի օր" (*Publication/Invitation Date*)
        - "Մրցույթի ծածկագիրը" (*Competition Code*)

### 3.5. Beneficial Ownership

This dataset provides information on the beneficial ownership of Limited Liability Companies (LLCs) registered in Armenia. It can be linked with other datasets to identify individuals who hold ownership stakes in the companies involved in procurement activities.

### Notes

The datasets can be parsed into structured formats, such as **Pandas DataFrames**, for detailed analysis. Certain inconsistencies, such as unmatched records or incomplete data, may require additional preprocessing.

## 4. Risk Indicators

The main folder of the dataset includes **risk indicators** curated by the CPC, which contain rules for assigning risk scores along with their corresponding weights. This dataset is intended for use in the first challenge, where participants are tasked with implementing these rules and presenting them with clear and engaging visualizations.
