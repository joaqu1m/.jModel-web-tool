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
function inverterCor(hex) {
    if (hex.indexOf('#') == 0) {
        hex = hex.substring(1)
    }
    if (hex.length == 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    function cdCor(digitos) {
        if (digitos.length == 1) {
            return `0${digitos}`
        } else {
            return (255 - parseInt(digitos, 16)).toString(16)
        }
    }
    return `#${cdCor(hex.substring(0, 2))}${cdCor(hex.substring(2, 4))}${cdCor(hex.substring(4, 6))}`
}