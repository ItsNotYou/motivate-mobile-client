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
                        'parameterList': [["CP_DEVICE", "STRING", "TROVIS_DATA"]] // TODO: CP_DEVICE statt CP_UNIT
                    }
                ],
                out: [
                    {
                        // TODO: Kontextdaten an Trovis5573FinderWidget anpassen
                        'name': 'CI_AVAILABLE_TROVIS',
                        'type': 'BOOLEAN',
                        'parameterList': [["CP_DEVICE", "STRING", "TROVIS_CONNECTED"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var connection = values[0].connected;
                console.log("Tini: Connection: " + connection);

                if (connection === "false" || connection === undefined){
                    callback({0: "false"});
                } else {
                    callback({0: "true"});
                }
            }
        });
    })();
});

