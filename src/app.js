class App {

    //// Funktioniert so nicht in JavaScript!
    // database = new Database();
    // halloString = "Hallo, Welt!";

    constructor(title, pages) {
        this._title = title;
        this._pages = pages;
        this._currentPage = null;

        this.database = new Database();
    }

    run() {
        // Menü bei Klick auf den Hamburger ein- und ausblenden
        let menuIcon = document.querySelector("header nav .toggle-menu a");
        menuIcon.addEventListener("click", this._toggleHambugerMenu);

        // Inhalt der ersten Seite darstellen
        this._handleRouting();
        windows.addEventListener("hashchange", () => this._handleRouting);
    }

    _toggleHambugerMenu() {
        let menu = document.querySelector("header nav .menu-right");

        if (menu.classList.contains("small-screen-hidden")) {
            // Menü war unsichtbar, deshalb jetzt anzeigen
            menu.classList.remove("small-screen-hidden");
        } else {
            // Menü war sichtbar, deshalb jetzt ausblenden
            menu.classList.add("small-screen-hidden");
        }
    }

    /**
     * Herzstück useres kleinen Sigle Page Routers. Hier wird der Teil in der URL nach dem Hashtag
     * ausgewertet, um den darzustellenden Teilbereich der App zu ermitteln. Hierfür gehen wir durch die Liste
     * this._pages mit den RegEx Pattern und suchen darin den ersten Treffer, der auf die aktuelle URL
     * passt. Von diesem erzeugen wir dann ein Objekt der dazugehörigen Page-Klasse und rufen ihre show()
     * Methode auf.
     */
    _handleRouting() {
        // Aktuelle URL ermitteln (nur der Teil nach dem #)
        let pageUrl = location.hash.slice(1); // slice: "#" abschneiden
        if (pageUrl.length === 0) pageUrl = "/";    // Wenn leer, dann Startseite

        // Zur URL passende Seite ermitteln (anhand RegEx)
        let matches = null;
        let page = this._pages.find(p => matches = pageUrl.match(p.url));

        if(!page) {
            console.error('Keine Seite zur URL ${pageUrl} gefunden!');
            return;
        }

        // Objekt der gefundenen Seite erzeugen und show() - Methode
        // aufrufen, um die Seite anzuzeigen
        this._currentPage = new page.klass(this);
        this._currentPage.show(matches);
    }

    /**
     * Angezeigten Titel der App-Seite setzen. Diese Methode muss von den
     * Page-Klassen aufgerufen werden, um den sichtbaren Titel einer Seite
     * festzulegen. Der Titel wird dann in der Titelzeile des Browsers sowie
     * im Kopfbereich der App angezeigt.
     *
     * Über das optionale Konfigurationsobjekt kann gesteuert werden, ob
     * neben dem Seitentitel ein Zurück-Button eingeblendet wird:
     *
     *      {
     *          isSubPage: true,
     *      }
     *
     * Der Zurück-Button wird nur eingeblendet, wenn isSubPage = true gesetzt
     * wird. Die Idee dahinter ist, dass eine App meistens eine zentrale
     * Startseite hat, von der aus in verschiedene Unterseiten verzweigt werden
     * kann. Jede von der Startseite aus direkt oder indirekt aufgerufene Seite
     * ist daher eine Unterseite mit Zurück-Button. Die Startseite hingegen als
     * Mutter aller Seiten besitzt keinen Zurück-Button.
     *
     * @param {String} title   Anzuzeigender Titel der App-Seite
     * @param {Object} options Detailoptionen zur Steuerung der Anzeige
     */
    setPageTitle(title, options) {
        // Optionen auswerten
        options = options ? options : {};
        let isSubPage = options.isSubPage ? options.isSubPage : false;

        // Titel setzen
        document.querySelectorAll(".page-name").forEach(e => e.textContent = title);
        document.title = `${title} – ${this._title}`;

        // Entscheiden, ob der Zurückbutton angezeigt wird, oder nicht
        if (isSubPage) {
            document.querySelector("header nav .go-back").classList.remove("hidden");
            document.querySelector("header nav .dont-go-back").classList.add("hidden");
        } else {
            document.querySelector("header nav .go-back").classList.add("hidden");
            document.querySelector("header nav .dont-go-back").classList.remove("hidden");
        }
    }

    /**
     * Seitenspezifischen CSS-Code aktivieren. Diese Methode muss von den
     * Page-Klassen aufgerufen werden, um seitenspezifische Stylesheet-Regeln
     * zu aktivieren. Das Stylesheet muss hierfür als String übergeben werden.
     *
     * @param {String} css Seitenspezifischer CSS-Code
     */
    setPageCss(css) {
        document.querySelector("#page-css").innerHTML = css;
    }

    /**
    * Austauschen des Inhalts im Kopfbereich der App. Diese Methode muss
    * von den Page-Klassen aufgerufen werden, um etwas im Kopfbereich der
    * App anzuzeigen. Hierfür muss ein (ggf. dynamisch nachgeladenes)
    * HTML-Element mit dem anzuzeigenden Inhalt übergeben werden.
    *
    * BEACHTE: Nicht das HTML-Element selbst, sondern seine Kindelemente
    * werden in der App angezeigt. Somit werden Probleme vermieden, wenn
    * das nachgeladene Element selbst ein <header> oder <main> ist, für
    * dass in der app.css bereits globale Layoutoptionen definiert sind.
    *
     * @param {HTMLElement} element HTML-Element mit dem anzuzeigenden Inhalt
     */
    setPageHeader(element) {
        let container = document.querySelector("header > .content");
        container.innerHTML = "";

        if (!element) return;
        let len = element.childNodes.length;

        for (var i = 0; i < len; i++) {
            let child = element.childNodes[0];
            element.removeChild(child);
            container.appendChild(child);
        }
    }

    /**
     * Austauschen des Inhalts im Hauptbereich der App. Diese Methode muss
     * von den Page-Klassen aufgerufen werden, um etwas im Hauptbereich der
     * App anzuzeigen. Hierfür muss ein (ggf. dynamisch nachgeladenes)
     * HTML-Element mit dem anzuzeigenden Inhalt übergeben werden.
     *
     * BEACHTE: Nicht das HTML-Element selbst, sondern seine Kindelemente
     * werden in der App angezeigt. Somit werden Probleme vermieden, wenn
     * das nachgeladene Element selbst ein <header> oder <main> ist, für
     * dass in der app.css bereits globale Layoutoptionen definiert sind.
     *
     * @param {HTMLElement} element HTML-Element mit dem anzuzeigenden Inhalt
     */
    setPageContent(element) {
        let container = document.querySelector("#app-main-area");
        container.innerHTML = "";

        if (!element) return;
        let len = element.childNodes.length;

        for (var i = 0; i < len; i++) {
            let child = element.childNodes[0];
            element.removeChild(child);
            container.appendChild(child);
        }
    }
}
