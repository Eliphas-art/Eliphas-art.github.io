function onClickClose(elem) { // вызвать в момент показа окна, где elem - окно
    setTimeout(()=>{document.addEventListener('click', outsideClickListener)},0);
    function outsideClickListener(event) {
        if (elem.style.display!=="")
            if (!elem.contains(event.target) && isVisible(elem)) {  // проверяем, что клик не по элементу и элемент виден
                elem.style.display = ''; //скрыть
                document.removeEventListener('click', outsideClickListener);
            }
    }
}
function isVisible(elem) { //открыто ли условное окно
    return !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
}
function modalMenu(blocks) {
    blocks =  document.querySelector(`.${blocks}`);
    if ( blocks.style.display==="") {
        blocks.style.display = "block";
    }
    else
        blocks.style.display = "";
}
function resetStore() {
    let cookies = document.cookie.split(";");
    localStorage.clear();
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.reload(true);
}
