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

            $.ajax({
                url: "http://192.168.178.35/",
                headers: {'Authorization':'login'},
                success: checkConnected,
                error: error,
                timeout: 3000,
                crossDomain: true
            });

            var checkConnected = function(data) {
                //data ist der parameter der den inhalt der html seite durch ajax übergeben bekommt

                // TODO: Daten abrufen anstatt zu setzen
                var connected = $("tr:first-child td:nth-child(2)").html(data);
                //console.log("Tini: html-Data - " + connected);

                if (connected === "NA"){
                    callback({0: "false"});
                }else {//if (connected != "NA"){
                    callback({0: connected});
                //}else {
                //    callback({0: undefined});
                }

            };

            var error = function(e, x, settings, exception) {
                var message;
                var statusErrorMap = {
                    '400' : "Server understood the request, but request content was invalid.",
                    '401' : "Unauthorized access.",
                    '403' : "Forbidden resource can't be accessed.",
                    '500' : "Internal server error.",
                    '503' : "Service unavailable."
                };
                if (x.status) {
                    message =statusErrorMap[x.status];
                    if(!message){
                        message="Unknown Error \n.";
                    }
                }else if(exception=='parsererror'){
                    message="Error.\nParsing JSON Request failed.";
                }else if(exception=='timeout'){
                    message="Request Time out.";
                }else if(exception=='abort'){
                    message="Request was aborted by the server";
                }else {
                    message="Unknown Error \n.";
                }
                $(this).css("display","inline");
                $(this).html(message);
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
