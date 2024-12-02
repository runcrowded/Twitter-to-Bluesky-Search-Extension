// At the top of content.js and bsky-handler.js
const browser = window.browser || window.chrome;

// Constants
const BSKY_SEARCH_URL = 'https://bsky.app/search?q=';
const ICON_COLOR = '#FFFFFF';
const ICON_BG_COLOR = '#0085FF';
const VALID_DOMAINS = ['twitter.com', 'x.com'];

// Check if we're on a valid domain
function isValidDomain() {
    return VALID_DOMAINS.some(domain => window.location.hostname.includes(domain));
}

// SVG icons as strings
const T_ICON = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="20" height="20" rx="4" fill="${ICON_BG_COLOR}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="13" fill="${ICON_COLOR}" font-weight="bold">T</text>
</svg>`;

const AT_ICON = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="20" height="20" rx="4" fill="${ICON_BG_COLOR}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="15" fill="${ICON_COLOR}" font-weight="bold">@</text>
</svg>`;

// Utility functions
function sanitizeText(text) {
    return text.trim().replace(/\s+/g, ' ');
}

function isValidUsername(username) {
    return username && username.startsWith('@') && username.length > 1;
}

function isValidDisplayName(name) {
    return name && name.length > 0 && !name.includes('@');
}

// Main functionality
function findProfileElements() {
    // Find all user name containers
    const userNameContainers = document.querySelectorAll('div[data-testid="User-Name"]');
    
    userNameContainers.forEach(container => {
        // Find display name: first element with color rgb(231, 233, 234) containing text
        const displayNameEl = container.querySelector('div[style*="color: rgb(231, 233, 234)"] > span > span');
        
        // Find username: element starting with @ and having color rgb(113, 118, 123)
        const usernameEl = container.parentElement.querySelector('div[style*="color: rgb(113, 118, 123)"] > span');

        if (displayNameEl && !displayNameEl.dataset.bskyProcessed) {
            const displayName = sanitizeText(displayNameEl.textContent);
            if (isValidDisplayName(displayName)) {
                const icon = createIcon('display', displayName);
                displayNameEl.appendChild(icon);
                displayNameEl.dataset.bskyProcessed = 'true';
            }
        }

        if (usernameEl && !usernameEl.dataset.bskyProcessed) {
            const username = sanitizeText(usernameEl.textContent);
            if (isValidUsername(username)) {
                const icon = createIcon('username', username.substring(1)); // Remove @ symbol
                usernameEl.appendChild(icon);
                usernameEl.dataset.bskyProcessed = 'true';
            }
        }
    });
}

function createIcon(type, searchText) {
    const icon = document.createElement('a');
    icon.innerHTML = type === 'display' ? T_ICON : AT_ICON;
    icon.href = BSKY_SEARCH_URL + encodeURIComponent(searchText);
    icon.target = '_blank';
    icon.title = `Search for ${searchText} on Bsky`;
    icon.style.cssText = `
        margin-left: 6px;
        cursor: pointer;
        display: inline-flex;
        vertical-align: middle;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0.9;
        position: relative;
    `;

    // Add hover effects
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1)';
        icon.style.opacity = '1';
        
        // Create and show tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = icon.title;
        tooltip.style.cssText = `
            position: absolute;
            background: ${ICON_BG_COLOR};
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            white-space: nowrap;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        `;
        icon.appendChild(tooltip);
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
        icon.style.opacity = '0.9';
        // Remove tooltip
        const tooltip = icon.querySelector('div');
        if (tooltip) {
            tooltip.remove();
        }
    });

    icon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering Twitter's click handlers
    });

    return icon;
}

// Debounce function to limit how often we process mutations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Observer setup
const debouncedFindProfileElements = debounce(findProfileElements, 250);

const observer = new MutationObserver((mutations) => {
    debouncedFindProfileElements();
});

// Initialize
function init() {
    // Check domain before initializing
    if (!isValidDomain()) {
        console.log('Not a valid domain for Twitter to Bluesky Search extension');
        return;
    }

    // Initial scan
    findProfileElements();
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Handle dynamic content loading (infinite scroll)
    document.addEventListener('scroll', debouncedFindProfileElements);
}

// Start the extension
init(); 