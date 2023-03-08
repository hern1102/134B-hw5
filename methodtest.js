const el_id =  document.getElementById("id");
const el_article_name = document.getElementById("article_name");
const el_article_body = document.getElementById("article_body");
const el_article_date = document.getElementById("date");
const el_output = document.getElementById("response");

const el_postBtn = document.getElementById("postBtn");
const el_getBtn = document.getElementById("getBtn");

function display (response) {
    el_output.innerHTML = 
    `<h3> Article Information </h3>
    <p>
        Title: ${response.article_name}
    </p>
    <p>
        Date: ${response.date}
    </p>
    <p>
        ID: ${response.id}
    </p>
    <p>
        Content: ${response.article_body}
    </p>`;
}

el_postBtn.addEventListener('click', async () => {
    try{
        const response = await postBtnFn();
        display(response);
    }catch(error){
        console.log(error);
    }
});

//there is no database to get from, so what do I output?
el_getBtn.addEventListener('click', async () => {
    try{
        const response = await getBtnFn();
        display(response);
    }catch(error){
        console.log(error);
    }
});

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
        return response.json;

    }catch (error){
        console.error(error);
    }
}



