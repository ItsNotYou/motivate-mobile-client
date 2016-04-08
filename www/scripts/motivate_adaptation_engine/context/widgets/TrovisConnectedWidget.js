/**
 * Created by Kristin on 04.04.2016.
 */

define(['contactJS', 'jquery', './WidgetCreator'], function(contactJS, $, WidgetCreator) {
    return WidgetCreator.extend("TrovisConnectedWidget", {
        description: {
            out: [
                {
                    'name': 'CI_DEVICE_DATA',
                    'type': 'OBJECT',
                    'parameterList': [["CP_DEVICE", "STRING", "TROVIS_DATA"]]
                }
            ],
            updateInterval: 10000
        },
        simpleQueryGenerator: function(callback) {
            var host = "http://192.168.7.35/";
            var login = "Basic " + btoa("admin:admin");
            var timeSelector = "tr:first-child td:nth-child(2)";

            var publishResult = function(data, error) {
                var connected = "true";
                if (error) {
                    // It seems we can't reach the Raspberry Pi
                    connected = undefined;
                } else {
                    // We have some data to process
                    var time = $.trim($(timeSelector, data).html());
                    // If we don't have a time we are not connected
                    connected = time === "NA" ? "false" : "true";
                }

                callback({0: {
                    host: host,
                    data: data,
                    connected: connected
                }});
            };

            $.ajax({
                url: host,
                headers: {Authorization:login},
                timeout: 45000,
                crossDomain: true,
                success: function(data) { publishResult(data, false); },
                error: function() { publishResult(undefined, true); }
            });
        }
    });
});
