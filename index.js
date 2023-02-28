const axios = require("axios");
const fs = require("fs");
let countTime = 0;
console.log("--KEEP ALIVE SERVER PROGRAM------------------------");
function intervalFunc() {
  ++countTime;
  axios
    .get("your web site here", {
      validateStatus: function (status) {
        return status == 200; // Resolve only if the status code is less equal 200
      },
    })
    .then((response) => {
      console.log(`===Finishing call request:${countTime} : ${response.data}`);
    })
    .catch((error) => {
      if (error.response) {
        console.log(`===Finishing call request:${countTime} : ${error.response.status.toString}`);
      }
    })
    .finally(() => {
      fs.writeFile(
        "/home/user/Desktop/keepAlive/count.txt",
        countTime.toString(),
        () => {}
      );
    });
}
setInterval(intervalFunc, 900000);
