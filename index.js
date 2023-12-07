let possui_atrito = false
let coef_atrito_escolhido = 'Nenhum'
let primeiro_termo_razao = []

function mudarSistema() {
    document.querySelector(".inputsEntradas").innerHTML = ``
    document.querySelector(".resultado ").innerHTML = ``
    possui_atrito = false
    coef_atrito_escolhido = ''
    if (document.querySelector('#sistemSelector').value == 'sistema1') {
        document.querySelector("#sistemas").innerHTML = `<div class="containerSistema">
            <h3>Mude a quantidade de blocos para aparecer o sistema</h3>
        </div>`
        document.querySelector("#quantidadeBlocosSistema1").style.display = 'block'
        explicacaoSistemas('sistema1')
    } else if (document.querySelector('#sistemSelector').value == 'sistema2') {
        document.querySelector("#quantidadeBlocosSistema1").style.display = 'none'
        document.querySelector("#sistemas").innerHTML = `<div class="containerSistema">
            <img src='../imagens/sistema2.png' class="imagemSistema">
        </div>
        <h4>Agora escolha se haverá atrito no sistema</h4>
        <div class='buttonsAtritos'>
        <button onclick="possuirAtrito('Sim', 'sistema2')" id="buttonAtritoSim">Sim</button>
        <button onclick="possuirAtrito('Não', 'sistema2')" id="buttonAtritoNao">Não</button></div>`
        document.querySelector("#qntdSistema").value = null
        explicacaoSistemas('sistema2')
    } else if (document.querySelector('#sistemSelector').value == 'sistema3') {
        document.querySelector("#quantidadeBlocosSistema1").style.display = 'none'
        document.querySelector("#sistemas").innerHTML = `<div class="containerSistema">
            <img src='../imagens/sistema3.png' class="imagemSistema">
        </div>`
        document.querySelector(".inputsEntradas").innerHTML = `
                <div class="inputContainer">
                    <label for="massa1">Massa bloco 1 (Kg)</label>
                    <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                <div class="inputContainer">
                    <label for="massa2">Massa bloco 2 (Kg)</label>
                    <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                </div>
                <div class="inputContainer">
                    <label for="gravidade">Gravidade (m/s²)</label>
                    <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                </div>
                <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
        document.querySelector("#qntdSistema").value = null
        explicacaoSistemas('sistema3')
    } else if (document.querySelector('#sistemSelector').value == 'sistema4') {
        document.querySelector("#quantidadeBlocosSistema1").style.display = 'none'
        document.querySelector("#sistemas").innerHTML = `<div class="containerSistema">
            <img src='../imagens/sistema4.png' class="imagemSistema">
        </div>
        <h4>Agora escolha se haverá atrito no sistema</h4>
        <div class='buttonsAtritos'>
        <button onclick="possuirAtrito('Sim', 'sistema4')" id="buttonAtritoSim">Sim</button>
        <button onclick="possuirAtrito('Não', 'sistema4')" id="buttonAtritoNao">Não</button></div>`
        document.querySelector("#qntdSistema").value = null
        explicacaoSistemas('sistema4')
    } else if (document.querySelector('#sistemSelector').value == 'sistema5') {
        document.querySelector("#quantidadeBlocosSistema1").style.display = 'none'
        document.querySelector("#sistemas").innerHTML = `<div class="containerSistema">
            <img src='../imagens/sistema5.png' class="imagemSistema">
        </div>
        <h4>Agora escolha se haverá atrito no sistema</h4>
        <div class='buttonsAtritos'>
        <button onclick="possuirAtrito('Sim', 'sistema5')" id="buttonAtritoSim">Sim</button>
        <button onclick="possuirAtrito('Não', 'sistema5')" id="buttonAtritoNao">Não</button></div>`
        document.querySelector("#qntdSistema").value = null
        explicacaoSistemas('sistema5')
    } else {
        document.querySelector("#quantidadeBlocosSistema1").style.display = 'none'
        document.querySelector("#sistemas").innerHTML = ``
    }
}

function adicionarBlocos() {
    let quantidade_blocos = Number(document.querySelector("#qntdSistema").value)
    let quantidade_blocos_se_invalido = (quantidade_blocos >= 2) ? quantidade_blocos : 2
    if (quantidade_blocos >= 2 && Number.isInteger(quantidade_blocos)) {
        if (document.querySelector('#sistemSelector').value != '') {
            document.querySelector("#sistemas").innerHTML = `<div class="containerSistema1">
                <div class="containerBlocos">
                    <div class="block" id="block1">1</div>
                    <div class="rope"><div class="rope">Corda 1</div></div>
                    <div class="block" id="block2">2</div>
                </div>
            </div>`
            let quantidade_blocos_atual = document.querySelectorAll(".block").length
            if (quantidade_blocos >= 2 && quantidade_blocos <= 200) {
                for (i = quantidade_blocos_atual + 1; i <= quantidade_blocos; i++) {
                    if (document.querySelector('#sistemSelector').value == 'sistema1') {
                        document.querySelector(".containerBlocos").innerHTML += `
                            <div class="rope">Corda ${i - 1}</div>
                            <div class="block" id="block${i}">${i}</div>`
                    }
                }
                document.querySelector(".containerBlocos").innerHTML += `
                    <div class="rope"></div>
                    <h3>F</h3>`
                criarBotoes()
            } else if (quantidade_blocos > 2 && quantidade_blocos > 200) {
                for (i = quantidade_blocos_atual + 1; i <= 200; i++) {
                    if (document.querySelector('#sistemSelector').value == 'sistema1') {
                        document.querySelector(".containerBlocos").innerHTML += `
                            <div class="rope">Corda ${i - 1}</div>
                            <div class="block" id="block${i}">${i}</div>`
                    }
                }
                document.querySelector(".containerBlocos").innerHTML += `
                    <div class="rope"></div>`
                criarBotoes()
            }
        }
    } else {
        swal("Quantidade inválida, adotando a quantidade como 2")
        document.querySelector("#qntdSistema").value = quantidade_blocos_se_invalido
        adicionarBlocos()
    }
}

function criarBotoes() {
    document.querySelector(".inputsEntradas").innerHTML = `
        <h4>Só será possível adicionar as massas manualmente caso a quantidade de blocos seja menor que 5</h4>
        <div class="entradasManuais">
            <button onclick="entradaManual('Sim')">Sim</button>
            <button onclick="entradaManual('Não')">Não</button>
        </div>
        <div class="massas"></div>`
}

function possuirAtrito(opcao, sistema) {
    let quantidade_blocos = document.querySelector("#qntdSistema").value
    document.querySelector(".resultado").innerHTML = ``
    if (opcao == 'Sim') {
        possui_atrito = true
        if (sistema == 'sistema1') {
            swal("Escolha o tipo de coeficiente de atrito que deseja inserir\nOBS: Caso selecione apenas a estática, o coeficiente dinâmico será 10% menor\nCaso selecione apenas o dinâmico, o estático será 10% maior", {
                buttons: {
                    estatico: {
                        text: "Estático", value: "Estático", visible: true, className: "static-bt", closeModal: true,
                    }, dinamico: {
                        text: "Dinâmico", value: 'Dinâmico', visible: true, className: "dinamic-bt", closeModal: true
                    }, ambos: {
                        text: "Ambos", value: 'Ambos', visible: true, className: "dinamic-bt", closeModal: true
                    }
                }
            }).then((value) => {
                switch (value) {
                    case "Estático":
                        coef_atrito_escolhido = "Estático";
                        swal("Coeficiente Estático Selecionado");
                        break;
                    case "Dinâmico":
                        coef_atrito_escolhido = "Dinâmico";
                        swal("Coeficiente Dinâmico Selecionado");
                        break;
                    case "Ambos":
                        coef_atrito_escolhido = "Ambos";
                        swal("Coeficiente Dinâmico e Estático Selecionados");
                        break;
                    default:
                        swal("Você não selecionou nada");
                }
                const inputsContainer = document.querySelector(".inputsEntradas");
                const existingInputs = inputsContainer.querySelector("#coef_atritos");
                if (existingInputs) {
                    existingInputs.remove();
                }
                const forcaInput = inputsContainer.querySelector("#forca");
                const gravidadeInput = inputsContainer.querySelector("#gravidade");
                if (forcaInput) {
                    forcaInput.parentNode.remove();
                }
                if (gravidadeInput) {
                    gravidadeInput.parentNode.remove();
                }

                // Verificar se o botão de calcular existe e removê-lo
                const buttonCalc = inputsContainer.querySelector("#buttonCalcularSistema1");
                if (buttonCalc) {
                    buttonCalc.remove();
                }
                if (coef_atrito_escolhido == "Estático") {
                    document.querySelector(".inputsEntradas").innerHTML += `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_escolhido">Coeficiente de Atrito Estático<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_escolhido" value='0' min='0' max='1' step='0.1'>
                    </div>
                    <div class="inputContainer">
                        <label for="forca">Força (N)</label>
                        <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()" id='buttonCalcularSistema1'>Calcular</button>`
                } else if (coef_atrito_escolhido == "Dinâmico") {
                    document.querySelector(".inputsEntradas").innerHTML += `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    <div class="inputContainer">
                        <label for="forca">Força (N)</label>
                        <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()" id='buttonCalcularSistema1'>Calcular</button>`
                } else if (coef_atrito_escolhido == "Ambos") {
                    document.querySelector(".inputsEntradas").innerHTML += `
                    <div class="inputContainer" id='coef_atritos'>
                        <div class="inputContainer">
                            <label for="coef_atrito_estatico">Coeficiente de Atrito Estático<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_estatico" value='0' min='0' max='1' step='0.1'>
                        </div>
                        <div class="inputContainer">
                            <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    </div>
                    <div class="inputContainer">
                        <label for="forca">Força (N)</label>
                        <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()" id='buttonCalcularSistema1'>Calcular</button>`
                }
                for (i = 0; i < quantidade_blocos; i++) {
                    if (document.querySelector(`#massa${i + 1}`)) {
                        document.querySelector(`#massa${i + 1}`).value = corposSistema[i]['Massa']
                    }
                }
                if (document.querySelector("#primeiro_termo")) {
                    document.querySelector("#primeiro_termo").value = primeiro_termo_razao[0]
                    document.querySelector("#razao").value = primeiro_termo_razao[1]
                }
            });
        } else if (sistema == 'sistema2') {
            swal("Escolha o tipo de coeficiente de atrito que deseja inserir\nOBS: Caso selecione apenas a estática, o coeficiente dinâmico será 10% menor\nCaso selecione apenas o dinâmico, o estático será 10% maior", {
                buttons: {
                    estatico: {
                        text: "Estático", value: "Estático", visible: true, className: "static-bt", closeModal: true,
                    }, dinamico: {
                        text: "Dinâmico", value: 'Dinâmico', visible: true, className: "dinamic-bt", closeModal: true
                    }, ambos: {
                        text: "Ambos", value: 'Ambos', visible: true, className: "dinamic-bt", closeModal: true
                    }
                }
            }).then((value) => {
                switch (value) {
                    case "Estático":
                        coef_atrito_escolhido = "Estático";
                        swal("Coeficiente Estático Selecionado");
                        break;
                    case "Dinâmico":
                        coef_atrito_escolhido = "Dinâmico";
                        swal("Coeficiente Dinâmico Selecionado");
                        break;
                    case "Ambos":
                        coef_atrito_escolhido = "Ambos";
                        swal("Coeficiente Dinâmico e Estático Selecionados");
                        break;
                    default:
                        swal("Você não selecionou nada");
                }
                if (coef_atrito_escolhido == "Estático") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_escolhido">Coeficiente de Atrito Estático<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_escolhido" value='0' min='0' max='1' step='0.1'>
                    </div>
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                        </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                } else if (coef_atrito_escolhido == "Dinâmico") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                        </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                } else if (coef_atrito_escolhido == "Ambos") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <div class="inputContainer">
                            <label for="coef_atrito_estatico">Coeficiente de Atrito Estático<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_estatico" value='0' min='0' max='1' step='0.1'>
                        </div>
                        <div class="inputContainer">
                            <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    </div>
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                        </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                }
            });
        } else if (sistema == "sistema4") {
            let coef_atrito_escolhido = ''
            swal("Escolha o tipo de coeficiente de atrito que deseja inserir\nOBS: Caso selecione apenas a estática, o coeficiente dinâmico será 10% menor\nCaso selecione apenas o dinâmico, será 10% maior", {
                buttons: {
                    estatico: {
                        text: "Estático", value: "Estático", visible: true, className: "static-bt", closeModal: true,
                    }, dinamico: {
                        text: "Dinâmico", value: 'Dinâmico', visible: true, className: "dinamic-bt", closeModal: true
                    }, ambos: {
                        text: "Ambos", value: 'Ambos', visible: true, className: "dinamic-bt", closeModal: true
                    }
                }
            }).then((value) => {
                switch (value) {

                    case "Estático":
                        coef_atrito_escolhido = "Estático";
                        swal("Coeficiente Estático Selecionado");
                        break;
                    case "Dinâmico":
                        coef_atrito_escolhido = "Dinâmico";
                        swal("Coeficiente Dinâmico Selecionado");
                        break;
                    case "Ambos":
                        coef_atrito_escolhido = "Ambos";
                        swal("Coeficiente Dinâmico e Estático Selecionados");
                        break;
                    default:
                        swal("Você não selecionou nada");
                }
                if (coef_atrito_escolhido == "Estático") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_escolhido">Coeficiente de Atrito Estático<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_escolhido" value='0' min='0' max='1' step='0.1'>
                        </div>
                    <div class="inputContainer">
                        <label for="angulo">Ângulo (°)</label>
                        <input type="number" id="angulo" class="dadosBlocoInput" placeholder="Digite aqui o ângulo"  min='1' required>
                    </div>    
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                } else if (coef_atrito_escolhido == "Dinâmico") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    <div class="inputContainer">
                        <label for="angulo">Ângulo (°)</label>
                        <input type="number" id="angulo" class="dadosBlocoInput" placeholder="Digite aqui o ângulo"  min='1' required>
                    </div>    
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                } else if (coef_atrito_escolhido == "Ambos") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <div class="inputContainer">
                            <label for="coef_atrito_estatico">Coeficiente de Atrito Estático<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_estatico" value='0' min='0' max='1' step='0.1'>
                        </div>
                        <div class="inputContainer">
                            <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    </div>
                    <div class="inputContainer">
                        <label for="angulo">Ângulo (°)</label>
                        <input type="number" id="angulo" class="dadosBlocoInput" placeholder="Digite aqui o ângulo"  min='1' required>
                    </div>    
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                }
            });
        } else if (sistema == 'sistema5') {
            let coef_atrito_escolhido = ''
            swal("Escolha o tipo de coeficiente de atrito que deseja inserir\nOBS: Caso selecione apenas a estática, o coeficiente dinâmico será 10% menor\nCaso selecione apenas o dinâmico, será 10% maior", {
                buttons: {
                    estatico: {
                        text: "Estático", value: "Estático", visible: true, className: "static-bt", closeModal: true,
                    }, dinamico: {
                        text: "Dinâmico", value: 'Dinâmico', visible: true, className: "dinamic-bt", closeModal: true
                    }, ambos: {
                        text: "Ambos", value: 'Ambos', visible: true, className: "dinamic-bt", closeModal: true
                    }
                }
            }).then((value) => {
                switch (value) {
                    case "Estático":
                        coef_atrito_escolhido = "Estático";
                        swal("Coeficiente Estático Selecionado");
                        break;
                    case "Dinâmico":
                        coef_atrito_escolhido = "Dinâmico";
                        swal("Coeficiente Dinâmico Selecionado");
                        break;
                    case "Ambos":
                        coef_atrito_escolhido = "Ambos";
                        swal("Coeficiente Dinâmico e Estático Selecionados");
                        break;
                    default:
                        swal("Você não selecionou nada");
                }
                if (coef_atrito_escolhido == "Estático") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_estatico">Coeficiente de Atrito Estático<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_estatico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    <div class="inputContainer">
                        <label for="forca">Força Aplicada (N)</label>
                        <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>    
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa3">Massa bloco 3 (Kg)</label>
                        <input type="number" id="massa3" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                } else if (coef_atrito_escolhido == "Dinâmico") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                        <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                    </div>
                    <div class="inputContainer">
                        <label for="forca">Força Aplicada (N)</label>
                        <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa3">Massa bloco 3 (Kg)</label>
                        <input type="number" id="massa3" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                } else if (coef_atrito_escolhido == "Ambos") {
                    document.querySelector(".inputsEntradas").innerHTML = `
                    <div class="inputContainer" id='coef_atritos'>
                        <div class="inputContainer">
                            <label for="coef_atrito_estatico">Coeficiente de Atrito Estático<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_estatico" value='0' min='0' max='1' step='0.1'>
                        </div>
                        <div class="inputContainer">
                            <label for="coef_atrito_dinamico">Coeficiente de Atrito Dinâmico<label>
                            <input type="number" class="dadosBlocoInput" id="coef_atrito_dinamico" value='0' min='0' max='1' step='0.1'>
                        </div>
                    </div>
                    <div class="inputContainer">
                        <label for="forca">Força Aplicada (N)</label>
                        <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa1">Massa bloco 1 (Kg)</label>
                        <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa2">Massa bloco 2 (Kg)</label>
                        <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="massa3">Massa bloco 3 (Kg)</label>
                        <input type="number" id="massa3" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                    <div class="inputContainer">
                        <label for="gravidade">Gravidade (m/s²)</label>
                        <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                    </div>
                    <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
                }
            });
        }
    } else if (opcao == 'Não') {
        possui_atrito = false
        if (sistema == 'sistema1') {
            const inputsContainer = document.querySelector(".inputsEntradas");
            const existingInputs = inputsContainer.querySelector("#coef_atritos");
            if (existingInputs) {
                existingInputs.remove();
            }
            const forcaInput = inputsContainer.querySelector("#forca");
            const gravidadeInput = inputsContainer.querySelector("#gravidade");
            if (forcaInput) {
                forcaInput.parentNode.remove();
            }
            if (gravidadeInput) {
                gravidadeInput.parentNode.remove();
            }

            const buttonCalc = inputsContainer.querySelector("#buttonCalcularSistema1");
            if (buttonCalc) {
                buttonCalc.remove();
            }
            if (document.querySelector("#razao") && document.querySelector("#primeiro_termo")) {
            }
            document.querySelector(".inputsEntradas").innerHTML += `
                <div class="inputContainer">
                    <label for="forca">Força (N)</label>
                    <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                </div>
                <div class="inputContainer">
                    <label for="gravidade">Gravidade (m/s²)</label>
                    <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                </div>
                <button class="buttonCalc" onclick="calcularSistema()" id='buttonCalcularSistema1'>Calcular</button>`
            for (i = 0; i < quantidade_blocos; i++) {
                if (document.querySelector(`#massa${i + 1}`)) {
                    document.querySelector(`#massa${i + 1}`).value = corposSistema[i]['Massa']
                }
            }
            if (document.querySelector("#primeiro_termo")) {
                document.querySelector("#primeiro_termo").value = primeiro_termo_razao[0]
                document.querySelector("#razao").value = primeiro_termo_razao[1]
            }
        }
        if (sistema == 'sistema2') {
            document.querySelector(".inputsEntradas").innerHTML = `
            <div class="inputContainer">
                <label for="massa1">Massa bloco 1 (Kg)</label>
                <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                </div>
            <div class="inputContainer">
                <label for="massa2">Massa bloco 2 (Kg)</label>
                <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
            </div>
            <div class="inputContainer">
                <label for="gravidade">Gravidade (m/s²)</label>
                <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
            </div>
            <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
        } else if (sistema == 'sistema3') {
            document.querySelector(".inputsEntradas").innerHTML = `
                <div class="inputContainer">
                    <label for="massa1">Massa bloco 1 (Kg)</label>
                    <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                    </div>
                <div class="inputContainer">
                    <label for="massa2">Massa bloco 2 (Kg)</label>
                    <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
                </div>
                <div class="inputContainer">
                    <label for="gravidade">Gravidade (m/s²)</label>
                    <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
                </div>
                <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
        } else if (sistema == "sistema4") {
            document.querySelector(".inputsEntradas").innerHTML = `
            <div class="inputContainer">
                    <label for="angulo">Ângulo (°)</label>
                    <input type="number" id="angulo" class="dadosBlocoInput" placeholder="Digite aqui o ângulo"  min='1' required>
            </div>    
            <div class="inputContainer">
                <label for="massa1">Massa bloco 1 (Kg)</label>
                <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
            </div>
            <div class="inputContainer">
                <label for="massa2">Massa bloco 2 (Kg)</label>
                <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
            </div>
            <div class="inputContainer">
                <label for="gravidade">Gravidade (m/s²)</label>
                <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
            </div>
            <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
        } else if (sistema == 'sistema5') {
            document.querySelector(".inputsEntradas").innerHTML = `
            <div class="inputContainer">
                <label for="forca">Força Aplicada (N)</label>
                <input type="number" id="forca" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
            </div>
            <div class="inputContainer">
                <label for="massa1">Massa bloco 1 (Kg)</label>
                <input type="number" id="massa1" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
            </div>
            <div class="inputContainer">
                <label for="massa2">Massa bloco 2 (Kg)</label>
                <input type="number" id="massa2" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
            </div>
            <div class="inputContainer">
                <label for="massa3">Massa bloco 3 (Kg)</label>
                <input type="number" id="massa3" class="dadosBlocoInput" placeholder="Digite aqui a massa"  min='1' step='0.01' required>
            </div>
            <div class="inputContainer">
                <label for="gravidade">Gravidade (m/s²)</label>
                <input type="number" id="gravidade" class="dadosBlocoInput" placeholder="Digite aqui a gravidade"  min='0' required>
            </div>
            <button class="buttonCalc" onclick="calcularSistema()">Calcular</button>`
        }
    }
}

function entradaManual(opcao) {
    if (document.querySelector(".resultado ")) {
        document.querySelector(".resultado ").innerHTML = ``
    }
    let quantidade_blocos = document.querySelector("#qntdSistema").value
    if (opcao == 'Sim' && quantidade_blocos > 5) {
        swal("Impossível adicionar as massas com essa quantidade de blocos ")
    } else if (opcao == 'Sim' && quantidade_blocos <= 5) {
        criarBotoes()
        for (let i = 1; i <= quantidade_blocos; i++) {
            document.querySelector(".massas").innerHTML += `
            <div class="inputContainer">
                <label for="massa${i}">Massa Bloco ${i} (Kg)</label>
                <input type="number" id="massa${i}">
            </div>`
        }
        document.querySelector(".inputsEntradas").innerHTML += `<button onclick="adicionarDadosBlocosManualmente()">Atualizar Massas</button>`
    } else if (opcao == "Não") {
        criarBotoes()
        document.querySelector(".inputsEntradas").innerHTML += `
            <h4>Selecione o tipo da progressão de massa desejada para os blocos </h4>
            <select id="tipoPAPG">
                <option value="none">Selecione a progressão</option>
                <option value="pa">Progressão Aritmética</option>
                <option value="pg">Progressão Geométrica</option>
            </select>
            <button class="buttonCalc" onclick="inputsPAPG()">Selecionar</button>
        `
    }
}

function inputsPAPG() {
    if (document.querySelector(".resultado ")) {
        document.querySelector(".resultado ").innerHTML = ``
    }
    progressao = document.getElementById('tipoPAPG').value
    criarBotoes()
    document.querySelector(".inputsEntradas").innerHTML += `
        <h4>Selecione o tipo da progressão de massa desejada para os blocos </h4>
        <select id="tipoPAPG" onchange='inputsPAPG()'>
            <option value="none">Selecione a progressão</option>
            <option value="pa">Progressão Aritmética</option>
            <option value="pg">Progressão Geométrica</option>
        </select>
        <button class="buttonCalc" onclick="inputsPAPG()">Selecionar</button>
    `
    if (progressao == 'pa') {
        document.getElementById('tipoPAPG').innerHTML = `
        <option value="pa">Progressão Aritmética</option>
        <option value="pg">Progressão Geométrica</option>`
        document.querySelector(".inputsEntradas").innerHTML += `
        <div class="inputContainer">
            <label for="primeiro_termo">Massa do Primeiro Bloco</label>
            <input type="number" id="primeiro_termo">
        </div>
        <div class="inputContainer">
            <label for="razao">Razão</label>
            <input type="number" id="razao">
        </div>
        <button class="buttonCalc" onclick="calcularMassasPAPG('${progressao}')">Atualizar Massas</button>`
    } else if (progressao == 'pg') {
        document.getElementById('tipoPAPG').innerHTML = `
        <option value="pg">Progressão Geométrica</option>
        <option value="pa">Progressão Aritmética</option>`
        document.querySelector(".inputsEntradas").innerHTML += `
        <div class="inputContainer">
            <label for="primeiro_termo">Massa do Primeiro Bloco</label>
            <input type="number" id="primeiro_termo">
        </div>
        <div class="inputContainer">
            <label for="razao">Razão</label>
            <input type="number" id="razao" >
        </div>
        <button class="buttonCalc" onclick="calcularMassasPAPG('${progressao}')">Atualizar Massas</button>`
    } else if (progressao == "none") {
        swal('Selecione uma progressão!');
    }
}

let corposSistema = []

function calcularMassasPAPG(progressao) {
    let quantidade_blocos = Number(document.querySelector("#qntdSistema").value)
    let primeiro_termo = Number(document.querySelector("#primeiro_termo").value)
    let razao = Number(document.querySelector("#razao").value)
    primeiro_termo_razao[0] = primeiro_termo
    primeiro_termo_razao[1] = razao
    corposSistema = []
    if (progressao == "pa") {
        corpo = {
            "Nome": `Bloco 1`, "Massa": primeiro_termo
        }
        corposSistema.push(corpo)
        if (razao >= 0) {
            for (i = 2; i <= quantidade_blocos; i++) {
                massa_bloco_atual = primeiro_termo + razao * (i - 1);
                if (massa_bloco_atual > 0) {
                    corpo = {
                        "Nome": `Bloco ${i}`, "Massa": massa_bloco_atual
                    }
                    corposSistema.push(corpo)
                } else {
                    swal(`Primeira massa inválida`);
                }
            }
        } else {
            swal('Razão Inválida')
        }
        document.querySelector("#razao").value = razao
        document.querySelector("#primeiro_termo").value = primeiro_termo
        if (document.getElementById("buttonAtritoSim") == null) {
            document.querySelector(".inputsEntradas").innerHTML += `
            <h4>Agora escolha se haverá atrito no sistema</h4>
            <div class='buttonsAtritos'>
            <button onclick="possuirAtrito('Sim', 'sistema1')" id="buttonAtritoSim">Sim</button>
            <button onclick="possuirAtrito('Não', 'sistema1')" id="buttonAtritoNao">Não</button></div>`
        }
        document.querySelector("#primeiro_termo").value = primeiro_termo_razao[0]
        document.querySelector("#razao").value = primeiro_termo_razao[1]
    } else if (progressao == 'pg') {
        corpo = {
            "Nome": `Bloco 1`, "Massa": primeiro_termo
        }
        corposSistema.push(corpo)
        if (razao > 0) {
            for (i = 2; i <= quantidade_blocos; i++) {
                massa_bloco_atual = primeiro_termo * Math.pow(razao, i - 1);
                if (massa_bloco_atual > 0) {
                    corpo = {
                        "Nome": `Bloco ${i}`, "Massa": massa_bloco_atual
                    }
                    corposSistema.push(corpo)
                } else {
                    swal(`Primeira massa inválida`);
                }
            }
        } else {
            swal(`Razão inválida`);
        }
        if (document.getElementById("buttonAtritoSim") == null) {
            document.querySelector(".inputsEntradas").innerHTML += `
            <h4>Agora escolha se haverá atrito no sistema</h4>
            <div class='buttonsAtritos'>
            <button onclick="possuirAtrito('Sim', 'sistema1')" id="buttonAtritoSim">Sim</button>
            <button onclick="possuirAtrito('Não', 'sistema1')" id="buttonAtritoNao">Não</button></div>`
        }
        document.querySelector("#primeiro_termo").value = primeiro_termo_razao[0]
        document.querySelector("#razao").value = primeiro_termo_razao[1]
    }
}


function adicionarDadosBlocosManualmente() {
    let quantidade_blocos = document.querySelector("#qntdSistema").value
    corposSistema = []
    let massa_bloco_atual = 0
    let pode_continuar = true
    for (i = 1; i <= quantidade_blocos; i++) {
        massa_bloco_atual = document.querySelector(`#massa${i}`).value
        if (massa_bloco_atual > 0) {
            corpo = {
                "Nome": `Bloco ${i}`, "Massa": massa_bloco_atual
            }
            corposSistema.push(corpo)
        } else {
            swal(`Massa do bloco ${i} inválida`);
            pode_continuar = false;
        }
    }
    if (pode_continuar == true) {
        if (document.getElementById("buttonAtritoSim") == null) {
            document.querySelector(".inputsEntradas").innerHTML += `
            <h4>Agora escolha se haverá atrito no sistema</h4>
            <div class='buttonsAtritos'>
            <button onclick="possuirAtrito('Sim', 'sistema1')" id="buttonAtritoSim">Sim</button>
            <button onclick="possuirAtrito('Não', 'sistema1')" id="buttonAtritoNao">Não</button></div>`
        }
        for (i = 0; i < quantidade_blocos; i++) {
            document.querySelector(`#massa${i + 1}`).value = corposSistema[i]['Massa']
        }
    } else {
        corposSistema = []
        entradaManual("Sim")
    }
}

