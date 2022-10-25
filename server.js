const http = require("http");
const fs = require("fs");
const func = require("./req");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        func(req, res);
    } else if (req.url === "/style/mystyle.css") {
        const header = {
            "msg": "Success",
            "Content-type": "text/css",
            "access-control-allow-origin": "*"
        }
        let file = fs.readFileSync("./style.css", 'utf8');
        if (!file) {
            res.writeHead(404, { "Content-type": "application/json" })
            res.write("File not found");
            return;
        }
        if(file !== fs.readFileSync("./style/mystyle.css", "utf8")){
            const paste_to_server = fs.writeFileSync("./style/mystyle.css", file, (err)=>{
                if(err){
                    console.log(err)
                }
            });
            file = fs.readFileSync("./style/mystyle.css", "utf8");
        }
        res.writeHead(200, header);
        res.write(file);
        res.end();
    }
})
const PORT = 5000 || process.env.PORT
server.listen(PORT, () => {
    console.log("listening on 5000");
})