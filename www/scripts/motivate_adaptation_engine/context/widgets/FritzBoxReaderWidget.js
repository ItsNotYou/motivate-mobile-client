define(['contactJS', 'jquery', './WidgetCreator', 'urijs/URI'], function (contactJS, $, WidgetCreator, URI) {
    var ROUTER_URL = "http://192.168.7.1/logincheck.lua";
    var WLAN_PAGE_URL_START = "/wlan/wlan_settings.lua";

    // Ablauf:
    // 1. URI laden
    // 2. Filter anwenden
    // 3. Neue URI konstruieren
    // 4. Ablauf neu starten
    var crawlPage = function(startUri, callbacks, error) {
        var currentUri = new URI(startUri);
        var currentCallbackIndex = 0;

        var getNextUri = function(currentPageHtml) {
            var currentCallback = callbacks[currentCallbackIndex];
            var nextRelativeUri = currentCallback(currentPageHtml);

            if (nextRelativeUri) {
                currentUri = new URI(nextRelativeUri).absoluteTo(currentUri);
                currentCallbackIndex++;
                loadUri();
            }
        };

        var loadUri = function() {
            $.ajax({
                url: currentUri.toString(),
                success: getNextUri,
                error: error,
                crossDomain: true
            });
        };

        loadUri();
    };

    var readStartPage = function(success, error) {
        var callbacks = [function(startPage) {
            var linkSelector = "a[href^='" + WLAN_PAGE_URL_START + "']";
            return $(linkSelector, startPage).attr("href");
        }, function(wlanPage) {
            var linkSelector = "input#uiView_SSID";
            var wlanSSID = $(linkSelector, wlanPage).attr("value");
            success(wlanSSID);
        }];

        crawlPage(ROUTER_URL, callbacks, error);
    };

    return WidgetCreator.extend("RouterFinderWidget", {
        description: {
            out: [
                {
                    "name": "CI_WLAN_SSID",
                    "type": "STRING",
                    "parameterList": [["CP_UNIT", "STRING", "WLAN_SSID"]]
                }
            ],
            updateInterval: 10000
        },
        simpleQueryGenerator: function(callback) {
            var success = function(wlanSSID) {
                callback({0: wlanSSID});
                console.log("Hendrik", "WLAN SSID sent", wlanSSID);
            };
            var error = function() {
                console.log(arguments);
            };
            readStartPage(success, error);
        }
    });
});
