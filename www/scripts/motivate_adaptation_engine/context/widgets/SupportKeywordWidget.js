/**
 * Created by Kristin on 12.01.2016.
 */

define(['contactJS', './WidgetCreator'], function (contactJS, creator) {
    return (function() {
        return creator.extend("SupportKeywordWidget", {
            description : {
                out: [
                    {
                        'name': 'CI_SUPPORT_KEYWORD',
                        'type': 'STRING'
                    }
                ],
                updateInterval: 20000
            },
            simpleQueryGenerator: function(callback) {
                callback({0:['zeit']});
                //bekommen wir von equeo geliefert (data_object)
            }
        });
    })();
});
