'use strict';

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "modern-access-counter";
var counter_name = "counter1";

module.exports.counter = (event, context, callback) => {
    var params = {
        TableName: table,
        Key: {
            "name": counter_name
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
                TableName: table,
                Item:{
                    "name": counter_name,
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
