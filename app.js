const http = require("http");
const fs = require("fs")
const port = 3000;

// const server = http.createServer(function(request, response){
//     response.setHeader("Const-Type", "application/json")
//     response.end(JSON.stringify({text: "hello Clasaasds", numbers: [1,2,3]}));
// })

const server = http.createServer(function(request, response){
    console.log(request.url);
    if (request.url==="/"){
        // response.end('Home Now');
        fs.readFile('./public/text.txt', function(err, data){
            if(err){
                response.writeHead(400)
                response.end('Fail to request home');
                response.end()
            }
            else{
                response.writeHead(200, {"Content-type" : "text/html"});
                response.write(data);
                return response.end();
            }
        })
    }
    else if(request.url === "/create-file" && request.method === "POST"){
        let body = ""

        request.on("data", function(data){
            body += data.toString()
        })
        request.on("end", function(){
            let parsedBody = JSON.parse(body)
            console.log(parsedBody)
            
            fs.writeFile(`./public/${parsedBody.fileName}`, parsedBody.message, function(err){
            if (err){
                response.writeHead(400)
                response.end("something went wrong")
                response.end()
            }
            else{
                response.end("file created")
                response.end()
            }
        })
        })
        
    }
    // else if( request.url === "/games"){
    //     fs.readFile("./public/games.html", function(error, data){
    //         if(error){
    //             console.log(error)
    //             console.log(error.message)
    //             return response.end("Something went wrong");
                
    //         }
    //         else{
    //             response.writeHead(200, {"Content-Type" : "text/html"}); // 200 is status code
    //             response.write(data);
    //             return response.end();
    //         }
    //     })
        
    // }
    // else if(request.url === "/teams"){
    //     fs.readFile('./public/teams.html', function(error, data){
    //         if(error){
    //             response.end('Fail to request team');
    //         }
    //         else{
    //             response.writeHead(200, {"Content-type" : "text/html"});
    //             response.write(data);
    //             return response.end();
    //         }
    //     })
    // }
})

server.listen(port);
console.log(`Server is now up and running @ port : ${port}`)