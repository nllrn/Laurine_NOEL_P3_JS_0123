let allWorks = window.localStorage.getItem("allWorks");

if (allWorks === null) {
    const reponse = await fetch("http://localhost:5678/api/works");
    const allWorks = await reponse.json();

    const valeurAllWorks = JSON.stringify(allWorks);
    window.localStorage.setItem("allWorks", valeurAllWorks);
}else{
    allWorks = JSON.parse(allWorks);
};

function getAllWorks(allWorks) {
    for (let i = 0; i < allWorks.length; i++) {

        const projects = allWorks[i];

        // récupération de l'élément du DOM qui recevra la galerie photo
        const sectionGallery = document.querySelector(".gallery");

        // création de la balise <figure> pour un projet
        const figure = document.createElement("figure");

        // création des balises situées à l'intérieur de <figure>
        const image = document.createElement("img");
        image.setAttribute("crossorigin", "anonymous");
        image.src = projects.imageUrl;
        const title = document.createElement("figcaption");
        title.innerText = projects.title;

        // rattachement de <figure> à la <div class="gallery">
        sectionGallery.appendChild(figure);
        // rattachement des <img> et <figcaption> à <figure>
        figure.appendChild(image);
        figure.appendChild(title);
    }
    
};

// console.log(allWorks);
getAllWorks(allWorks);

const objectBtn = document.querySelector(".objectBtn");

objectBtn.addEventListener("click", function() {
    const objectCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 1;
    });
    document.querySelector(".objectBtn").innerHTML = "";
    getAllWorks(objectCategory);
    console.log(objectCategory, 'objets');
});

const apartmentBtn = document.querySelector(".apartmentBtn");

apartmentBtn.addEventListener("click", function() {
    const apartmentCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 2;
    });
    document.querySelector(".apartmentBtn").innerHTML = "";
    getAllWorks(apartmentCategory);
    console.log(apartmentCategory, 'appartements');
});

const hotelBtn = document.querySelector(".hotelBtn");

hotelBtn.addEventListener("click", function() {
    const hotelCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 3;
    });
    document.querySelector(".hotelBtn").innerHTML = "";
    getAllWorks(hotelCategory);
    console.log(hotelCategory, 'hotels');
});

// let categories = window.localStorage.getItem("categories");

// if (categories === null) {
//     const answer = await fetch("http://localhost:5678/api/categories");
//     const categories = await answer.json();

//     const valeurCategories = JSON.stringify(categories);
//     window.localStorage.setItem("categories", valeurCategories);
// }else{
//     categories = JSON.parse(categories);
// };

// function getCategories(getCategories){
//     for (let i = 0; i < getCategories.length; i++) {

//         const categories = getCategories[i];

//         // const allBtn = document.querySelector(".allBtn");
//         // allBtn.innerText = categories.category;

//         const objectBtn = document.querySelector(".objectBtn");
//         objectBtn.innerText = categories.categoryId = 1;
//     }
// };

// getCategories(categories);

// const objectBtn = document.querySelector(".objectBtn");

// objectBtn.addEventListener("click", function(e) {
//     const objectCategory = categories.filter(function (categories) {
//         return categories.categoryId = 1;
//     });
//     document.querySelector(".objectBtn").innerHTML = "";
//     getCategories(objectCategory);
//     console.log(objectCategory, 'tas encore du boulot ma fille');
// });