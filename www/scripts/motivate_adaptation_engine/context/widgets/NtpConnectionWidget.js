define(['contactJS', './WidgetCreator'], function (contactJS, WidgetCreator) {
    var ntpHost = "times.tubit.tu-berlin.de";

    function getConnectedNetwork() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'unknown';
        states[Connection.ETHERNET] = 'ethernet';
        states[Connection.WIFI]     = 'wifi';
        states[Connection.CELL_2G]  = 'cell';
        states[Connection.CELL_3G]  = 'cell';
        states[Connection.CELL_4G]  = 'cell';
        states[Connection.CELL]     = 'cell';
        states[Connection.NONE]     = 'none';

        return states[networkState];
    }

    return WidgetCreator.extend("NtpConnectionWidget", {
        description: {
            out: [
                {
                    "name": "CI_NTP_SERVER",
                    "type": "OBJECT",
                    "parameterList": [["CP_UNIT", "STRING", "AVAILABLE_NTP"]]
                }
            ],
            updateInterval: 5000
        },
        simpleQueryGenerator: function(callback) {
            var publishResult = function(result) {
                var isAvailable = result !== undefined ? result === 0 : undefined;

                callback({0: {
                    host: ntpHost,
                    connection: getConnectedNetwork(),
                    available: isAvailable
                }})
            };

            ntp.analyzer.diagnose({host: ntpHost, timeout: 3000}, function(result) {
                console.log("Hendrik: NtpAnalyzer said " + result);
                publishResult(result);
            }, function(error) {
                console.log("Hendrik: Error " + error);
                publishResult(undefined);
            });
        }
    });
});
