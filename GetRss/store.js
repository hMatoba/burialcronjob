const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const DbConnection = require('./DbConnection.js').DbConnection;

"use strict";

async function storeRss(url) {
    // get
    const response = await fetch(url);
    const xml = await response.text();

    // parse xml to "object". Free from callback.
    let obj = await asyncParseString(xml);
    let items = [];
    let db = await DbConnection.getConnection();
    let bulk = db.collection("items").initializeUnorderedBulkOp();
    obj["rdf:RDF"].item.forEach(function (item, index, array) {
        let doc = {
            _id: item["sec:identifier"],
            title: item["title"],
            desc: item["description"],
            link: item["link"],
            issued: item["dcterms:issued"],
            modified: item["dcterms:modified"],
        };
        bulk.find({"_id":item["sec:identifier"]}).upsert().updateOne(doc);
        console.log(doc["_id"]);
    });

    bulk.execute();
}

function asyncParseString(xml) {
    return promise = new Promise(function (resolve, reject) {
        const options = {
            trim: true,
            explicitArray: false
        };    
        parseString(xml, options, function (err, obj) {
            if (err) {
                reject(err);
            }
    
            resolve(obj);
        });
    });
}

module.exports = {
    storeRss: storeRss,
};