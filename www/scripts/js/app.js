// Ionic Starter App

var adaptationEngine;
var learningUnitState = {};

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cards', {
        url: '/',
        templateUrl: 'cards.html',
        controller: "CardStreamController"
      })
      .state('content', {
        url: '/content',
        templateUrl: 'content.html',
        controller: "ContentController"
      });

    $urlRouterProvider.otherwise("/");
  })

  .service('scenarioService', function () {
    var scenario = {};
    var currentUnitIndex = 0;

    var getUnits = function () {
      return scenario._units;
    };

    var getCurrentUnit = function () {
      return scenario._units[currentUnitIndex];
    };

    var getUnitByIndex = function (index) {
      return scenario._units[index];
    };

    var getUnitByUUID = function(uuid) {
        for(var i = 0; i < scenario._units.length; i++) {
          if (scenario._units[i]._uuid == uuid) return scenario._units[i];
        }
        return null;
    };

    var setCurrentUnitIndex = function (index) {
      currentUnitIndex = index
    };

    var setScenario = function (newScenario) {
      scenario = newScenario;
    };

    return {
      getUnits: getUnits,
      setScenario: setScenario,
      getCurrentUnit: getCurrentUnit,
      getUnitByIndex: getUnitByIndex,
      getUnitByUUID: getUnitByUUID,
      setCurrentUnitIndex: setCurrentUnitIndex
    };
  })

  .controller('ContentController', ["$scope", "scenarioService", function ($scope, scenarioService) {
    $scope.scenarioService = scenarioService;
    $scope.currentCard = scenarioService.getCurrentUnit();

    adaptationEngine.addContextInformation({
      name: "CI_CURRENT_LEARNING_UNIT",
      type: "STRING",
      parameterList: [],
      value: $scope.currentCard._uuid
    }, false);

    adaptationEngine.addContextInformation({
      name: "CI_FINISHED_LEARNING_UNIT",
      type: "STRING",
      parameterList: [],
      value: $scope.currentCard._uuid
    }, true);

    learningUnitState[$scope.currentCard._uuid].new = false;
  }])

  .directive('cardContent', function () {
    return {
      link: function link(scope, element, attrs) {
        var inputjson = scope.currentCard._gui;
        var grids = inputjson.grids;

        element.html('');
        element.data('ratioheight', inputjson.ratioHeight);
        element.data('ratiowidth', inputjson.ratioWidth);

        for (i = 0; i < grids.length; i++) {
          element.append('<div class="gridelement" id="' + grids[i].id + '">');
          $('#' + grids[i].id).css('width', grids[i].width + '%');
          $('#' + grids[i].id).css('height', grids[i].height + '%');
          $('#' + grids[i].id).css('top', grids[i].y + '%');
          $('#' + grids[i].id).css('left', grids[i].x + '%');

          var containsmedia = grids[i].containsMedia;

          if ((containsmedia == 'preview') || (containsmedia == 'yes')) {
            var media = grids[i].media;
            var mediatype = media.mediatype;
            $('#' + grids[i].id).html('<div id="' + media.id + '" class="mediaelement" style="">');
            $('#' + media.id).data('mediavalue', mediatype);

            if (containsmedia == 'yes') {
              if (mediatype == "picture") {
                var src = './media/' + media.source;
                var fit = 'style="object-fit:' + media.properties.fit + ';"';
                $('#' + media.id).html('<img class="pictureelement"' + fit + 'src=' + src + ' ></div>');
              }


              if (mediatype == "video") {
                var controls = '';
                var autoplay = '';
                var loop = '';
                var muted = '';
                var fit = 'style="object-fit:' + media.properties.fit + ';"';
                var src = './media/' + media.source;
                if (media.properties.autoplay) {
                  autoplay = ' autoplay ';
                }
                if (media.properties.controls) {
                  controls = ' controls ';
                }
                if (media.properties.muted) {
                  muted = ' muted ';
                }
                if (media.properties.loop) {
                  loop = ' loop ';
                }
                $('#' + media.id).html('<video class="videoelement"' + autoplay + controls + muted + loop + fit + '><source src="' + src + '">Your browser does not support the video tag.</video><div class="infobarmedia"></div>');
              }

              if (mediatype == "sound") {
                var controls = '';
                var autoplay = '';
                var loop = '';
                var muted = '';
                var src = './media/' + media.source;
                if (media.properties.autoplay) {
                  autoplay = ' autoplay ';
                }
                if (media.properties.controls) {
                  controls = ' controls ';
                }
                if (media.properties.muted) {
                  muted = ' muted ';
                }
                if (media.properties.loop) {
                  loop = ' loop ';
                }
                $('#' + media.id).html('<audio class="soundelement"' + autoplay + controls + muted + loop + '><source src="' + src + '">Your browser does not support the audio tag.</audio><div class="infobarmedia"></div>');
              }

              if (mediatype == "text") {
                $('#' + media.id).html('<div class="textmediaoutput">' + media.content + '</div>');
              }
            }
          }
        }

        // correct css for display
        $(element).css({"left": 0, "top": 0, "width": "auto", "height": window.innerHeight - 64});
        $(element).show();
      }
    }
  })

  .controller('CardStreamController', ["$scope", "scenarioService", function ($scope, scenarioService) {
    $scope.scenarioService = scenarioService;

    $.ajax({
      url: "state.json",
      dataType: "json",
      async: false,
      success: function(json) {
        learningUnitState = json;
      }
    });

    $.ajax({
      url: "content.json",
      dataType: "json",
      async: false,
      success: function (json) {
        var scenario = json._scenarioList[0];
        scenario._units.forEach(function (theUnit) {
          json._guis.forEach(function (theGUI) {
            if (theUnit._uuid == theGUI.unitid) theUnit._gui = theGUI;
          });

          // update learning unit state
          if (typeof learningUnitState[theUnit._uuid] == "undefined") {
            learningUnitState[theUnit._uuid] = {
              "new": true,
              "hide": true
            }
          }
          theUnit._state = learningUnitState[theUnit._uuid];
        });
        scenarioService.setScenario(scenario);
      },
      error: function (jqXHR, textStatus) {
        console.log(textStatus);
      }
    });

    require(['scripts/config'], function () {
      require(['nools', 'node-rules', 'MoRE', 'MoAE', 'contactJS'], function (nools, NodeRuleEngine, RuleEngine, AdaptationEngine, contactJS) {
        $.ajax({
          url: "nodeRules.js",
          dataType: "script",
          success: function (rules) {
            adaptationEngine = new AdaptationEngine(rules, true);
            adaptationEngine.setRestrictFeatureCallback(function (feature, contextInformation) {
              console.log("<restrict feature='" + feature + "'>");
              for (var index in contextInformation) {
                console.log(contextInformation[index]);
              }
              console.log("</restrict>");
            });
            adaptationEngine.setSelectLearningUnitCallback(function (id, contextInformation) {
              console.log("<select id='" + id + "'>");
              for (var index in contextInformation) {
                console.log(contextInformation[index]);
              }
              console.log("</select>");

              learningUnitState[id].hide = false;
              $scope.$apply();
            });
            adaptationEngine.setPreloadLearningUnitCallback(function (id, contextInformation) {
              console.log("<preload id='" + id + "'>");
              for (var index in contextInformation) {
                console.log(contextInformation[index]);
              }
              console.log("</preload>");
            });
            adaptationEngine.setNewContextInformationCallback(function (contextInformation) {
              console.log("<newcontextinformation>");
              for (var index in contextInformation) {
                console.log(contextInformation[index]);
              }
              console.log("</newcontextinformation>");
            });

            adaptationEngine.startRuleMatching(5000);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        })
      });
    });

    /**
     *
     */
    $scope.fireFirstAction = function () {
      console.log("Fire Action 1!");

      adaptationEngine.addContextInformation({
        name: "CI_USER_AGE",
        type: "INTEGER",
        parameterList: [],
        value: 32
      }, false);
    };

    /**
     *
     */
    $scope.fireSecondAction = function () {
      console.log("Fire Action 2!");
    };

    /**
     *
     */
    $scope.fireThirdAction = function () {
      console.log("Fire Action 3!");
    };
  }]);
