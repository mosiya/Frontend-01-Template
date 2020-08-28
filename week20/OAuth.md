publish-tool 唤起浏览器

https://github.com/login/oauth/authorize?
client_id=Iv1.c9259326ea1bb63e&
redirect_uri=http%3A%2F%2Flocalhost%3A8000&
scope=read%3Auser
&state=123abc

publish-server 服务器

{
let code = "c0c3631846d75f170901";
let state = "abc123";
let client_secret = "395b178331a33fdb5e72b10ae6240ecef8017b26";
let client_id = "Iv1.c9259326ea1bb63e";
let redirect_uri = encodeURIComponent("http://localhost:8000");

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

    let xhr = new XMLHttpRequest;

    xhr.open("POST",`https://github.com/login/oauth/access_token?${params}`,true);
    xhr.send(null);

    xhr.addEventListener("readystatechange", function(event){
        if(xhr.readyState===4){
            console.log(xhr.responseText);
        }
    })

}

183a5fe7a351e863f9aa7732231eec02a022ec86

api.github.com/user

Authorization: token

publish-tool/publish-server 客户端/服务端

{
let xhr = new XMLHttpRequest;

    xhr.open("GET",`https://api.github.com/user`,true);
    xhr.setRequestHeader("Authorization","token 183a5fe7a351e863f9aa7732231eec02a022ec86")
    xhr.send(null);

    xhr.addEventListener("readystatechange", function(event){
        if(xhr.readyState===4){
            console.log(xhr.responseText);
        }
    })

}
