/*REQUEST */
const messagePromise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
messagePromise.then(showMessage)

console.log(messagePromise)

function showMessage(response){
    let enterExit = document.querySelector(".enter-exit");
    let normal = document.querySelector(".normal");
    let private = document.querySelector(".private")

    enterExit.innerHTML = response.data.status;
    normal.innerHTML = response.data.message;
    private.innerHTML = response.data.private_menssage

    console.log(response.data)
}