# GinX

Static snapshot of the public GinX website, captured on 10 October 2026.

Website: https://ginx.io/

Market data is frozen. Trading and login entry points lead to `/upgrade/`.
The homepage displays a dismissible multilingual upgrade announcement.

GitHub Pages serves the `main` branch from `/`. The `CNAME` file preserves
the `ginx.io` custom domain; `.nojekyll` disables Jekyll processing.
Assets, internal navigation and React Router use the domain root `/`.

From the parent workspace, run `prepare-custom-domain.py` to refresh this
deployment from `dist`. Do not run `prepare-github-pages.py` for this domain:
that older generator targets the `/ginx/` project URL.
