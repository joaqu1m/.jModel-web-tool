// Câmera
let cameraConfigs = {
    eventoEmUso: false,
    cameraPos: {x: 0, y: 0},
    posicaoAnterior: {x: 0, y: 0}
}

// Modelos e GUI
let meshConfigs = {
    grupos: [],
    meshes: [],
    grupoSelecionado: "",
    meshSelecionada: "",
    timeouts: {
        exclusaoCod: 0
    },
    mostrarAjudas: true
}

// Itens prontos caso testes sejam necessários

meshConfigs.grupos.push({
    id: 1,
    nome: "teste 1",
    rX: 0,
    rY: 0,
    rZ: 0,
    tX: 0,
    tY: 0,
    tZ: 0
})
meshConfigs.grupos.push({
    id: 2,
    nome: "teste 2",
    rX: 0,
    rY: 0,
    rZ: 0,
    tX: 0,
    tY: 0,
    tZ: 0
})

meshConfigs.meshes.push({
    id: 1,
    nome: "quadrado verde",
    width: 100,
    height: 100,
    rX: 0,
    rY: 90,
    rZ: 0,
    tX: 0,
    tY: 0,
    tZ: 50,
    cor: "#329a1d",
    grupoFk: 1,
    tipo: "Quadrado"
})
meshConfigs.meshes.push({
    id: 2,
    nome: "quadrado rosa",
    width: 100,
    height: 125,
    rX: 0,
    rY: 180,
    rZ: 0,
    tX: 0,
    tY: 0,
    tZ: 50,
    cor: "#ffb3b3",
    grupoFk: 1,
    tipo: "Quadrado"
})
meshConfigs.meshes.push({
    id: 3,
    nome: "quadrado azul",
    width: 100,
    height: 125,
    rX: 0,
    rY: 270,
    rZ: 0,
    tX: 0,
    tY: 0,
    tZ: 50,
    cor: "#1532c1",
    grupoFk: 2,
    tipo: "Quadrado"
})