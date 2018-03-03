const storeRss = require('./store.js').storeRss;

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        (async () => {
            const url = 'http://jvndb.jvn.jp/ja/rss/jvndb.rdf';
            await storeRss(url);
            process.exit();

            context.log('JavaScript timer trigger function ran!', timeStamp);       
            context.done();
        })();
    }
};