function recarregarMedidas() {
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        window[`grupo${meshConfigs.grupos[i].id}`].innerHTML = ""
    }
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        window[`grupo${meshConfigs.meshes[i].grupoFk}`].innerHTML += `<div id="face${meshConfigs.meshes[i].id}" class="face"></div>`
    }

    // Carregar medidas de grupos
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        let g = meshConfigs.grupos[i]
        window[`grupo${g.id}`].style.transform = `rotateX(${g.rX}deg) rotateY(${g.rY}deg) rotateZ(${g.rZ}deg) translate3d(${porcentagem(g.tX)}px, ${porcentagem(g.tY)}px, ${porcentagem(g.tZ)}px)`
    }
    // Carregar medidas de polígonos
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        let m = meshConfigs.meshes[i]
        let mesh = window[`face${m.id}`].style
        mesh.width = `${m.width}%`
        mesh.height = `${m.height}%`
        mesh.transform = `rotateX(${m.rX}deg) rotateY(${m.rY}deg) rotateZ(${m.rZ}deg) translate3d(${porcentagem(m.tX)}px, ${porcentagem(m.tY)}px, ${porcentagem(m.tZ)}px)`
        mesh.backgroundColor = m.cor
    }
}