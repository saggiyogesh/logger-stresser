require('./captureCPUUsage').startWatching();
var shouldRun = true;
var desiredLoadFactor = .1;

function blockCpuFor(ms) {
  var now = new Date().getTime();
  var result = 0
  while (shouldRun) {
    result += Math.random() * Math.random();
    if (new Date().getTime() > now + ms)
      return;
  }
}

function start() {
  shouldRun = true;
  blockCpuFor(1000 * desiredLoadFactor);
  setTimeout(start, 1000 * (1 - desiredLoadFactor));
}

setInterval(function () {
  console.log("current process cpu usage: " + (global.processCpuUsage || 0) + "%");
}
  , 1000);

start();