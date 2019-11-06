const BillboardClient = require('./BillboardClient.js');

const curatedList = [
    {
      title: "I'll Make a Man Out of You",
      artist: "Mulan"
    },
    {
      title: "Dancing in the Dark",
      artist: "Bruce Springsteen"
    },
    {
      title: "Build Me Up Buttercup",
      artist: "The Foundations"
    },
    {
      title: "Mr. Brightside",
      artist: "The Killers"
    },
    {
      title: "Ironic",
      artist: "Alanis Morisette"
    },
  ]

const SongGenerator = {
  call: function call(year) {
    return new Promise((resolve, reject) => {
      BillboardClient.getSongsAroundYear(year).then((response) => {
        const songs = response.reduce((acc, val) => acc.concat(val.slice(0, 10)), []);
        resolve(songs.concat(curatedList));
      });
    });
  }
}


module.exports = SongGenerator
