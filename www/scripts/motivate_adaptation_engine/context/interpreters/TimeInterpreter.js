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
                var m1 = mobile_date.getTime() - 2*60*1000; //sub 2 minutes;
                var m2 = mobile_date.getTime() + 2*60*1000; //add 2 minutes;


                // if trovis' time between mobile time (+/- 2 minutes) ...
                if ((m1 <= t) && (t <= m2)){
                    alert(m1 + "\n" + t + "\n" + m2 + "\n" +
                        "true");
                    callback({0: "true"});
                } else {
                    alert(m1 + "\n" + t + "\n" + m2 + "\n" +
                        "false");
                    callback({0: "false"});
                }
            }
        });
    })();
});
