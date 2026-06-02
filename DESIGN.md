# Job Application Tracker - Design Document

## 1. Project Overview

A full-stack web application for tracking job application throughout the job search process. Built as a personal project to replace keeping a manual spreadsheet, and to get experience with react and Node.js.

**Tech Stack:**
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Data Storage:** PostgreSQL (via Supabase)
- **Hosting:** Vercel (frontend), Render (backend)

**Goals:**
- Replace current Google Sheets job tracker
- Learn and get experience with React and Node.js/Express
- Create a complete, polished, GitHub-visible project 

## 2. Data Model:

Each application is stored as an object. The Applications are stored in data/applications.json file on the backend

### Application Object

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (UUID) | Yes | Unique identifier generatesd on the backend |
| `jobTitle` | string | Yes | Title of the role |
| `company` | string | yes | Company hiring |
| `location` | string | no | City/State, or "Remote" / "Hybrid" |
| `status` | string (enum) | yes | Current stage in the hiring pipeline (see below) |
| `link` | string (URL) | no | Link to the job posting |
| `site` | string | no | Site the position was found on (e.g. LinkedIn, Indeed, etc.)|
| `applicationDate` | string (ISO 8601) | yes | Date application was submitted |
| `notes` | string | no | Additional notes about the position |
| `lastUpdated` | string (ISO 8601) | yes | Timestamp of last modification, auto-set by the backend |

### Status Enum

String values represent staged in the hiring process and should only be one of the following:

| Value | Description |
| --- | --- |
| `Applied` | Application submitted, awaiting response |
| `Assessment` | Asked to complete coding assessment |
| `Phone Screen` | Recruiter phone call scheduled |
| `Interview` | Technical / On-Site interview scheduled |
| `Offer` | Offer received |
| `Rejected` | No longer in consideration |
| `Withdrawn` | Application withdrawn |

---

## 3. API Specification

**Base URL (local):** `http://localhost:5000`\
**Base URL (production):** TBD (Render Deployment URL)\
**Content-Type:** `application/json` for all requests/responses

---

### 3.1 Get All Applications

Retrieves all job applications, optionally filtered by status.

**Request**
```
GET /api/applications
```

**Query Parameters**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string | No | Filter by status value (e.g. `?status=applied`) |

**Response `200 OK`**

```json
[
    {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "jobTitle": "Software Engineer",
        "company": "Google",
        "location": "Remote",
        "status": "Applied",
        "link": "https://example.com/job",
        "site": "LinkedIn",
        "applicationDate": "2026-05-01",
        "notes": "Referral from contact.",
        "lastUpdated": "2026-05-15"
    }
]
```

### 3.2 Get Single Application

Retrieves a single application by ID.

**Request**
```
GET /api/applications/:id
```

**Response `200 OK`**

```json
{
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "jobTitle": "Software Engineer",
    "company": "Realm",
    ...
}
```

**Response `404 Not Found`**

```json
{"error": "Application not found"}
```

---

### 3.3 Create Application

Creates a new application. Backend automatically creates `id` and `lastUpdated`.

**Request**
```
POST /api/applications
```

**Request Body**

```json
{
    "jobTitle": "Cloud Engineer",
    "company": "Apple",
    "location": "Hybrid",
    "status": "Applied",
    "link": "https://example.com/job",
    "site": "Indeed",
    "applicationDate": "2026-05-21",
    "followUpDate": "",
    "notes": ""
}
```

**Required Fields:** `jobTitle`, `company`, `status`, `applicationDate`

**Response `201 Created`**

```json
{
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "jobTitle": "Cloud Engineer",
  "company": "Apple",
  "location": "Hybrid",
  "status": "Applied",
  "link": "https://example.com/job",
  "site": "Indeed",
  "applicationDate": "2026-05-21",
  "followUpDate": "",
  "notes": "",
  "lastUpdated": "2026-05-21T10:00:00.000Z"
}
```

**Response `400 Bad Request`**

