// appel de l'API pour récuper tout les travaux
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

// <button> gérant l'affichage de tout les travaux de la gallerie
const allBtn = document.querySelector(".allBtn");
// utilisation de la function -filter pour filtrer les travaux souhaités
allBtn.addEventListener("click", function(e) {
    const allCategories = allWorks.filter(function (allWorks) {
        return allWorks;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWorks(allCategories);
    // console.log(allCategories, 'tout les travaux');
})

// <button> gérant l'affichage des travaux concernant les 'objets' dans la gallerie
const objectBtn = document.querySelector(".objectBtn");
// utilisation de la function -filter pour filtrer les travaux 'objets' -id= 1 souhaités
objectBtn.addEventListener("click", function(e) {
    const objectCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 1;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWorks(objectCategory);
    // console.log(objectCategory, 'objets');
});

// <button> gérant l'affichage des travaux concernant les 'appartements' dans la gallerie
const apartmentBtn = document.querySelector(".apartmentBtn");
// utilisation de la function -filter pour filtrer les travaux 'appartements' -id=2 souhaités
apartmentBtn.addEventListener("click", function(e) {
    const apartmentCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 2;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWorks(apartmentCategory);
    // console.log(apartmentCategory, 'appartements');
});

// <button> gérant l'affichage des travaux concernant les 'hotêls et restaurants' dans la gallerie
const hotelBtn = document.querySelector(".hotelBtn");
// utilisation de la function -filter pour filtrer les travaux 'hotêls et restaurants' -id=3 souhaités
hotelBtn.addEventListener("click", function(e) {
    const hotelCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 3;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWorks(hotelCategory);
    // console.log(hotelCategory, 'hotels');
});


const logoutBtn = document.querySelector(".logout");

    logoutBtn.addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("userToken");
        window.location.href = "index.html";
        // console.log(logoutBtn, 'raté')
    });

let userToken = localStorage.getItem("userToken");

// const editHomepage = document.querySelector(".edit");
    
    if (userToken !== null) {
        document.querySelector('.logout').style.display = 'block';
        document.querySelector('.btn-connect').style.display = 'none';
        document.querySelector(".edit").style.display = "block";
        document.querySelector(".modif").style.display = "block";
    }else{
        document.querySelector('.logout').style.display = 'none';
        document.querySelector('.btn-connect').style.display = 'block';
        document.querySelector(".edit").style.display = "none";
        document.querySelector(".modif").style.display = "none";
    };
    
    // quand je suis connectée je mets un display: block; pour qu'il puisse être vu
    // quandje suis déconnectée je mets un display: none; pour qu'il ne se voit pas