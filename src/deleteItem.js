"use strict";

const AWS = require("aws-sdk");

const deleteItem = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    let statusCode, msg
    try {
        await dynamodb.delete({
            TableName: "ItemTable",
            Key: {id}
        }).promise();
        statusCode = 200
        msg = "item deletado"
    } catch (error) {
        console.log(error)
        statusCode = 400
        msg = "falha na operacao"
    }
    return {
        statusCode: statusCode,
        body: JSON.stringify(
            { msg: msg}
          ),
    };
};

module.exports = {
    handler: deleteItem
};
