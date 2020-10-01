const cardList = [];
function comment() {
    const commentBlock = document.querySelector("#comment");
    const sliderTrack = commentBlock.querySelector(".slider-track");
    const icon = commentBlock.querySelector("i");
    const slide = document.createElement("div");slide.classList.add("slide");
    const card = document.createElement("div"); card.classList.add("card");
    const p = document.createElement("p");
    const h3 = document.createElement("h3");
    const em = document.createElement("em");
    commentBlock.addEventListener("mouseenter", (e) => {
        active(icon, "iActive", true);
    });
    commentBlock.addEventListener("mouseleave", (e) => {
        active(icon, "iActive", false);
    });
    let storeObj = storeRead();
    cardList.length=0;
    sliderTrack.innerHTML = "";
    storeObj.forEach((element) => {
        cardList.push({});
        cardList[element.ids].slide = cloneTag(slide, sliderTrack);
        cardList[element.ids].card = cloneTag(card, cardList[element.ids].slide);
        cardList[element.ids].p = cloneTag(p, cardList[element.ids].card, element.comment);
        cardList[element.ids].h3 = cloneTag(h3, cardList[element.ids].card, element.name);
        cardList[element.ids].em = cloneTag(em, cardList[element.ids].card, element.practice);
    });
    console.log(cardList);

}
function cloneTag(tag,from,inner) {
    const tags = tag.cloneNode(true);
    if (inner)
        tags.innerHTML = inner;
    from.appendChild(tags);
    return tags;
}
function storeRead() {
    if (localStorage.getItem("Comment") == null) {
        let storeObj = [
            {
                ids: 0,
                comment: "Я обратился к адвокату за помощью. Нами была определена позиция. Адвокат возобновил сроки на обжалование, подал апелляционную жалобу. В ходе выступления в суде адвоката решение суда первой инстанции было изменено и принято новое решение в мою пользу. Работой адвоката доволен.",
                name: "Федоренко Игорь Владимирович",
                practice: "Гражданское право"
            }, {
                ids: 1,
                comment: "Я обратился к адвокату за помощью. Нами была определена позиция. Адвокат возобновил сроки на обжалование, подал апелляционную жалобу. В ходе выступления в суде адвоката решение суда первой инстанции было изменено и принято новое решение в мою пользу. Работой адвоката доволен.",
                name: "Федоренко Игорь Владимирович",
                practice: "Гражданское право"
            },
        ];
        let serialStore = JSON.stringify(storeObj);
        localStorage.setItem("Comment", serialStore);
    }
    return JSON.parse(localStorage.getItem("Comment"));
}
function active(tag,classNames,boolean) {
    if(boolean)
        tag.classList.add(classNames);
    else
        tag.classList.remove(classNames);
}

comment();
function addComment() {
    const nameComment = document.querySelector("#nameComment").value;
    const textComment = document.querySelector("#textComment").value;
    const practiceComment = document.querySelector("#practiceComment").value;
    const stirs = JSON.parse(localStorage.getItem("Comment"));
    const storeObj = {
        ids: stirs.length,
        comment: textComment,
        name: nameComment,
        practice: practiceComment
    };
    stirs.push(storeObj);
    localStorage.setItem("Comment", JSON.stringify(stirs));
    location.reload();
    modalMenu("commentModal")
}
document.querySelector("#comment").querySelector(".button").addEventListener("click", () => {
    modalMenu("commentModal")
});

function modalMenu(blocks) {
    blocks =  document.querySelector(`.${blocks}`);
    if ( blocks.style.display==="") {
        blocks.style.display = "block";
    }
    else
        blocks.style.display = "";
}