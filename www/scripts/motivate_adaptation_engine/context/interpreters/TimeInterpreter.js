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
                        'parameterList': [["CP_DEVICE", "STRING", "TROVIS_DATA"]]
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
                var trovis_time = values[0].time;
                var date = new Date();
                //device time without seconds or am/pm
                //var device_time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digite'}).replace(/(:\d{2}| [AP]M)$/, "");

                //compare date and device time
                //var time_diff =
                //prüfen, ob trovis time da ist

                // TODO: Der Zeitvergleich muss mit einem gewissen Akzeptanz-Delta durchgefuehrt werden
                if (date == trovis_time){
                    callback({0: "true"});
                } else {
                    callback({0: "false"});
                }
            }
        });
    })();
});


