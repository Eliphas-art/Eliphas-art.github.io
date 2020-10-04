
const x = document.getElementById("personName");
function clicked(){
    console.log(x.getBoundingClientRect());
    // console.log( 'Текущая прокрутка сверху: ' + window.pageYOffset );
}

setInterval(() => {
    if (x.getBoundingClientRect().y >= 0) {
        document.querySelector(".menu-right").style.display="none";
    }
    else {
        document.querySelector(".menu-right").style.display="grid";

    }
},100);
