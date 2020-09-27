// let obj = {
//     item1: 1,
//     item2: [123, "two", 3.0],
//     item3:"hello",
//     item4:"triki"
// };
//
// let serialObj = JSON.stringify(obj); //сериализуем его
// localStorage.setItem("myKey", serialObj); //запишем его в хранилище по ключу "myKey"
// let returnObj = JSON.parse(localStorage.getItem("myKey")); //спарсим его обратно объект
//
// console.log(returnObj.item2);
// obj.item2 = returnObj.item2;
// obj.item2.push("trula");
// console.log(returnObj.item2);
// serialObj = JSON.stringify(obj); //сериализуем его
// localStorage.setItem("myKey", serialObj);
// returnObj = JSON.parse(localStorage.getItem("myKey"));
// console.log(returnObj);

const caseCardDB=[{
    img: "res/Family1-800x571.jpg",
    h3: "Family Violence 1",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/header_slider_01.jpg",
    h3: "Family Violence 2",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/Reinventing-the-Riverfront-800x571.jpg",
    h3: "Family Violence 3",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/layer-bg1.jpg",
    h3: "Family Violence 4",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/Giving-Million-Air-Its-Wings-800x571.jpg",
    h3: "Family Violence 5",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/Family1-800x571.jpg",
    h3: "Family Violence 6",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/layer-bg1.jpg",
    h3: "Family Violence 7",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/Giving-Million-Air-Its-Wings-800x571.jpg",
    h3: "Family Violence 8",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
},{
    img: "res/Family1-800x571.jpg",
    h3: "Family Violence 9",
    // p: "John is the leader of the Working Group on International Taxation & EU Harmonization in UK at the American Chamber of Commerce."
}];
const caseCardCollect=[];
const cases = document.querySelector("#case");
const casesContent = cases.querySelector(".content");
const caseCard = document.createElement("div");
const imgBlock= document.createElement('div');
const img = document.createElement('img');
const h3 = document.createElement("h3");
const cardsRand = [];
let arrow = false;
caseCard.classList = "card";
imgBlock.classList = "img";
for (let i = 0; i<caseCardDB.length;i++) {
    caseCardCollect[i] = copyTagCard(caseCard, caseCardDB[i]);
}
let caseCount = caseCardCollect.length;
function casesF() {
    arrow = !arrow;
    casesContent.innerHTML = `<button onclick="casesF()" class="button">View all cases <i class="fas fa-long-arrow-alt-${arrow?"right":"left"}"></i></button>`;
    if (caseCount === 3|| caseCount === 1) {
        caseCount = caseCardDB.length;
    } else {
        caseCount = window.innerWidth <= 1215&& window.innerWidth>413 ? 2 : window.innerWidth <= 413 ? 1 : 3;
    }
    for (let i = 0; i<caseCardDB.length;i++) {
        cardsRand[i]=i
    }
    for (let i = 0; i < caseCount; i++) {
        let x = Math.floor(Math.random() * cardsRand.length);
        casesContent.prepend(caseCardCollect[cardsRand[x]]);
        cardsRand.splice(x,1);
    }
}
function copyTagCard(tag, inner, appernd) {
    const tags = tag.cloneNode(true);
    if (typeof inner ==="object"){
        let x = copyTagCard(imgBlock, false, tags);
        copyTagCard(img, inner.img, x);
        copyTagCard(h3, inner.h3, tags);
    }
    else if (inner !== false) {
        tags.src = inner;
        tags.innerHTML = inner;
    }
    if (appernd)
        appernd.append(tags);
    return tags
}

casesF();
