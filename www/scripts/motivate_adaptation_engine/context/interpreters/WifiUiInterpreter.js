/**
 * Created by Kristin on 12.01.2016.
 */

define(['contactJS', './InterpreterCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("WifiUiInterpreter", {
            description : {
                in: [
                    {
                        //DeviceOsWidget
                        'name': 'CI_DEVICE_OS',
                        'type': 'OBJECT',
                        'parameterList': [["CP_UNIT", "STRING", "AVAILABLE_OS"]]
                    }
                ],
                out: [
                    {
                        'name':'CI_WIFI_UI',
                        'type':'STRING'
                    }
                ]
            },
            simpleInterpretData: function(values, callback) {
                var d = values[0];
                // Wir wollen folgende Smartphones unterstützen

                // Samsung Galaxy S4 (Tini, Hendrik)
                if (d.os === "Android" && d.version.startsWith("5.") && d.model === "GT-I9515") {
                    callback({0: "Galaxy-S4-Android-5"});
                    return;
                }

                // Samsung Galaxy S6 (Matze)
                if (d.os === "Android" && d.version.startsWith("5.1.") && d.model === "SM-G925F") {
                    callback({0: "Galaxy-S6-edge-Android-5"});
                    return;
                }

                // Galaxy Nexus (Lehrstuhl)
                if (d.os === "Android" && d.version.startsWith("4.2.") && d.model === "Galaxy Nexus") {
                    callback({0: "Galaxy-Nexus-Android-4"});
                    return;
                }

                // Wiko Jam Up (Alina)
                if (d.os === "Android" && d.version.startsWith("5.") && d.model === "RAINBOW JAM") {
                    callback({0: "Rainbow-Jam-Android-5"});
                    return;
                }

                // Unbekanntes Gerät
                callback({0: "Unknown-device"});
            }
        });
    })();
});
