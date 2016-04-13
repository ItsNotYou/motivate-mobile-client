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
                var date = new Date();
                //device time in format hh:mm
                var m_time = date.getHours()+":"+date.getMinutes();

                var m1_time = date.getHours()+":"+(date.getMinutes()-2);
                var m2_time = date.getHours()+":"+(date.getMinutes()+2);

                var hours = t_time.getHours();
                var minutes = t_time.getMinutes();

                //alert(m1_time + ", " + m2_time + "\n" + hours + ", " + minutes);
                alert(m2_time);

                //Sommer-/Winterzeit!!!

                if (t_time == m_time){
                    callback({0: "true"});
                } else {
                    callback({0: "false"});
                }
            }
        });
    })();
});
