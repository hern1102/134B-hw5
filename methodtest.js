const el_id =  document.getElementById("id");
const el_article_name = document.getElementById("article_name");
const el_article_body = document.getElementById("article_body");
const el_article_date = document.getElementById("date");
const el_output = document.getElementById("response");
const el_fetch = document.getElementById("fetch");

const el_postBtn = document.getElementById("postBtn");
const el_getBtn = document.getElementById("getBtn");
const el_putBtn = document.getElementById("putBtn");
const el_deleteBtn = document.getElementById("deleteBtn");

//Display data in json manner
function display (response) {
    if(response.date === undefined){
        response.date = 'Previous post date';
    }
    if(response.article_body === undefined){
        response.article_body = 'Previous post body';
    }
    el_output.innerHTML = 
    `<h3> Article Information </h3>
    <pre>
        { 
        "article_name" : "${response.article_name}",
        "date" : "${response.date}",
        "id" : "${response.id}",
        "article_body" : "${response.article_body}"
        }
    </pre>`;
}

// Button event listeners with toggles for XML or Fetch
el_postBtn.addEventListener('click', async () => {
    try{
        //get radio toggle for XML or fetch 
        if(el_fetch.checked){
            const response = await postBtnFn();
            console.log("Fetch used.");
            display(response);
        }else{
            xml_postBtnFn();
            console.log("XMLhttpRequest used.");
        }
    }catch(error){
        console.log(error);
    }
});

el_getBtn.addEventListener('click', async () => {
    try{
        if(el_fetch.checked){
            const response = await getBtnFn();
            console.log("Fetch used.");
            display(response);
        }else{
            xml_getBtnFn();
            console.log("XMLhttpRequest used.");
        }
    }catch(error){
        console.log(error);
    }
});

el_putBtn.addEventListener('click', async () => {
    try{
        if(el_fetch.checked){
            const response = await putBtnFn();
            console.log("Fetch used.");
            display(response);
        }else{
            xml_putBtnFn();
            console.log("XMLhttpRequest used.");
        }
    }catch(error){
        console.log(error);
    }
});

el_deleteBtn.addEventListener('click', async () => {
    try{
        if(el_fetch.checked){
            const response = await deleteBtnFn();
            console.log("Fetch used.");
            display(response);
        }else{
            xml_deleteBtnFn();
            console.log("XMLhttpRequest used.");
        }
    }catch(error){
        console.log(error);
    }
});

//XMLhttpRequest
function xml_postBtnFn () {
    
    const url = "https://httpbin.org/post";

    const article_info = {
        id: el_id.value,
        article_name: el_article_name.value,
        article_body: el_article_body.value,
        date: new Date()
    }
    
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(this.readyState ===XMLHttpRequest.DONE) {
            if(this.status === 200) {
                const response = JSON.parse(this.responseText);
                display(response.json);
            }
        }
    }
    xhr.send(JSON.stringify(article_info));
}

function xml_getBtnFn () {
    
    const id = el_id.value;
    const article_name = el_article_name.value;

    const url = `https://httpbin.org/get?id=${id}&article_name=${article_name}`;
    
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
        if(this.readyState ===XMLHttpRequest.DONE) {
            if(this.status === 200) {
                const response = JSON.parse(this.responseText);
                display(response.args);
            }
        }
    }
    xhr.send();
}

function xml_putBtnFn () {
    
    const url = "https://httpbin.org/put";

    const article_info = {
        id: el_id.value,
        article_name: el_article_name.value,
        article_body: el_article_body.value,
        date: new Date()
    }
    
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(this.readyState ===XMLHttpRequest.DONE) {
            if(this.status === 200) {
                const response = JSON.parse(this.responseText);
                display(response.json);
            }
        }
    }
    xhr.send(JSON.stringify(article_info));
}

function xml_deleteBtnFn () {

    const url = "https://httpbin.org/delete";

    const article_info = {
        id: el_id.value,
        article_name: el_article_name.value,
    }
    
    const xhr = new XMLHttpRequest();

    xhr.open("DELETE", url);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(this.readyState ===XMLHttpRequest.DONE) {
            if(this.status === 200) {
                const response = JSON.parse(this.responseText);
                display(response.json);
            }
        }
    }
    xhr.send(JSON.stringify(article_info));
}

//Fetch requests 
async function postBtnFn () {
    const url = "https://httpbin.org/post";

    const article_info = {
        id: el_id.value,
        article_name: el_article_name.value,
        article_body: el_article_body.value,
        date: new Date()
    }

    try{
        let response = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article_info)
        });

        if(!response.ok){
            throw new Error("Error fetching response.");
        }

        response = await response.json();
        return response.json;

    }catch (error){
        console.error(error);
    }
}

async function putBtnFn () {
    const url = "https://httpbin.org/put";

    const article_info = {
        id: el_id.value,
        article_name: el_article_name.value,
        article_body: el_article_body.value,
        date: new Date()
    }

    try{
        let response = await fetch(url, {
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article_info)
        });

        if(!response.ok){
            throw new Error("Error fetching response.");
        }

        response = await response.json();
        return response.json;

    }catch (error){
        console.error(error);
    }
}

async function getBtnFn () {
    
    const id = el_id.value;
    const article_name = el_article_name.value;

    const url = `https://httpbin.org/get?id=${id}&article_name=${article_name}`;

    try{
        let response = await fetch(url, {
            method: 'GET', 
            headers: {
                "Accept": "application/json"
            }
        });

        if(!response.ok){
            throw new Error("Error fetching response.");
        }

        response = await response.json();
        return response.args;

    }catch (error){
        console.error(error);
    }
}

async function deleteBtnFn () {
    const url = "https://httpbin.org/delete";

    const article_info = {
        id: el_id.value,
        article_name: el_article_name.value,
    }

    try{
        let response = await fetch(url, {
            method: 'DELETE', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article_info)
        });

        if(!response.ok){
            throw new Error("Error fetching response.");
        }

        response = await response.json();
        return response.json;

    }catch (error){
        console.error(error);
    }
}





