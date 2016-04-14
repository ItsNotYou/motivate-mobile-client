define(['contactJS', 'jquery', './WidgetCreator'], function(contactJS, $, WidgetCreator) {
    return WidgetCreator.extend("DeviceOsWidget", {
        description: {
            out: [
                {
                    'name': 'CI_AVAILABLE_DEVICES',
                    'type': 'BOOLEAN',
                    'parameterList': [["CP_DEVICE", "STRING", "RASPBERRY_PI"]]
                }
            ],
            updateInterval: 10000
        },
        simpleQueryGenerator: function(callback) {
            var checkForAuth = function(a, b, c) {
                if (c === "Unauthorized") {
                    callback({0: "true"});
                } else {
                    callback({0: "false"});
                }
            };

            $.ajax({
                url: "http://192.168.7.35/",
                success: checkForAuth,
                error: checkForAuth,
                timeout: 3000,
                crossDomain: true
            });
        }
    });
});
