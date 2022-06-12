<h1 align="center">
  Obsidian + PostgreSQL = ❤️
</h1>

<p align="center">
    An <a href="https://obsidian.md">Obsidian</a> plugin to upload your notes' metadata to your database.
</p>

## Features

-   send the Dataview data of a note to a PostgreSQL database

## Installation

1. [Get a PostgreSQL database](https://www.elephantsql.com/)
2. Set your PostgreSQL connection string inside the settings
3. Open the command panel and type "PostgreSQL" to see the list of available commands

## Contributing

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions you make are **greatly appreciated**!

### Development

1. Open this repository on Gitpod
2. Go to https://gitpod.io and copy your workspace SSH username and host inside `sync.sh`
3. Copy `sync.sh` inside `.obsidian/plugins`
4. Do some modifications on your remote Gitpod development instance
5. Execute `sync.sh` on your local computer (the plugin's files should get copied)
6. Iterate

### TODO

-   [x] overcomplicated development workflow
-   [x] set PostgreSQL URL in the settings
-   [ ] get various information from the current note
    -   [x] Dataview data
    -   [ ] list content
-   [ ] commands
    -   [x] upload current note
    -   [ ] bulk upload
    -   [ ] automatic upload on edit
-   [ ] submit to Obsidian plugin registry

### Useful links

-   [Obsidian API documentation](https://github.com/obsidianmd/obsidian-api)

## Attribution

-   Thanks to [pg](https://github.com/brianc/node-postgres/tree/master/packages/pg) for making it possible to easily connect to a PostgreSQL database from JavaScript.
-   Thanks to the [Rush Stack](https://github.com/microsoft/rushstack) for providing an easy-to-use ESLint configuration.
-   Thanks to the [Dataview Plugin](https://github.com/blacksmithgu/obsidian-dataview) for making it easy to access a note's metadata.

## License

[MIT](LICENSE.txt)

<div style="display: flex; justify-content: center; vertical-align: middle;">
    <img height=50 src="./assets/obsidian.png" class="center">
    <img height=50 src="./assets/postgres.png" class="center">
</div>
