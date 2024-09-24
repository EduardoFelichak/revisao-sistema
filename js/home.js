import { getNavBar } from '../components/navbar.js'

$(document).ready(() => {
    $('header').append(getNavBar())

    let urlParam = new URLSearchParams(window.location.search)
    $('#param-email').text(urlParam.get('email'))

})