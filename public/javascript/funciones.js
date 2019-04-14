console.log("funciones cargadas");
var usuarios = [];
var skills = [];

if(usuarios.length == 0){
    $.ajax({
        url: "http://localhost:3000/usuarios",
        type: "GET",
        dataType: "json",
        success: function (result) {
          usuarios = result;
          console.log(usuarios);
          listarUsuarios(usuarios);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status == 200) {

            }
        }
    });
}
if(skills.length == 0){
  $.ajax({
      url: "http://localhost:3000/skills",
      type: "GET",
      dataType: "json",
      success: function (result) {
        skills = result;
        console.log("skills");
        console.log(skills);
      },
      error: function (xhr, ajaxOptions, thrownError) {
          if (xhr.status == 200) {

          }
      }
  });
}

function dibujarRegistro(usuario){
  var registro =  "<tr id=" + usuario.id + ">"+
                  "<td>" + usuario.name + "</td>" +
                  "<td>" + usuario.last_name + "</td>" +
                  "<td>" + usuario.phone + "</td>"+
                  '<td>' +
                    '<button type="button" onclick="verUsuario(`'+ usuario.id +'`)" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#verUsuario">Ver</button>' +
                    '<button type="button" onclick="editarUsuario(`'+ usuario.id +'`)" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editarUsuario">Editar</button>' +
                    '<button type="button" onclick="eliminarUsuario(`'+ usuario.id +'`)" class="btn btn-secondary btn-sm">Borrar</button>' +
                  "</td>" +
                  "</tr>";
  $( "#listaUsuarios" ).append( registro );

}

function listarUsuarios(usuarios){
  $.each( usuarios, function( clave, usuario ) {
    dibujarRegistro(usuario);
  });
}

function eliminarRegistro(id){
  $.each( usuarios, function( index, usuario ) {
    if(usuario){
      if(usuario.id === id){
        usuarios.splice(index,1);
        $("#" + id).remove();
      }
    }
  });
}

function eliminarUsuario(id){
  var respuesta = confirm("¿Desea eliminar el usuario?");
  if (respuesta) {
    eliminarRegistro(id);
  }
}

function editarUsuario(id){
  $("#lblIdUsuarioEditar").text(id);
  var usuarioEditar;
  $.each( usuarios, function( index, usuario ) {
    if(usuario){
      if(usuario.id === id){
        usuarioEditar = usuario;
      }
    }
  });
  if(usuarioEditar){
    $("#editarTelefono").val(usuarioEditar.phone);
    $("#editarEmail").val(usuarioEditar.email);
    $("#editarDireccion").val(usuarioEditar.info.address);
  }
}
function actualizarUsuario(){
  var id = $("#lblIdUsuarioEditar").text();
  $.each( usuarios, function( index, usuario ) {
    if(usuario){
      if(usuario.id === id){
        if($("#editarTelefono").val().length > 0 && $("#editarEmail").val().length > 0 && $("#editarDireccion").val().length > 0){
          usuario.phone = $("#editarTelefono").val();
          usuario.email = $("#editarEmail").val();
          usuario.info.address = $("#editarDireccion").val();
          eliminarRegistro(id);
          dibujarRegistro(usuario);
          $('#editarUsuario').modal('toggle');
        }else{
          alert("complete los datos");
        }
      }
    }
  });
}

function calcularEdad(nacimiento){
  var year = (new Date).getFullYear();
  var yearN = parseInt(nacimiento.substring(nacimiento.length - 4), 10);
  var age = year - yearN;
  return age;
}

function buscarFoto(id){
  $.ajax({
      url: "http://localhost:3000/image_perfil",
      type: "GET",
      data: { "id": id },
      dataType: "json",
      success: function (result) {
          if(result){
            if(result.photo){
              $("#imgVer").attr("src",result.photo);
            }else{
              $("#imgVer").attr("src",result);
            }

          }else{
            $("#imgVer").attr("src","../foto/perfil.jpg");
          }
      },
      error: function (xhr, ajaxOptions, thrownError) {
          if (xhr.status == 200) {

          }
      }
  });
}

function buscarHabilidades(id){
  var habilidades;
  $.each( skills, function( index, habilidad) {
    if(habilidad){
      if(habilidad.id === id){
        habilidades = habilidad.skills;
      }
    }
  });
  return habilidades;
}

function dibujarGrafico(id){
  var habilidades = buscarHabilidades(id);
  new Chart(document.getElementById("radar-chart"), {
      type: 'radar',
      data: {
        labels: habilidades,
        datasets: [
          {
            label: "Habilidades",
            fill: true,
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(179,181,198,1)",
            data: habilidades
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Las habilidades del Usuario'
        }
      }
  });
}

function verUsuario(id){
  buscarFoto(id);
  var usuarioVer;
  $.each( usuarios, function( index, usuario ) {
    if(usuario){
      if(usuario.id === id){
        usuarioVer = usuario;
      }
    }
  });

  $("#lblVerNombre").text(usuarioVer.name);
  $("#lblVerApellido").text(usuarioVer.last_name);
  var edad = calcularEdad(usuarioVer.birthdate);
  $("#lblVerEdad").text(edad);
  $("#lblVerEmail").text(usuarioVer.emailphone);
  $("#lblVerTelefono").text(usuarioVer.email);
  $("#lblVerProfesion").text(usuarioVer.info.profession);
  $("#lblVerDireccion").text(usuarioVer.info.address);

  dibujarGrafico(id);

}
