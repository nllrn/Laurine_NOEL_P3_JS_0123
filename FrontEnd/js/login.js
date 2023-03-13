document.formLogin.addEventListener('submit', async function (e) {
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
    if (data.token) {
        window.localStorage.setItem("userToken", JSON.stringify(data));
        document.location.href = "index.html";
        alert("Bienvenue !");
    }else if(data.message){
        alert("L'utilisateur n'est pas enregistré.");
    }else{
        alert("L'adresse mail ou le mot de passe ne correspond pas.");
    };
    // console.log(data.token);
});