// Function to find and click the People tab
function switchToPeopleTab() {
    // Look for the tab with "People" text
    const peopleTabSelector = '[role="tab"] div div[dir="auto"]';
    const tabs = document.querySelectorAll(peopleTabSelector);
    
    // Find the "People" tab among all tabs
    const peopleTab = Array.from(tabs).find(tab => tab.textContent === 'People');
    
    if (peopleTab) {
        // Click the parent tab element (3 levels up from the text element)
        const tabElement = peopleTab.closest('[role="tab"]');
        if (tabElement) {
            tabElement.click();
        }
    }
}

// Function to repeatedly try switching tabs until successful
function attemptTabSwitch(maxAttempts = 10) {
    let attempts = 0;
    
    const intervalId = setInterval(() => {
        attempts++;
        
        try {
            switchToPeopleTab();
            clearInterval(intervalId);
        } catch (error) {
            console.log('Attempt to switch tab failed:', error);
        }
        
        if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            console.log('Failed to switch to People tab after maximum attempts');
        }
    }, 500); // Try every 500ms
}

// Start attempting to switch tabs when the page loads
if (document.readyState === 'complete') {
    attemptTabSwitch();
} else {
    window.addEventListener('load', () => {
        attemptTabSwitch();
    });
} 