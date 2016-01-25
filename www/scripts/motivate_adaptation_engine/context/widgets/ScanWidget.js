define(['contactJS', './WidgetCreator'], function (contactJS, creator) {
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
            }
        });
    })();
});