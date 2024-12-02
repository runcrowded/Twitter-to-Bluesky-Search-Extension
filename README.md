# Twitter to Bluesky Search Extension

A Chrome/Firefox extension that enhances Twitter browsing by adding quick search buttons to find Twitter users on Bluesky (bsky.app). When searching on Bluesky, it automatically switches to the "People" tab to help you find profiles faster.

## Features

- Adds search icons next to Twitter usernames and display names:
  - "T" icon next to display names
  - "@" icon next to usernames
- Clicking an icon:
  - Opens Bluesky search in a new tab
  - Automatically switches to the "People" tab
  - Searches for the corresponding name/username
- Works seamlessly with Twitter's dynamic content loading
- Supports both twitter.com and x.com domains
- Available for both Chrome and Firefox

## Development Setup

1. Clone this repository
2. Install dependencies:

## Installation

### Chrome
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

### Firefox
1. Clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Select the `manifest.firefox.json` file

## Project Structure

- `manifest.json`: Extension configuration
- `content.js`: Main content script
- `icons/`: Extension icons

### Building from Source
1. Make your changes
2. Test locally using "Load unpacked"
3. Package for distribution when ready

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License 