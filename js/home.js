import { getNavBar } from '../components/navbar.js'

$(document).ready(() => {
    let urlParam = new URLSearchParams(window.location.search)
    let email = urlParam.get('email')
    $('#param-email').text(email)
    $('header').append(getNavBar(email))
})