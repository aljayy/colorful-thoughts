const http = require("http");
const https = require("https");

require("dotenv").config();

let userData = "";

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    console.log("POST");

    req.on("data", (data) => {
      userData += data;
    });

    req.on("end", () => {
      console.log(JSON.parse(userData));
      const options = {
        hostname: "api.chec.io",
        path: "/v1/customers",
        method: "POST",
        headers: {
          "X-Authorization": `${process.env.REACT_APP_CHEC_SECRET_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const req = https.request(options, (commerceRes) => {
        let response = "";

        commerceRes.on("data", (chunk) => {
          response += chunk;
        });

        commerceRes.on("end", () => {
          console.log(JSON.parse(response));
        });

        commerceRes.on("error", (error) => {
          console.log(
            `There's been an error in sending the data to the commerce API: ${error.message}`
          );
        });
      });

      req.write(userData);
      req.end();
    });

    res.statusCode = 200;
    res.end();
  } else {
    res.write("This only accepts post requests");
    res.end();
  }

  res.on("error", (error) => {
    console.log(error);
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server running on port " + port);
});
