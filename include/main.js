function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName('*');
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute('w3-include-html');
        if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = 'Page not found.';}
                /*remove the attribute, and call this function once more:*/
                elmnt.removeAttribute('w3-include-html');
                includeHTML();
            }
        }      
        xhttp.open('GET', file, false);
        xhttp.send();
        /*exit the function:*/
        return;
        }
    }
};

function headerHighlight() {
    let path = window.location.pathname;
    const pathArray = path.split('/');
    let last = pathArray[pathArray.length - 1];

    if (last === '' || last === 'index.html') {
        document.getElementById('navHome').classList.add('active');
        return;
    }

    const allowedArray = ['projects', 'about', 'contact'];
    const nameArray = last.split('.');
    let name = nameArray[0];

    if (allowedArray.includes(name)) {
        let nav = document.getElementById('nav' + name.charAt(0).toUpperCase() + name.slice(1));
        if (nav == null) {
            return;
        }
        nav.classList.add('active');
    }
}


window.onload = function () {
    includeHTML();
    headerHighlight();

    let copyrightYear = new Date().getFullYear();
    document.getElementById('copyrightYear').innerHTML = copyrightYear;
}