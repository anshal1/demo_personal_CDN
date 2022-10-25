const fs = require("fs");
const func = (req, res) => {
    if (req.url === "/") {
        const header = {
            "msg": "Success",
            "Content-type": "text/html"
        }
        const file = fs.readFileSync("./index.html", 'utf8');
        res.writeHead(200, header);
        res.write(file);
        res.end();
    }
}
module.exports = func