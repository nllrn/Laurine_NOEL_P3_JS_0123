document.formLogin.addEventListener('submit', async function (e) {
   e.preventDefault();

    const user = {
        email: this.email.value,
        password: this.password.value,
    };
// new FormData(this).forEach((v, k) => user[k] = v);
// console.log(new FormData(this));
// console.log(user);

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    
    const data = await reponse.json();
    if (data.token) {
        window.localStorage.setItem("tokenUser", JSON.stringify(data));
        document.location.href="index.html";
    }else if(data.message){
        alert('utilisateur non connu')
    }else{
        alert('login ou mot de passe incorrect')
    };
    console.log(data.token);
});