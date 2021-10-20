/**
 * Controlador de Clientes
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de las motocicletas     */////
$.ajax({
    method: "GET",
    url: "https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto",
})
.done(function(data) {
    if (data.items.length > 0) {
        $.each(data.items, function(key, value) {
            $('#listMotocicletas').append('<tr align="center"><td>' + value['brand'] + '</td><td>' + value['model'] + '</td><td>' + value['category_id'] + '</td><td>' + value['name'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edMoto(' + value['id'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elMoto(' + value['id'] + ')" /></td></tr>')
        });
    } else {
        $('#listMotocicletas').append('<tr align="center"><td colspan="5"> No hay registros de motocicletas </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra una nueva moto     */////
$('#registroMotos').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var moto = {
        brand:$("#marca").val(),
        model:$("#modelo").val(),
        category_id:$("#categoria").val(),
        name:$("#nombre").val(),
    }
    var data = JSON.stringify(moto);
    $.ajax({
        data: data,
        url:"https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Motocicleta Creada Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar la moto, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos de la motocicleta Seleccionado     */////
function edMoto(idMoto, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();

    $.ajax({
        method: "GET",
        url: "https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto/" + idMoto,
    })
    .done(function(data) {
        if (data.items.length > 0) {
            $.each(data.items, function(key, value) {
                $('#listMotocicletas').append('<tr align="center"><td><input type="text" value="' + value['brand'] + '" id="editBrand' + value['id'] + '"</td><td><input type="number" value="' + value['model'] + '" id="editModel' + value['id'] + '"</td><td><input type="number" value="' + value['category_id'] + '" id="editCategory' + value['id'] + '"</td><td><input type="text" value="' + value['name'] + '" id="editName' + value['id'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarMoto(' + value['id'] + ')"/></td></tr>')
            });
        } else {
            $('#listMotocicletas').append('<tr align="center"><td colspan="5"> No hay registros de Motocicletas </td></tr>')
        }
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualizar el cliente Seleccionado     */////
function editarMoto(idMoto) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR LA MOTOCICLETA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let moto = {
                id: idMoto,
                brand: $("#editBrand" + idMoto).val(),
                model: $("#editModel" + idMoto).val(),
                category_id: $("#editCategory" + idMoto).val(),
                name: $("#editName" + idMoto).val(),
            }
            var data = JSON.stringify(moto);
            $.ajax({
                data: data,
                url: 'https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto',
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Motocicleta Actualizada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar la motocicleta, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};


/////*      Elimina la motocicleta seleccionada     */////
function elMoto(idMoto) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR LA MOTOCICLETA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let moto = {
                id:idMoto
            };
            var data = JSON.stringify(moto);
            $.ajax({
                data: data,
                url: 'https://g53e152c00566b7-moto.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto',
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Motocicleta Eliminada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar la motocicleta, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};