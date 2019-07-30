/* Magic Mirror
 * Module: MMM-Brewdog
 *
 * By jsteel715
 *
 */


 Module.register("MMM-Brewdog", {

    // Module config defaults.
    defaults: {
	useHeader: true, // false if you don't want a header
        header: "Brewdog Beers", // Any text you want
        maxWidth: "33%",
        animationSpeed: 3000, // fade in and out speed
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 30000    // 60 * 60 * 1000, 2 minutes

    },
    
    // Define required scripts.
    getScripts: function() {
	return [];
    },

    getStyles: function() {
        return ["MMM-Brewdog.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        // Initialize 
        this.url = "https://api.punkapi.com/v2/beers/random";
        this.Beer = [];
        this.activeItem = 0;
        this.scheduleUpdate();       // <-- When the module updates (see below)
    },

    getDom: function() {
		
		// creating the wrapper
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = "100%";

		// The loading sequence
        if (!this.loaded) {
            wrapper.innerHTML = "Let's grab a cold one ...";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }
	
		// Setting the data
	    var Keys = Object.keys(this.Beer);
	    var Beer = this.Beer[Keys[this.activeItem]];
	    
	    
	    
		// creating the header
        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }
			
		// Creating the div's for your data items
            var top = document.createElement("div");
            top.classList.add("list-row");
			
	    
		// Name element from data
	    var getBeerName = document.createElement("div");
	    getBeerName.classList.add("xsmall", "bright", "name");
	    getBeerName.innerHTML = "Beer Name: ";
	    wrapper.appendChild(getBeerName);
	    var i = 0;
	    var txt = Beer.name; /* The text */
	    var speed = 100; /* The speed/duration of the effect in milliseconds */
	     
	    function typeWriter() {
		if (i < txt.length) {
		    getBeerName.innerHTML += txt.charAt(i);
		    i++;
		    setTimeout(typeWriter, speed);
		}
	    };  
	     			
	    setTimeout(function() {
		typeWriter();
	    }, 3000);
		
	   
	   
			
		// Tagline element from data
	    var beerTagline = document.createElement("div");
	    beerTagline.classList.add("xsmall", "bright", "tagline");
	    beerTagline.innerHTML = "Tagline: " + Beer.tagline;
	    
			
			
		//  First Brewed elements from data
	    var beerBrewed = document.createElement("div");
	    beerBrewed.classList.add("xsmall", "bright", "brewed");
	    beerBrewed.innerHTML = "First Brewed: " + Beer.first_brewed;
	    
			
			
		// Description element from data
	    var beerDescription = document.createElement("div");
	    beerDescription.classList.add("xsmall", "bright", "description");
	    beerDescription.innerHTML = "Description: " + Beer.description;
	    
	    setTimeout(function() {
		wrapper.appendChild(beerTagline);
		wrapper.appendChild(beerBrewed);
		wrapper.appendChild(beerDescription);
		wrapper.style.maxWidth = "45%";
		
	    }, 6500);
	    
        return wrapper;
		
    },  // <-- closes the getDom function from above

	// this processes your data
    processBeer: function(data) { 
        this.Beer = data; 
        this.loaded = true;
    },
	
	// this tells module when to update
    scheduleUpdate: function() { 
        setInterval(() => {
            this.getBeer();
        }, this.config.updateInterval);
        this.getBeer(this.config.initialLoadDelay);
        var self = this;
    },
	
	
	// this asks node_helper for data
    getBeer: function() { 
        this.sendSocketNotification('GET_BEER', this.url);
    },
	
	
	// this gets data from node_helper
    socketNotificationReceived: function(notification, payload) { 
        if (notification === "BEER_RESULT") {
            this.processBeer(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
