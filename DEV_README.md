## Developer's README.md

### Development instructions

1. Open this repository on Gitpod
2. Go to https://gitpod.io and copy your workspace SSH username and host inside `sync.sh`
3. Copy `sync.sh` inside `.obsidian/plugins`
4. Do some modifications on your remote Gitpod development instance
5. Execute `sync.sh` on your local computer (the plugin's files should get copied)
6. Restart Obsidian (using a keybinding is useful here)
7. Iterate steps 4 to 6 until you are satisfied.
8. Publish your work!

### Releasing a new version

1. Update your manifest.json with your new version number, such as 1.0.1, and the minimum Obsidian version required for your latest release.
2. Update your versions.json file with "new-plugin-version": "minimum-obsidian-version" so older versions of Obsidian can download an older version of your plugin that's compatible.
3. Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix v. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
4. Upload the files manifest.json, main.js, styles.css as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
   Publish the release.
