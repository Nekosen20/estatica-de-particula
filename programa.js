// --- LOGICA DE PROGRAMACIÓN Y MATEMÁTICA ---

// Escuchamos el clic del botón para iniciar el cálculo
document.getElementById('btnCalcular').addEventListener('click', calcularEstatica);

function calcularEstatica() {
    // 1. Recibir los datos de la interfaz web
    const F1 = parseFloat(document.getElementById('f1').value);
    const angulo1 = parseFloat(document.getElementById('a1').value);
    const anguloP = parseFloat(document.getElementById('ap').value);

    // Validación básica para evitar errores matemáticos
    if (isNaN(F1) || isNaN(angulo1) || isNaN(anguloP) || anguloP === 0) {
        alert("Por favor ingresa números válidos. El ángulo de P no puede ser 0.");
        return;
    }

    // 2. Pasar los ángulos a radianes (necesario en JavaScript)
    const rad1 = angulo1 * Math.PI / 180;
    const radP = anguloP * Math.PI / 180;

    // 3. Condición Física fundamental: Sumatoria en X = 0 (Equilibrio horizontal)
    // F1 * sen(angulo1) = P * sen(anguloP)
    const F1_x = F1 * Math.sin(rad1);
    const P = F1_x / Math.sin(radP);

    // 4. Sumatoria en Y: Ambas fuerzas empujan hacia abajo, la resultante R absorbe el total
    const F1_y = F1 * Math.cos(rad1);
    const P_y = P * Math.cos(radP);
    const R = F1_y + P_y;

    // 5. Publicar los resultados en el HTML con un límite de 2 decimales
    document.getElementById('res-p').innerText = `Fuerza P necesaria: ${P.toFixed(2)} N`;
    document.getElementById('res-r').innerText = `Fuerza Resultante (R): ${R.toFixed(2)} N`;

    // 6. Redibujar la ilustración gráfica en tiempo real
    dibujarVectores(angulo1, anguloP, F1, P, R);
}

function dibujarVectores(a1, aP, f1, p, r) {
    const canvas = document.getElementById('graficoCanvas');
    const ctx = canvas.getContext('2d');
    
    // Limpiar trazos previos
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Punto central (Donde coinciden el carrito y los vectores)
    const oX = canvas.width / 2;
    const oY = canvas.height / 2 - 20;

    // Dibujar línea guía de la viga horizontal
    ctx.beginPath();
    ctx.strokeStyle = '#7f8c8d';
    ctx.lineWidth = 4;
    ctx.moveTo(50, oY);
    ctx.lineTo(400, oY);
    ctx.stroke();

    // Dibujar caja que simula el carrito
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(oX - 25, oY - 15, 50, 30);
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;
    ctx.strokeRect(oX - 25, oY - 15, 50, 30);

    // Ajustar escala visual de los vectores para que no se salgan del recuadro gráfico
    const escala = 70 / Math.max(f1, p, r);

    // Vector Fuerza 1 (Rojo)
    const xF1 = oX - (f1 * Math.sin(a1 * Math.PI / 180) * escala);
    const yF1 = oY + (f1 * Math.cos(a1 * Math.PI / 180) * escala);
    dibujarFlecha(ctx, oX, oY, xF1, yF1, '#e74c3c', `F1 (${f1.toFixed(0)}N)`);

    // Vector Fuerza P (Azul)
    const xP = oX + (p * Math.sin(aP * Math.PI / 180) * escala);
    const yP = oY + (p * Math.cos(aP * Math.PI / 180) * escala);
    dibujarFlecha(ctx, oX, oY, xP, yP, '#2980b9', `P (${p.toFixed(0)}N)`);

    // Vector Resultante R (Morado)
    const yR = oY + (r * escala);
    dibujarFlecha(ctx, oX, oY, oX, yR, '#8e44ad', `R (${r.toFixed(0)}N)`);
}

// Función matemática secundaria para trazar la punta de cada flecha indicadora de dirección
function dibujarFlecha(ctx, fromx, fromy, tox, toy, color, texto) {
    const headlen = 10; 
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.font = '11px Arial';
    ctx.fillText(texto, tox + 5, toy + 2);
}

// Iniciar con la simulación del ejercicio original al cargar la ventana
window.onload = calcularEstatica;