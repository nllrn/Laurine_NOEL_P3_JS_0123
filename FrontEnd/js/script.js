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

        const project = allWorks[i]; // TROUVER UN AUTRE NOM DE VARIABLE

        // récupération de l'élément du DOM qui recevra la galerie photo
        const sectionGallery = document.querySelector(".gallery");

        // création de la balise <figure> pour un projet
        const projectElement = document.createElement("figure");

        // création des balises situées à l'intérieur de <figure>
        const imageElement = document.createElement("img");
        // img.setAttribute("crossorigin", "anonymous");
        imageElement.src = project.image;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.figcaption;

        // rattachement de <figure> à la <div class="gallery">
        sectionGallery.appendChild(projectElement);
        // rattachement des <img> et <figcaption> à <figure>
        projectElement.appendChild(imageElement);
        projectElement.appendChild(figcaptionElement);
    }
    
};

// console.log(allWorks);
getAllWorks(allWorks);
