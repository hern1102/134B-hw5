// custom alert 

const el_alert = document.getElementById("alert_custom");
const button_close_alert = document.getElementById("close_alert");
const alert_d = document.getElementById("alert_dialog");

el_alert.addEventListener("click", function () {
    alert_d.showModal();
    el_out.textContent = "";
});

button_close_alert.addEventListener("click", function () {
    alert_d.close();
});

// custom confirm

const el_confirm = document.getElementById("confirm_custom");
const el_out = document.getElementById("out_custom");
const button_confirm = document.getElementById("confirm_bttn");
const cancel_button_confirm = document.getElementById("cancel_confirm_bttn");
const confirm_d = document.getElementById("confirm_dialog");

el_confirm.addEventListener("click", function () {
    el_out.textContent = "";
    confirm_d.showModal();
});

button_confirm.addEventListener("click", function () {
    confirm_d.close();
    el_out.textContent = "Confirm result: true";
});

cancel_button_confirm.addEventListener("click", function () {
    confirm_d.close();
    el_out.textContent = "Confirm result: false";
});

// Custom Prompt

const el_prompt = document.getElementById("prompt_custom");
const prompt_d = document.getElementById("prompt_dialog");
const prompt_cancel_bttn = document.getElementById("prompt_cancel_bttn");
const prompt_ok_bttn = document.getElementById("prompt_ok_bttn");

el_prompt.addEventListener("click", function () {
    el_out.textContent = "";
    prompt_d.showModal();
});

prompt_cancel_bttn.addEventListener("click", function () {
    prompt_d.close();
    el_out.textContent = "Nothing entered";
});

prompt_ok_bttn.addEventListener("click", function () {
    prompt_d.close();
    let dirty = document.getElementById("name").value;
    if(dirty != "" && dirty != null){
        let clean = DOMPurify.sanitize(dirty);
        el_out.textContent = `Prompt Result: ${clean}`;
    }else{
        el_out.textContent = `The user didn't enter anything.`;
    }
});