```json
{"error": "Missing required fields: jobTitle, company, status, applicationDate"}
```

---

### 3.4 Update Application

Updates an existing application by ID. Only include fields you want to change. `lastUpdated` is automatically updated by the backend.

**Request**
```
PUT /api/applications/:id
```

**Request Body** *(partial update supported)*
```json
{
    "status": "Interview",
    "notes": "Technical interview scheduled May 28th."
}
```

**Response `200 OK`**
```json
{
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "jobTitle": "Cloud Engineer",
    "company": "Franklin Templeton",
    "status": "Interview",
    "notes": "Technical round scheduled for May 28th.",
    "lastUpdated": "2026-05-21T12:00:00.000Z",
    ...
}
```

**Response `404 Not Found`**
```json
{"error": "Application not found"}
```

---

### 3.5 Delete Application

Permanently removes an application by ID

**Request**
```
DELETE /api/applications/:id
```

**Response `200 OK`**
```json
{"message": "Application deleted successfully"}
```

**Response `404 Not Found`**
```json
{"error": "Application not found"}
```

---

## 4. Frontend Design

### 4.1 Pages & Components

The app is a single-pahe application with no routing

**Component Tree**
```
App
├── Header
├── div (flex row)
│   ├── FilterBar
│   └── ApplicationTable
│       └── ApplicationRow (× n)
├── ApplicationModal (Add / Edit)
└── DeleteConfirmDialog
```

---

### 4.2 Views & Interactions

**Main View**
- Header with app title and Add Application button
- Filter bar displayed to the left of the application table
- Application table with columns: Job Title, Company, Location, Status, Site, Application Date, Link, Actions
- Link is displayed as a styled "View Posting" button; invalid/missing links do not open a new tab
- Notes are hidden from the table and only visible/editable through the edit modal
- Clicking a row opens the edit modal for that application
- Each row has a Delete action button; clicking it opens the delete confirmation dialog

**Filter Bar**
- A vertical column of filter buttons for each status value plus an "All" option
- Each button has a colored underline border corresponding to its status color
- Selecting a status filters the table to matching rows only
- Active filter is indicated by full opacity; inactive filters are dimmed

**Add / Edit Modal**
- Opens as an overlay above the page with a semi-transparent backdrop
- A form with fields for all application properties except `id` and `lastUpdated`
- Fields are arranged in a two-column grid layout; notes spans full width at the bottom
- Notes field is a multi-line text area
- Status is a dropdown restricted to the defined enum values
- Application Date defaults to today's date on the Add form
- Submit button labeled **Add Application** (add mode) or **Save Changes** (edit mode)

**Delete Confirmation Dialog**
- Opens as an overlay above the page with a semi-transparent backdrop
- Displays the job title and company so the user can confirm they have the right record
- Cancel button and a red Delete button

---

### Status Badge Colors

Status colors are defined in `src/constants.js` and used consistently across filter buttons and status badges:
 
| Status | Tailwind Border Color |
|---|---|
| Applied | `border-sky-300` |
| Assessment | `border-violet-300` |
| Phone Screen | `border-amber-300` |
| Interview | `border-orange-500` |
| Offer | `border-green-500` |
| Rejected | `border-red-500` |
| Withdrawn | `border-gray-500` |
 
---

## 5. Project Structure
 
```
job-tracker/
├── client/                          # React frontend (Vite + Tailwind)
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── FilterBar.jsx
│       │   ├── ApplicationTable.jsx
│       │   ├── ApplicationRow.jsx
│       │   ├── ApplicationModal.jsx
│       │   └── DeleteConfirmDialog.jsx
│       ├── constants.js             # Shared status color map
│       ├── App.jsx
│       └── main.jsx
├── server/                          # Node/Express backend
│   ├── routes/
│   │   └── applications.js
│   ├── tests/
│   │   └── applications.test.js
│   └── server.js
├── .github/
│   └── workflows/
│       └── ci.yml                   # GitHub Actions CI pipeline
├── DESIGN.md
└── README.md
```
 
---