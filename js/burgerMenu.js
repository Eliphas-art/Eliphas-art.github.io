
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

