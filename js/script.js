/**
 Olá, esse é o scrip do projeto, se encontrar alguns códigos comentados, são apenas códigos que testei e que quero implementar no projeto no futuro, porém não estavam funcionando no momento.
 */


// Variáveis

let modalCadastro = document.getElementById("signup-screen")
let modalLogin = document.getElementById("login-screen")

let btnSenhaLogin = document.querySelector(".fa-eye")
let btnSenhaCadastro = document.querySelector("#verSenha")
let btnConfSenhaCadastro = document.querySelector("#verConfSenha")

let btnCadastro = document.getElementById("btn-cadastro")
let btnLogin = document.getElementById("btn-login")

let nome = document.querySelector("#nome")
let labelNome = document.querySelector("#labelNome")
let validNome = false

let email = document.querySelector("#email")
let labelEmail = document.querySelector("#labelEmail")
let validEmail = false

let usuario = document.querySelector("#usuarioCadastro")
let labelUsuario = document.querySelector("#labelUsuario")
let validUsuario = false

let senha = document.querySelector("#senhaCad")
let labelSenha = document.querySelector("#labelSenha")
let validSenha = false

let confSenha = document.querySelector("#conf-senha")
let labelConfSenha = document.querySelector("#labelConfSenha")
let validConfSenha = false

let msgErro = document.querySelector("#msgError")
let msgSucesso = document.querySelector("#msgSuccess")

let usuarioLogin = document.querySelector("#usuarioLogin")
let usuarioLoginLabel = document.querySelector("#usuarioLoginLabel")

let senhaLogin = document.querySelector("#senha")
let senhaLoginLabel = document.querySelector("#senhaLoginLabel")

// let logado = document.querySelector("#logado")

// Funções

function trocarModal() {

    if (modalCadastro.style.display == "none") {
        modalCadastro.style.display = "block"
        modalLogin.style.display = "none"
    } else {
        modalCadastro.style.display = "none"
        modalLogin.style.display = "block"
    }
}

function validateEmail(email) {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function sair() {
    localStorage.removeItem('token')
    //   localStorage.removeItem('userLogado')
    window.location.href = "./index.html"
}

// Eventos 

// Mostrar e esconder senha digitada

btnSenhaLogin.addEventListener("click", (e) => {

    e.preventDefault()

    let inputPassword = document.querySelector("#senha")

    if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute("type", "password")
    }
})

btnSenhaCadastro.addEventListener("click", (e) => {

    e.preventDefault()

    let inputPassword = document.querySelector("#senhaCad")

    if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute("type", "password")
    }
})

btnConfSenhaCadastro.addEventListener("click", (e) => {

    e.preventDefault()

    let inputPassword = document.querySelector("#conf-senha")

    if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute("type", "password")
    }
})

// Autenticações de inputs de cadastro

nome.addEventListener("keyup", () => {
    if (nome.value.length < 2) {
        labelNome.setAttribute("style", "color: red")
        labelNome.innerHTML = "Nome *Insira no mínimo 3 caracteres"
        nome.setAttribute("style", "border-color: red")
        validNome = false
    } else {
        labelNome.setAttribute("style", "color: green")
        labelNome.innerHTML = "Nome"
        nome.setAttribute("style", "border-color: green")
        validNome = true
    }
})

usuario.addEventListener("keyup", () => {
    if (usuario.value.length < 4) {
        labelUsuario.setAttribute("style", "color: red")
        labelUsuario.innerHTML = "Usuário *Insira no mínimo 4 caracteres"
        usuario.setAttribute("style", "border-color: red")
        validUsuario = false
    } else {
        labelUsuario.setAttribute("style", "color: green")
        labelUsuario.innerHTML = "Usuário"
        usuario.setAttribute("style", "border-color: green")
        validUsuario = true
    }
})

email.addEventListener("keyup", () => {

    if (validateEmail(email.value) == false) {
        labelEmail.setAttribute("style", "color: red")
        labelEmail.innerHTML = "Email *Email inválido"
        email.setAttribute("style", "border-color: red")
        validEmail = false
    } else {
        labelEmail.setAttribute("style", "color: green")
        labelEmail.innerHTML = "Email"
        email.setAttribute("style", "border-color: green")
        validEmail = true
    }
})

senha.addEventListener("keyup", () => {
    if (senha.value.length < 8) {
        labelSenha.setAttribute("style", "color: red")
        labelSenha.innerHTML = "Senha *Insira no mínimo 8 caracteres"
        senha.setAttribute("style", "border-color: red")
        validSenha = false
    } else {
        labelSenha.setAttribute("style", "color: green")
        labelSenha.innerHTML = "Senha"
        senha.setAttribute("style", "border-color: green")
        validSenha = true
    }
})

confSenha.addEventListener("keyup", () => {
    if (confSenha.value != senha.value) {
        labelConfSenha.setAttribute("style", "color: red")
        labelConfSenha.innerHTML = "Confirmar senha *As senhas são distintas"
        confSenha.setAttribute("style", "border-color: red")
        validConfSenha = false
    } else {
        labelConfSenha.setAttribute("style", "color: green")
        labelConfSenha.innerHTML = "Confirmar senha"
        confSenha.setAttribute("style", "border-color: green")
        validConfSenha = true
    }
})

// Cadastro e validação de dados

btnCadastro.addEventListener("click", () => {

    if (validNome && validEmail && validUsuario && validSenha && validConfSenha) {

        let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]")

        listaUser.push(
            {
                nome: nome.value,
                email: email.value,
                usuario: usuario.value,
                senha: senha.value
            }
        )

        localStorage.setItem("listaUser", JSON.stringify(listaUser))

        msgSucesso.setAttribute("style", "display: block")
        msgSucesso.innerHTML = "<strong>Cadastrado com sucesso!</strong>"
        msgErro.setAttribute("style", "display: none")

        setTimeout(() => {
            trocarModal()
        }, 2000)

    } else {
        msgErro.setAttribute("style", "display: block")
        msgErro.innerHTML = "<strong>Erro ao cadastrar-se, verifique novamente os dados</strong>"
        msgSucesso.setAttribute("style", "display: none")
    }
})

// Autenticações e validação de inputs de login

btnLogin.addEventListener("click", () => {

    let listaUser = []
    let userValid = {
        nome: '',
        usuario: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem("listaUser"))

    listaUser.forEach((item) => {
        if (usuarioLogin.value == item.usuario && senhaLogin.value == item.senha) {

            userValid = {
                nome: item.nome,
                usuario: item.usuario,
                senha: item.senha
            }

        }
    })

    if (usuarioLogin.value == userValid.usuario && senhaLogin.value == userValid.senha && usuarioLogin.value != '' && senhaLogin.value != '') {

        let token = Math.random().toString(16).substring(2)
        localStorage.setItem("token", token)

        //  localStorage.setItem("userLogado", JSON.stringify(userValid))

        //  let userLogado = JSON.parse(localStorage.getItem('userLogado'))
        //  logado.innerHTML = `Olá ${userLogado.nome}`

        window.location.href = "./home.html"

    } else {

        usuarioLoginLabel.setAttribute("style", "color: red")
        usuarioLogin.setAttribute("style", "border-color: red")
        senhaLoginLabel.setAttribute("style", "color: red")
        senhaLogin.setAttribute("style", "border-color: red")
        msgErro.setAttribute("style", "display: block")
        usuarioLogin.focus()

        if (usuarioLogin.value == '' || senhaLogin.value == '') {
            msgErro.innerHTML = "Usuário e/ou senha não preenchidos"
        } else {
            msgErro.innerHTML = "Usuário e/ou senha incorretos"
        }

    }



})

