/**
 * Created by Kristin on 16.01.2016.
 */
define(['contactJS', './InterpreterCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("ThermoFinderInterpreter", {
            description: {
                in: [
                    {
                        //ScanWidget
                        'name': 'CI_DEVICES',
                        'type': 'ARRAY_OF_STRING',
                        'parameterList': [["CP_UNIT", "STRING", "AVAILABLE_DEVICES"]]
                    },
                    {
                        //ExpectedDevicesWidget
                        'name': 'CI_DEVICES',
                        'type': 'ARRAY_OF_STRING',
                        'parameterList': [["CP_UNIT", "STRING", "EXPECTED_DEVICES"]]
                    }
                ],
                out: [
                    {
                        'name': 'CI_AVAILABLE_DEVICE',
                        'type': 'BOOLEAN',
                        'parameterList': [["CP_DEVICE", "STRING", "CONTROLLER"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var result = "false";

                //tests if any scanned device is expected device
                for (var scanIndex in values[0]){
                    var scan_dev = values[0][scanIndex];

                    for (var expIndex in values[1]){
                        var exp_dev = values[1][expIndex];

                        if (scan_dev === exp_dev){

                            //tests if searched Thermostat
                            //thermostatname still dummy
                            if (scan_dev === 'ThermoGod_30B'){
                                result = "true";
                            }
                        }
                    }
                }
                callback({0: result});
            }
        });
    })();
});
