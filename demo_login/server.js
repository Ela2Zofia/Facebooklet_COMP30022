const http = require("http"); // HTTP模块
const fs = require("fs"); // fs模块来读取html文件
const qs = require("querystring"); //qs模块用来拆分字符串

const port = 3000;
const ip = "127.0.0.1";

// 针对不同请求发送响应
const sendResponse = (filename, statusCode, response) => {
    // 文件夹读取对应的html文件
    fs.readFile(`./html/${filename}`, (error, data) => { // 成功读取error就是undefined，data会被赋予文件内容
        if (error) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain"); // 告诉浏览器返回的信息是什么格式
            response.end("Sorry, internal error"); // 报错返回给用户
        } else{
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html"); // 服务器会发送HTML源代码 
            response.end(data); // 读取html的data
        }
    });
};

// 服务器
const server = http.createServer((request, response) => { // 用http模块创建服务器并植入监听器用于收集前端发过来的请求
    const method = request.method;
    let url = request.url;
    // 判断请求是不是GET请求
    if (method === "GET") {
        const requestUrl = new URL(url, `http://${ip}:${port}`); //第一个是当前访问的页面，第二个是基本url(127.0.0.1 3000)
        url = requestUrl.pathname;
        const lang = requestUrl.searchParams.get("lang"); // lang常量
        let selector;

        // 判断pathname里面所需要的是zh还是en
        if (lang === null || lang === "en") {
            selector = "";
        } else if (lang === "zh") {
            selector = "-zh";
        } else {
            selector = "";
        }

        if (url === "/") {
            sendResponse(`index${selector}.html`, 200, response);
        } else if (url === "/about.html") {
            sendResponse(`about${selector}.html`, 200, response);
        } else if (url === "/login.html") {
            sendResponse(`login${selector}.html`, 200, response);
        } else if (url === "/login-success.html") {
            sendResponse(`login-success${selector}.html`, 200, response);
        } else if (url === "/login-fail.html") {
            sendResponse(`login-fail${selector}.html`, 200, response);
        } else {
            sendResponse(`404${selector}.html`, 404, response);
        }
    } else {
        if (url === "/process-login") {
            let body = []; // 读取数据

            request.on("data", (chunk) => {
                body.push(chunk);
            }); // (监听什么 回调函数)监听器，看缓冲区里的数据是否可以读取
            request.on("end", () => {
                body = Buffer.concat(body).toString(); // 合并读取到array的数据成一个完整的数据
                body = qs.parse(body); // 提取username和passwo
                console.log(body);

                // 判断用户名和密码（一般需要连接数据库）
                if (body.username === "zexuh" && body.password === "zexuh") {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-success.html");
                } else {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-fail.html");
                }
                response.end(); // 发送响应
            }); // 第二个监听器，看看读完没有
        }
    }

    // response.end("Hello From NodeJS Server 2"); // 把字符串返回到前端
});
 
server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);// port, ip, callback function
});

