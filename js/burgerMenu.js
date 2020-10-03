
document.querySelector(".burgerMenu").addEventListener("click", () => {
    const menuRight =  document.querySelector(".menu-right");
    const ul = menuRight.querySelector("ul");
    ul.style.height = window.innerHeight - menuRight.offsetHeight+"px";
    if ( ul.style.display==="") {
        ul.style.display = "grid";
        ul.addEventListener("click",()=>{
            ul.style.display="none"
        })
    }
    else
        ul.style.display = "";
});
document.querySelector("#tellMy").addEventListener("click", () => {
    // onClickClose(document.querySelector(".tellPhoneBlock"));
    modalMenu("tellPhoneBlock");
    onClickClose(document.querySelector(".tellPhoneBlock"));
    // const tellPhoneBlock =  document.querySelector(".tellPhoneBlock");
    // if ( tellPhoneBlock.style.display==="") {
    //     tellPhoneBlock.style.display = "block";
    //     tellPhoneBlock.addEventListener("click",()=>{
    //         tellPhoneBlock.style.display="none"
    //     })
    // }
    // else
    //     tellPhoneBlock.style.display = "";
    // onClickClose(document.querySelector("#tellMy"))
});
