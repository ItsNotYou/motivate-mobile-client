define(['contactJS', './WidgetCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("ExpectedDevicesWidget", {
            description : {
                out: [
                    {
                        'name': 'CI_DEVICES',
                        'type': 'ARRAY_OF_STRING',
                        'parameterList': [["CP_UNIT", "STRING", "EXPECTED_DEVICES"]]
                    }
                ],
                updateInterval: 5000
            },
            simpleQueryGenerator: function(callback) {
                // TODO dummy values, still requires feedback from equeo
                callback({0:["Fritzbox_3635","ThermoGod_30B"]});
            }
        });
    })();
});