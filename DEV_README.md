## Developer's README.md

### Releasing a new version

1. Update your manifest.json with your new version number, such as 1.0.1, and the minimum Obsidian version required for your latest release.
2. Update your versions.json file with "new-plugin-version": "minimum-obsidian-version" so older versions of Obsidian can download an older version of your plugin that's compatible.
3. Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix v. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
4. Upload the files manifest.json, main.js, styles.css as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
   Publish the release.
