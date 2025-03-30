import { error } from "console";
import fs from "fs";

const data = JSON.stringify([{}], null);

fs.writeFile("Data.json", data, (error) => {
  if (error) {
    console.log("was not able to write file", error);
  } else {
    console.log("user was created");
  }
});
