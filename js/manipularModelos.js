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
        let m = meshConfigs.meshes[i],
            mesh = window[`face${m.id}`].style
        mesh.width = `${m.width}%`
        mesh.height = `${m.height}%`
        mesh.transform = `rotateX(${m.rX}deg) rotateY(${m.rY}deg) rotateZ(${m.rZ}deg) translate3d(${porcentagem(m.tX)}px, ${porcentagem(m.tY)}px, ${porcentagem(m.tZ)}px)`
        mesh.backgroundColor = m.cor
    }
    atualizarInfos()
}

function realmenteCriarGrupo() {
    let i = 1,
        achei = false,
        novoId = 0
    while (true) {
        achei = false
        for (f = 0; f < meshConfigs.grupos.length; f++) {
            if (i == meshConfigs.grupos[f].id) {
                achei = true
            }
        } 
        if (!achei) {
            novoId = i
            break
        }
        i++
    }
    let valores = checarNumber([criarGruporX.value, criarGruporY.value, criarGruporZ.value, criarGrupotX.value, criarGrupotY.value, criarGrupotZ.value])
    meshConfigs.grupos.push({
        id: novoId,
        nome: criarGruponome.value,
        rX: valores[0],
        rY: valores[1],
        rZ: valores[2],
        tX: valores[3],
        tY: valores[4],
        tZ: valores[5]
    })
    aparecerTelaEdicao()
    recarregarMedidas()
    atualizarListaGrupos()
    selecionarGrupo(novoId)
}
function realmenteCriarPlano() {
    let i = 1,
        achei = false,
        novoId = 0
    while (true) {
        achei = false
        for (f = 0; f < meshConfigs.meshes.length; f++) {
            if (i == meshConfigs.meshes[f].id) {
                achei = true
            }
        }
        if (!achei) {
            novoId = i
            break
        }
        i++
    }
    let valores = checarNumber([criarPlanowidth.value, criarPlanoheight.value, criarPlanorX.value, criarPlanorY.value, criarPlanorZ.value, criarPlanotX.value, criarPlanotY.value, criarPlanotZ.value])
    if (valores == undefined) {
        alert("Apenas valores numéricos na maioria dos campos")
    } else {
        meshConfigs.meshes.push({
            id: novoId,
            nome: criarPlanonome.value,
            width: valores[0],
            height: valores[1],
            rX: definirFaixas(valores[2], 0, 360),
            rY: definirFaixas(valores[3], 0, 360),
            rZ: definirFaixas(valores[4], 0, 360),
            tX: valores[5],
            tY: valores[6],
            tZ: valores[7],
            cor: criarPlanocor.value,
            grupoFk: meshConfigs.grupoSelecionado.id,
            tipo: "Quadrado"
        })
        aparecerTelaEdicao()
        recarregarMedidas()
        atualizarListaMeshes()
        selecionarMesh(novoId)
    }
}

function definirValor(categoria, item, fonte) {
    if (categoria == "grupos") {
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            if (meshConfigs.grupos[i].id == meshConfigs.grupoSelecionado.id) {
                meshConfigs[categoria][i][item] = fonte
                break
            }
        }
    } else {
        for (i = 0; i < meshConfigs.meshes.length; i++) {
            if (meshConfigs.meshes[i].id == meshConfigs.meshSelecionada.id) {
                meshConfigs[categoria][i][item] = fonte
                break
            }
        }
    }
    recarregarMedidas()
    if (!(meshConfigs.grupoSelecionado == "na" || meshConfigs.grupoSelecionado == "")) {
        atualizarListaGrupos()
        window[`grdGruposBotao${meshConfigs.grupoSelecionado.id}`].style.border = "1px solid blue"
        if (!(meshConfigs.meshSelecionada == "na" || meshConfigs.meshSelecionada == "")) {
            atualizarListaMeshes()
            window[`grdMeshesBotao${meshConfigs.meshSelecionada.id}`].style.border = "1px solid blue"
        }
    }
}
function editarMedidasGrupos(medida, v) {
    if (v == "") {
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            if (meshConfigs.grupos[i].id == meshConfigs.grupoSelecionado.id) {
                meshConfigs.grupos[i][`r${medida}`] = Math.round((window[`inputr${medida}`].value) * 100) / 100
                window[`spanr${medida}`].innerHTML = `${medida}: ${meshConfigs.grupos[i][`r${medida}`]}°`
                break
            }
        }
    } else {
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            if (meshConfigs.grupos[i].id == meshConfigs.grupoSelecionado.id) {
                meshConfigs.grupos[i][`r${medida}`] = Math.round(definirFaixas(meshConfigs.grupos[i][`r${medida}`] + v, 0, 360) * 100) / 100
                window[`spanr${medida}`].innerHTML = `${medida}: ${meshConfigs.grupos[i][`r${medida}`]}°`
                window[`inputr${medida}`].value = meshConfigs.grupos[i][`r${medida}`]
                break
            }
        }
    }
    recarregarMedidas()
}
function editarTranslacaoGrupos(medida, v) {
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        if (meshConfigs.grupos[i].id == meshConfigs.grupoSelecionado.id) {
            meshConfigs.grupos[i][`t${medida}`] += v
            window[`spant${medida}`].innerHTML = `${medida}: ${meshConfigs.grupos[i][`t${medida}`]}%`
            break
        }
    }
    recarregarMedidas()
}

