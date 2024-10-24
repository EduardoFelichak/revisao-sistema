const URL_BASE = 'http://localhost:8080/user'

$(document).ready(() => {
    $('#btn-login').on('click', () => {
        let email    = $('#lbl-email').val()
        let password = $('#lbl-pass').val()

        if (!validaCredenciais(email, password))
            return

        $.ajax({
            url: `${URL_BASE}/auth`,
            method: 'POST',
            contentType: 'application/json', 
            data: JSON.stringify({
                email: email,
                pass: password
            }),
            success: (response) => {
                debugger
                console.log(response)

                if (response.id) {
                    window.location.href = `home.html?name=${encodeURIComponent(response.nome)}`;
                } else {
                    alert('Login falhou');
                }
            },
            error: () => {
                alert('Credenciais Inválidas')
            }
        });
        
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