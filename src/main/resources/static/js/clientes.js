/**
 * Controlador de Clientes
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de los Clientes     */////
$.ajax({
    method: "GET",
    url: "https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
})
.done(function(data) {
    if (data.items.length > 0) {
        $.each(data.items, function(key, value) {
            $('#listClientes').append('<tr align="center"><td>' + value['name'] + '</td><td>' + value['email'] + '</td><td>' + value['age'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edCliente(' + value['id'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elCliente(' + value['id'] + ')" /></td></tr>')
        });
    } else {
        $('#listClientes').append('<tr align="center"><td colspan="4"> No hay registros de Clientes </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra un nuevo Cliente     */////
$('#registroClientes').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var clientes = {
        name:$("#nombre").val(),
        email:$("#email").val(),
        age:$("#edad").val()
    }
    var data = JSON.stringify(clientes);
    $.ajax({
        data: data,
        url:"https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Cliente Creado Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar el cliente, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos del Cliente Seleccionado     */////
function edCliente(idCliente, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();

    $.ajax({
        method: "GET",
        url: "https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/" + idCliente,
    })
    .done(function(data) {
        if (data.items.length > 0) {
            $.each(data.items, function(key, value) {
                $('#listClientes').append('<tr align="center"><td><input type="text" value="' + value['name'] + '" id="editName' + value['id'] + '"</td><td><input type="email" value="' + value['email'] + '" id="editEmail' + value['id'] + '"</td><td><input type="number" value="' + value['age'] + '" id="editAge' + value['id'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarCliente(' + value['id'] + ')"/></td></tr>')
            });
        } else {
            $('#listClientes').append('<tr align="center"><td colspan="4"> No hay registros de Clientes </td></tr>')
        }
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualizar el cliente Seleccionado     */////
function editarCliente(idCliente) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR EL CLIENTE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let cliente = {
                id: idCliente,
                name: $("#editName" + idCliente).val(),
                email: $("#editEmail" + idCliente).val(),
                age: $("#editAge" + idCliente).val(),
            }
            var data = JSON.stringify(cliente);
            $.ajax({
                data: data,
                url: 'https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Cliente Actualizado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar el cliente, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};

/////*      Elimina el cliente seleccionada     */////
function elCliente(idCliente) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR EL CLIENTE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let cliente = {id: idCliente};
            var data = JSON.stringify(cliente);
            $.ajax({
                data: data,
                url: 'https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Cliente Eliminado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar el cliente, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};