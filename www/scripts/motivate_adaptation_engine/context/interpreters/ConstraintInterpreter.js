/**
 * Created by Kristin on 12.01.2016.
 */

define(['contactJS', './InterpreterCreator'], function (contactJS, creator) {
    var CONSTRAINT_NTP_UPDATE = "ntp update only with internet connectivity";
    var CONSTRAINT_INTERNET_CONNECTIVITY = "internet connectivity only with dsl cable";

    var constraintsMap = {
        "FritzBox_3635": [CONSTRAINT_INTERNET_CONNECTIVITY],
        "ThermoGod_30B": [CONSTRAINT_NTP_UPDATE]
    };

    return (function() {
        return creator.extend("ConstraintInterpreter", {
            description : {
                in: [
                    {
                        // ExpectedDevicesWidget
                        'name': 'CI_DEVICES',
                        'type': 'ARRAY_OF_STRING',
                        'parameterList': [["CP_UNIT", "STRING", "EXPECTED_DEVICES"]]
                    }
                ],
                out: [
                    {
                        'name': 'CI_CONSTRAINTS',
                        'type': 'ARRAY_OF_STRING',
                        'parameterList': [["CP_UNIT", "STRING", "EXPECTED_CONSTRAINTS"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var result = [];

                for (var index in values) {
                    // Check whether there are constraints for this device
                    var deviceName = values[index];
                    var constraints = constraintsMap[deviceName];
                    if (constraints) {
                        // Add found constraints to result array
                        for (var constraintIndex in constraints) {
                            result.push(constraints[constraintIndex]);
                        }
                    }
                }

                callback({0: result});
            }
        });
    })();
});
