function atualizarListaGrupos() {
    gruposLista.innerHTML = `<div onclick="selecionarGrupo('na')" class="grdMiniCaixas"><b>Remover seleção</b></div>`
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        gruposLista.innerHTML += `<div id="grdGruposBotao${meshConfigs.grupos[i].id}" class="grdMiniCaixas" onclick="selecionarGrupo(${meshConfigs.grupos[i].id})"><b>${meshConfigs.grupos[i].nome}</b><span>Grupo ${meshConfigs.grupos[i].id}</span></div>`
    }
}

function atualizarListaMeshes() {
    meshesLista.innerHTML = ""
    if (!(meshConfigs.grupoSelecionado == "")) {
        meshesLista.innerHTML += `<div onclick="selecionarMesh('na')" class="grdMiniCaixas"><b>Remover seleção</b></div>`
    }
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        if (meshConfigs.meshes[i].grupoFk == meshConfigs.grupoSelecionado.id) {
            meshesLista.innerHTML += `<div id="grdMeshesBotao${meshConfigs.meshes[i].id}" class="grdMiniCaixas" onclick="selecionarMesh(${meshConfigs.meshes[i].id})"><b>${meshConfigs.meshes[i].nome}</b><span>${meshConfigs.meshes[i].tipo} ${meshConfigs.meshes[i].id}</span></div>`
        }
    }
}

function atualizarInfos() {
    if (meshConfigs.meshSelecionada == "") {
        if (meshConfigs.grupoSelecionado == "") {
            infTitulo.innerHTML = "Nada selecionado"
            infBoxes.innerHTML = ""
        } else {
            let vAtual = meshConfigs.grupoSelecionado
            infTitulo.innerHTML = `<b>${vAtual.nome}</b> &nbsp;- Grupo ${vAtual.id}`
            infBoxes.innerHTML = `
                <div class="infMetricas" style="width: 50%;">
                    <b style="margin-bottom: 2vh;">Rotação</b>
                    <span>X: ${vAtual.rX}°</span>
                    <span>Y: ${vAtual.rY}°</span>
                    <span>Z: ${vAtual.rZ}°</span>
                </div>
                <div class="infMetricas" style="width: 50%;">
                    <b style="margin-bottom: 2vh;">Translação</b>
                    <span>X: ${vAtual.tX}%</span>
                    <span>Y: ${vAtual.tY}%</span>
                    <span>Z: ${vAtual.tZ}%</span>
                </div>
            `
        }
    }
    else {
        let vAtual = meshConfigs.meshSelecionada
        infTitulo.innerHTML = `<b>${vAtual.nome}</b> &nbsp;- ${vAtual.tipo} ${vAtual.id}`
        infBoxes.innerHTML = `
            <div class="infMetricas">
                <b style="margin-bottom: 2vh;">Rotação</b>
                <span>X: ${vAtual.rX}°</span>
                <span>Y: ${vAtual.rY}°</span>
                <span>Z: ${vAtual.rZ}°</span>
            </div>
            <div class="infMetricas">
                <b style="margin-bottom: 2vh;">Translação</b>
                <span>X: ${vAtual.tX}%</span>
                <span>Y: ${vAtual.tY}%</span>
                <span>Z: ${vAtual.tZ}%</span>
            </div>
            <div class="infMetricas">
                <b style="margin-bottom: 2vh;">Medidas</b>
                <span>W: ${meshConfigs.meshSelecionada.width}%</span>
                <span>H: ${meshConfigs.meshSelecionada.height}%</span>
                <span>Grupo ${meshConfigs.meshSelecionada.grupoFk}</span>
            </div>
        `
    }
    aparecerTelaEdicao()
}

function aparecerTelaEdicao() {
    grdEditarMeshes.innerHTML = ""
    if (meshConfigs.meshSelecionada == "") {
        if (meshConfigs.grupoSelecionado == "") {
            grdEditarMeshes.innerHTML += "criar grupo <br>"
            grdEditarMeshes.innerHTML += "deletar grupo"
        } else {
            grdEditarMeshes.innerHTML += "criar modelo <br>"
            grdEditarMeshes.innerHTML += "deletar modelo <br>"
            grdEditarMeshes.innerHTML += "animar grupo atual <br>"
            grdEditarMeshes.innerHTML += "deletar grupo atual"
            // aparecer para grupo
        }
    }
    else {
        grdEditarMeshes.innerHTML += "editar modelo <br>"
        grdEditarMeshes.innerHTML += "texturizar modelo <br>"
        grdEditarMeshes.innerHTML += "deletar modelo"
        // aparecer para mesh
    }
}

function selecionarGrupo(g) {
    if (meshConfigs.grupoSelecionado.id == g) {
        // Já selecionado
        return
    }
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        window[`grdGruposBotao${meshConfigs.grupos[i].id}`].style.border = "1px solid black"
    }
    if (g == "na") {
        meshConfigs.grupoSelecionado = ""
    } else {
        window[`grdGruposBotao${g}`].style.border = "1px solid blue"
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            if (g == meshConfigs.grupos[i].id) {
                meshConfigs.grupoSelecionado = meshConfigs.grupos[i]
                break
            }
        }
    }
    meshConfigs.meshSelecionada = ""
    atualizarListaMeshes()
    atualizarInfos()
}

function selecionarMesh(m) {
    if (meshConfigs.meshSelecionada == m) {
        return
    }
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        if (meshConfigs.meshes[i].grupoFk == meshConfigs.grupoSelecionado.id) {
            window[`grdMeshesBotao${meshConfigs.meshes[i].id}`].style.border = "1px solid black"
        }
    }
    if (m == "na") {
        meshConfigs.meshSelecionada = ""
    } else {
        window[`grdMeshesBotao${m}`].style.border = "1px solid blue"
        for (i = 0; i < meshConfigs.meshes.length; i++) {
            if (m == meshConfigs.meshes[i].id) {
                meshConfigs.meshSelecionada = meshConfigs.meshes[i]
                break
            }
        }
    }
    atualizarInfos()
}