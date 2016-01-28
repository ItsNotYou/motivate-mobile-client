define(['contactJS', './WidgetCreator', 'jquery'], function (contactJS, creator, $) {
    return (function() {
        return creator.extend("ScanWidget", {
            description : {
                out: [
                    {
                        'name': 'CI_DEVICES',
                        'type': 'ARRAY_OF_STRING',
                        'parameterList': [["CP_UNIT", "STRING", "AVAILABLE_DEVICES"]]
                    }
                ],
                updateInterval: 5000
            },
            simpleQueryGenerator: function(callback) {
                var foundDevice = function() {
                    callback({});
                };
                var missingDevice = function(a, b, c, d, e) {
                    if (c === "Unauthorized") {
                        callback({0: ["ThermoGod_30B"]});
                    } else {
                        callback({});
                    }
                };

                $.ajax({
                    url: "http://91.64.29.199:3482/",
                    success: foundDevice,
                    error: missingDevice
                });

                /*
                var success = function(devices) {
                    var result = [];
                    for (var index in devices) {
                        result.push(devices[index].SSID);
                    }
                    callback({0: result});
                };

                var error = function() {
                    callback({});
                };

                WifiWizard.startScan(function() {
                    WifiWizard.getScanResults({
                        numLevels: true
                    }, success, error)
                }, error);
                */
            }
        });
    })();
});