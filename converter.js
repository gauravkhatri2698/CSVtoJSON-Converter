const csv = require("csvtojson");
const fs = require("fs");

let arr = [];
let i = 0;
let query;

let fileName = "";   // write your csv filename here which you want to convert to json like(persons.csv or persons.txt)
let filefolder = ""; // write your folder name here in which your csv file exits
let delimeter = "";  // add your delimeter here based on what type of csv file you are using whether it is pipe separated(|) or comma separated(,)

csv({
  noheader: false,
  delimiter: delimeter,
  escape
})
  .fromFile(`C:\\Users\\User\\OneDrive\\Documents\\Visual Studio 2017\\StartPages\\CSVtoJSON_Converter\\${filefolder}\\${fileName}`)
  .subscribe(
    (json) => {
      return new Promise(async (resolve, reject) => {
        try {
          // console.log(json,++i);
          // query = "(" + "'" + json.First_Name + "','" + json.Last_Name + "','" + json.Date_Of_Birth + "','" + json.Email + "')";
          // arr.push(query);
          arr.push(JSON.stringify(json));
          if (arr.length == 10000) {
            console.log(arr.length);
            await writeData(`.\\${filefolder}`, arr);
            arr = [];
          }
          resolve();
        } catch (error) {
          console.log(error);
        }
      });
    },
    (error) => {
      console.log(error);
    },
    async () => {
      console.log("completed");
      console.log(arr.length);
      if (arr.length > 0) await writeData(`C:\\Users\\User\\OneDrive\\Documents\\Visual Studio 2017\\StartPages\\CSVtoJSON_Converter\\${filefolder}`, arr);
    }
  );

let j = 1;
function writeData(path, data) {
  // console.log(data[0]);
  return new Promise(async (resolve, reject) => {
    let fileName = Math.floor(Math.random() * 10000000);
    // console.log(fileName);
    path += "\\" + j++ + ".txt";
    fs.writeFile(path, data.toString(), function (err) {
      if (err) {
        return console.log(err);
      }
      resolve();
    });
  });
}
