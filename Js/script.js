let yourName;
let objectName = {
    name: ""
}
let statusCodeExternal;

/*REQUEST */
selectName();

function selectName() {
    yourName = prompt("Qual o seu nome?");
    const messagePromise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    messagePromise.then(showMessage)

    const namePromise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participantss', {
        name: yourName
      } )
    namePromise.then(tratarSucesso);
    namePromise.catch(tratarFalha);


    objectName.name = yourName;
}

function displayStatus(message) {
    const public = (message.type !== "private_message" || message.to === "Todos")
    const private = (message.to === yourName || message.from === yourName)

    return (public || private)
}

/*function to request message */
function showMessage(responseMessage) {
    let i = 0
    let messagens = responseMessage.data.filter(displayStatus);
    let containerMain = document.querySelector(".container");
    containerMain.innerHTML = "";

    for (i = 0; i <= messagens.length; i++) {
        const messagerr = messagens[i];
        if (messagerr.type === 'status') {
            containerMain.innerHTML += `
            <div class="enter-exit">
                <div class="horario"> (${messagerr.time})</div>
                <div class="nome">&nbsp${messagerr.from}</div>:
                <div class="texto">&nbsp${messagerr.text}</div>
            </div>
            `

        } else
        if (messagerr.type === 'private_message') {
            containerMain.innerHTML += `
            <div class="private">
                <div class="horario"> (${messagerr.time})</div>
                <div class="nome">&nbsp${yourName}&nbsp</div>
                <span>reservadamente para </span>
                <div class="nome">&nbsp${messagerr.from}</div>:
                <div class="texto">&nbsp${messagerr.text}</div>
            </div>
            `

        } else
        if (messagerr.type === 'message') {
            containerMain.innerHTML += `
            <div class="public">
                <div class="horario"> (${messagerr.time})</div>
                <div class="nome">&nbsp ${messagerr.from}&nbsp</div> 
                <span> para </span>
                <div class="nome"> &nbsp${messagerr.to}</div>:
                <div class="texto"> &nbsp${messagerr.text}</div>
            </div>
            `

        }
    }

}


function tratarSucesso(resposta) {
    let statusCode = resposta.status;
    console.log(statusCode);
    statusCodeExternal = statusCode;
}

function tratarFalha(erro) {
    let statusCode = erro.response.status;
    console.log(statusCode);
    statusCodeExternal = statusCode;
}