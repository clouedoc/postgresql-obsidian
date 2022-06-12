# PostgreSQL obsidian (work in progress)

This [Obsidian](https://obsidian.md) plugin will allow you to send your daily note's data to a PostgreSQL database of your choice.

## Getting started

1. Get a PostgreSQL database. You can get one on Scaleway or DigitalOcean for cheap.
2. Set your PostgreSQL connection string inside the settings
3. Your daily notes are now synced to your PostgreSQL database

## Development

### Setup

1. Open this repository on GitPod
2. Go to https://gitpod.io and copy your workspace SSH username and host inside `sync.sh`
3. Copy `sync.sh` inside `.obsidian/plugins`
4. Execute `sync.sh` (the plugin's files should get copied)
5. Copy sync.sh
6. Do changes

## TODO

-   [x] overcomplicated development workflow
-   [ ] set PostgreSQL URL in the settings
-   [ ] sends various information about your daily notes to a PostgreSQL table

## Links

-   [Obsidian API documentation](https://github.com/obsidianmd/obsidian-api)