function calcularSistema() {
    let n_sistema = document.querySelector('#sistemSelector').value
    if (possui_atrito == false) {
        if (n_sistema == 'sistema1') {
            let soma_massas = 0
            let quantidade_blocos = document.querySelector("#qntdSistema").value
            let gravidade = Number(document.querySelector(`#gravidade`).value)
            let forca = Number(document.querySelector(`#forca`).value)
            if (gravidade > 0 && forca > 0) {
                for (let i = 0; i < quantidade_blocos; i++) {
                    soma_massas += Number(corposSistema[i]['Massa'])
                }
                let aceleracao = forca / soma_massas
                document.querySelector(".resultado").innerHTML = `
                    <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                    <div class="tracoes_container">
                        <p>Escolha um bloco que deseja ver a(s) força(s) de tração aplicadas nele.</p>
                        <div class="inputContainer">
                            <label for="tracao_bloco_n">Tração no Bloco</label>
                            <input type="number" id="tracao_bloco_n">
                            <button onclick="calcularTracaoSistema1(${aceleracao})" class="buttonCalc">Calcular Tração</button>
                        </div>
                        <div id='resultadoTracao'></div>
                    </div>
                `
            } else if (gravidade <= 0 && forca <= 0) {
                swal("Força e gravidade inválidas")
            } else if (gravidade <= 0) {
                swal("Gravidade inválida")
            } else if (forca <= 0) {
                swal("Força inválida")
            }
        } else if (n_sistema == 'sistema2') {
            let massa_bloco_1 = Number(document.querySelector(`#massa1`).value)
            let massa_bloco_2 = Number(document.querySelector(`#massa2`).value)
            let gravidade = Number(document.querySelector(`#gravidade`).value)
            if (massa_bloco_1 > 0 && massa_bloco_2 > 0 && gravidade > 0) {
                let peso_bloco_1 = massa_bloco_1 * gravidade
                let peso_bloco_2 = massa_bloco_2 * gravidade
                let aceleracao = (peso_bloco_2) / (massa_bloco_1 + massa_bloco_2)
                let tracao = peso_bloco_2 - (massa_bloco_2 * aceleracao)
                document.querySelector(".resultado").innerHTML = `
                    <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                    <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                `
            } else if (massa_bloco_1 <= 0 || massa_bloco_2 <= 0 || gravidade <= 0) {
                swal("Alguma entrada está inválida!\nPor favor procure qual das entradas é menor ou igual a 0 e corrija-a")
            }
        } else if (n_sistema == 'sistema3') {
            let massa_bloco_1 = Number(document.querySelector(`#massa1`).value)
            let massa_bloco_2 = Number(document.querySelector(`#massa2`).value)
            let gravidade = Number(document.querySelector(`#gravidade`).value)
            if (massa_bloco_1 > 0 && massa_bloco_2 > 0 && gravidade > 0) {
                let peso_bloco_1 = massa_bloco_1 * gravidade
                let peso_bloco_2 = massa_bloco_2 * gravidade
                let aceleracao = 0
                let tracao = 0
                if (peso_bloco_1 > peso_bloco_2) {
                    aceleracao = (peso_bloco_1 - peso_bloco_2) / (massa_bloco_1 + massa_bloco_2)
                    tracao = peso_bloco_1 - (massa_bloco_1 * aceleracao)

                } else {
                    aceleracao = (peso_bloco_2 - peso_bloco_1) / (massa_bloco_1 + massa_bloco_2)
                    tracao = peso_bloco_2 - (massa_bloco_2 * aceleracao)
                }
                document.querySelector(".resultado").innerHTML = `
                    <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                    <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                `
            } else if (massa_bloco_1 <= 0 || massa_bloco_2 <= 0 || gravidade <= 0) {
                swal("Alguma entrada está inválida!\nPor favor procure qual das entradas é menor ou igual a 0 e corrija-a")
            }
        } else if (n_sistema == 'sistema4') {
            let angulo = Number(document.querySelector(`#angulo`).value)
            let massa_bloco_1 = Number(document.querySelector(`#massa1`).value)
            let massa_bloco_2 = Number(document.querySelector(`#massa2`).value)
            let gravidade = Number(document.querySelector(`#gravidade`).value)
            if (massa_bloco_1 > 0 && massa_bloco_2 > 0 && gravidade > 0) {
                let peso_t_bloco_1 = massa_bloco_1 * gravidade * Math.sin(angulo * (Math.PI / 180))
                let peso_bloco_2 = massa_bloco_2 * gravidade
                let aceleracao = 0
                let tracao = 0
                if (peso_t_bloco_1 > peso_bloco_2) {
                    aceleracao = (peso_t_bloco_1 - peso_bloco_2) / (massa_bloco_1 + massa_bloco_2)
                    tracao = peso_t_bloco_1 - (massa_bloco_1 * aceleracao)

                } else {
                    aceleracao = (peso_bloco_2 - peso_t_bloco_1) / (massa_bloco_1 + massa_bloco_2)
                    tracao = peso_bloco_2 - (massa_bloco_2 * aceleracao)
                }
                document.querySelector(".resultado").innerHTML = `
                    <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                    <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                `
            } else if (massa_bloco_1 <= 0 || massa_bloco_2 <= 0 || gravidade <= 0) {
                swal("Alguma entrada está inválida!\nPor favor procure qual das entradas é menor ou igual a 0 e corrija-a")
            }
        } else if (n_sistema == 'sistema5') {
            let forca = Number(document.querySelector(`#forca`).value)
            let massa_bloco_1 = Number(document.querySelector(`#massa1`).value)
            let massa_bloco_2 = Number(document.querySelector(`#massa2`).value)
            let massa_bloco_3 = Number(document.querySelector(`#massa3`).value)
            let gravidade = Number(document.querySelector(`#gravidade`).value)
            if (massa_bloco_1 > 0 && massa_bloco_2 > 0 && massa_bloco_3 > 0 && gravidade > 0 && forca > 0) {
                let aceleracao = (forca) / (massa_bloco_1 + massa_bloco_2 + massa_bloco_3)
                let forca_ab = forca - (massa_bloco_1 * aceleracao)
                let forca_bc = massa_bloco_3 * aceleracao
                document.querySelector(".resultado").innerHTML = `
                    <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                    <span class="resultadoText">Força entre os blocos A e B: ${forca_ab.toFixed(2)} N</span><br>
                    <span class="resultadoText">Força entre os blocos B e C: ${forca_bc.toFixed(2)} N</span>
                `
            } else if (massa_bloco_1 <= 0 || massa_bloco_2 <= 0 || massa_bloco_3 <= 0 || gravidade <= 0 || forca <= 0) {
                swal("Alguma entrada está inválida!\nPor favor procure qual das entradas é menor ou igual a 0 e corrija-a")
            }
        }
    } else if (possui_atrito == true) {
        let continuar = true
        if (n_sistema == 'sistema1') {
            let coef_atrito_estatico = 0
            let coef_atrito_dinamico = 0
            if (!document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                coef_atrito_dinamico = coef_atrito_estatico - (coef_atrito_estatico * 0.10)
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && !document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = (coef_atrito_dinamico * 0.10) + coef_atrito_dinamico
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                if (coef_atrito_dinamico > 0) {
                    if (coef_atrito_dinamico >= coef_atrito_estatico) {
                        swal("O coeficiente de atrito dinâmico não pode ser maior ou igual que o estático")
                        continuar = false
                    } else {
                        continuar = true
                    }

                }
            }
            if (continuar == true) {
                let soma_massas = 0
                let quantidade_blocos = document.querySelector("#qntdSistema").value
                let gravidade = Number(document.querySelector(`#gravidade`).value)
                let forca = Number(document.querySelector(`#forca`).value)
                if (gravidade > 0 && forca > 0) {
                    for (let i = 0; i < quantidade_blocos; i++) {
                        soma_massas += Number(corposSistema[i]['Massa'])
                    }
                    let forca_atrito_dinamico_total = soma_massas * gravidade * coef_atrito_dinamico
                    let aceleracao = (forca - forca_atrito_dinamico_total) / soma_massas
                    document.querySelector(".resultado").innerHTML = `
                        <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                        <div class="tracoes_container">
                            <p>Escolha um bloco que deseja ver a(s) força(s) de tração aplicadas nele.</p>
                            <div class="inputContainer">
                                <label for="tracao_bloco_n">Tração na Corda de n°</label>
                                <input type="number" id="tracao_bloco_n" placeholder="Digite aqui o número da corda">
                                <button onclick="calcularTracaoSistema1(${aceleracao})" class="buttonCalc">Calcular Tração</button>
                                <div id='resultadoTracao'></div>  
                            </div>
                        </div>
                    `
                } else if (gravidade <= 0 && forca <= 0) {
                    swal("Força e gravidade inválidas")
                } else if (gravidade <= 0) {
                    swal("Gravidade inválida")
                } else if (forca <= 0) {
                    swal("Força inválida")
                }
            }

        } else if (n_sistema == 'sistema2') {
            let coef_atrito_estatico = 0
            let coef_atrito_dinamico = 0
            if (!document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                coef_atrito_dinamico = coef_atrito_estatico - (coef_atrito_estatico * 0.10)
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && !document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = (coef_atrito_dinamico * 0.10) + coef_atrito_dinamico
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                if (coef_atrito_dinamico > 0) {
                    if (coef_atrito_dinamico >= coef_atrito_estatico) {
                        swal("O coeficiente de atrito dinâmico não pode ser maior ou igual que o estático")
                        continuar = false
                    } else {
                        continuar = true
                    }

                }
            }
            if (continuar == true) {
                let massa_bloco_1 = Number(document.querySelector(`#massa1`).value)
                let massa_bloco_2 = Number(document.querySelector(`#massa2`).value)
                let gravidade = Number(document.querySelector(`#gravidade`).value)
                if (massa_bloco_1 > 0 && massa_bloco_2 > 0 && gravidade > 0) {
                    let peso_bloco_1 = massa_bloco_1 * gravidade
                    let peso_bloco_2 = massa_bloco_2 * gravidade
                    let forca_atrito_estatico_maxA = coef_atrito_estatico * (peso_bloco_1)
                    let aceleracao = 0
                    let tracao = 0
                    if (peso_bloco_2 > forca_atrito_estatico_maxA) {
                        forca_atrito_dinamico = coef_atrito_dinamico * peso_bloco_1
                        aceleracao = (peso_bloco_1 - forca_atrito_dinamico) / (massa_bloco_1 + massa_bloco_2)
                        tracao = forca_atrito_dinamico + (massa_bloco_1 * aceleracao)
                        document.querySelector(".resultado").innerHTML = `
                            <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                            <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                        `
                    } else if (peso_bloco_2 < forca_atrito_estatico_maxA) {
                        swal("A força de atrito no bloco A impediu que o sistema se movimentasse.")
                        tracao = peso_bloco_2
                        document.querySelector(".resultado").innerHTML = `
                            <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                            <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                        `
                    }
                } else if (massa_bloco_1 <= 0 || massa_bloco_2 <= 0 && gravidade <= 0) {
                    swal("Alguma entrada está inválida!\nPor favor procure qual das entradas é menor ou igual a 0 e corrija-a")
                }
            }
        } else if (n_sistema == 'sistema4') {
            let coef_atrito_estatico = 0
            let coef_atrito_dinamico = 0
            if (!document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                coef_atrito_dinamico = coef_atrito_estatico - (coef_atrito_estatico * 0.10)
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && !document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = (coef_atrito_dinamico * 0.10) + coef_atrito_dinamico
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                if (coef_atrito_dinamico > 0) {
                    if (coef_atrito_dinamico >= coef_atrito_estatico) {
                        swal("O coeficiente de atrito dinâmico não pode ser maior ou igual que o estático")
                        continuar = false
                    } else {
                        continuar = true
                    }

                }
            }
            if (continuar == true) {
                let massa_bloco_1 = Number(document.querySelector(`#massa1`).value)
                let massa_bloco_2 = Number(document.querySelector(`#massa2`).value)
                let gravidade = Number(document.querySelector(`#gravidade`).value)
                let angulo = Number(document.querySelector(`#angulo`).value)
                if (massa_bloco_1 > 0 && massa_bloco_2 > 0 && gravidade > 0) {
                    let peso_n_bloco_1 = massa_bloco_1 * gravidade * Math.cos(angulo * (Math.PI / 180))
                    let peso_t_bloco_1 = massa_bloco_1 * gravidade * Math.sin(angulo * (Math.PI / 180))
                    let peso_bloco_2 = massa_bloco_2 * gravidade
                    let forca_atrito_estatico_maxA = coef_atrito_estatico * (peso_n_bloco_1)
                    let aceleracao = 0
                    let tracao = 0
                    if (peso_bloco_2 < peso_t_bloco_1) {
                        forca_atrito_dinamico = coef_atrito_dinamico * peso_n_bloco_1
                        aceleracao = (peso_t_bloco_1 - peso_bloco_2 - forca_atrito_dinamico) / (massa_bloco_1 + massa_bloco_2)
                        tracao = peso_bloco_2 + (massa_bloco_2 * aceleracao)
                        swal(`Bloco 1 descendo`)
                        document.querySelector(".resultado").innerHTML = `
                            <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                            <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                        `
                    } else if (peso_bloco_2 > peso_t_bloco_1) {
                        forca_atrito_dinamico = coef_atrito_dinamico * peso_n_bloco_1
                        aceleracao = (peso_bloco_2 - peso_t_bloco_1 - forca_atrito_dinamico) / (massa_bloco_1 + massa_bloco_2)
                        tracao = peso_bloco_2 + (massa_bloco_2 * aceleracao)
                        swal(`Bloco 2 descendo`)
                        document.querySelector(".resultado").innerHTML = `
                            <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                            <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                        `
                    } else if (peso_bloco_2 == peso_t_bloco_1) {
                        swal("O sistema está em repouso!")
                        aceleracao = 0
                        tracao = peso_bloco_2
                        document.querySelector(".resultado").innerHTML = `
                            <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                            <span class="resultadoText">Tração: ${tracao.toFixed(2)} N</span>
                        `
                    }
                } else if (massa_bloco_1 <= 0 || massa_bloco_2 <= 0 && gravidade <= 0) {
                    swal("Alguma entrada está inválida!\nPor favor procure qual das entradas é menor ou igual a 0 e corrija-a")
                }
            }
        } else if (n_sistema == 'sistema5') {
            let coef_atrito_estatico = 0
            let coef_atrito_dinamico = 0
            if (!document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                coef_atrito_dinamico = coef_atrito_estatico - (coef_atrito_estatico * 0.10)
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && !document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = (coef_atrito_dinamico * 0.10) + coef_atrito_dinamico
                continuar = true
            } else if (document.getElementById('coef_atrito_dinamico') && document.getElementById('coef_atrito_estatico')) {
                coef_atrito_dinamico = Number(document.querySelector(`#coef_atrito_dinamico`).value)
                coef_atrito_estatico = Number(document.querySelector(`#coef_atrito_estatico`).value)
                if (coef_atrito_dinamico > 0) {
                    if (coef_atrito_dinamico >= coef_atrito_estatico) {
                        swal("O coeficiente de atrito dinâmico não pode ser maior ou igual que o estático")
                        continuar = false
                    } else {
                        continuar = true
                    }

                }
            }
            if (continuar == true) {
                let massa_bloco_1 = Number(document.querySelector(`#massa1`).value)
                let massa_bloco_2 = Number(document.querySelector(`#massa2`).value)
                let massa_bloco_3 = Number(document.querySelector(`#massa3`).value)
                let gravidade = Number(document.querySelector(`#gravidade`).value)
                let forca = Number(document.querySelector(`#forca`).value)
                if (massa_bloco_1 > 0 && massa_bloco_2 > 0 && massa_bloco_3 > 0 && gravidade > 0 && forca > 0) {
                    let peso_bloco_1 = massa_bloco_1 * gravidade
                    let peso_bloco_2 = massa_bloco_2 * gravidade
                    let peso_bloco_3 = massa_bloco_3 * gravidade
                    let forca_atrito_estatico_maxA = coef_atrito_estatico * (peso_bloco_1)
                    let forca_atrito_estatico_maxB = coef_atrito_estatico * (peso_bloco_2)
                    let forca_atrito_estatico_maxC = coef_atrito_estatico * (peso_bloco_3)
                    let aceleracao = 0
                    let forca_ab = 0
                    let forca_bc = 0
                    if (forca > (forca_atrito_estatico_maxA + forca_atrito_estatico_maxB + forca_atrito_estatico_maxC)) {
                        forca_atrito_dinamico_total = (coef_atrito_dinamico * (peso_bloco_1)) + (coef_atrito_dinamico * (peso_bloco_2)) + (coef_atrito_dinamico * (peso_bloco_3))
                        aceleracao = (forca - forca_atrito_dinamico_total) / (massa_bloco_1 + massa_bloco_2 + massa_bloco_3)
                        forca_ab = forca - (coef_atrito_dinamico * (peso_bloco_1)) - (massa_bloco_1 * aceleracao)
                        forca_bc = (coef_atrito_dinamico * (peso_bloco_2)) + (massa_bloco_3 * aceleracao)
                        document.querySelector(".resultado").innerHTML = `
                            <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                            <span class="resultadoText">Força entre os blocos 1 e 2: ${forca_ab.toFixed(2)} N</span><br>
                            <span class="resultadoText">Força entre os blocos 2 e 3: ${forca_bc.toFixed(2)} N</span>
                        `
                    } else if (forca < (forca_atrito_estatico_maxA + forca_atrito_estatico_maxB + forca_atrito_estatico_maxC)) {
                        aceleracao = 0
                        forca_ab = 0
                        forca_bc = 0
                        swal("Força aplicada menor que a força de atrito total do sistema! O sistema não se movimentou")
                        document.querySelector(".resultado").innerHTML = `
                            <span class="resultadoText">Aceleração: ${aceleracao.toFixed(2)} m/s²</span><br>
                            <span class="resultadoText">Força entre os blocos 1 e 2: ${forca_ab.toFixed(2)} N</span><br>
                            <span class="resultadoText">Força entre os blocos 2 e 3: ${forca_bc.toFixed(2)} N</span>
                        `
                    }
                } else if (massa_bloco_1 <= 0 || massa_bloco_2 <= 0 || massa_bloco_3 <= 0 || gravidade <= 0 || forca <= 0) {
                    swal("Alguma entrada está inválida!\nPor favor procure qual das entradas é menor ou igual a 0 e corrija-a")
                }
            }
        }
    }
}

