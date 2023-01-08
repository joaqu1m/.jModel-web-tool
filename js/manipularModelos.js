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
    atualizarInfos()
}

function criarPlano() {
    grdEditarMeshes.innerHTML =
    `
    <div class="grdMiniCaixas grdMiniCaixasCriarR">
        <div>
            <input id="criarPlanonome" type="text" placeholder="Nome">
        </div>
        <div>
            <input id="criarPlanowidth" type="text" placeholder="Width%">
        </div>
        <div>
            <input id="criarPlanoheight" type="text" placeholder="Height%">
        </div>
        <div>
            <input id="criarPlanocor" type="color" style="padding: 0; margin: 0; border: 0; background-color: transparent; width: 70%;" value="#bcffb8">
        </div>
    </div>
    <div class="grdMiniCaixas grdMiniCaixasCriarR">
        <div>
            Rotação
        </div>
        <div>
            <span>X: </span>
            <input id="criarPlanorX" type="text">
            <span>°</span>
        </div>
        <div>
            <span>Y: </span>
            <input id="criarPlanorY" type="text">
            <span>°</span>
        </div>
        <div>
            <span>Z: </span>
            <input id="criarPlanorZ" type="text">
            <span>°</span>
        </div>
    </div>
    <div class="grdMiniCaixas grdMiniCaixasCriarR">
        <div>
            Translação
        </div>
        <div>
            <span>X: </span>
            <input id="criarPlanotX" type="text">
            <span>%</span>
        </div>
        <div>
            <span>Y: </span>
            <input id="criarPlanotY" type="text">
            <span>%</span>
        </div>
        <div>
            <span>Z: </span>
            <input id="criarPlanotZ" type="text">
            <span>%</span>
        </div>
    </div>
    <div class="grdMiniCaixas" onclick="realmenteCriarPlano()">Confirmar</div>
    <div class="grdMiniCaixas" onclick="aparecerTelaEdicao()">Cancelar</div>
    `
}

function realmenteCriarPlano() {
    let i = 1
    let achei = false
    let novoId = 0
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
    }
}

function editarMedidasGrupos(medida, v) {
    if (v == "") {
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            if (meshConfigs.grupos[i].id == meshConfigs.grupoSelecionado.id) {
                meshConfigs.grupos[i][`r${medida}`] = Math.round((window[`inputr${medida}`].value) * 100) / 100
                window[`spanr${medida}`].innerHTML = `${medida}: ${Math.round((window[`inputr${medida}`].value) * 100) / 100}°`
                break
            }
        }
    } else {
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            if (meshConfigs.grupos[i].id == meshConfigs.grupoSelecionado.id) {
                let resultado = meshConfigs.grupos[i][`r${medida}`] + v
                meshConfigs.grupos[i][`r${medida}`] = Math.round(definirFaixas(resultado, 0, 360) * 100) / 100
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

function animarGrupo() {
    alert("Ainda em desenvolvimento")
}

function excluirConfirmacao() {
    clearTimeout(meshConfigs.timeouts.exclusaoCod)
    botaoDeletar.innerHTML = "Tem certeza?"
    botaoDeletar.onclick = excluirGrupoAtual

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