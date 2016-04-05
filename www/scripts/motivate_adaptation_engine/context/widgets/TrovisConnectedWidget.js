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
            var login = "Basic " + btoa("admin:admin");

            var checkConnected = function(data) {
                alert("Daten korrekt bekommen");
                //data ist der parameter der den inhalt der html seite durch ajax übergeben bekommt

                // TODO: Daten abrufen anstatt zu setzen
                var connected = $("tr:first-child td:nth-child(2)", data).html();
                //console.log("Tini: html-Data - " + connected);

                if (connected === "NA"){
                    callback({0: "false"});
                }else {//if (connected != "NA"){
                    callback({0: connected});
                //}else {
                //    callback({0: undefined});
                }

            };

            var error = function (xhr, ajaxOptions, thrownError) {
                alert("Uiuiui Fehler");
            };


            $.ajax({
                url: "http://192.168.7.35/",
                headers: {Authorization:login},
                success: checkConnected,
                error: error,
                timeout: 3000,
                crossDomain: true
            });
        }
    });
});
