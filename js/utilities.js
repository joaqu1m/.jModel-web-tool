function porcentagem(numero) {
    return visGrupos.offsetHeight * (0.01 * numero)
}
function definirFaixas(variavel, min, max) {
    return variavel > max ? max : (variavel < min ? min : variavel)
}
function checarNumber(numeros) {
    let novoArray = []
    for (i = 0; i < numeros.length; i++) {
        if (numeros[i] == "") {
            novoArray.push(0)
        } else {
            if (isNaN(numeros[i])) {
                return
            } else {
                novoArray.push(Number(numeros[i]))
            }
        }
    }
    return novoArray
}