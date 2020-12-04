import axios from "axios";
import Papa from "papaparse";
import fs from "fs";

const DOMAIN = `vsme-messaging-dev.refreshlabs.co`;

class VSME {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async search(query, documents, engine) {
    try {
      let results = await axios({
        method: 'POST',
        url: `https://${DOMAIN}/api/documentSearch/searchDocuments`,
        headers: {
          'x-api-key': this.apiKey
        },
        data: {
          query,
          documents,
          engine
        }
      })
      return results.data;
    } catch(err) {
      console.log(err);
      return null;
    }
  }

  async readCSV(filename) {
    return new Promise((resolve) => {
      try {
        let csv = fs.createReadStream(`./Workspace/${filename}.csv`);
        console.log(csv);
        Papa.parse(csv, {
          delimiter: ",",
          newline: "",
          quoteChar: '"',
          escapeChar: '"',
          header: true,
          complete: async (results) => {
            resolve(results.data);
          },
        });
      } catch (err) {
        console.log(err);
        resolve(null);
      }
    });
  }
}

export default VSME;
