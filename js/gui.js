function atualizarListaGrupos() {
    if (meshConfigs.grupos.length > 0) {
        gruposLista.innerHTML = `<div onclick="selecionarGrupo('na')" class="grdMiniCaixas"><b style="color: rgb(185, 37, 11);">Remover seleção</b></div>`
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            gruposLista.innerHTML += `<div id="grdGruposBotao${meshConfigs.grupos[i].id}" class="grdMiniCaixas" onclick="selecionarGrupo(${meshConfigs.grupos[i].id})"><b>${meshConfigs.grupos[i].nome}</b><span>Eixo ${meshConfigs.grupos[i].id}</span></div>`
        }
    } else {
        gruposLista.innerHTML = "Lista de eixos vazia"
    }
}

function atualizarListaMeshes() {
    let meshesAtuais = []
    for (i = 0; i < meshConfigs.meshes.length; i++) {
        if (meshConfigs.meshes[i].grupoFk == meshConfigs.grupoSelecionado.id) {
            meshesAtuais.push(meshConfigs.meshes[i])
        }
    }
    if (!(meshConfigs.grupoSelecionado == "") && meshesAtuais.length > 0) {
        meshesLista.innerHTML = `<div onclick="selecionarMesh('na')" class="grdMiniCaixas"><b style="color: rgb(185, 37, 11);">Remover seleção</b></div>`
        for (i = 0; i < meshesAtuais.length; i++) {
            meshesLista.innerHTML += `<div id="grdMeshesBotao${meshesAtuais[i].id}" class="grdMiniCaixas" onclick="selecionarMesh(${meshesAtuais[i].id})"><b style="color: ${meshesAtuais[i].cor}; background-color: ${inverterCor(meshesAtuais[i].cor)};">${meshesAtuais[i].nome}</b><span>${meshesAtuais[i].tipo} ID ${meshesAtuais[i].id}</span></div>`
        }
    } else {
        meshesLista.innerHTML = "Lista de formas do eixo selecionado vazia"
    }
}

