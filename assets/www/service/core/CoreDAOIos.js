com.swaas.hidoctor.edetailing.dao.CoreDAO = {

    insert : function(entityClass, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
            result = _this._insert(entityClass, entity, success, failure);
        } , failure);
        return result;
    },

    _insert : function(entityClass, entity, success, failure){
        if (entity instanceof Array){
            return this._insertMulti(entityClass, entity, success, failure);
        } else {
            
            return this._insertSingle(entityClass, entity, success, failure);
        }
    },

    _insertSingle : function(entityClass, entity, success, failure){
        var query = this._buildInsert(entityClass);
        var params = this._prepareInsertParams(entityClass, entity);
        
        return this._execute(query, params, success, failure);
    },

    _insertMulti : function(entityClass, entites, success, failure){
        var query = this._buildInsert(entityClass, entites);
        return this._insertQuery(entityClass, query, entites, success, failure);
    },

    _insertQuery: function(entityClass, query, entities, success, failure, index){
    if (index == null){
        index = 0;
    }
    var _this = com.swaas.hidoctor.edetailing.dao.CoreDAO;

    if (index < entities.length){
        var params = this._prepareInsertParams(entityClass, entities[index]);
        this._execute(query, params, insertNext, insertNext);
    } else { 
        success({});
    }

    function insertNext(){
        index++;
        _this._insertQuery(entityClass, query, entities, success, failure, index);
    }

    },

    _buildInsert : function(entityClass){
        var columns = null;
        var paramPlaceHolders = null;
        var noOfColumns = entityClass.metadata.columns.length;
        for ( var i = 0; i < noOfColumns; i++) {
            var bPrimary = entityClass.metadata.columns[i].isInt && entityClass.metadata.columns[i].pk;
			if(!bPrimary) {
				if (columns == null) {
					columns = '';
					paramPlaceHolders = '';
				} else {
					columns += ', ';
					paramPlaceHolders += ', ';
				}
				columns += entityClass.metadata.columns[i].columnName;
				paramPlaceHolders += '?';			
			}
        }
        var query = 'INSERT INTO ' + entityClass.metadata.tableName + ' ( ' + columns + ') VALUES (' + paramPlaceHolders + ');';
        return query;
    },

    _prepareInsertParams : function(entityClass, entity){
        var params = [];
        var noOfColumns = entityClass.metadata.columns.length;
        for ( var i = 0; i < noOfColumns; i++) {
			var bPrimary = entityClass.metadata.columns[i].isInt && entityClass.metadata.columns[i].pk;
			if(!bPrimary) {
				var currentName = entityClass.metadata.columns[i].name;
				value = entity[currentName];
				if (value == null){				
					value = '';
				}
				params.push(value);
			}
        }
        return params;
    },

    update : function(entityClass, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
                               result = _this._update(entityClass, entity, success, failure);
                               } , failure);
        return result;
    },

    excuteUpdate: function(query, success, failure){
    this._execute(query, {}, success, failure);
    },

    _update : function(entityClass, entity, success, failure) {
        
        
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
        return this._execute(query, params, success, failure);
    },

    remove : function(entityClass, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
                               result = _this._remove(entityClass, entity, success, failure);
                               } , failure);
        return result;
    },

    _remove : function(entityClass, criteria, success, failure) {
        // DANGER: Passing NULL criteria or the Criteria with no element in it,
        // will remove all the records.
        // If need this has to be separated (remove and removeAll);
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
        return this._execute(query, params, success, failure);
    },

    executeQuery : function(query, rowMapperCallback, success, failure) {
        this._initialize();
        var params = [];
        var result = [];
        this._execute(query, params, function(response){
                      if (response != null && response.result != null
                          && response.result.rows != null) {
                      
                      for ( var j = 0; j < response.result.rows.length; j++) {
                      
                      var row = response.result.rows.item(j);
                      var record = rowMapperCallback(row);
                      result.push(record);
                      }
                      }
                      if (typeof success == 'function'){
                      success(result);
                      }
                      }, failure );
        
        return result;
    },

    getEquals : function(entityClass, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
        	result = _this._getEquals(entityClass, entity, success, failure);
        } , failure);
        return result;
    },

    _getEquals : function(entityClass, criteria, success, failure) {
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
        var result = [];
        var _this = this;  
        this._execute(query, params, function(response) {
            result = _this._prepareResponse(entityClass, response);
            if(com.swaas.hidoctor.edetailing.dao.storyLocalDAO.metadata.tableName == entityClass.metadata.tableName) {
            	console.log(JSON.stringify(result));
            }
            if(typeof success == 'function')
                  success(result);
        }, failure);
        return result;
    },

    _prepareResponse: function(entityClass, response){ 
        var result = new Array();
        var noOfColumns = entityClass.metadata.columns.length;
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
                //result[j] = record;
                
            }
        }
        return result;
    },

    getNotEquals : function(entityClass, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
                               result = _this._getNotEquals(entityClass, entity, success, failure);
                               } , failure);
        return result;
    },

    _getNotEquals : function(entityClass, criteria, success, failure) {
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
        
        var result = [];
        var _this = this;
        this._execute(query, params, function(response){
                      result = _this._prepareResponse(entityClass, response);
                      if (typeof success == 'function'){
                      success(result);
                      }
                      }, failure);
        
        
        return result;
    },

    removeNotEquals : function(entityClass, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
            result = _this._removeNotEquals(entityClass, entity, success, failure);
        } , failure);
        return result;
    },

    _removeNotEquals : function(entityClass, criteria, success, failure) {
        // DANGER: Passing NULL criteria or the Criteria with no element in it,
        // will remove all the records.
        // If need this has to be separated (remove and removeAll);
        this._initializeEntity(entityClass, true);
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
        return this._execute(query, params, success, failure);
    },

    getLike : function(entityClass, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
                               result = _this._getLike(entityClass, entity, success, failure);
                               } , failure);
        return result;
    },

    _getLike : function(entityClass, criteria, success, failure) {
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
        
        var result = [];
        var _this = this;
        this._execute(query, params, function(response){
                      result = _this._prepareResponse(entityClass, response);
                      if (typeof success == 'function'){
                      success(result);
                      }
                      }, failure);
        
        return result;
    },
    _connection : null,

    _initialize : function() {
        if (this._connection == null) {
            this._connection = window.openDatabase("EDETAILING_DB", "1.0",
                                                   "e-Detailing Database", 200000);
        }
    },

    _execute : function(query, params, success, failure) {
        var response = {
            statusCode : 0,
            result : null,
            error : null
        };
        
        var _this = com.swaas.hidoctor.edetailing.dao.CoreDAO;
		this._connection.transaction(function(tx) {
			console.log(params);
			//alert(query);
			tx.executeSql(query, params, function(tx, queryResult) {
				response.statusCode = 0;
				response.result = queryResult;
				if (typeof success == 'function') {
					success(response);
				}
			}, function(error) {
				response.statusCode = -1;
				response.error = error;
				console.log(error);
				if (typeof failure == 'function') {
					failure(response);
				}
			});
		}, function(error) {
			response.statusCode = -1;
			response.error = error;
			if (typeof failure == 'function') {
				failure(response);
			}
		});
        return response;
        
    },

    _executeMulti : function(query, params, success, failure) {
        var response = {
            statusCode : 0,
            result : null,
            error : null
        };
        
        this._connection.transaction(function(tx) {
                                     var responses = [];
                                     $.each(params, function(index, param){
                                            response = {
                                            statusCode : 0,
                                            result : null,
                                            error : null
                                            };
                                            tx.executeSql(query, param, function(tx, queryResult) {
                                                          response.statusCode = 0;
                                                          response.result = queryResult;
                                                          responses.push(response);
                                                          }, function(error) {
                                                          alert("Error");
                                                          response.statusCode = -1;
                                                          response.error = error;
                                                          responses.push(response);
                                                          });
                                            });
                                     if (typeof success == 'function'){
                                     success(responses);
                                     }
                                     }, function(error) {
                                     response.statusCode = -1;
                                     response.error = error;
                                     if (typeof failure == 'function'){
                                     failure(response);
                                     }
                                     });
        return response;
        
    },

    executeCustomQuery : function(entityClass, query, entity, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
           result = _this._executeCustomQuery(entityClass, query, entity, success, failure);
        } , failure);
        return result;
    },

    _executeCustomQuery : function(entityClass, query, params, success, failure) {
        this._initializeEntity(entityClass, false);
        if (params == null){
            params = [];
        }
        var result = [];
        var _this = this;
        this._execute(query, params, function(response){
                result = _this._prepareResponse(entityClass, response);
                if (typeof success == 'function'){
                  success(result);
                }
        }, failure);
        
        return result;
        
    },
    executeCustomQueryAlt : function(entityClass, query, entity, success, failure) {
        var response = {
            statusCode : 0,
            result : null,
            error : null
        };
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
            _this._connection.transaction(function(tx){
                tx.executeSql(query, entity, function(tx, results){
                    response.statusCode = 0;
                    response.result = results;
                    //var result = _this._prepareResponse(entityClass, response);
                    var result = new Array();
                    var noOfColumns = entityClass.metadata.columns.length;
                    if (response != null && response.result != null
                        && response.result.rows != null) {
                        
                        for ( var j = 0; j < response.result.rows.length; j++) {
                            var record = new Object();
                            var row = response.result.rows.item(j);
                            //console.log('record row');
                            //console.log(JSON.stringify(row));
                            for ( var i = 0; i < noOfColumns; i++) {
                                var colName = entityClass.metadata.columns[i].name;
                                if (row[entityClass.metadata.columns[i].columnName] != null){
                                    if (entityClass.metadata.columns[i].isDate == true) {
                                        record[colName] = new Date(
                                            row[entityClass.metadata.columns[i].columnName]);
                                    } else {
                                        record[colName] = row[entityClass.metadata.columns[i].columnName];
                                    }
                                }
                            }
                            //console.log(JSON.stringify(record));
                            result.push(record);
                        }
                    }
                    console.log(JSON.stringify(result));
                    if (typeof success == 'function'){
                        //alert('success');
                        success(result);
                    }
                }, function(error){
                    alert("Error");
                    response.statusCode = -1;
                    response.error = error;
                });
            }, function(error){
                response.statusCode = -1;
                response.error = error;
                if (typeof failure == 'function'){
                    failure(response);
                }
            });
        });
    },
    _initializeEntity : function(entityClass, createTableRequired, success, failure) {
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
            this._execute(query, [], success, failure);
        }
        
    },

    getBetween : function(entityClass, criteria, success, failure) {
        var _this = this;
        var result = [];
        this._initializeEntity(entityClass, true, function(response){
            result = _this._getBetween(entityClass, criteria, success, failure);
        } , failure);
        return result;
    },

    _getBetween : function(entityClass, criteria, success, failure) {
        //this._initializeEntity(entityClass, true);
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
        
        var result = [];
        var _this = this;
        this._execute(query, params, function(response){
                      result = _this._prepareResponse(entityClass, response);
                      if (typeof success == 'function'){
                      success(result);
                      }
                      }, failure);
        
        return result;
    },
    updateTable : function(entityClass,success, failure) {
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
                _this._execute(query, [],success, failure);
            }
        });
	}
};