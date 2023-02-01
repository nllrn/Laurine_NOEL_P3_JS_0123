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

console.log(allWorks);
getAllWorks(allWorks);
