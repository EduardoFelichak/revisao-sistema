import { getNavBar } from '../components/navbar.js'

const URL_BASE = 'http://localhost:8080/produtos'
const INSERT_STATE = 0
const EDIT_STATE   = 1

$(document).ready(() => {
    let urlParam = new URLSearchParams(window.location.search)
    let email = urlParam.get('email')
    $('#param-email').text(email)
    $('header').append(getNavBar(email))

    function FetchRegistros() {
        fetch(URL_BASE)
            .then((res) => res.json())
            .then((dados) => GerarGrid(dados))
            .catch(console.error)
    }

    function GerarGrid(dados) {
        let tableBody = $('#body-table')
        tableBody.empty()

        Object.values(dados).forEach(dado => {
            tableBody.append(`
                <tr>
                    <td>${dado.nome}</td>
                    <td>${dado.descricao}</td>
                    <td>R$ ${dado.preco.toFixed(2)}</td>
                    <td>
                        <button type="button" class="btn btn-outline-danger btn-sm edit" data-id="${dado.id}" data-state="1" data-bs-toggle="modal" data-bs-target="#product-modal">
                            <i class="bi bi-pen"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm delete" data-id="${dado.id}" data-bs-toggle="modal" data-bs-target="#confirm-delete">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>    
            `)
        })
    }

    $('#insert').on('click', () => {
        $('#product-name').val('')
        $('#product-descr').val('')
        $('#product-price').val('')

        $('#product-modal-label').text('Inserir Produto')

        $('#product-form').removeAttr('data-id')
        $('#product-form').attr('data-state', INSERT_STATE)
    })

    $(document).on('click', '.edit', function() {
        let productId = $(this).data("id")

        fetch(`${URL_BASE}/${productId}`)
            .then(res => res.json())
            .then(produto => {
                $('#product-name').val(produto.nome)
                $('#product-descr').val(produto.descricao)
                $('#product-price').val(produto.preco)

                $('#product-modal-label').text('Editar Produto')

                $('#product-form').attr('data-id', productId)
                $('#product-form').attr('data-state', EDIT_STATE)
            })
            .catch(console.error)
    })

    $('#save-product').on('click', () => {
        debugger
        let state  = $('#product-form').attr('data-state')
        let url    = URL_BASE
        let method = 'POST'

        if (state == EDIT_STATE) {
            url    = `${url}/${$('#product-form').attr('data-id')}`
            method = 'PUT'
        }

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json', 
            data: JSON.stringify({
                nome: $('#product-name').val(),
                descricao: $('#product-descr').val(),
                preco: parseFloat($('#product-price').val())
            }),
            success: () => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('product-modal'))
                modal.hide()

                FetchRegistros()
            },
            error: () => {
                alert('Erro ao salvar produto')
            }
        })
    })

    $(document).on('click', '.delete', function() {
        let productId = $(this).data("id")

        $('#confirm-delete').attr('data-id', productId)
    })

    $('#yes-delete').on('click', function() {
        let productId = $('#confirm-delete').attr('data-id')

        $.ajax({
            url: `${URL_BASE}/${productId}`,
            method: 'DELETE',
            success: () => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('confirm-delete'))
                modal.hide()

                FetchRegistros()
            },
            error: () => {
                alert('Erro ao deletar produto')
            }
        })
    })

    FetchRegistros()
})

