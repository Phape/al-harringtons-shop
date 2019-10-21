"use strict";

/**
 * Klasse PageNotFound: Stellt eine Fehlerseite für ungültige URLs zur Verfügung
 */
class PageNotFound {
    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */
    constructor(app) {
        this._app = app;
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show() {      // async --> Schlüsselwort für Google: "JS Promises"
        // HTML/CSS-Code dieser Seite nun nachladen
        let html = await fetch("page-not-found/page-not-found.html");
        let css = await fetch("page-not-found/page-not-found.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Codes");
            return;
        }

        // Empfangenen HTML/CSS-Code zur Anzeige bringen
        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        this._app.setPageTitle("Seite nicht gefunden", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }
}
