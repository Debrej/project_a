let create_isset = false;
let show_isset = false;
let affect_isset = false;

function create_menu(){
    create_isset = !create_isset;
    show_isset = false;
    affect_isset = false;
    if(create_isset){
        document.getElementById("create").style.display = "flex";
    }
    else{
        document.getElementById("create").style.display = "none";
    }
    document.getElementById("show").style.display = "none";
    document.getElementById("affect").style.display = "none";
}

function show_menu(){
    show_isset = !show_isset;
    create_isset = false;
    affect_isset = false;
    if(show_isset){
        document.getElementById("show").style.display = "flex";
    }
    else{
        document.getElementById("show").style.display = "none";
    }
    document.getElementById("create").style.display = "none";
    document.getElementById("affect").style.display = "none";
}

function affect_menu(){
    affect_isset = !affect_isset;
    create_isset = false;
    show_isset = false;
    if(affect_isset){
        document.getElementById("affect").style.display = "flex";
    }
    else{
        document.getElementById("affect").style.display = "none";
    }
    document.getElementById("create").style.display = "none";
    document.getElementById("show").style.display = "none";
}

function on_click_container(){
    create_isset = false;
    show_isset = false;
    affect_isset = false;
    document.getElementById("create").style.display = "none";
    document.getElementById("show").style.display = "none";
    document.getElementById("affect").style.display = "none";
}