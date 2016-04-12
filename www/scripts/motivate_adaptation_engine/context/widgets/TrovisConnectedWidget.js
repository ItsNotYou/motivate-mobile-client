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
                var time = "NA";
                if (error) {
                    //alert("Tini: Login failed!");
                    // It seems we don't have any response. Slow Pi or no Pi?
                    connected = undefined;
                } else {
                    // We have some data to process
                    //time = $.trim($("timeSelector", data).html());
                    time = $.trim($(timeSelector, data).html());

                    //alert("Tini: Login succeeded!\n" + "Zeit: " + time);
                    // If we don't have a time we are not connected
                    connected = time === "NA" ? "false" : "true";
                }

                callback({0: {
                    host: host,
                    data: data,
                    time: time,
                    connected: connected
                }});
            };

            $.ajax({
                url: host,
                headers: {"Authorization":login},
                timeout: 10000,
                crossDomain: true,
                success: function(data) { publishResult(data, false); },
                error: function() { publishResult(undefined, true); }
            });
        }
    });
});
