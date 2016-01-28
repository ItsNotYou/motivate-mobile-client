/**
 * Created by Kristin on 12.01.2016.
 */

define(['contactJS', './InterpreterCreator'], function (contactJS, creator) {
    var CONSTRAINT_NTP_UPDATE = "ntp update only with internet connectivity";

    return (function() {
        return creator.extend("NtpRequiredInterpreter", {
            description : {
                in: [
                    {
                        // ExpectedDevicesWidget
                        'name': 'CI_CONSTRAINTS',
                        'type': 'ARRAY_OF_STRING',
                        'parameterList': [["CP_UNIT", "STRING", "EXPECTED_CONSTRAINTS"]]
                    }
                ],
                out: [
                    {
                        'name': 'CI_NTP_REQUIRED',
                        'type': 'BOOLEAN'
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var required = values[0].contains(CONSTRAINT_NTP_UPDATE);
                var result = required ? "true" : "false";

                callback({0: result});
            }
        });
    })();
});
