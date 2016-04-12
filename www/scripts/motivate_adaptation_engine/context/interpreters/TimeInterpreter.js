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
                //trovis time in format hh:mm
                var t_time = values[0].time;
                var d = new Date();
                //device time in format hh:mm
                var d_time = d.getHours()+":"+d.getMinutes()

                //compare date and device time
                //Sommer-/Winderzeit!!!

                if (d_time == t_time){
                    callback({0: "true"});
                } else {
                    callback({0: "false"});
                }
            }
        });
    })();
});
