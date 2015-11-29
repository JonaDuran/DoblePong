// crea las variables e inicia el juego, asignado al evento load
function iniciar() {
    navegador = detectar();
    
    // objetos del juego
    p1 = document.getElementById("p1").style;
    p2 = document.getElementById("p2").style;
    bola = document.getElementById("bola").style;
    hitLeft = document.getElementById("left").style;
    hitRigth = document.getElementById("rigth").style;
    circle = document.getElementById("circle").style;
    scoreP1 = document.getElementById("scoreP1");
    scoreP2 = document.getElementById("scoreP2");
    
    // puentuaje de los jugadores
    scoreIntP1 = 0;
    scoreIntP2 = 0;
    winScore = 0;
    
    //         W      S      P      L
    tecla = [false, false, false, false];   // true si la tecla esta abajo
    keyW = document.getElementById("keyW").style;
    keyS = document.getElementById("keyS").style;
    keyP = document.getElementById("keyP").style;
    keyL = document.getElementById("keyL").style;
    keyFondo = "#ddd";      //color de fondo al presionar

    datoP1 = 150;       //coordenadas Y del P.
    datoP2 = 150;
    movimiento = 13;    //pixeles por pulsación para los P.
    pause = false;
    
    // variables de física
    anguloP1 = 0;       // inclementa segun el 'vuelo' del P.
    anguloP2 = 0;
    maxY = 7;           // velocidad máxima en Y
    maxNormal = 15;
    maxPlus = 25;       // se asigna a maxX dependiendo el 'vuelo'
    maxX = maxNormal;
    fast = 10;
    
    // variables para manipular la bola
    bolaX = 0;          // coordenadas de la bola
    bolaY = 180;
    bolaMoveX = maxX;   // desplasamiento por frame
    bolaMoveY = 0;
    bola.left = bolaX;      //inicial
    bola.top = bolaY;

    // inicia el juego
    startGame();
}

// detecta donde se está ejecutando el juego
function detectar() {
    // si está en un iframe
    if (window.top !== window.self) {
        var body = document.getElementById("body").style;
        body.marginLeft = -20 + 'px';
        body.marginTop = -37 + 'px';
        body.transform = 'scale(0.9)';
    }
    
    // detecta el navegador
    var navegador = navigator.userAgent;
    if (navegador.indexOf('MSIE') !== -1) {
        return "explorer";
    } else if (navegador.indexOf('Firefox') !== -1) {
        return "firefox";
    } else if (navegador.indexOf('Chrome') !== -1) {
        return "chrome";
    } else if (navegador.indexOf('Opera') !== -1) {
        return "opera";
    } else {
        return "0";
    }
}

function startGame() {
    // variables del menú
    var start = document.getElementById("start");
    var menu = document.getElementsByClassName("menu")[0].style;
    var puntos = document.getElementById("puntos");
    
    // inicia el juego
    start.onclick = function() {
        setInterval(game, 20);
        winScore = puntos.value;
        menu.display = "none";
        //alert(winScore);
    };

}

// se ejecuta el cada frame
function game() {
    // si está en pausa
    if (pause) {
        circle.color = "#e00";      // aparecer PAUSE
    }
    
    else {
        circle.color = "transparent";   // desaparecer PAUSE
        movePlayer();   // redibuja las barras de los jugadores
        keyColor();     // marca las teclas presionadas
        bolaMove();     // redibuja la bola
        //angulo();
        gameOver();     // valida si ya ganó alguien
    }
}

// valida si ya ganó alguien
function gameOver() {
    var winer;
    if (scoreIntP1 >= winScore)
        winer = 1;
    else if (scoreIntP2 >= winScore)
        winer = 2;

    if (winer === 1 || winer === 2) {
        var win = document.getElementById("win").style;
        var winerP = document.getElementById("winer");
        win.display = "block";
        winerP.textContent = "el jugador " + winer;
        pause = true;
    }
}

// muesta el angulo de la bola
function angulo() {
    document.getElementById("info").textContent =
            anguloP1 + " " + anguloP2 + "\n" +
            bolaMoveX + " " + bolaMoveY;
}

// retorna el número asociado a un caracter
function charKey(char) {
    switch (char) {
        case "W":
            return 0;
        case "S":
            return 1;
        case "P":
            return 2;
        case "L":
            return 3;
    }
}

