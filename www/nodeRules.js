var _contactJS = require("contactJS");
var _d = new _contactJS.Discoverer();

var _rules = [
	{
		"id": "4492c1cc-88e8-4b35-a91e-3900abe36c61",
		"relatedContextInformation": [
],
		"condition": function(R) {
			R.when(true);
		},
		"consequence": function(R) {
			if (typeof window["ruleEngine"]._callbacks["selectLearningUnitCallback"] != "undefined") {
		window["ruleEngine"]._callbacks["selectLearningUnitCallback"]("unitbe68ef81-b468-4fb5-a2e8-385d7580326a", null);
	}
			R.next();
		}
	},
	{
		"id": "3307d9e9-0a87-4c1b-8b31-21031c0e2bea",
		"relatedContextInformation": [
_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_FINISHED_LEARNING_UNIT", type: "STRING", parameterList: []}),
],
		"condition": function(R) {
			R.when((this.fulfils(_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_FINISHED_LEARNING_UNIT", type: "STRING", parameterList: []}), "==", "unitbe68ef81-b468-4fb5-a2e8-385d7580326a")));
		},
		"consequence": function(R) {
			if (typeof window["ruleEngine"]._callbacks["selectLearningUnitCallback"] != "undefined") {
		window["ruleEngine"]._callbacks["selectLearningUnitCallback"]("unit9230ce50-308a-4531-88e9-43b26f1d72ae", null);
	}
			R.next();
		}
	},
	{
		"id": "de7fa6dd-0c5a-4774-939b-8ea174270add",
		"relatedContextInformation": [
_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_CURRENT_LEARNING_UNIT", type: "STRING", parameterList: []}),
],
		"condition": function(R) {
			R.when((this.fulfils(_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_CURRENT_LEARNING_UNIT", type: "STRING", parameterList: []}), "==", "unit9230ce50-308a-4531-88e9-43b26f1d72ae")));
		},
		"consequence": function(R) {
			if (typeof window["ruleEngine"]._callbacks["preloadLearningUnitCallback"] != "undefined") {
		window["ruleEngine"]._callbacks["preloadLearningUnitCallback"]("unitbe68ef81-b468-4fb5-a2e8-385d7580326a", null);
	}
			R.next();
		}
	},
	{
		"id": "bd6d4421-3ce6-4933-8cb0-dea848f9c7b7",
		"relatedContextInformation": [
_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_FINISHED_LEARNING_UNIT", type: "STRING", parameterList: []}),
_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_USER_AGE", type: "INTEGER", parameterList: []}),
],
		"condition": function(R) {
			R.when((this.fulfils(_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_FINISHED_LEARNING_UNIT", type: "STRING", parameterList: []}), "==", "unitbe68ef81-b468-4fb5-a2e8-385d7580326a")) && (this.fulfils(_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_USER_AGE", type: "INTEGER", parameterList: []}), ">", "22")));
		},
		"consequence": function(R) {
			if (typeof window["ruleEngine"]._callbacks["selectLearningUnitCallback"] != "undefined") {
		window["ruleEngine"]._callbacks["selectLearningUnitCallback"]("unit10ccc4db-c7d5-492e-b68d-689e1f68f61d", null);
	}
			R.next();
		}
	},
	{
		"id": "a8bb1344-1ea5-4f0d-86bc-6a1a351b3ac0",
		"relatedContextInformation": [
_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_CURRENT_LEARNING_UNIT", type: "STRING", parameterList: []}),
],
		"condition": function(R) {
			R.when((this.fulfils(_contactJS.ContextInformation.fromContextInformationDescription(_d, {name: "CI_CURRENT_LEARNING_UNIT", type: "STRING", parameterList: []}), "==", "unit10ccc4db-c7d5-492e-b68d-689e1f68f61d")));
		},
		"consequence": function(R) {
			if (typeof window["ruleEngine"]._callbacks["preloadLearningUnitCallback"] != "undefined") {
		window["ruleEngine"]._callbacks["preloadLearningUnitCallback"]("unitbe68ef81-b468-4fb5-a2e8-385d7580326a", null);
	}
			R.next();
		}
	}
];