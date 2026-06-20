# licolite.com

Official product website for [LicoLite](https://github.com/LicoLite/licolite) — Traceable Shared Workspace for AI Agents.

## Structure

```
licolite.com/
├── index.html          # Main landing page
├── styles.css          # Site styles (obsidian/gold/ice brand)
├── assets/
│   ├── logo.svg        # Brand logo (concentric rings)
│   ├── banner.svg      # Full-width banner (1200x400)
│   └── favicon.svg     # Favicon (64x64 dark circle)
└── README.md
```

## Development

```bash
python3 -m http.server 8090
# Open http://localhost:8090
```

## Deployment

Published with GitHub Pages from the `main` branch root:

https://licolite.com

The `CNAME` file binds the GitHub Pages site to `licolite.com`. DNS should point the apex domain to GitHub Pages A/AAAA records, and `www` should CNAME to `licolite.github.io`.
