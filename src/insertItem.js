"use strict";

const AWS = require('aws-sdk')

const insertItem = async (event) => {
  const {item} = JSON.parse(event.body);
  const creatAt = new Date().toISOString();
  const id = AWS.util.uuid.v4()

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const newItem = {
    id,
    item,
    creatAt,
    itemStatus: false
  }

  await dynamodb.put({
    TableName: "ItemTable",
    Item: newItem
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newItem),
  };
};

module.exports = { 
  handler: insertItem
}