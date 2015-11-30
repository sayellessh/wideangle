com.swaas.hidoctor.edetailing.dao.CoreDAO = {

	insert : function(entityClass, entity) {
		this._initializeEntity(entityClass, true);
		var query = 'INSERT INTO ' + entityClass.metadata.tableName + ' ( ';
		var columns = null;
		var params = [];
		var paramPlaceHolders = null;
		var noOfColumns = entityClass.metadata.columns.length;
		for ( var i = 0; i < noOfColumns; i++) {
			var currentName = entityClass.metadata.columns[i].name;
			if (entity[currentName] != null) {
				if (columns == null) {
					columns = '';
					paramPlaceHolders = '';
				} else {
					columns += ', ';
					paramPlaceHolders += ', ';
				}
				columns += entityClass.metadata.columns[i].columnName;
				paramPlaceHolders += '?';
				params.push(entity[currentName]);
			}
		}

		query += columns + ') VALUES (' + paramPlaceHolders + ')';
		return this._execute(query, params);

	},

	update : function(entityClass, entity) {
		this._initializeEntity(entityClass, false);

		var query = 'UPDATE ' + entityClass.metadata.tableName + ' SET ';
		var columns = null;
		var params = [];
		var noOfColumns = entityClass.metadata.columns.length;
		for ( var i = 0; i < noOfColumns; i++) {
			if (entityClass.metadata.columns[i]['pk'] == null
					|| !entityClass.metadata.columns[i].pk) {
				var currentName = entityClass.metadata.columns[i].name;
				if (entity[currentName] != null) {
					if (columns == null) {
						columns = '';
					} else {
						columns += ', ';
					}
					columns += entityClass.metadata.columns[i].columnName
							+ ' = ?';
					params.push(entity[currentName]);
				}
			}
		}
		query += columns;
		var whereClause = null;
		for ( var i = 0; i < noOfColumns; i++) {
			if (entityClass.metadata.columns[i]['pk'] != null
					&& entityClass.metadata.columns[i].pk) {
				var currentName = entityClass.metadata.columns[i].name;
				if (entity[currentName] != null) {
					if (whereClause == null) {
						whereClause = ' WHERE ';
					} else {
						whereClause += ' AND ';
					}
					whereClause += entityClass.metadata.columns[i].columnName
							+ ' = ?';
					params.push(entity[currentName]);
				}
			}
		}
		if (whereClause != null) {
			query += whereClause;
		}

		return this._execute(query, params);
	},

	remove : function(entityClass, criteria) {
		// DANGER: Passing NULL criteria or the Criteria with no element in it,
		// will remove all the records.
		// If need this has to be separated (remove and removeAll);
		this._initializeEntity(entityClass, false);
		var query = 'DELETE FROM ' + entityClass.metadata.tableName;
		var params = [];
		if (criteria != null) {
			var whereClause = null;
			var noOfColumns = entityClass.metadata.columns.length;

			for ( var i = 0; i < noOfColumns; i++) {
				var currentName = entityClass.metadata.columns[i].name;
				if (criteria[currentName] != null) {
					if (whereClause == null) {
						whereClause = ' WHERE ';
					} else {
						whereClause += ' AND ';
					}
					whereClause += entityClass.metadata.columns[i].columnName
							+ ' = ?';
					params.push(criteria[currentName]);
				}
			}
			if (whereClause != null) {
				query += whereClause;
			}
		}
		return this._execute(query, params);
	},

	updateTable : function(entityClass) {
		var _this = this;
		_this._initialize();
		this._initializeEntity(entityClass, true);
		var columns = entityClass.metadata.columns;
		var tableName = entityClass.metadata.tableName;
		$.each(columns, function(index, column) {
			var colName = column.columnName;
			console.log("Table: "+tableName+"  Column: "+colName);
			_this._connection.transaction(function(tx) {
				tx.executeSql("select "+colName+" from "+tableName+" LIMIT 1", [], querySuccess, queryFail);
			}, function errorFunction(err) {
		        console.log("Transaction failure => errorcb-->error msg "+err.error+" error code "+err.code);
		    },function successFunction() {
		        console.log("success!");
		    });

			function querySuccess(tx, results){
		        console.log("querySuccess!");
		        //console.log(JSON.stringify(results.rows));      
		    }
		    function queryFail(err){
		         console.log("Query Failure => errorcb-->error msg "+err.error+" error code "+err.code);
		        // IF queryFail reached column not found so again use executeSql() function for add new column
		        addColumn();
		    } 
		    function addColumn() {
		    	var query =  "ALTER TABLE "+tableName+" ADD COLUMN "+colName;
		    	console.log('in alter table....'+query);
		    	_this._execute(query, []);
		    }
		});
		
		/*var query = 'DROP TABLE IF EXISTS ' + tableName + ';CREATE TABLE ' + tableName + ' (';
		var appendLast = '';
		$.each(columns, function(ind, obj) {
			if(ind == 0) {
				query += obj.columnName;
			} else {
				query += ', ' + obj.columnName;
			}
			if(obj.pk) {
				appendLast += ', PRIMARY KEY(' + obj.columnName + ')';
			}
		});
		query += appendLast + ');';
		alert(query);
		_this._execute(query, []);*/
	},
	

	executeQuery : function(query, rowMapperCallback) {
		this._initialize();
		var params = [];
		var response = this._execute(query,params);
		var result = [];

		if (response != null && response.result != null
				&& response.result.rows != null) {
			
			for ( var j = 0; j < response.result.rows.length; j++) {

				var row = response.result.rows.item(j);
				var record = rowMapperCallback(row);
				result.push(record);
			}
		}

		return result;
	},

	getEquals : function(entityClass, criteria) {
		this._initializeEntity(entityClass, false);
		var query = 'SELECT ';
		var columns = null;
		var params = [];
		var noOfColumns = entityClass.metadata.columns.length;
		for ( var i = 0; i < noOfColumns; i++) {
			var currentColumnName = entityClass.metadata.columns[i].columnName;
			if (columns == null) {
				columns = '';
			} else {
				columns += ', ';
			}
			columns += currentColumnName;
		}
		query += columns;
		query += ' FROM ' + entityClass.metadata.tableName + ' ';
		if (criteria != null) {
			var whereClause = null;
			for ( var i = 0; i < noOfColumns; i++) {
				var currentName = entityClass.metadata.columns[i].name;
				if (criteria[currentName] != null) {
					if (whereClause == null) {
						whereClause = ' WHERE ';
					} else {
						whereClause += ' AND ';
					}
					whereClause += entityClass.metadata.columns[i].columnName
							+ ' = ?';
					params.push(criteria[currentName]);
				}
			}
			if (whereClause != null) {
				query += whereClause;
			}
		}
		var response = this._execute(query, params);
		var result = [];

		if (response != null && response.result != null
				&& response.result.rows != null) {

			for ( var j = 0; j < response.result.rows.length; j++) {
				var record = {};
				var row = response.result.rows.item(j);
				for ( var i = 0; i < noOfColumns; i++) {
					if (row[entityClass.metadata.columns[i].columnName] != null){
						if (entityClass.metadata.columns[i].isDate == true) {
							record[entityClass.metadata.columns[i].name] = new Date(
									row[entityClass.metadata.columns[i].columnName]);
						} else {
							record[entityClass.metadata.columns[i].name] = row[entityClass.metadata.columns[i].columnName];
						}
					}
				}
				result.push(record);
			}
		}

		return result;
	},

	getNotEquals : function(entityClass, criteria) {
		this._initializeEntity(entityClass, false);
		var query = 'SELECT ';
		var columns = null;
		var params = [];
		var noOfColumns = entityClass.metadata.columns.length;
		for ( var i = 0; i < noOfColumns; i++) {
			var currentColumnName = entityClass.metadata.columns[i].columnName;
			if (columns == null) {
				columns = '';
			} else {
				columns += ', ';
			}
			columns += currentColumnName;
		}
		query += columns;
		query += ' FROM ' + entityClass.metadata.tableName + ' ';
		if (criteria != null) {
			var whereClause = null;
			for ( var i = 0; i < noOfColumns; i++) {
				var currentName = entityClass.metadata.columns[i].name;
				if (criteria[currentName] != null) {
					if (whereClause == null) {
						whereClause = ' WHERE ';
					} else {
						whereClause += ' AND ';
					}
					whereClause += entityClass.metadata.columns[i].columnName
							+ ' != ?';
					params.push(criteria[currentName]);
				}
			}
			if (whereClause != null) {
				query += whereClause;
			}
		}

		var response = this._execute(query, params);
		var result = [];

		if (response != null && response.result != null
				&& response.result.rows != null) {

			for ( var j = 0; j < response.result.rows.length; j++) {
				var record = {};
				var row = response.result.rows.item(j);
				for ( var i = 0; i < noOfColumns; i++) {
					if (row[entityClass.metadata.columns[i].columnName] != null){
						if (entityClass.metadata.columns[i].isDate == true) {
							record[entityClass.metadata.columns[i].name] = new Date(
									row[entityClass.metadata.columns[i].columnName]);
						} else {
							record[entityClass.metadata.columns[i].name] = row[entityClass.metadata.columns[i].columnName];
						}
					}
				}
				result.push(record);
			}
		}

		return result;
	},
	
	removeNotEquals : function(entityClass, criteria) {
		// DANGER: Passing NULL criteria or the Criteria with no element in it,
		// will remove all the records.
		// If need this has to be separated (remove and removeAll);
		this._initializeEntity(entityClass, false);
		var query = 'DELETE FROM ' + entityClass.metadata.tableName;
		var params = [];
		if (criteria != null) {
			var whereClause = null;
			var noOfColumns = entityClass.metadata.columns.length;

			for ( var i = 0; i < noOfColumns; i++) {
				var currentName = entityClass.metadata.columns[i].name;
				if (criteria[currentName] != null) {
					if (whereClause == null) {
						whereClause = ' WHERE ';
					} else {
						whereClause += ' AND ';
					}
					whereClause += entityClass.metadata.columns[i].columnName
							+ ' != ?';
					params.push(criteria[currentName]);
				}
			}
			if (whereClause != null) {
				query += whereClause;
			}
		}
		return this._execute(query, params);
	},	
	
	getLike : function(entityClass, criteria) {
		this._initializeEntity(entityClass, false);
		var query = 'SELECT ';
		var columns = null;
		var params = [];
		var noOfColumns = entityClass.metadata.columns.length;
		for ( var i = 0; i < noOfColumns; i++) {
			var currentColumnName = entityClass.metadata.columns[i].columnName;
			if (columns == null) {
				columns = '';
			} else {
				columns += ', ';
			}
			columns += currentColumnName;
		}
		query += columns;
		query += ' FROM ' + entityClass.metadata.tableName + ' ';
		if (criteria != null) {
			var whereClause = null;
			for ( var i = 0; i < noOfColumns; i++) {
				var currentName = entityClass.metadata.columns[i].name;
				if (criteria[currentName] != null) {
					if (whereClause == null) {
						whereClause = ' WHERE ';
					} else {
						whereClause += ' AND ';
					}
					whereClause += entityClass.metadata.columns[i].columnName
							+ ' LIKE ? ';
					params.push('%' + criteria[currentName] + '%');
				}
			}
			if (whereClause != null) {
				query += whereClause;
			}
		}
		
		var response = this._execute(query, params);
		var result = [];

		if (response != null && response.result != null
				&& response.result.rows != null) {

			for ( var j = 0; j < response.result.rows.length; j++) {
				var record = {};
				var row = response.result.rows.item(j);
				for ( var i = 0; i < noOfColumns; i++) {
					if (row[entityClass.metadata.columns[i].columnName] != null){
						if (entityClass.metadata.columns[i].isDate == true) {
							record[entityClass.metadata.columns[i].name] = new Date(
									row[entityClass.metadata.columns[i].columnName]);
						} else {
							record[entityClass.metadata.columns[i].name] = row[entityClass.metadata.columns[i].columnName];
						}
					}
					
				}
				result.push(record);
			}
		}

		return result;
	},
	_connection : null,

	_initialize : function() {
		if (this._connection == null) {
			this._connection = window.openDatabase("EDETAILING_DB", "1.0",
					"e-Detailing Database", 200000);
		}
	},

	_execute : function(query, params) {
		var response = {
			statusCode : 0,
			result : null,
			error : null
		};
		//if(query.indexOf('story') > -1) {
			console.log(query);
			console.log(params);
		//}
		if(query.indexOf('tbl_HTML_Site_Asset_Master') > -1 || query.indexOf('tbl_HTML_Site_Analytics') > -1) {
			console.log('site anlaytics');
			console.log(JSON.stringify(this._connection));
		}
		this._connection.transaction(function(tx) {
			tx.executeSql(query, params, function(tx, queryResult) {
				response.statusCode = 0;
				response.result = queryResult;
			}, function(error) {
				response.statusCode = -1;
				response.error = error;
			});
		}, function(error) {
			response.statusCode = -1;
			response.error = error;
		});
		return response;

	},
	
	executeCustomQuery : function(entityClass, query, params) {
		this._initializeEntity(entityClass, false);
		if (params == null){
			params = [];
		}
		var noOfColumns = entityClass.metadata.columns.length;
		var response = this._execute(query, params);
		var result = [];
		if (response != null && response.result != null
				&& response.result.rows != null) {

			for ( var j = 0; j < response.result.rows.length; j++) {
				var record = {};
				var row = response.result.rows.item(j);
				for ( var i = 0; i < noOfColumns; i++) {
					if (row[entityClass.metadata.columns[i].columnName] != null){
						if (entityClass.metadata.columns[i].isDate == true) {
							record[entityClass.metadata.columns[i].name] = new Date(
									row[entityClass.metadata.columns[i].columnName]);
						} else {
							record[entityClass.metadata.columns[i].name] = row[entityClass.metadata.columns[i].columnName];
						}
					}
				}
				result.push(record);
			}
		}

		return result;

	},

	_initializeEntity : function(entityClass, createTableRequired) {
		this._initialize();
		if (createTableRequired == null){
			createTableRequired = false;
		}
		if (createTableRequired == true){
            var query = 'CREATE TABLE IF NOT EXISTS '
            	+ entityClass.metadata.tableName + ' ( ';
            var uniqueKeys = null;
            
            var noOfColumns = entityClass.metadata.columns.length;
            for ( var i = 0; i < noOfColumns; i++) {
                if (i != 0) {
                    query += ", ";
                }
                query += entityClass.metadata.columns[i].columnName + (entityClass.metadata.columns[i].isInt ? ' INTEGER PRIMARY KEY' : '');
                if (entityClass.metadata.columns[i]['pk'] != null) {
                    if (entityClass.metadata.columns[i].pk) {
                        if (uniqueKeys == null) {
                            uniqueKeys = entityClass.metadata.columns[i].columnName;
                        } else {
                            uniqueKeys += ("," + entityClass.metadata.columns[i].columnName);
                        }
                    }
                }
            }
            
            if (uniqueKeys != null) {
                query += ", CONSTRAINT " + entityClass.metadata.tableName
                + "_pk UNIQUE (" + uniqueKeys + ")";
            }
            
            query += ")";
            this._execute(query, []);
		}

	},

	getBetween : function(entityClass, criteria, values) {
		this._initializeEntity(entityClass, false);
		var query = 'SELECT ';
		var columns = null;
		var params = [];
		var noOfColumns = entityClass.metadata.columns.length;
		var dbColumnName = null;
		for ( var i = 0; i < noOfColumns; i++) {
			var currentColumnName = entityClass.metadata.columns[i].columnName;
			if (columns == null) {
				columns = '';
			} else {
				columns += ', ';
			}
			columns += currentColumnName;
			if (criteria.columnName == entityClass.metadata.columns[i].name) {
				dbColumnName = currentColumnName;
			}
		}
		query += columns;
		query += ' FROM ' + entityClass.metadata.tableName + ' ';
		var whereClause = ' WHERE ' + dbColumnName + " BETWEEN ? AND ? ";

		params.push(criteria.start);
		params.push(criteria.end);

		if (whereClause != null) {
			query += whereClause;
		}

		var response = this._execute(query, params);
		var result = [];
		if (response != null && response.result != null
				&& response.result.rows != null) {

			for ( var j = 0; j < response.result.rows.length; j++) {
				var record = {};
				var row = response.result.rows.item(j);
				for ( var i = 0; i < noOfColumns; i++) {
					if (row[entityClass.metadata.columns[i].columnName] != null){
						if (entityClass.metadata.columns[i].isDate == true) {
							record[entityClass.metadata.columns[i].name] = new Date(
									row[entityClass.metadata.columns[i].columnName]);
						} else {
							record[entityClass.metadata.columns[i].name] = row[entityClass.metadata.columns[i].columnName];
						}
					}
				}
				result.push(record);
			}
		}
		return result;
	}

};