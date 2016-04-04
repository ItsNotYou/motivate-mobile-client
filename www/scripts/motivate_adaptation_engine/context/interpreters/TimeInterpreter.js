/**
 * Created by Kristin on 04.04.2016.
 */

define(['contactJS', './InterpreterCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("TrovisConnectedInterpreter", {
            description: {
                in: [
                    {
                        //TrovisConnectedWidget
                        'name': 'CI_DEVICE_DATA',
                        'type': 'OBJECT',
                        'parameterList': [["CP_UNIT", "STRING", "TROVIS_DATA"]]
                    }
                ],
                out: [
                    {
                        'name': 'CI_TIME',
                        'type': 'BOOLEAN',
                        'parameterList': [["CP_DEVICE", "STRING", "TIME_CORRECT"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var trovis_time = values[0];
                var date = new Date();
                var device_time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digite'}).replace(/(:\d{2}| [AP]M)$/, "");

                console.log("Tini: Trovis Zeit - "+ trovis_time);
                console.log("Tini: Datum - " + date);
                console.log("Tini: Mobile Zeit -" + device_time);

                if (trovis_time === device_time){
                    callback({0: "true"});
                } else {
                    callback({0: "false"});
                }
            }
        });
    })();
});