// cuando se presiona una tecla
function keyDown(evt) {      
    var key = String.fromCharCode(evt.keyCode);
    tecla[charKey(key)] = true;

    if (key === " ") {  // pause
        if (pause)
            pause = false;
        else
            pause = true;
    }
}

// cuando se deja de presionar una tecla
function keyUp(evt) {
    var key = String.fromCharCode(evt.keyCode);
    tecla[charKey(key)] = false;
}

function movePlayer() {
    if (tecla[0] && tecla[1])
        anguloP1 = 0;

    if (tecla[0] || tecla[1]) {
        if ((tecla[0]) && datoP1 > 20) {
            datoP1 -= movimiento;
            p1.top = datoP1 + "px";
            anguloP1--;
        }

        if ((tecla[1]) && datoP1 < 280) {
            datoP1 += movimiento;
            p1.top = datoP1 + "px";
            anguloP1++;
        }
    }
    else
        anguloP1 = 0;

    if (tecla[2] && tecla[3])
        anguloP2 = 0;

    if (tecla[2] || tecla[3]) {
        if ((tecla[2]) && datoP2 > 20) {
            datoP2 -= movimiento;
            p2.top = datoP2 + "px";
            anguloP2--;
        }

        if ((tecla[3]) && datoP2 < 280) {
            datoP2 += movimiento;
            p2.top = datoP2 + "px";
            anguloP2++;
        }
    }
    else
        anguloP2 = 0;
}

function keyColor() {        //cambia el fondo de las teclas en pantalla
    if (tecla[0])
        keyW.background = keyFondo;
    else
        keyW.background = "none";

    if (tecla[1])
        keyS.background = keyFondo;
    else
        keyS.background = "none";

    if (tecla[2])
        keyP.background = keyFondo;
    else
        keyP.background = "none";

    if (tecla[3])
        keyL.background = keyFondo;
    else
        keyL.background = "none";
}

function direccion(x) {
    var angulo;
    if (x === 1)
        angulo = anguloP1;
    else if (x === 2)
        angulo = anguloP2;

    if (angulo >= fast || angulo <= -fast)
        maxX = maxPlus;
    else
        maxX = maxNormal;

    if (angulo > maxY)
        angulo = maxY;
    else if (angulo < -maxY)
        angulo = -maxY;

    bolaMoveY += angulo;

    if (bolaMoveY > maxY)
        bolaMoveY = maxY;
    else if (bolaMoveY < -maxY)
        bolaMoveY = -maxY;

    var valorAbsoluto = Math.pow(bolaMoveY, 2);
    valorAbsoluto = Math.sqrt(valorAbsoluto);

    bolaMoveX = maxX - valorAbsoluto;
}

function restoreMaxX() {
    var valorAbsoluto = Math.pow(bolaMoveY, 2);
    valorAbsoluto = Math.sqrt(valorAbsoluto);

    if (bolaMoveX > maxNormal) {
        bolaMoveX = maxNormal - valorAbsoluto;
        bolaX -= maxNormal;
    }
    else if (bolaMoveX < -maxNormal) {
        bolaMoveX = -maxNormal + valorAbsoluto;
        bolaX += maxNormal;
    }

}

