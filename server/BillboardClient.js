const billboard = require('billboard-top-100');

const BillboardClient = {
  getSongs: function getSongs(year) {
    return new Promise((resolve, reject) => {
      billboard.getChart('hot-100', `${year}-05-11`, (err, chart) => {
        if (err) { reject(err); }
        resolve(chart.songs);
      });
    });
  }
}

module.exports = BillboardClient;
