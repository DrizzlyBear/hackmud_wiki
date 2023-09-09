hackmud_wiki 

https://drizzlybear.github.io/hackmud_wiki/

# notes on building locally

According to @20k, you must edit `_config.yml`, changing `baseurl` from
`"/hackmud_wiki"` to `""` in order for the local build to function correctly.
If you're contributing to this repository, you can run the git command
`git update-index --skip-worktree _config.yml` so that this change is local-only
(along with any other changes to `_config.yml`). This means that git will ignore
this change, so when you make commits, you won't change `baseurl` on github's
version, which would break production.
