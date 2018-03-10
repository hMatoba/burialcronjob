const storeRss = require('./store.js').storeRss;

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }

    (async () => {
        const url = 'http://jvndb.jvn.jp/ja/rss/jvndb.rdf';
        await storeRss(url);

        context.log('JavaScript timer trigger function ran!', timeStamp);       
        context.done();
    })();
};