define(['contactJS', 'jquery', './WidgetCreator'], function(contactJS, $, WidgetCreator) {
    return WidgetCreator.extend("DeviceOsWidget", {
        description: {
            out: [
                {
                    'name': 'CI_AVAILABLE_DEVICE',
                    'type': 'BOOLEAN',
                    'parameterList': [["CP_DEVICE", "STRING", "TROVIS_5573"]]
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
                url: "http://91.64.29.199:3482/",
                success: checkForAuth,
                error: checkForAuth,
                timeout: 3000,
                crossDomain: true
            });
        }
    });
});
