{/* <link rel="stylesheet" 
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</link> */}

        {/* <button style="font-size:24px;color:red">
<i class="fa fa-trash-o"></i>
</button> */}

        {/* <button style="font-size:24px">
<i class="fa fa-edit"></i>
</button> */}

export function style_delete (element) {
    element.style = "font-size:18px;color:red";
    element.className = "fa fa-trash-o";
    return element;
}


export function style_edit (element) {
    element.style = "font-size:18px";
    element.className = "fa fa-edit";
    return element;
}
