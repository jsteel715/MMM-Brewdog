/* Magic Mirror
 * Module: MMM-Brewdog
 *
 * By jsteel715
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');
const Typed = require('typed.js');

    



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getBeer: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
	//			console.log(response.statusCode + result); // uncomment to see in terminal
                    this.sendSocketNotification('BEER_RESULT', result);
		
            }
        });
    },
    
    
 
    
    

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_BEER') {
            this.getBeer(payload);
        }
    }
});
