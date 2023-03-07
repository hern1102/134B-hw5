import {style_delete, style_edit} from './styledposts.js';

const el_add_post = document.getElementById("add_post_bttn");
export const post_d = document.getElementById("post_dialog");
const el_cancel_post = document.getElementById("cancel_bttn");
const el_save_bttn = document.getElementById("save_bttn");
export const el_title = document.getElementById("title");
export const el_date = document.getElementById("date");
export const el_blog_post = document.getElementById("blog_post");
export const el_list = document.getElementById("list");
export let current_li;
export let editing_post = false;
export let counter = 0;
let placeholder = [{"title":"Blog Post 1", "date":"2023-02-08", "post":"I've posted something"},
{"title":"Blog Post 2", "date":"2023-02-08", "post":"Hey, here too!!"},
{"title":"Blog Post 3", "date":"2023-02-08", "post":"Wait a minute, here too?"}
]
let posts = JSON.parse(localStorage.getItem('post_entries')) || [];

if(posts.length === 0){
    placeholder.forEach(post => {
        display(post.title, post.date, post.post);
    });
}else{
    posts.forEach(post => {
        display(post.title, post.date, post.post);
    });
}

el_add_post.addEventListener("click", function () {
    post_d.showModal();
});

el_cancel_post.addEventListener("click", function () {
    post_d.close();
    el_title.value = '';
    el_date.value = '';
    el_blog_post.value = '';
});


function save_bttn () {
    post_d.close();
    let entry = {
        title: el_title.value,
        date: el_date.value,
        post: el_blog_post.value,
        id: `${counter}`
    };

    posts = JSON.parse(localStorage.getItem('post_entries')) || [];

    //display on the screen
    let display_string = `${entry.date} - ${entry.title}: ${entry.post}`;
    
    if(!editing_post){  //meaning it's a new post, then create all of the elements
        posts.push(entry);
        localStorage.setItem('post_entries', JSON.stringify(posts));
        const newListItem = document.createElement("li");
        const textbox = document.createElement('p');
        textbox.innerHTML = display_string;
        textbox.setAttribute('id', `textbox_${counter}`);
        newListItem.id = `${counter}`;

        let newDeleteButton = document.createElement("button");
        newDeleteButton.textContent = "Delete";
        newDeleteButton.addEventListener("click", delete_post);
        newListItem.post = entry.post;
        newListItem.date = entry.date;
        newListItem.title = entry.title;
        let newEditButton = document.createElement("button");
        newEditButton.textContent = "Edit";
        newEditButton.addEventListener("click", edit_post);
        if(document.title === "styled crud"){
            newDeleteButton = style_delete(newDeleteButton);
            newDeleteButton.textContent = "";
            newEditButton = style_edit(newEditButton);
            newEditButton.textContent = "";
        }
        newListItem.appendChild(textbox);
        newListItem.appendChild(newDeleteButton);
        newListItem.appendChild(newEditButton);
        el_list.appendChild(newListItem);
        counter = counter + 1;
    }else{   //editing the content of existing post.
        let index = current_li.id;
        posts.forEach(element => {
            if(element.id === current_li.id){
                element.post = entry.post;
                element.date = entry.date;
                element.title = entry.title;
            }
        });
        localStorage.setItem('post_entries', JSON.stringify(posts));
        document.getElementById(`textbox_${index}`).textContent = display_string;
        current_li.post = entry.post;
        current_li.date = entry.date;
        current_li.title = entry.title;
    }

    editing_post = false;
    el_title.value = '';
    el_date.value = '';
    el_blog_post.value = '';
}

el_save_bttn.addEventListener("click", save_bttn);

function delete_post(event){
    const current_li = event.target.parentNode;
    posts = JSON.parse(localStorage.getItem('post_entries')) || [];
    posts = posts.filter(post => post.id !== current_li.id);
    localStorage.setItem('post_entries', JSON.stringify(posts));
    current_li.remove();
    //also remove from local storage
}

function edit_post(event){
    current_li = event.target.parentNode;
    editing_post = true;
    el_title.value = current_li.title;
    el_date.value = current_li.date;
    el_blog_post.value = current_li.post;
    post_d.showModal();
}

function display (title, date, post){
    const newListItem = document.createElement("li");
    const textbox = document.createElement('p');
    let display_string = `${date} - ${title}: ${post}`;
    textbox.innerHTML = display_string;
    textbox.setAttribute('id', `textbox_${counter}`);
    newListItem.id = `${counter}`;

    let newDeleteButton = document.createElement("button");
    newDeleteButton.textContent = "Delete";
    newDeleteButton.addEventListener("click", delete_post);
    newListItem.post = post;
    newListItem.date = date;
    newListItem.title = title;
    let newEditButton = document.createElement("button");
    newEditButton.textContent = "Edit";
    if(document.title === "styled crud"){
        newDeleteButton = style_delete(newDeleteButton);
        newDeleteButton.textContent = "";
        newEditButton = style_edit(newEditButton);
        newEditButton.textContent = "";
    }
    newEditButton.addEventListener("click", edit_post);
    newListItem.appendChild(textbox);
    newListItem.appendChild(newDeleteButton);
    newListItem.appendChild(newEditButton);
    el_list.appendChild(newListItem);
    counter = counter + 1;
}


