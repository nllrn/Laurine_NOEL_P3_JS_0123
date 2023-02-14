// document.formLogin.addEventListener('submit', async function (e) {
//    e.preventDefault();

//     const user = {
//         email: this.email.value,
//         password: this.password.value,
//     };

//     const reponse = await fetch("http://localhost:5678/api/users/login", {
//         method: "POST",
//         headers: {
//         'accept': 'application/json',
//         'Content-Type': 'application/json'},
//         body: JSON.stringify(user)
//     });
    
//     const data = await reponse.json();
//     if (data.token) {
//         window.localStorage.setItem("tokenUser", JSON.stringify(data));
//         document.location.href = "index.html";
//         form.querySelector(".logout").style.display = "block";
//     }else if(data.message){
//         alert("L'utilisateur n'est pas enregistré.")
//     }else{
//         alert("L'adresse mail ou le mot de passe ne correspond pas.")
//     };
//     console.log(data.token);
// });

// function logout() {
//     if (userToken === null) {
//         window.location.href = "index.html";
//     }
// }

// document.formLogin.addEventListener('submit', function(e) {
//     e.preventDefault();
//     // adminForm(this, 'login');
// });

// async function loginForm(form, route) {
//     const inputs = {};
//     new FormData(form).forEach((v, k) => inputs[k] = v);

//     const reponse = await fetch("http://localhost:5678/api/users/login", {
//         method: "POST",
//         headers: {
//         'accept': 'application/json',
//         'Content-Type': 'application/json'},
//         body: JSON.stringify(user)
//     });

//     const data = await reponse.json();

//     if (data) {
//         let info = data=messsage;
//         if (!info) {
//             info = (route === 'signup')
//             ? `L'utilisateur a bien été enregistré !`
//             : `Vous êtes connecté.`;

//             if (data.token) {
//                 userToken = data.token;
//                 this.querySelector('.logout').style.display = 'block';

//             } 
//         }

//         if (!data.user) form.reset();
//         form.firstElementChild.textContent = info;
//         setTimeout(() => form.firstElementChild.textContent = '', 3000);
//     }

//     function logout(bt) {
//         bt.style.display = 'none';
//         userToken = '';
//     }

    
// }

document.formLogin.addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const user = {
            email: this.email.value,
            password: this.password.value,
    };

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    const data = await reponse.json();

// console.log(data)

    if (data) {
        const info = data.message || `Vous êtes connecté.`;
        alert (info);
        window.location.href = "index.html";
        if (data.token) {
            userToken = data.token;
            this.querySelector('.logout').style.display = 'block';
        }


        // if (data.user) this.reset();
        // console.log(userToken);
    }
    
});

function logout(bt) {
        bt.style.display = 'none';
        userToken = '';
    }

// const editHomepage = document.querySelector(".edit");
// const btnHomepage = document.querySelector(".btn-connect");
// let userToken = '';

// btnHomepage.addEventListener("click", () => {
//     if (userToken !== null) {
//         document.querySelector('.logout').style.display = 'none';
//         document.querySelector('.btn-connect').style.display = 'block';
//         document.querySelector(".edit").style.display = "none";
//     }else{
//         document.querySelector('.logout').style.display = 'block';
//         document.querySelector('.btn-connect').style.display = 'none';
//         document.querySelector(".edit").style.display = "block";
//         // this.querySelector(".btn-connect").style.display = "none";
//         // this.querySelector(".edit").style.display = "none";
//         // this.querySelector(".btn-deconnect").style.display = "block";
//         // document.querySelector('.btn-connect').style.display = 'block';
//     }
//     // editHomepage.innerHTML = '.edit';
// })

// quand je suis connectée je mets un display: block; pour qu'il puisse être vu
// quand je suis déconnectée je mets un display: none; pour qu'il ne se voit pas