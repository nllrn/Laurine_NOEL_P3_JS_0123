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
    modal.querySelector('.js-modal-stop').addEventListener("click", stopPropagation);
    modal.querySelector('.js-modal-close2').addEventListener("click", closeModal);
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
    modal.querySelector('.js-modal-stop').removeEventListener("click", stopPropagation);
    modal.querySelector('.js-modal-close2').removeEventListener("click", closeModal);
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
        // console.log(imageModal.id);


        const directionBtn = document.createElement("button");
        directionBtn.classList.add("directionBtn");

        const iconArrowDirection = document.createElement("i");
        iconArrowDirection.classList.add("fa-solid", "fa-arrows-up-down-left-right");

        const deleteWorkBtn = document.createElement("button");
        deleteWorkBtn.classList.add("deleteWorkBtn");

        const iconTrashcan = document.createElement("i");
        iconTrashcan.classList.add("fa-solid", "fa-trash-can");

        const titleModal = document.createElement("figcaption");
        titleModal.innerText = 'éditer';

        sectionGalleryModal.appendChild(figureModal);

        figureModal.appendChild(imageModal);
        figureModal.appendChild(directionBtn);
        figureModal.appendChild(deleteWorkBtn);
        figureModal.appendChild(titleModal);
        directionBtn.appendChild(iconArrowDirection);
        deleteWorkBtn.appendChild(iconTrashcan);

        // deleteWorkBtn.addEventListener("click", async function (e) {
        //     e.preventDefault(e);

        //     let userToken = JSON.parse(localStorage.getItem("userToken"));
        //     let id = projectsModal.id;
            
        //     // console.log(userToken)
        //     const response = await fetch(`http://localhost:5678/api/works/${id}`,
            
        //         {
        //             method: "DELETE",
        //             headers: { Authorization : "Bearer " + userToken.token }
                    
        //         });
        //     // console.log(projectsModal.id)
        //     const deleteWorkBtn = await response.json();
        //     // console.log(deleteWorkBtn);
        // });

        deleteWorkBtn.addEventListener("click", async function (e) {
            e.preventDefault();

            let userToken = JSON.parse(localStorage.getItem("userToken")); 
            console.log("userToken " + userToken.token);

            const response = await fetch(`http://localhost:5678/api/works/${projectsModal.id}`,
                {
                    method: "DELETE",
                    headers: {
                      Authorization: "Bearer " + userToken.token,
                    },
                });

            if (response.ok) {
                console.log("delete OKKKKKK")
                const element = deleteWorkBtn.parentNode;
                element.remove();
            } else {
                console.log("delete KOOOOOOO")
            };

            const deleteOneWork = await response.json();
            console.log(deleteOneWork);
        });
    }

};    

// console.log(allWorksModal);
getAllWorksModal(allWorksModal);

// export 

    const formProject = document.getElementById("add-project");

    formProject.addEventListener("submit", async function (e) {
        e.preventDefault();

    /*    // permet la création d'un obejt pour l'ajout d'un nouveau projet
        const project = {
            image: e.target.querySelector("[name=imageUrl]").value,
            title: e.target.querySelector("[name=title]").value,
            category: e.target.querySelector("[name=category]").value,
        };

        // création charge utile au format JSON.stringify pour pouvoir l'utiliser dans la function fetch
        const chargeUtileProject = JSON.stringify(project);

        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers : {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                Authorization : "Bearer " + userToken.token,
            },
            body: chargeUtileProject,
        });

        // formProject = await reponse.json();
        */
    
        let userToken = JSON.parse(localStorage.getItem("userToken")); 

        const newProjectImage = document.querySelector("#file").files[0];
        const newProjectTitle = document.querySelector("#title").value;
        const newProjectCategory = document.querySelector("#category").value;

        
        console.log("newProjectCategory " + newProjectCategory)

        const formData = new FormData();

        formData.append("image", newProjectImage);
        formData.append("title", newProjectTitle);
        formData.append("category", newProjectCategory);

        

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers : {
                // accept : 'application/json',
                Authorization : "Bearer " + userToken.token,
                // 'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        const responseData = await response.json();
        console.log(responseData);
        
    });
    console.log(formProject);
    

// /* curl -X 'POST' \
//   'http://localhost:5678/api/works' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Nzg2NTUzMywiZXhwIjoxNjc3OTUxOTMzfQ.1qSgeo8AS19Iqjjv_lfuymlh1DztROK_vnsbhGVWwsM' \
//   -H 'Content-Type: multipart/form-data' \
//   -F 'image=' \
//   -F 'title=' \
//   -F 'category=' */

// /* "id": 1,
//     "title": "Abajour Tahina",
//     "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
//     "categoryId": 1,
//     "userId": 1,
//     "category": {
//       "id": 1,
//       "name": "Objets" */