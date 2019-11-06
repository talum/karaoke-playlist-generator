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
    {
      title: "Under the Sea",
      artist: "The Little Mermaid"
    },
  ]

const closingSongs = [
    {
      title: "Empire State of Mind",
      artist: "Jay-Z"
    },
    {
      title: "Closing Time",
      artist: "Semisonic"
    },
]

const SongGenerator = {
  call: function call(year) {
    return new Promise((resolve, reject) => {
      BillboardClient.getSongsAroundYear(year)
        .then((response) => {
          const songs = response.reduce((acc, val) => acc.concat(val.slice(0, 10)), []);
          resolve(this.shuffle(songs.concat(curatedList)).concat(closingSongs));
        })
        .catch((err) => reject(err));
    });
  },
  shuffle: function shuffle(songs) {
		// See: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		let currentIndex = songs.length;
    let tempValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = songs[currentIndex];
      songs[currentIndex] = songs[randomIndex];
      songs[randomIndex] = temporaryValue;
    }
    return songs;
  }
}


module.exports = SongGenerator
