import Papa from "papaparse";

class ImportFile {
  constructor(inputFile) {
    this.inputFile = inputFile;
  }

  async readCSV() {
    return new Promise(async (resolve) => {
      try {
        Papa.parse(this.inputFile, {
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

export default ImportFile;
