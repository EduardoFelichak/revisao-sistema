import { getNavBar } from '../components/navbar.js'


const URL_BASE = 'http://localhost:8080/produtos'

$(document).ready(() => {
    let urlParam = new URLSearchParams(window.location.search)
    let email = urlParam.get('email')
    $('#param-email').text(email)
    $('header').append(getNavBar(email))

    function InicializarTela() {
        fetch(URL_BASE)
            .then((res) => res.json())
            .then((dados) => GerarGrid(dados))
            .catch(console.error)
    }

    function GerarGrid(dados) {
        let tableBody = $('#body-table')

        Object.values(dados).forEach(dado => {
            tableBody.append(`
                <tr>
                    <td>${dado.nome}</td>
                    <td>${dado.descricao}</td>
                    <td>R$ ${dado.preco}</td>
                    <td>
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="EditarProduto('${dado.id}')">
                            <i class="bi bi-pen"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="DeletarProduto('${dado.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>    
            `)
        })
    }

    window.DeletarProduto = function(id){
        alert(id)
    }

    window.EditarProduto = function(id){
        alert(id)
    }

    InicializarTela()
})

