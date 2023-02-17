let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector('.js-modal-close').addEventListener("click", closeModal);
    modal.querySelector('.js-modal-stop').addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', "true");
    modal.removeAttribute('aria-modal');
    modal.removeEventListener("click", closeModal);
    modal.querySelector('.js-modal-close').removeEventListener("click", closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener("click", stopPropagation);
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation()
};

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
});

let allWorksModal = window.localStorage.getItem("allWorksModal");

if (allWorksModal ===  null) {
    const reponse = await fetch("http://localhost:5678/api/works");
    const allWorksModal = await reponse.json();

    const valeurAllWorksModal = JSON.stringify(allWorksModal);
    window.localStorage.setItem("allWorksModal", valeurAllWorksModal);
}else{
    allWorksModal = JSON.parse(allWorksModal);
};

function getAllWorksModal(allWorksModal) {
    for (let i = 0; i < allWorksModal.length; i++) {

        const projectsModal = allWorksModal[i];

        const sectionGalleryModal = document.querySelector(".gallery-modal");

        const figureModal = document.createElement("figure");

        const deleteWorkBtn = document.createElement("button");
        deleteWorkBtn.classList.add("deleteWorkBtn");
        // deleteBtn.innerText = 'supprimer';

        const deleteSpanWork = document.createElement("span");
        deleteSpanWork.innerText = 'supprimer'; 

        const iconTrashcan = document.createElement("i");
        iconTrashcan.classList.add("fa-solid", "fa-trash-can")
        

        const imageModal = document.createElement("img");
        imageModal.setAttribute("crossorigin", "anonymous");
        imageModal.src = projectsModal.imageUrl;

        const titleModal = document.createElement("figcaption");
        titleModal.innerText = 'éditer'

        sectionGalleryModal.appendChild(figureModal);

        figureModal.appendChild(imageModal);
        figureModal.appendChild(deleteWorkBtn);
        deleteWorkBtn.appendChild(iconTrashcan);
        deleteWorkBtn.appendChild(deleteSpanWork);
        figureModal.appendChild(titleModal);
        
    }
};

getAllWorksModal(allWorksModal);


// const deleteWork = document.querySelector(".deleteWorkBtn");

// deleteWork.addEventListener("click", function(e) {
//     const deleteOneWork = 
// })





// const deleteOneWork = document.querySelector(".deleteWorkBtn");

// // deleteWorkBtn.localStorage.getItem(allWorksModal);

// // let deleteOneWork = document.querySelector(".deleteWorkBtn");

// deleteOneWork.addEventListener("click", async function (e) {
//     e.preventDefault();

    
//     //window.localStorage.getItem("deleteOneWork");

//     if (deleteOneWork === null) {
//         const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
//             method: "DELETE",
//             headers: {'Authorization': `Bearer ${userToken}`},
//             body : JSON.stringify(deleteOneWork),
//         });

//         const deleteOneWork = await reponse.json();
//     }else{
//         alert('raté')
//     };

//     window.localStorage.removeItem(`allWorksModal${id}`);
    
// });