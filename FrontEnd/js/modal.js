let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', true);
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector('.js-modal-close').addEventListener("click", closeModal);
    modal.querySelector('.js-modal-close2').addEventListener("click", closeModal);
    modal.querySelector('.js-modal-stop').addEventListener("click", stopPropagation);
    modal.querySelector('.js-modal-stop2').addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
    console.log('closeModal called');
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', "true");
    modal.removeAttribute('aria-modal');
    modal.removeEventListener("click", closeModal);
    modal.querySelector('.js-modal-close').removeEventListener("click", closeModal);
    modal.querySelector('.js-modal-close2').removeEventListener("click", closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener("click", stopPropagation);
    modal.querySelector('.js-modal-stop2').removeEventListener("click", stopPropagation);
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
    allWorksModal = await reponse.json();

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

        const imageModal = document.createElement("img");
        imageModal.setAttribute("crossorigin", "anonymous");
        imageModal.src = projectsModal.imageUrl;
        imageModal.alt = projectsModal.title;
        imageModal.id = projectsModal.id;
        // console.log(projectsModal.id);

        

        const deleteWorkBtn = document.createElement("button");
        deleteWorkBtn.classList.add("deleteWorkBtn");

        const iconTrashcan = document.createElement("i");
        iconTrashcan.classList.add("fa-solid", "fa-trash-can");

        const titleModal = document.createElement("figcaption");
        titleModal.innerText = 'éditer';

        sectionGalleryModal.appendChild(figureModal);

        figureModal.appendChild(imageModal);
        figureModal.appendChild(deleteWorkBtn);
        figureModal.appendChild(titleModal);
        deleteWorkBtn.appendChild(iconTrashcan);

        deleteWorkBtn.addEventListener("click", async function (e) {
            e.preventDefault(e);

            let userToken = sessionStorage.getItem("userToken");
            // console.log(userToken)
            const response = await fetch(`http://localhost:5678/api/works/${projectsModal.id}`,
                {
                    method: "DELETE",
                    headers: { 'Authorization' : 'Bearer' + userToken },
                    
                });

            const deleteWorkBtn = await response.json();
            console.log(deleteWorkBtn);
        });

    }

};    

// console.log(allWorksModal);
getAllWorksModal(allWorksModal);