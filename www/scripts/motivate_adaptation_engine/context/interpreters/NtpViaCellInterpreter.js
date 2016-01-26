/**
 * Created by Kristin on 12.01.2016.
 */

define(['contactJS', './InterpreterCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("NtpViaCellInterpreter", {
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
                        'parameterList': [["CP_CONNECTION_TYPE", "STRING", "CONNECTION_CELL"]]
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var result = false;

                var host = values[0].host;
                var connection = values[0].connection;
                var available = values[0].available;

                //console.log("TINI: connection - " + connection);

                if (connection === 'cell' && available === true){
                    result = true;
                }else if (connection === ('unknown') || available === undefined){
                    result = undefined;
                }else {
                    result = false;
                }
                //console.log("TINI_Cell: "+result);
                callback({0: result});
            }
        });
    })();
});
/**
 * Created by Kristin on 12.01.2016.
 */
