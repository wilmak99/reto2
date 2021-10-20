/**
 * Controlador de Mensajes
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de los Clientes     */////
$.ajax({
    method: "GET",
    url: "https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
})
.done(function(data) {
    if (data.items.length > 0) {
        $.each(data.items, function(key, value) {
            $('#listMensajes').append('<tr align="center"><td>' + value['messagetext'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edMensaje(' + value['id'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elMensaje(' + value['id'] + ')" /></td></tr>')
        });
    } else {
        $('#listMensajes').append('<tr align="center"><td colspan="2"> No hay registros de Mensajes </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra un nuevo Mensaje     */////
$('#registroMensaje').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var mensaje = {
        messagetext:$("#mensaje").val(),
    }
    var data = JSON.stringify(mensaje);
    $.ajax({
        data: data,
        url:"https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Mensaje Creado Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar el mensaje, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos del mensaje Seleccionada     */////
function edMensaje(idMensaje, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();

    $.ajax({
        method: "GET",
        url: "https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/" + idMensaje,
    })
    .done(function(data) {
        if (data.items.length > 0) {
            $.each(data.items, function(key, value) {
                $('#listMensajes').append('<tr align="center"><td><input type="text" value="' + value['messagetext'] + '" id="editMensaje' + value['id'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarMensaje(' + value['id'] + ')"/></td></tr>')
            });
        } else {
            $('#listMensajes').append('<tr align="center"><td colspan="2"> No hay registros de Mensajes </td></tr>')
        }
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualizar el mensaje Seleccionado     */////
function editarMensaje(idMensaje) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR EL MENSAJE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let mensaje = {
                id: idMensaje,
                messagetext:$("#editMensaje" + idMensaje).val(),
            }
            var data = JSON.stringify(mensaje);
            $.ajax({
                data: data,
                url: 'https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Mensaje Actualizado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar el mensaje, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};

/////*      Elimina el mensaje seleccionado     */////
function elMensaje(idMensaje) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR EL MENSAJE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let mensaje = {
                id: idMensaje
            };
            var data=JSON.stringify(mensaje);
            $.ajax({
                data: data,
                url: 'https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Mensaje Eliminado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar el mensaje, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};