function calcularTracaoSistema1(aceleracao) {
    blocoEscolhido = document.querySelector("#tracao_bloco_n").value
    if (blocoEscolhido < corposSistema.length && blocoEscolhido > 0) {
        let soma_massas_anteriores = 0
        for (let i = 0; i < blocoEscolhido; i++) {
            soma_massas_anteriores += Number(corposSistema[i]['Massa'])
        }
        tracao_n = soma_massas_anteriores * aceleracao
        document.querySelector("#resultadoTracao").innerHTML = `Tração na corda ${blocoEscolhido} = ${tracao_n.toFixed(2)}N`
    } else {
        swal("Corda inválida")
    }
}

function explicacaoSistemas(sistema) {
    if (sistema == 'sistema1') {
        Swal.fire({
            html: `
                <p>O Sistema 1 é um sistema de que esta na horizontal que tem uma quantidade minima de 2 blocos. Neste, os blocos estão ligados por cordas e o sistema está sendo puxado. Pedimos para você inserir a massas dos blocos manualmente ou por progreção aritmética ou Geométrica, perguntamos se vai haver atrito, se sim, você poderá escolher o tipo de coeficiente que você ira inserir, ou também se não haverá atrito, pedimos também para inserir a força que esta puxando o sistema e a gravidade , com isso podemos calcular a aceleração e a tração na corda requerida.</p>
                <img src="../imagens/sistema1/sistema1.jpg" style="max-width: 400px; max-height: 400px;">
                <img src="../imagens/sistema1/equacao.png" style="max-width: 400px; max-height: 400px;">
                <img src="../imagens/sistema1/sistema2.jpg" style="max-width: 400px; max-height: 400px;">
                <h1>Aula Explicativa</h1>
                <iframe width="350" height="195" src="https://www.youtube.com/embed/6o0UP8BTF5Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `,
        });
    } else if (sistema == 'sistema2') {
        Swal.fire({
            html: `
                <p>O Sistema 2 é um sistema de polia com dois blocos, um em um plano horizontal e o outro  pendurado na vertical, sendo que o bloco vertical tende a puxar o bloco horizontal. Pedimos para que o usuário insira a massa de cada bloco, a gravidade desejada no sistema e selecionar se deseja atrito, caso a resposta seja “sim”, o mesmo deverá informar o tipo de atrito a inserir o  valor. Por fim, será informada a aceleração do sistema e a tração na corda que liga os blocos.</p>
                <img src="../imagens/sistema2/sistema.jpg" style="max-width: 400px; max-height: 400px;">
                <img src="../imagens/sistema2/equacao.png" style="max-width: 400px; max-height: 400px;">
                <h1>Aula Explicativa</h1>
                <iframe width="350" height="195" src="https://www.youtube.com/embed/B_K5VdjckWE?start=458" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `,
        });
    } else if (sistema == 'sistema3') {
        Swal.fire({
            html: `
        <p>O Sistema 3 é um sistema de polia com dois blocos, ambos na vertical vertical, um puxando o outro ou mantendo em equilíbrio. Então, será informada a aceleração do sistema e a tração na corda que liga os blocos.</p>
        <img src="../imagens/sistema3/sistema.png" style="max-width: 400px; max-height: 400px;">
        <img src="../imagens/sistema3/equacao.png" style="max-width: 400px; max-height: 400px;">
        <h1>Aula Explicativa</h1>
        <iframe width="350" height="195" src="https://www.youtube.com/embed/Ype8XNUP84s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `,
        });
    } else if (sistema == 'sistema4') {
        Swal.fire({
            html: `
                <p>O Sistema 4 é um sistema com dois blocos ligados por uma corda que passa em uma polia, um dos blocos é pendurado verticalmente e o outro está em um plano com uma determinada inclinação. Pedimos para que o usuário informe o ângulo da inclinação, a massa de cada bloco, a gravidade a ser aplicada ao sistema e se deseja atrito, caso a resposta seja “sim”, o mesmo deverá informar o tipo de atrito a inserir o  valor. Por fim, será informada a aceleração do sistema e a tração na corda que liga os blocos.</p>
                <img src="../imagens/sistema4/sistema.jpg" style="max-width: 400px; max-height: 400px;">
                <h1>Aula Explicativa</h1>
                <iframe width="350" height="195" src="https://www.youtube.com/embed/yt7b3s9NmWQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `,
        });
    } else if (sistema == 'sistema5') {
        Swal.fire({
            html: `
                <p>O Sistema 5 é um sistema com três blocos, no qual os três blocos estão encostados um no outro e é exercida uma determinada força em apenas um deles, de forma que empurre os outros. Pedimos que o usuário insira a força aplicada, a massa de cada um dos blocos, a gravidade desejada e se deseja atrito, caso a resposta seja “sim”, o mesmo deverá informar o tipo de atrito a inserir o  valor. Por fim, será informada a aceleração do sistema e as forças presentes entre o bloco 1 e 2, bloco 2 e 3.</p>
                <img src="../imagens/sistema5/sistema.png" style="max-width: 400px; max-height: 400px;">
                <h1>Aula Explicativa</h1>
                <iframe width="350" height="195" src="https://www.youtube.com/embed/HYA4r6Hfb3c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `,
        });
    }
}
