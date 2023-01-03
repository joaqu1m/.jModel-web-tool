function redefinirCamera() {
    cameraConfigs.cameraPos = {x: -45, y: -45}
    definirCamera()
    visGrupos.style.width = "150px"
    visGrupos.style.height = "150px"
    recarregarMedidas()
}

function definirCamera() {
    visGrupos.style.transform = `rotateX(${cameraConfigs.cameraPos.x}deg) rotateY(${cameraConfigs.cameraPos.y}deg)`
}

function mouseMovendo(e) {
    pegarPrimeirasCoords(e)
    let rect = e.target.getBoundingClientRect()
    let mouseX = e.clientX - rect.left
    let mouseY = e.clientY - rect.top

    cameraConfigs.cameraPos.x -= mouseY - cameraConfigs.posicaoAnterior.y
    cameraConfigs.cameraPos.y += mouseX - cameraConfigs.posicaoAnterior.x

    definirCamera()

    cameraConfigs.posicaoAnterior = {x: mouseX, y: mouseY}
}

function pegarPrimeirasCoords(e) {
    let rect = e.target.getBoundingClientRect()
    let mouseX = e.clientX - rect.left
    let mouseY = e.clientY - rect.top
    cameraConfigs.posicaoAnterior = {x: mouseX, y: mouseY}
    pegarPrimeirasCoords = function(e) {}
}

function redefinirPegarPrimeirasCoords() {
    pegarPrimeirasCoords = function(e) {
        let rect = e.target.getBoundingClientRect()
        let mouseX = e.clientX - rect.left
        let mouseY = e.clientY - rect.top
        cameraConfigs.posicaoAnterior = {x: mouseX, y: mouseY}
        pegarPrimeirasCoords = function(e) {}
    }
}

function zoomCamera(mais) {
    if (mais) {
        if (visGrupos.offsetWidth + 25 > 250) {
            return
        }
        visGrupos.style.width = `${visGrupos.offsetWidth + 25}px`
        visGrupos.style.height = `${visGrupos.offsetHeight + 25}px`
    } else {
        if (visGrupos.offsetWidth <= 25) {
            return
        }
        visGrupos.style.width = `${visGrupos.offsetWidth - 25}px`
        visGrupos.style.height = `${visGrupos.offsetHeight - 25}px`
    }
    recarregarMedidas()
}