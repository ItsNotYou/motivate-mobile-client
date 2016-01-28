/**
 * Created by Kristin on 16.01.2016.
 */
define(['contactJS', './InterpreterCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("NtpViaWifiInterpreter", {
            description : {
                in: [
                    {
                        //NtpConnectionWidget
                        'name': 'CI_NTP_SERVER',
                        'type': 'OBJECT',
                        'parameterList': [["CP_UNIT", "STRING", "AVAILABLE_NTP"]]
                    }
                ],
                out: [
                    {
                        'name':'CI_AVAILABLE_NTP',
                        'type':'BOOLEAN',
                        'parameterList': [["CP_CONNECTION_TYPE", "ENUM", "CONNECTION_WIFI"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var result = "false";

                var host = values[0].host;
                var connection = values[0].connection;
                var available = values[0].available;

                //console.log("TINI: connection - " + connection);

                if (connection === 'wifi' && available === true){
                    result = "true";
                }else if (connection !== 'wifi' && available === true){
                    result = "false";
                }else {
                    result = undefined;
                }
                //console.log("TINI_Wifi: "+result);
                callback({0: result});
            }
        });
    })();
});
