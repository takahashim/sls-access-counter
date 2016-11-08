'use strict';

var AWS = require("aws-sdk");
var config = require("./config/config.json");

var docClient = new AWS.DynamoDB.DocumentClient();

var tableName = config["tableName"];
var counterName = config["counterName"];

module.exports.counter = (event, context, callback) => {
    var params = {
        TableName: tableName,
        Key: {
            "name": counterName
        },
        UpdateExpression: "set num = num + :val",
        ConditionExpression: "attribute_exists(num)",
        ExpressionAttributeValues:{
            ":val": 1
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
        var response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
            },
            body: JSON.stringify({
                count: 0
            })
        };
        if (err) {
            console.log("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            var params_init = {
                TableName: tableName,
                Item:{
                    "name": counterName,
                    "num": 1
                }
            };
            docClient.put(params_init, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    response.statusCode = 500;
                } else {
                    console.log("Added item:", JSON.stringify(data, null, 2));
                    response.body = JSON.stringify({
                        count: 1
                    });
                }
            });
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            response.body = JSON.stringify({
                count: data.Attributes.num
            });
        }
        callback(null, response);
    });
};
