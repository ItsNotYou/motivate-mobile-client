define(['contactJS'], function(contactJS) {

    /**
     * Creates a simplified version of a Widget.queryGenerator which reduces response putting overhead
     * @param simpleQueryGenerator Calculates response values and communicates them via callback parameter.
     *                             Callback takes object in the format
     *                             {0: <some value here>, 2: <some value here>}
     *                             with the object key representing the response index while the corresponding
     *                             value represents the response value.
     * @returns {Function} Wrapped function that can be used as queryGenerator
     */
    var createSimpleQueryGenerator = function(simpleQueryGenerator) {
        return function(callback) {
            var that = this;

            // Wrap the response in a contactJS.ContextInformationList
            var sendResponse = function(simplifiedResponse) {
                var response = new contactJS.ContextInformationList();

                for (var responseIndex in Object.getOwnPropertyNames(simplifiedResponse)) {
                    // Silently expects each property key to be a number
                    // Maybe we should check for numbers to be really sure
                    var responseValue = simplifiedResponse[responseIndex];
                    response.put(that.getOutputContextInformation().getItems()[responseIndex].setValue(responseValue));
                }

                that._sendResponse(response, callback);
            };

            // Call the given query generator for response values
            simpleQueryGenerator.call(this, sendResponse);
        };
    };

    /**
     * Reduces widget code overhead by automating some common snippets. A usage example is given below.
     * 
     * WidgetCreator.extend("RouterFinderWidget", {
     *   description: {
     *     out: [
     *       {
     *         "name": "CI_ROUTER_URL",
     *         "type": "STRING",
     *         "parameterList": [["CP_UNIT", "STRING", "URL"]]
     *       }
     *     ],
     *     updateInterval: 5000
     *   },
     *   simpleQueryGenerator: function(callback) {
     *     var routerUrl = "http://192.168.2.1/login.html";
     *     callback({0: routerUrl});
     *   }
     * });
     *
     * @type {{extend: Function}}
     */
    var WidgetCreator = {
        extend: function(name, properties) {
            var createdWidget = function(discoverer) {
                contactJS.Widget.call(this, discoverer);
                this._name = name;
                return this;
            };

            // Use known defaults
            createdWidget.prototype = Object.create(contactJS.Widget.prototype);
            createdWidget.prototype.constructor = createdWidget;
            createdWidget.prototype._initCallbacks = function() {
                this._addCallback(new contactJS.Callback().withName('UPDATE').withContextInformation(this.getOutputContextInformation()));
            };

            // Choose queryGenerator. Use simplified version if available
            var queryGenerator = properties.simpleQueryGenerator ? createSimpleQueryGenerator(properties.simpleQueryGenerator) : properties.queryGenerator;

            // Copy properties into Widget
            createdWidget.description = properties.description;
            createdWidget.prototype.queryGenerator = queryGenerator;

            return createdWidget;
        }
    };

    return WidgetCreator;
});