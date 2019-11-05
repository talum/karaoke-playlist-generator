const billboard = require('billboard-top-100');

const BillboardClient = {
  getSongs: function getSongs() {
    return new Promise((resolve, reject) => {
      billboard.getChart('hot-100', '2019-10-11', (err, chart) => {
        if (err) { reject(err); }
        resolve(chart.songs);
      });
    });
  }
}

module.exports = BillboardClient;
