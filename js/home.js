import { getNavBar } from '../components/navbar.js'

$(document).ready(() => {
    let urlParam = new URLSearchParams(window.location.search)
    let name = urlParam.get('name')
    $('#param-name').text(name)
    $('header').append(getNavBar(name))
})