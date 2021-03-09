// Checks alert cookie onload creates an alert element and deletes the cookie

window.onload = () => {
    let alert = getCookie('alert') || '';
    //make element
    if(alert !== ''){
        alert = JSON.parse(alert);
        makeAlert(alert.text, alert.color);
        document.cookie = 'alert=';
    }
};


function getCookie(cookiename) {
    // Idk how this works, but I got it off stack overflow and it works
    var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function makeAlert(text, color){
    let alertElement = document.createElement('div');
    alertElement.id = 'alert';
    alertElement.className = color;
    alertElement.textContent = text;
    let closeButton = document.createElement('a');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', (event) => {deleteMessage();});
    alertElement.appendChild(closeButton);
    document.body.appendChild(alertElement);
}

