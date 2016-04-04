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
                        'name': 'CI_AVAILABLE_TROVIS',
                        'type': 'BOOLEAN',
                        'parameterList': [["CP_DEVICE", "STRING", "TROVIS_CONNECTED"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var connection = values[0];
                console.log("Tini: Trovis_Values" + connection);

                if (connection === "false" || connection === undefined){
                    callback({0: "false"});
                } else {
                    callback({0: "true"});
                }
            }
        });
    })();
});

