# Filo

Website for Filo, a (fictional) pasta atelier on Mount Street, Mayfair. Two pages: Home (`/`) and Menu (`/menu/`). Display only, no online ordering.

## See it right now (no Node needed)

The finished site is already built into the `out/` folder:

```bash
cd ~/Desktop/Concept01
python3 -m http.server 8000 --directory out
```

Open http://localhost:8000 and press `Ctrl + C` to stop. Chrome, Edge or Safari 26+ show the scroll effects (the brass thread, the framing hero, the reveals); other browsers show the finished state.

## Edit and rebuild (needs Node 20.9+)

```bash
npm install        # once
npm run dev        # live editing at http://localhost:3000
npm run build      # rebuilds the out/ folder
npm run preview    # serves out/ at http://localhost:8000
```

## Where to change things

| File | What it holds |
| --- | --- |
| `data/menu.ts` | Every dish and wine, categories, sommelier pairings, the four home-page signatures |
| `data/site.ts` | Name, address, hours, chef and sommelier, philosophy text, gallery |
| `data/photos.ts` | Unsplash photo ids and their blur placeholders |
| `app/globals.css` | Colors, fonts, buttons, and the scroll-driven effects |
| `components/layout/Thread.tsx` | The brass thread's path |

## Hosting on GitHub Pages

A workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Push the project to a GitHub repository.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Watch the **Actions** tab. After a couple of minutes the site is live at `https://<your-username>.github.io/<repo-name>/`.

The workflow works out the sub-path and the site address from the repository name, so nothing needs editing. For other hosts, build with `NEXT_PUBLIC_BASE_PATH` (for a sub-path) and `NEXT_PUBLIC_SITE_URL` (the live address) set.

## Notes

- The reservation dialog is front-end only. `submit` in `components/layout/Reservation.tsx` is where a booking service would plug in.
- Open/closed status is computed in the visitor's browser using London time.
- No animation libraries: motion is CSS (including native scroll timelines), dialogs are native `<dialog>` elements, and everything respects reduced-motion settings.
