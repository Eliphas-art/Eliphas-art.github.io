const cardList = [];
let commentInterval;
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
    const commentBlockForm = document.querySelector(".commentForm");
    const nameComment = commentBlockForm.querySelector("#nameComment").value;
    const textComment = commentBlockForm.querySelector("#textComment");
    const practiceComment = commentBlockForm.querySelector("#practiceComment").value;
    const label = commentBlockForm.querySelectorAll("label");

    label[1].style.color="black";
    commentBlockForm.classList.remove("commentModalError");
    textComment.style.border="1px solid black";

    if (textComment.value.length<20){
        commentInterval =setInterval(()=>{
            if(textComment.value.length>=20){
                label[1].style.color="black";
                textComment.style.border="1px solid black";
                textComment.style.color="black";
            }
            else {
                label[1].style.color="tomato";
                // commentBlockForm.classList.add("commentModalError");
                textComment.style.border="1px solid tomato";
                textComment.style.color="tomato";
            }
        })

    }else {
        const stirs = JSON.parse(localStorage.getItem("Comment"));
        const storeObj = {
            ids: stirs.length,
            comment: textComment.value,
            name: nameComment,
            practice: practiceComment
        };
        stirs.push(storeObj);
        localStorage.setItem("Comment", JSON.stringify(stirs));
        location.reload();
        modalMenu("commentModal")
    }
}
document.querySelector("#comment").querySelector(".button").addEventListener("click", () => {
    modalMenu("commentModal");

    document.querySelector(`.${"commentModal"}`).querySelector(".overlay").addEventListener("click",()=>{
    document.querySelector(`.${"commentModal"}`).style.display = "";
    })
});

