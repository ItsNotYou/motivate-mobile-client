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
                        'parameterList': [["CP_DEVICE", "STRING", "TROVIS"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                // We allow a derivation of +/- 2 minutes
                var allowedDelta = 2*60*1000;

                //data from TrovisConnectedWidget
                var time = values[0].time;
                var date = values[0].date;
                var year = values[0].year;

               //split data to day, month, hours, minutes
                var split_day = date.split(".");
                var day = split_day[0];
                var month = split_day[1];

                var split_time = time.split(":");
                var hours = split_time[0];
                var minutes = split_time[1];

                //make trovis values to type "date" and convert into milliseconds
                var trovis_date = new Date(year, month-1, day, hours, minutes, "00");
                var t = trovis_date.getTime();

                //get time from mobile phone, convert into milliseconds and generate range
                var mobile_date = new Date();
                var m1 = mobile_date.getTime() - allowedDelta;
                var m2 = mobile_date.getTime() + allowedDelta;


                if (isNaN(t)) {
                    // Trovis not connected
                    callback({0: undefined});
                } else if ((m1 <= t) && (t <= m2)) {
                    // Trovis' time between mobile time (+/- 2 minutes)
                    callback({0: "true"});
                } else {
                    // Trovis' time is off
                    callback({0: "false"});
                }
            }
        });
    })();
});
