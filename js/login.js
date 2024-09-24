$(document).ready(() => {
    $('#btn-login').on('click', () => {
        let email    = $('#lbl-email').val()
        let password = $('#lbl-pass').val()

        if (!validaCredenciais(email, password))
            return

        $.ajax({
            url: 'https://reqres.in/api/login',
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            success: () => {
                window.location.href = `home.html?email=${encodeURIComponent(email)}`
            },
            error: () => {
                alert('Credenciais Inválidas')
            }
        })
    })

    function validaCredenciais(email, password) {
        txtEmail = $('#text-email')
        txtPass  = $('#text-pass')
        correto  = true

        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!email){
            txtEmail.text('E-mail não informado').addClass('text-danger')
            correto = false
        }
        else {
            if (!emailRegex.test(email)){
                txtEmail.text('E-mail inválido').addClass('text-danger')
                correto = false
            }
            else 
                txtEmail.text('Endereço de e-mail').removeClass('text-danger')
        }

        if (!password){
            txtPass.text('Senha não informada').addClass('text-danger')
            correto = false
        }
        else
            txtPass.text('Senha').removeClass('text-danger')

        return correto
    }
})