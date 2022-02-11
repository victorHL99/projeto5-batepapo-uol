let name;

/*REQUEST */
selectName();
function selectName() {
    nome = prompt("Qual o seu nome?");
    const messagePromise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    messagePromise.then(showMessage)
}

function displayStatus(message) {
    const public = (message.type !== "private_message" || message.to === "Todos")
    const private = (message.to === nome || message.from === nome)

    return (public||private)
}

/*function to request message */
function showMessage(responseMessage) {
    let i = 0
    let messagens = responseMessage.data.filter(displayStatus);
    let containerMain = document.querySelector(".container");
    containerMain.innerHTML = "";

    for (i = 0;i <= messagens.length; i++ ){
        const messagerr = messagens[i];
        if(messagerr.type === 'status' ){
            containerMain.innerHTML +=`<div class="enter-exit">
            <div class="horario"> (${messagerr.time})   </div>
            <div class="nome">&nbsp${messagerr.from}</div>:
            <div class="texto">&nbsp${messagerr.text}</div>
            </div>
            `

        } else if(messagerr.type === 'private_message'){
            containerMain.innerHTML += `
            <div class="private">
                <div class="horario"> (${messagerr.time})  </div>
                <div class="nome">&nbsp${nome}&nbsp</div>
                <span>reservadamente para </span>
                <div class="nome">&nbsp${messagerr.from}  </div>:
                <div class="texto">&nbsp${messagerr.text}  </div>
            </div>
            `
        } else if(messagerr.type === 'message'){
            containerMain.innerHTML += `
            <div class="public">
                <div class="horario"> (${messagerr.time})  </div>
                <div class="nome">&nbsp ${messagerr.from}&nbsp</div> 
                <span> para </span>
                <div class="nome"> &nbsp${messagerr.to}  </div>:
                <div class="texto"> &nbsp${messagerr.text}  </div>
            </div>
            `
        }
    }


    
}