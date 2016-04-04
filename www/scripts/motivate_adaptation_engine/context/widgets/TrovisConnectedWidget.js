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
            var login = "Basic "+bota("admin:admin");

            var checkConnected = function(data) {
                //data ist der parameter der den inhalt der html seite durch ajax übergeben bekommt

                var connected = $("tr:first-child td:nth-child(2)").html(data);
                console.log("Tini: html-Data - " + connected);

                if (connected === "NA"){
                    callback({0: "false"});
                }else {
                    callback({0: connected});
                }

            };

            var error = function(x,y,z) {
                callback({0: undefined});
            }


            $.ajax({
                url: "http://192.168.178.35/",
                headers: {Authorization:login},
                success: checkConnected,
                error: error,
                timeout: 3000,
                crossDomain: true
            });
        }
    });
});