// anima la bola y valida si colisionó
function bolaMove() {
    var valorAbsoluto = Math.pow(bolaMoveX, 2);
    valorAbsoluto = Math.sqrt(valorAbsoluto);

    // si no hay colisión
    if (colision() === 0) {
        hitLeft.background = "none";
        hitRigth.background = "none";

        if (navegador === "chrome") {
            p1.background = "-webkit-linear-gradient(left, #800, #f00)";
            p2.background = "-webkit-linear-gradient(left, #f00, #800)";
        } else if (navegador === "firefox") {
            p1.background = "-moz-linear-gradient(left, #800, #f00)";
            p2.background = "-moz-linear-gradient(left, #f00, #800)";
        } else if (navegador === "explorer") {
            p1.background = "-ms-linear-gradient(left, #800, #f00)";
            p2.background = "-ms-linear-gradient(left, #f00, #800)";
        } else {
            p1.background = "linear-gradient(left, #800, #f00)";
            p2.background = "linear-gradient(left, #f00, #800)";
        }

    }
    
    // si colisiona la bola con el player 1
    else if (colision() === 1 && bolaMoveX === -valorAbsoluto) {
        if (navegador === "chrome") {
            p1.background = "-webkit-linear-gradient(left, #f00, #f55)";
        } else if (navegador === "firefox") {
            p1.background = "-moz-linear-gradient(left, #f00, #f55)";
        } else if (navegador === "explorer") {
            p1.background = "-ms-linear-gradient(left, #f00, #f55)";
        } else {
            p1.background = "linear-gradient(left, #f00, #f55)";
        }

        bolaMoveX = -bolaMoveX;
        direccion(1);
    }
    
    // si colisiona la bola con el player 2
    else if (colision() === 2 && bolaMoveX === valorAbsoluto) {
        if (navegador === "chrome") {
            p2.background = "-webkit-linear-gradient(left, #f55, #f00)";
        } else if (navegador === "firefox") {
            p2.background = "-moz-linear-gradient(left, #f55, #f00)";
        } else if (navegador === "explorer") {
            p2.background = "-ms-linear-gradient(left, #f55, #f00)";
        } else {
            p2.background = "linear-gradient(left, #f55, #f00)";
        }

        direccion(2);
        bolaMoveX = -bolaMoveX;
    }
    
    // si colisiona la bola con el límite izquerdo
    else if (colision() === 3) {
        hitLeft.background = "#f00";
        scoreIntP2++;
        scoreP2.textContent = scoreIntP2;
        restoreMaxX();
    }
    
    // si colisiona la bola con el límite derecho
    else if (colision() === 4) {
        hitRigth.background = "#f00";
        scoreIntP1++;
        scoreP1.textContent = scoreIntP1;
        restoreMaxX();
    }

    // cambio de dirección    
    if (bolaX > 660 || bolaX < 0)
        bolaMoveX = -bolaMoveX;

    if (bolaY > 340 || bolaY < 20)
        bolaMoveY = -bolaMoveY;

    // animación
    bolaX += bolaMoveX;
    bolaY += bolaMoveY;
    bola.left = bolaX + "px";
    bola.top = bolaY + "px";

    if (bolaMoveX > maxNormal || bolaMoveX < -maxNormal) {
        if (navegador === "chrome") {
            bola.background = "-webkit-radial-gradient(top left, white, #e00)";
        } else if (navegador === "firefox") {
            bola.background = "-moz-radial-gradient(top left, white, #e00)";
        } else if (navegador === "explorer") {
            bola.background = "-ms-radial-gradient(top left, white, #e00)";
        } else {
            bola.background = "radial-gradient(top left, white, #e00)";
        }
    }
    else {
        if (navegador === "chrome") {
            bola.background = "-webkit-radial-gradient(top left, white, #33a)";
        } else if (navegador === "firefox") {
            bola.background = "-moz-radial-gradient(top left, white, #33a)";
        } else if (navegador === "explorer") {
            bola.background = "-ms-radial-gradient(top left, white, #33a)";
        } else {
            bola.background = "radial-gradient(top left, white, #33a)";
        }
    }
}

// valida si existe colisión
function colision() {
    var puntoAx = bolaX;
    var puntoAy = bolaY + 20;
    var puntoBx = bolaX + 40;
    var puntoBy = bolaY + 20;

    var p1x1 = 20;
    var p1x2 = 0;
    var p1y1 = datoP1;
    var p1y2 = datoP1 + 100;

    var p2x1 = 680;
    var p2x2 = 700;
    var p2y1 = datoP2;
    var p2y2 = datoP2 + 100;

    if (puntoAx <= p1x1 && puntoAx >= p1x2 &&
            puntoAy >= p1y1 && puntoAy <= p1y2)
        return 1; // colision player 1 - bola

    if (puntoBx >= p2x1 && puntoBx <= p2x2 &&
            puntoBy >= p2y1 && puntoBy <= p2y2)
        return 2; // colision player 2 - bola

    if (puntoAx < 0)
        return 3;       //colision límite izquierdo - bola

    if (puntoBx > 700)
        return 4;       //colision límite derecho - bola

    return 0;
}

window.addEventListener("load", iniciar);

//eventos del teclado
window.onkeydown = keyDown;
window.onkeyup = keyUp;