var schedule = require('node-schedule');
var storage = require('node-persist');
var Rtorrent = require ('node-rtorrent');

var FeedProcessor = require('./lib/FeedProcessor.js');
var config = require('./config.js');

storage.initSync();
var downloadedFiles = storage.getItemSync('history') || [];
var rtorrent = new Rtorrent(config.rTorrent);

schedule.scheduleJob(config.checkFeedInterval, () => {
  var feedProcessor = new FeedProcessor({
    feedUrl: config.feedUrl,
    itemHandler: (item) => {
      if(downloadedFiles.indexOf(item.link) > -1) return;
      rtorrent.loadLink(item.link, (err, data) => {
          if (err) return console.log('error: ', err);
          console.log('download ' + item.title);
          downloadedFiles.push(item.link);
          storage.setItemSync('history', downloadedFiles);
      });
    }
  });
});

