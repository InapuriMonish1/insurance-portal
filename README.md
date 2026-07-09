# Assurly — Claims Operations Portal

Frontend-only React app. No backend, no API calls — all data comes from
`src/data/mockData.js`. Client-side interactivity (search, filtering, page
navigation) works; nothing persists or writes anywhere.

## Run it

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Pages

- `/` — Claims Overview: KPI strip, volume trend, severity breakdown, attention queue
- `/claims` or `/claims/:claimId` — Claim Investigation: searchable list + detail panel with timeline and risk gauge
- `/portfolio` — Portfolio & Risk Analytics: premium vs. claims, renewal pipeline, regional risk concentration
