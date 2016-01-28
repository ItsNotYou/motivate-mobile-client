define(['contactJS'], function(contactJS) {

    var getInputData = function(inContextInformation) {
        var result = [];

        var items = this.getInputContextInformation().getItems();
        for (var itemIndex in items) {
            var value = items[itemIndex];
            result.push(inContextInformation.getValueForContextInformationOfKind(value));
        }

        return result;
    };

    var setOutputData = function(values, outContextInformation) {
        var rawValues = outContextInformation.getItems();
        for (var rawValueIndex in rawValues) {
            var rawValue = rawValues[rawValueIndex];
            if (values.hasOwnProperty(rawValueIndex)) {
                var value = values[rawValueIndex];
                rawValue.setValue(value);
            } else {
                rawValue.setValueUnknown();
            }
        }
        return rawValues;
    };

    var createSimpleQueryGenerator = function(simpleQueryGenerator) {
        return function(inContextInformation, outContextInformation, callback) {
            var sendResponse = function(simplifiedResponse) {
                var result = setOutputData.call(this, simplifiedResponse, outContextInformation);
                callback(result);
            };

            var values = getInputData.call(this, inContextInformation);
            simpleQueryGenerator.call(this, values, sendResponse);
        };
    };

    var InterpreterCreator = {
        extend: function(name, properties) {
            var createdInterpreter = function(discoverer) {
                contactJS.Interpreter.call(this, discoverer);
                this._name = name;
                return this;
            };

            // Use known defaults
            createdInterpreter.prototype = Object.create(contactJS.Interpreter.prototype);
            createdInterpreter.prototype.constructor = createdInterpreter;

            // Choose queryGenerator. Use simplified version if available
            var interpretData = properties.simpleInterpretData ? createSimpleQueryGenerator(properties.simpleInterpretData) : properties._interpretData;

            // Copy properties into Widget
            createdInterpreter.description = properties.description;
            createdInterpreter.prototype._interpretData = interpretData;

            return createdInterpreter;
        }
    };

    return InterpreterCreator;
});