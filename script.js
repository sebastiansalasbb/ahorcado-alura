//funcion autoejecutable
(function () {
  var presentacionDelJuego = document.getElementById("presentacionDelJuego");
  var botonDeJugar = document.getElementById("botonDeJugar");
  var loaderPrincipal = document.getElementById("loaderPrincipal");
  var modalJuegoTerminado = document.getElementById("modalJuegoTerminado");
  var frasePerdidaVictoria = document.getElementById("frasePerdidaVictoria");
  var botonModalTerminar = document.getElementById("botonModalTerminar");
  var fraseSecreta = document.getElementById("fraseSecreta");
  var contenedorJuego = document.getElementById("contenedorJuego");
  var canvas = document.getElementById("canvas");

  contenedorJuego.style.display = "none";

  botonDeJugar.addEventListener("click", function () {
    presentacionDelJuego.classList.add("ocultar");
    loaderPrincipal.classList.remove("ocultar");
    setTimeout(function () {
      loaderPrincipal.classList.add("ocultar");
      contenedorJuego.style.display = "flex";
    }, 5000);
    dibujarHombreAhorcado();
    dibujarCantidadLetras();
    iniciarCuentaAtras();
    setInterval(activarTemporizador, 1000);
    comprobarLetraIngresada();
  });

  var palabrasPorAdivinar = [
    "esternocleidomastoideo",
    "Electroencefalográfico",
    "Anticonstitucionalidad",
    "hipergammaglobulinemia",
  ];

  var palabrasEnMayusuculas = palabrasPorAdivinar.map(function (palabra) {
    palabra = palabra.replace("á", "a");
    palabra = palabra.replace("é", "e");
    palabra = palabra.replace("í", "i");
    palabra = palabra.replace("ó", "o");
    palabra = palabra.replace("ú", "u");
    return palabra.toUpperCase();
  });

  var palabraElegida =
    palabrasEnMayusuculas[
      Math.floor(Math.random() * palabrasEnMayusuculas.length)
    ];

  var canvas = document.getElementById("canvas");
  var pincel = canvas.getContext("2d");

  function dibujarHombreAhorcado() {
    pincel.fillStyle = "black";
    pincel.fillRect(0, 0, 20, 300);
    pincel.fillRect(0, 0, 200, 20);
    pincel.beginPath();
    pincel.moveTo(150, 00);
    pincel.lineTo(150, 70);
    pincel.stroke();
    pincel.beginPath();
    pincel.arc(150, 100, 30, 0, Math.PI * 2);
    pincel.stroke();
    pincel.beginPath();
    pincel.moveTo(150, 130);
    pincel.lineTo(150, 230);
    pincel.stroke();
    pincel.beginPath();
    pincel.moveTo(150, 230);
    pincel.lineTo(120, 280);
    pincel.stroke();
    pincel.beginPath();
    pincel.moveTo(150, 230);
    pincel.lineTo(180, 280);
    pincel.stroke();
    pincel.beginPath();
    pincel.moveTo(150, 130);
    pincel.lineTo(120, 180);
    pincel.stroke();
    pincel.beginPath();
    pincel.moveTo(150, 130);
    pincel.lineTo(180, 180);
    pincel.stroke();
  }

  function dibujarCantidadLetras() {
    var posicionX = 60;
    for (var i = 0; i < palabraElegida.length; i++) {
      pincel.beginPath();
      pincel.moveTo(posicionX, 380);
      pincel.lineTo(posicionX + 30, 380);
      pincel.stroke();
      posicionX += 35;
    }
  }

  var segundosCuentaAtras = 30;
  var minutos = 2;
  var intervaloCuentaAtras;

  function iniciarCuentaAtras() {
    intervaloCuentaAtras = setInterval(function () {
      segundosCuentaAtras--;
      if (segundosCuentaAtras == 0) {
        segundosCuentaAtras = 59;
        minutos--;
      }

      if (minutos == 0 && segundosCuentaAtras == 1) {
        clearInterval(intervaloCuentaAtras);
        frasePerdidaVictoria.textContent = "¡¡¡Perdiste!!!";
        fraseSecreta.textContent = "Deberás intentarlo de nuevo";

        modalJuegoTerminado.showModal();
      }
    }, 1000);
  }

  function eliminarCuentaAtras() {
    pincel.clearRect(400, 0, 600, 100);
  }

  function dibujarCuentaAtras() {
    pincel.font = "50px Arial";
    pincel.fillStyle = "lightgreen";
    pincel.fillText(minutos + "m : " + segundosCuentaAtras + "s", 500, 100);
  }

  function activarTemporizador() {
    eliminarCuentaAtras();
    dibujarCuentaAtras();
  }

  var teclasPulsadas = [];
  var teclasPulsadasCorrectas = [];
  var teclasPulsadasIncorrectas = [];
  var palabraEnConstruccion = [];

  function comprobarLetraIngresada() {
    document.addEventListener("keydown", function (event) {
      var letraIngresada = event.key.toUpperCase();

      if (palabraElegida.includes(letraIngresada)) {
        if (!teclasPulsadasCorrectas.includes(letraIngresada)) {
          var cantidadLetras = 0;
          for (var i = 0; i < palabraElegida.length; i++) {
            if (palabraElegida[i] == letraIngresada) {
              teclasPulsadasCorrectas[i] = letraIngresada;
              palabraEnConstruccion = teclasPulsadasCorrectas.join("");

              var posicionX = 64 + i * 35;
              pincel.font = "30px Arial";
              pincel.fillStyle = "green";

              if (teclasPulsadasCorrectas[i] == "I") {
                posicionX = 64 + i * 35.5;
              }
              pincel.fillText(teclasPulsadasCorrectas[i], posicionX, 375);
              canvas.style.boxShadow = "0px 0px 10px 10px green";

              setTimeout(function () {
                canvas.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
              }, 100);
            }
          }

          if (palabraEnConstruccion == palabraElegida) {
            frasePerdidaVictoria.textContent = "¡¡¡Ganaste!!!";
            fraseSecreta.textContent =
              "La palabra secreta era " + palabraElegida;

            modalJuegoTerminado.showModal();
          }
        }
      } else {
        cantidadFallos++;

        if (!teclasPulsadasIncorrectas.includes(letraIngresada)) {
          teclasPulsadasIncorrectas.push(letraIngresada);
          if (ejeX > 520) {
            ejeX = 350;
            ejeY += 30;
          }
          pincel.font = "20px Arial";
          pincel.fillStyle = "lightsalmon";
          pincel.fillText(letraIngresada, ejeX, ejeY);
          ejeX += 20;

          canvas.style.boxShadow = "0px 0px 10px 10px red";

          setTimeout(function () {
            canvas.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
          }, 100);
          if (cantidadFallos == 1) {
            pincel.clearRect(0, 0, 20, 300);
          }
          if (cantidadFallos == 2) {
            pincel.clearRect(0, 0, 200, 20);
          }
          if (cantidadFallos == 3) {
            pincel.clearRect(100, 0, 200, 70);
          }
          if (cantidadFallos == 4) {
            pincel.clearRect(100, 70, 200, 70);
          }
          if (cantidadFallos == 5) {
            pincel.clearRect(153, 50, 200, 130);
          }
          if (cantidadFallos == 6) {
            pincel.clearRect(50, 50, 95, 130);
          }
          if (cantidadFallos == 7) {
            pincel.clearRect(95, 90, 130, 140);
          }
          if (cantidadFallos == 8) {
            pincel.clearRect(65, 90, 85, 190);
          }
          if (cantidadFallos == 9) {
            pincel.clearRect(95, 120, 180, 190);
            frasePerdidaVictoria.textContent = "¡¡¡Perdiste!!!";
            fraseSecreta.textContent = "Deberás intentarlo de nuevo";

            modalJuegoTerminado.showModal();
          }
        }
      }
    });
  }
  var ejeX = 350;
  var ejeY = 420;
  var cantidadFallos = 0;

  botonModalTerminar.addEventListener("click", function () {
    modalJuegoTerminado.close();
    location.reload();
  });
})();