function editarMedidasMeshes(medida, v) {
    if (v == "") {
        for (i = 0; i < meshConfigs.meshes.length; i++) {
            if (meshConfigs.meshes[i].id == meshConfigs.meshSelecionada.id) {
                meshConfigs.meshes[i][`r${medida}`] = Math.round((window[`inputr${medida}`].value) * 100) / 100
                window[`spanr${medida}`].innerHTML = `${medida}: ${meshConfigs.meshes[i][`r${medida}`]}°`
                break
            }
        }
    } else {
        for (i = 0; i < meshConfigs.meshes.length; i++) {
            if (meshConfigs.meshes[i].id == meshConfigs.meshSelecionada.id) {
                meshConfigs.meshes[i][`r${medida}`] = Math.round(definirFaixas(meshConfigs.meshes[i][`r${medida}`] + v, 0, 360) * 100) / 100
                window[`spanr${medida}`].innerHTML = `${medida}: ${meshConfigs.meshes[i][`r${medida}`]}°`
                window[`inputr${medida}`].value = meshConfigs.meshes[i][`r${medida}`]
                break
            }
        }
    }
    recarregarMedidas()
}
function editarTranslacaoMeshes(medida, v) {
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        if (meshConfigs.meshes[i].id == meshConfigs.meshSelecionada.id) {
            meshConfigs.meshes[i][`t${medida}`] = Math.round((meshConfigs.meshes[i][`t${medida}`] + v) * 10) / 10
            window[`spant${medida}`].innerHTML = `${medida}: ${meshConfigs.meshes[i][`t${medida}`]}%`
            break
        }
    }
    recarregarMedidas()
}
function editarTamanhoMeshes(medida, v) {
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        if (meshConfigs.meshes[i].id == meshConfigs.meshSelecionada.id) {
            meshConfigs.meshes[i][medida] += v
            window[`span${medida}`].innerHTML = `W: ${meshConfigs.meshes[i][medida]}%`
            editarTranslacaoMeshes('X', (v/2)*-1)
            editarTranslacaoMeshes('Z', (v/2)*-1)
            break
        }
    }
    recarregarMedidas()
}
function realmenteAlterarEixoDoMesh() {
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        if (meshConfigs.meshes[i].id == meshConfigs.meshSelecionada.id) {
            console.log(meshConfigs.meshes[i].grupoFk)
            break
        }
    }
}

function animarGrupo() {
    alert("Ainda em desenvolvimento")
}


function excluirConfirmacao(item) {
    clearTimeout(meshConfigs.timeouts.exclusaoCod)
    if (item) {
        botaoDeletar.innerHTML = "Tem certeza? Isso inclui seus planos"
        botaoDeletar.onclick = excluirGrupoAtual
    } else {
        botaoDeletar.innerHTML = "Tem certeza?"
        botaoDeletar.onclick = excluirMeshAtual
    }

    const reaparecer = setTimeout(() => {
        botaoDeletar.innerHTML = "Excluir eixo selecionado"
        botaoDeletar.onclick = excluirConfirmacao
    }, 4000)
    meshConfigs.timeouts.exclusaoCod = reaparecer
}
function excluirGrupoAtual() {
    clearTimeout(meshConfigs.timeouts.exclusaoCod)
    for (i = 0; i < meshConfigs.grupos.length; i++) {
        if (meshConfigs.grupos[i].id == meshConfigs.grupoSelecionado.id) {
            for (f = 0; f < meshConfigs.meshes.length; f++) {
                if (meshConfigs.grupos[i].id == meshConfigs.meshes[f].grupoFk) {
                    meshConfigs.meshes.splice(meshConfigs.meshes.indexOf(meshConfigs.meshes[f]), 1)
                    f--
                }
            }
            meshConfigs.grupos.splice(meshConfigs.grupos.indexOf(meshConfigs.grupos[i]), 1)
            selecionarGrupo("na")
            atualizarListaGrupos()
            recarregarMedidas()
            break
        }
    }
}
function excluirMeshAtual() {
    clearTimeout(meshConfigs.timeouts.exclusaoCod)
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        if (meshConfigs.meshes[i].id == meshConfigs.meshSelecionada.id) {
            meshConfigs.meshes.splice(meshConfigs.meshes.indexOf(meshConfigs.meshes[i]), 1)
            selecionarMesh("na")
            atualizarListaMeshes()
            recarregarMedidas()
            break
        }
    }
}