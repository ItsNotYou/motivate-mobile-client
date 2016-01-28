/**
 * Created by Kristin on 25.01.2016.
 */
define(['contactJS', './WidgetCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("WifiEnabledWidget", {
            description : {
                out: [
                    {
                        'name': 'CI_WIFI_ENABLED',
                        'type': 'BOOLEAN',
                        'parameterList': [["CP_UNIT", "STRING", "WIFI_ENABLED"]]
                    }
                ],
                updateInterval: 5000
            },
            simpleQueryGenerator: function(callback) {
                var result = "false";
                WifiWizard.isWifiEnabled(function(result){});
                //console.log("Tini: "+result);
                callback({0: result});
            }
        });
    })();
});
