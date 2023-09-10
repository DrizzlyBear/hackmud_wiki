---
title: expose_access_log
categories: scripts
pagelinkname: expose_access_log
pagelinkshortname: expose_access_log
tags: [scripts, tier_1]
---

expose_access_log is an [[infiltrator]] upgrade. There are multiple tiers of this upgrade. When loaded, it allows you to run a [[sys.expose_access_log]] script on breached users. Something about the i argument. It costs xxx gc.

# Properties

## loaded

If the upgrade is loaded or not.

## cooldown

The time in seconds between uses.

## count

How many logs are exposed in a single run.

# Example use

sys.expose_access_log{target:"trust.sonoso",i:15}
