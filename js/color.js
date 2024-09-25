import { getNavBar } from '../components/navbar.js'

$(document).ready(() => {
    let urlParam = new URLSearchParams(window.location.search)
    let email = urlParam.get('email')
    $('header').append(getNavBar(email))

    function InicializarTela() {
        fetch('https://reqres.in/api/unknown')
            .then((res) => res.json())
            .then((dados) => GerarGrid(dados.data))
            .catch(console.error)
    }

    function GerarGrid(cores){
        let tableBody = $('#body-table')

        console.log(cores)

        cores.forEach((cor) => {
            tableBody.append(`
                <tr>
                    <td>${cor.id}</td>
                    <td>${cor.name}</td>
                    <td class="text-white" style="background-color: ${cor.color};">${cor.color}</td>
                </tr> 
            `)
        })
    }

    InicializarTela()
})