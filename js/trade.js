import { getNavBar } from '../components/navbar.js'

$(document).ready(() => {
    let urlParam = new URLSearchParams(window.location.search)
    let name = urlParam.get('name')
    $('header').append(getNavBar(name))

    function InicializarTela() {
        fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
            .then((res) => res.json())
            .then((dados) => GerarGrid(dados))
            .catch(console.error)
    }

    function GetStringCode(code) {
        return `<img src="assets/images/${code}.png" class="img-fluid"> ${code}`
    }

    function GerarGrid(dados){
        let tableBody = $('#body-table')

        console.log(dados)

        Object.values(dados).forEach((dado) => {
            tableBody.append(`
                <tr>
                    <td>${GetStringCode(dado.code)}</td>
                    <td>${dado.bid}</td>
                    <td>${dado.varBid}</td>
                </tr> 
            `)
        })
    }

    InicializarTela()
})
