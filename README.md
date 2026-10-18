# Home Lab & Personal Homepage (`home.imdeepmind.com`)

Static personal homepage, catalog, and dashboard tailored for **Abhishek Chatterjee** ([imdeepmind.com](https://imdeepmind.com)).

Features the signature visual language, dark mode, typography, brand assets, and color palette (`#d9083c` crimson on `#0e1320` midnight slate) of [imdeepmind.com](https://imdeepmind.com).

---

## ✨ Features

- **🌐 Personal Startpage & DuckDuckGo Search**:
  - Embedded DuckDuckGo search bar supporting direct queries, full URLs, and quick bangs (`!yt`, `!gh`, `!w`, `!g`, `!r`, `!npm`).
  - Current date and greeting indicator.

- **🔗 Direct Inbox Launchpad**:
  - Direct multi-account Gmail inbox links:
    - `abhishek@imdeepmind.com`
    - `infinityatme@gmail.com`
    - `abhishekchatterjeejit@gmail.com`
  - Encrypted Proton Mail inbox:
    - `abhishek.chatterjee97@protonmail.com`

- **🚀 Hosted Applications & Subdomains**:
  - `https://imdeepmind.com/` (Main Site & Study Notes)
  - `https://portfolio.imdeepmind.com/` (Investment Portfolio Tracker)
  - `https://todo.imdeepmind.com/` (Minimalist TODO App)
  - `https://ayo.imdeepmind.com/` (ayo Multi-Cloud Encrypted Storage)
  - `https://rocket.imdeepmind.com/` (Rocket API Platform)
  - `https://imdeepmind.com/utility-tools/` (Utility Tools)
  - `https://hocrox.imdeepmind.com/` (Hocrox Deep Learning Pipeline)
  - `https://gallery.imdeepmind.com/` (Photography Gallery)

- **🎬 Media & Entertainment**:
  - Jellyfin (`https://jellyfin.home.imdeepmind.com`)
  - YouTube (`https://www.youtube.com`)
  - YouTube Music (`https://music.youtube.com`)

- **🔑 Passwords & Security**:
  - Proton Pass (`https://pass.proton.me`)

- **☁️ Cloud, Databases & Hosting**:
  - AWS Console
  - Google Drive
  - MongoDB Atlas
  - Upstash
  - Vercel
  - Netlify

- **🐙 Live GitHub Projects Integration**:
  - Automatically fetches all public, non-archived repositories from your GitHub profile (`imdeepmind`).
  - Displays stars, language indicators, and direct links to GitHub.
  - Caches data in `localStorage` for 1 hour to prevent API limits, with a manual refresh button.

- **🎨 Minimal Header & Theme**:
  - Header with exact `imdeepmind.com` logo and single direct link to `imdeepmind.com`.
  - Dark mode (`#0e1320`) and Light mode toggle.
  - Pinned Favorites quick access shelf.
  - Grid View and List View switchers.

---

## 🏃‍♂️ Running Locally

```bash
# Serve static directory
python3 -m http.server 4321
```

Visit [http://localhost:4321](http://localhost:4321) in your browser.
