const html3dRead = (elementId, stringfiedFile) => {

    const
    separateInArrays = (string, char) => {
        const result = []
        while (true) {
            if (string.length > 0) {
                if (string.indexOf(char) > -1) {
                    result.push(string.substring(0, string.indexOf(char)))
                    string = string.substring(string.indexOf(char) + 1)
                } else {
                    result.push(string)
                    string = ""
                }
            } else {
                return result
            }
        }
    },

    divHeightPercentage = (div, num) => div.offsetHeight * (0.01 * num),

    formattedFile = {
        axles: [],
        meshes: []
    },

    bruteArray = separateInArrays(stringfiedFile, "|")

    for (let i = 0; i < bruteArray.length; i++) {
        const sprd = separateInArrays(bruteArray[i], ";")
        if (sprd.length == 8) {
            formattedFile.axles.push({
                id: Number(sprd[0]),
                nome: sprd[1],
                rX: Number(sprd[2]),
                rY: Number(sprd[3]),
                rZ: Number(sprd[4]),
                tX: Number(sprd[5]),
                tY: Number(sprd[6]),
                tZ: Number(sprd[7])
            })
        } else {
            formattedFile.meshes.push({
                id: Number(sprd[0]),
                nome: sprd[1],
                width: Number(sprd[2]),
                height: Number(sprd[3]),
                rX: Number(sprd[4]),
                rY: Number(sprd[5]),
                rZ: Number(sprd[6]),
                tX: Number(sprd[7]),
                tY: Number(sprd[8]),
                tZ: Number(sprd[9]),
                cor: sprd[10],
                grupoFk: Number(sprd[11]),
                tipo: sprd[12]
            })
        }
    }

    const visGrupos = document.getElementById(elementId)

    visGrupos.innerHTML = ""
    visGrupos.style = "transform-style: preserve-3d;"

    for (let i = 0; i < formattedFile.axles.length; i++) {

        visGrupos.innerHTML +=
        `<div id="grupo${formattedFile.axles[i].id}"></div>`

        const
        groupSpecs = formattedFile.axles[i],
        groupElement = visGrupos.children[`grupo${groupSpecs.id}`]

        groupElement.style = `
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            position: absolute;
            transform:
                rotateX(${groupSpecs.rX}deg)
                rotateY(${groupSpecs.rY}deg)
                rotateZ(${groupSpecs.rZ}deg)
                translate3d(
                    ${divHeightPercentage(visGrupos, groupSpecs.tX)}px,
                    ${divHeightPercentage(visGrupos, groupSpecs.tY)}px,
                    ${divHeightPercentage(visGrupos, groupSpecs.tZ)}px
                );
            display: flex;
            justify-content: center;
            align-items: center;
        `
    }

    for (let i = 0; i < formattedFile.meshes.length; i++) {

        visGrupos.children[`grupo${formattedFile.meshes[i].grupoFk}`].innerHTML +=
            `<div id="face${formattedFile.meshes[i].id}"></div>`

        const
        meshSpecs = formattedFile.meshes[i],
        meshElement = visGrupos.children[`grupo${meshSpecs.grupoFk}`].children[`face${meshSpecs.id}`]

        meshElement.style = `
            width: ${meshSpecs.width}%;
            height: ${meshSpecs.height}%;
            transform:
                rotateX(${meshSpecs.rX}deg)
                rotateY(${meshSpecs.rY}deg)
                rotateZ(${meshSpecs.rZ}deg)
                translate3d(
                    ${divHeightPercentage(visGrupos, meshSpecs.tX)}px,
                    ${divHeightPercentage(visGrupos, meshSpecs.tY)}px,
                    ${divHeightPercentage(visGrupos, meshSpecs.tZ)}px
                );
            background-color: ${meshSpecs.cor};
            position: absolute;
        `
    }
}
