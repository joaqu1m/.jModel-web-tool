function recarregarMedidas() {
    visGrupos.innerHTML = ""
    // Primeiro ele cria os grupos e faces
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        visGrupos.innerHTML += `<div id="grupo${meshConfigs.grupos[i].id}" class="grupo"></div>`
        if (meshConfigs.mostrarAjudas) {
            window[`grupo${meshConfigs.grupos[i].id}`].innerHTML +=
            `
            <div id="grupoAjuda${meshConfigs.grupos[i].id}" class="grupoAjuda absoluto">
                <div></div>
                <div style="transform: rotateX(90deg)"></div>
                <div style="transform: rotateY(90deg)"></div>
            </div>
            `
        }
        window[`grupo${meshConfigs.grupos[i].id}`].innerHTML += `<div id="grupoPlanos${meshConfigs.grupos[i].id}" class="grupoPlanos"></div>`
    }
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        window[`grupoPlanos${meshConfigs.meshes[i].grupoFk}`].innerHTML += `<div id="face${meshConfigs.meshes[i].id}" class="absoluto"></div>`
    }

    // Depois ele carrega as medidas dos grupos e faces
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        let g = meshConfigs.grupos[i]
        window[`grupo${g.id}`].style.transform = `translate3d(${porcentagem(g.tX)}px, ${porcentagem(g.tY)}px, ${porcentagem(g.tZ)}px)`
        window[`grupoPlanos${g.id}`].style.transform = `rotateX(${g.rX}deg) rotateY(${g.rY}deg) rotateZ(${g.rZ}deg)`
    }
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        let m = meshConfigs.meshes[i]
        let mesh = window[`face${m.id}`].style
        mesh.width = `${m.width}%`
        mesh.height = `${m.height}%`
        mesh.transform = `rotateX(${m.rX}deg) rotateY(${m.rY}deg) rotateZ(${m.rZ}deg) translate3d(${porcentagem(m.tX)}px, ${porcentagem(m.tY)}px, ${porcentagem(m.tZ)}px)`
        mesh.backgroundColor = m.cor
    }
}