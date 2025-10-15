/**
 * Token Storage Module
 * Manages persistent storage of event and response tokens in the browser's localStorage
 */

const TokenStorage = (function() {
    // Storage keys
    const ORGANIZER_KEY = 'flexup_organizer_tokens';
    const RESPONSE_KEY = 'flexup_response_tokens';
    
    /**
     * Initialize storage if it doesn't exist
     */
    function initStorage() {
        if (!localStorage.getItem(ORGANIZER_KEY)) {
            localStorage.setItem(ORGANIZER_KEY, JSON.stringify({}));
        }
        if (!localStorage.getItem(RESPONSE_KEY)) {
            localStorage.setItem(RESPONSE_KEY, JSON.stringify({}));
        }
    }
    
    /**
     * Save an organizer token
     * @param {string} eventSlug - The event slug
     * @param {string} eventName - The event name
     * @param {string} organizerToken - The organizer token
     * @param {string} url - The complete URL to manage the event
     */
    function saveOrganizerToken(eventSlug, eventName, organizerToken, url) {
        initStorage();
        
        const tokens = JSON.parse(localStorage.getItem(ORGANIZER_KEY));
        tokens[eventSlug] = {
            name: eventName,
            token: organizerToken,
            url: url,
            lastAccessed: new Date().toISOString()
        };
        
        localStorage.setItem(ORGANIZER_KEY, JSON.stringify(tokens));
    }
    
    /**
     * Save a response token
     * @param {string} eventSlug - The event slug
     * @param {string} eventName - The event name
     * @param {string} responseToken - The response token
     * @param {string} responseName - The responder's name
     * @param {string} url - The complete URL to manage the response
     */
    function saveResponseToken(eventSlug, eventName, responseToken, responseName, url) {
        initStorage();
        
        const tokens = JSON.parse(localStorage.getItem(RESPONSE_KEY));
        
        // Initialize event entry if it doesn't exist
        if (!tokens[eventSlug]) {
            tokens[eventSlug] = {
                name: eventName,
                responses: {}
            };
        }
        
        // Add the response token
        tokens[eventSlug].responses[responseToken] = {
            name: responseName,
            url: url,
            lastAccessed: new Date().toISOString()
        };
        
        localStorage.setItem(RESPONSE_KEY, JSON.stringify(tokens));
    }
    
    /**
     * Get all organizer tokens
     * @returns {Object} Object with event slugs as keys and event data as values
     */
    function getOrganizerTokens() {
        initStorage();
        return JSON.parse(localStorage.getItem(ORGANIZER_KEY));
    }
    
    /**
     * Get all response tokens
     * @returns {Object} Nested object with event slugs and response tokens
     */
    function getResponseTokens() {
        initStorage();
        return JSON.parse(localStorage.getItem(RESPONSE_KEY));
    }
    
    /**
     * Get a specific organizer token
     * @param {string} eventSlug - The event slug
     * @returns {Object|null} The event data or null if not found
     */
    function getOrganizerToken(eventSlug) {
        initStorage();
        const tokens = JSON.parse(localStorage.getItem(ORGANIZER_KEY));
        return tokens[eventSlug] || null;
    }
    
    /**
     * Get response tokens for a specific event
     * @param {string} eventSlug - The event slug
     * @returns {Object|null} The event's response data or null if not found
     */
    function getEventResponses(eventSlug) {
        initStorage();
        const tokens = JSON.parse(localStorage.getItem(RESPONSE_KEY));
        return tokens[eventSlug] || null;
    }
    
    /**
     * Delete an organizer token
     * @param {string} eventSlug - The event slug
     */
    function deleteOrganizerToken(eventSlug) {
        initStorage();
        const tokens = JSON.parse(localStorage.getItem(ORGANIZER_KEY));
        delete tokens[eventSlug];
        localStorage.setItem(ORGANIZER_KEY, JSON.stringify(tokens));
    }
    
    /**
     * Delete a response token
     * @param {string} eventSlug - The event slug
     * @param {string} responseToken - The response token
     */
    function deleteResponseToken(eventSlug, responseToken) {
        initStorage();
        const tokens = JSON.parse(localStorage.getItem(RESPONSE_KEY));
        
        if (tokens[eventSlug] && tokens[eventSlug].responses[responseToken]) {
            delete tokens[eventSlug].responses[responseToken];
            
            // If no more responses for this event, remove the event entry
            if (Object.keys(tokens[eventSlug].responses).length === 0) {
                delete tokens[eventSlug];
            }
            
            localStorage.setItem(RESPONSE_KEY, JSON.stringify(tokens));
        }
    }
    
    /**
     * Update the last accessed timestamp for an organizer token
     * @param {string} eventSlug - The event slug
     */
    function touchOrganizerToken(eventSlug) {
        initStorage();
        const tokens = JSON.parse(localStorage.getItem(ORGANIZER_KEY));
        
        if (tokens[eventSlug]) {
            tokens[eventSlug].lastAccessed = new Date().toISOString();
            localStorage.setItem(ORGANIZER_KEY, JSON.stringify(tokens));
        }
    }
    
    /**
     * Update the last accessed timestamp for a response token
     * @param {string} eventSlug - The event slug
     * @param {string} responseToken - The response token
     */
    function touchResponseToken(eventSlug, responseToken) {
        initStorage();
        const tokens = JSON.parse(localStorage.getItem(RESPONSE_KEY));
        
        if (tokens[eventSlug] && tokens[eventSlug].responses[responseToken]) {
            tokens[eventSlug].responses[responseToken].lastAccessed = new Date().toISOString();
            localStorage.setItem(RESPONSE_KEY, JSON.stringify(tokens));
        }
    }
    
    /**
     * Check if user is an organizer for an event
     * @param {string} eventSlug - The event slug
     * @param {string} organizerToken - The organizer token
     * @returns {boolean} True if the user is an organizer
     */
    function isOrganizer(eventSlug, organizerToken) {
        initStorage();
        const tokens = JSON.parse(localStorage.getItem(ORGANIZER_KEY));
        return tokens[eventSlug] && tokens[eventSlug].token === organizerToken;
    }
    
    // Public API
    return {
        saveOrganizerToken,
        saveResponseToken,
        getOrganizerTokens,
        getResponseTokens,
        getOrganizerToken,
        getEventResponses,
        deleteOrganizerToken,
        deleteResponseToken,
        touchOrganizerToken,
        touchResponseToken,
        isOrganizer
    };
})();