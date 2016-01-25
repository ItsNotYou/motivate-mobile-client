define(['contactJS', './WidgetCreator'], function (contactJS, WidgetCreator) {
    return WidgetCreator.extend("RouterFinderWidget", {
        description: {
            out: [
                {
                    "name": "CI_ROUTER_URL",
                    "type": "STRING",
                    "parameterList": [["CP_UNIT", "STRING", "URL"]]
                }
            ],
            updateInterval: 5000
        },
        simpleQueryGenerator: function(callback) {
            var routerUrl = "http://192.168.2.1/login.html";
            callback({0: routerUrl});

            console.log("Hendrik: response sent");
        }
    });
});