function atualizarInfos() {
    if (meshConfigs.meshSelecionada == "") {
        if (meshConfigs.grupoSelecionado == "") {
            infTitulo.innerHTML = "Nada selecionado"
            infBoxes.innerHTML = ""
        } else {
            let vAtual = meshConfigs.grupoSelecionado
            infTitulo.innerHTML = `<b>${vAtual.nome}</b> &nbsp;- Eixo ${vAtual.id}`
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
}

function aparecerTelaEdicao() {
    grdEditarMeshes.innerHTML = ""
    let medidas = ["X", "Y", "Z"]
    if (meshConfigs.meshSelecionada == "") {
        if (meshConfigs.grupoSelecionado == "") {
            // Nada selecionado
            grdEditarMeshes.innerHTML +=
            `
            <div class="grdMiniCaixas">Manual de instruções</div>
            <div class="grdMiniCaixas" onclick="criarGrupo()">Criar eixo</div>
            `
        } else {
            grdEditarMeshes.innerHTML +=
            // Eixo selecionado
            `
            <div class="grdMiniCaixas" onclick="criarPlano()">Criar novo plano neste eixo</div>
            <div class="grdMiniCaixas grdMiniCaixasMeshesR">
                <div style="flex-direction: column; width: 90%;">
                    <b>Nome</b>
                    <input id="inputnome" type="text" style="width: 80%; height: 20%; border: 1px solid black;" placeholder="Insira aqui" onkeyup="definirValor('grupos', 'nome', inputnome.value)" value="${meshConfigs.grupoSelecionado.nome}">
                </div>
            </div>
            `
            for (i = 0; i < 3; i++) {
                let medidaAtual = medidas[i]
                grdEditarMeshes.innerHTML +=
                `
                <div class="grdMiniCaixas grdMiniCaixasMeshesR">
                    <div style="flex-direction: column; width: 90%;">
                        <div>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', 10)">10</button>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', 1)">1</button>
                        </div>
                        <div>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', 0.1)">0.1</button>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', 0.01)">0.01</button>
                        </div>
                        <span id="spanr${medidaAtual}">${medidaAtual}: ${meshConfigs.grupoSelecionado[`r${medidaAtual}`]}°</span>
                        <div>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', -10)">10</button>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', -1)">1</button>
                        </div>
                        <div>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', -0.1)">0.1</button>
                            <button onclick="editarMedidasGrupos('${medidaAtual}', -0.01)">0.01</button>
                        </div>
                    </div>
                    <input oninput="editarMedidasGrupos('${medidaAtual}', '')" type="range" id="inputr${medidaAtual}" min="0" max="360" value="${meshConfigs.grupoSelecionado[`r${medidaAtual}`]}" step="any" list="graus" orient="vertical" style="-webkit-appearance: slider-vertical;">
                </div>
                `
            }
            for (i = 0; i < 3; i++) {
                let medidaAtual = medidas[i]
                grdEditarMeshes.innerHTML +=
                `
                <div class="grdMiniCaixas grdMiniCaixasMeshesT">
                    <div>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', 25)">25</button>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', 10)">10</button>
                    </div>
                    <div>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', 1)">1</button>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', 0.1)">0.1</button>
                    </div>
                    <span id="spant${medidaAtual}">${medidaAtual}: ${meshConfigs.grupoSelecionado[`t${medidaAtual}`]}%</span>
                    <div>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', -25)">25</button>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', -10)">10</button>
                    </div>
                    <div>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', -1)">1</button>
                        <button onclick="editarTranslacaoGrupos('${medidaAtual}', -0.1)">0.1</button>
                    </div>
                </div>
                `
            }
            grdEditarMeshes.innerHTML +=
            `
            <datalist id="graus">
              <option value="0"></option>
              <option value="45"></option>
              <option value="90"></option>
              <option value="135"></option>
              <option value="180"></option>
              <option value="225"></option>
              <option value="270"></option>
              <option value="315"></option>
              <option value="360"></option>
            </datalist>
            <div class="grdMiniCaixas" id="botaoDeletar" onclick="excluirConfirmacao(true)">Excluir eixo selecionado</div>
            <div class="grdMiniCaixas" onclick="animarGrupo()">Animar eixo selecionado</div>
            `
        }
    }
    else {
        let listaGruposDisponiveis = []
        for (i = 0; i < meshConfigs.grupos.length; i++) {
            let grupoAtual = meshConfigs.grupos[i].id
            if (grupoAtual == meshConfigs.meshSelecionada.grupoFk) {
                listaGruposDisponiveis +=
                `
                <option selected="selected" value="${grupoAtual}">Eixo ${grupoAtual}</option>
                `
            } else {
                listaGruposDisponiveis +=
                `
                <option value="${grupoAtual}">Eixo ${grupoAtual}</option>
                `
            }
        }
        grdEditarMeshes.innerHTML +=
        `
        <div class="grdMiniCaixas grdMiniCaixasMeshesR">
            <div style="flex-direction: column; width: 90%;">
                <b>Nome</b>
                <input id="inputnome" type="text" style="width: 80%; height: 20%; border: 1px solid black;" placeholder="Insira aqui" onkeyup="definirValor('meshes', 'nome', inputnome.value)" value="${meshConfigs.meshSelecionada.nome}">
                <b>Cor</b>
                <input type="color" id="inputcolor" value="${meshConfigs.meshSelecionada.cor}" style="width: 85%; height: 25%;" oninput="definirValor('meshes', 'cor', inputcolor.value)">
                <b>Eixo</b>
                <select style="height: 20%;">
                    ${listaGruposDisponiveis}
                </select>
            </div>
        </div>
        `
        for (i = 0; i < 2; i++) {
            if (i % 2 == 0) {
                grdEditarMeshes.innerHTML +=
                `
                <div class="grdMiniCaixas grdMiniCaixasMeshesT">
                    <div>
                        <button onclick="editarTamanhoMeshes('width', 25)">25</button>
                        <button onclick="editarTamanhoMeshes('width', 10)">10</button>
                    </div>
                    <div>
                        <button onclick="editarTamanhoMeshes('width', 1)">1</button>
                        <button onclick="editarTamanhoMeshes('width', 0.1)">0.1</button>
                    </div>
                    <span id="spanwidth">W: ${meshConfigs.meshSelecionada["width"]}%</span>
                    <div>
                        <button onclick="editarTamanhoMeshes('width', -25)">25</button>
                        <button onclick="editarTamanhoMeshes('width', -10)">10</button>
                    </div>
                    <div>
                        <button onclick="editarTamanhoMeshes('width', -1)">1</button>
                        <button onclick="editarTamanhoMeshes('width', -0.1)">0.1</button>
                    </div>
                </div>
                `
            }
        }
        for (i = 0; i < 3; i++) {
            let medidaAtual = medidas[i]
            grdEditarMeshes.innerHTML +=
            `
            <div class="grdMiniCaixas grdMiniCaixasMeshesR">
                <div style="flex-direction: column; width: 90%;">
                    <div>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', 10)">10</button>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', 1)">1</button>
                    </div>
                    <div>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', 0.1)">0.1</button>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', 0.01)">0.01</button>
                    </div>
                    <span id="spanr${medidaAtual}">${medidaAtual}: ${meshConfigs.meshSelecionada[`r${medidaAtual}`]}°</span>
                    <div>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', -10)">10</button>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', -1)">1</button>
                    </div>
                    <div>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', -0.1)">0.1</button>
                        <button onclick="editarMedidasMeshes('${medidaAtual}', -0.01)">0.01</button>
                    </div>
                </div>
                <input oninput="editarMedidasMeshes('${medidaAtual}', '')" type="range" id="inputr${medidaAtual}" min="0" max="360" value="${meshConfigs.meshSelecionada[`r${medidaAtual}`]}" step="any" list="graus" orient="vertical" style="-webkit-appearance: slider-vertical;">
            </div>
            `
        }
        for (i = 0; i < 3; i++) {
            let medidaAtual = medidas[i]
            grdEditarMeshes.innerHTML +=
            `
            <div class="grdMiniCaixas grdMiniCaixasMeshesT">
                <div>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', 25)">25</button>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', 10)">10</button>
                </div>
                <div>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', 1)">1</button>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', 0.1)">0.1</button>
                </div>
                <span id="spant${medidaAtual}">${medidaAtual}: ${meshConfigs.meshSelecionada[`t${medidaAtual}`]}%</span>
                <div>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', -25)">25</button>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', -10)">10</button>
                </div>
                <div>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', -1)">1</button>
                    <button onclick="editarTranslacaoMeshes('${medidaAtual}', -0.1)">0.1</button>
                </div>
            </div>
            `
        }
        grdEditarMeshes.innerHTML +=
        `
        <datalist id="graus">
          <option value="0"></option>
          <option value="45"></option>
          <option value="90"></option>
          <option value="135"></option>
          <option value="180"></option>
          <option value="225"></option>
          <option value="270"></option>
          <option value="315"></option>
          <option value="360"></option>
        </datalist>
        <div class="grdMiniCaixas" id="botaoDeletar" onclick="excluirConfirmacao(false)">Excluir plano selecionado</div>
        `
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
    aparecerTelaEdicao()

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
    aparecerTelaEdicao()
}

function criarGrupo() {
    grdEditarMeshes.innerHTML =
    `
    <div class="grdMiniCaixas grdMiniCaixasCriarR">
        <div>
            <input id="criarGruponome" type="text" placeholder="Nome">
        </div>
    </div>
    <div class="grdMiniCaixas grdMiniCaixasCriarR">
        <div>
            Rotação
        </div>
        <div>
            <span>X: </span>
            <input id="criarGruporX" type="text">
            <span>°</span>
        </div>
        <div>
            <span>Y: </span>
            <input id="criarGruporY" type="text">
            <span>°</span>
        </div>
        <div>
            <span>Z: </span>
            <input id="criarGruporZ" type="text">
            <span>°</span>
        </div>
    </div>
    <div class="grdMiniCaixas grdMiniCaixasCriarR">
        <div>
            Translação
        </div>
        <div>
            <span>X: </span>
            <input id="criarGrupotX" type="text">
            <span>%</span>
        </div>
        <div>
            <span>Y: </span>
            <input id="criarGrupotY" type="text">
            <span>%</span>
        </div>
        <div>
            <span>Z: </span>
            <input id="criarGrupotZ" type="text">
            <span>%</span>
        </div>
    </div>
    <div class="grdMiniCaixas" onclick="realmenteCriarGrupo()">Confirmar</div>
    <div class="grdMiniCaixas" onclick="aparecerTelaEdicao()">Cancelar</div>
    `
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