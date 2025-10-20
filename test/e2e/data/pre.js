'use strict';

var path = require('path');

var testData = require(path.resolve("./test/e2e/data/predata.json"));
//var someMoreData = require(path.resolve('./testdata/dev/SomeMoreData.json'));


module.exports = {
    testData: testData
    //somemoredata: someMoreData
};