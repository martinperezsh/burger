var connection = require('./connection.js');

function printQuestionMarks(num){
	var arr = [];

	for (var i=0; i<num; i++){
		arr.push('?')
	}

	return arr.toString();
}

function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (Object.hasOwnProperty.call(ob, key)) {
				arr.push(key + "=" + ob[key]);
		}
	}
	
	return arr.toString();
}

var orm = {
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";";

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},
	insertOne: function(table, column, value, cb){
		var queryString = 'INSERT ' + table;

		queryString+= ' (';
    	queryString+= column.toString();
    	queryString+= ') ';
    	queryString+= 'VALUES (';
    	queryString+= printQuestionMarks(value.length);
    	queryString+= ') ';

    	connection.query(queryString, value, function(error, result) {
    		if (error) {
    			throw error;
    		}

    		cb(result);
    	});

	},
	updateOne: function (table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString+= ' SET ';
		queryString+= objToSql(objColVals);
		queryString+= ' WHERE ';
		queryString+= condition;

		connection.query(queryString, function (error, result) {
			if (error) {
				throw error;
			}

			cb(result);
		});
	}

};

module.exports = orm;