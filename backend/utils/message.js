const moment = require('moment');

function formatMessage(username, text,time) {

  if(time)
  return {
    username,
    text,
    time
    // time: moment().format('h:mm a')
  };
  else
  {
    return {
      username,
      text,
      time: moment().format('h:mm a')
    }
  }

}

module.exports = formatMessage;

