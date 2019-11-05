"use strict";

/**
 * Klasse PageOverview: Stellt die Startseite der App zur Verfügung
 */
class PageOverview {
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
    async show() {
        // TODO: Seite anzeigen
        //this._app.database.getAllRecords();

        let html = await fetch("page-overview/page-overview.html");
        let css = await fetch("page-overview/page-overview.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts");
            return;
        }

        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        await this._renderTiles(pageDom);
        
        this._app.setPageTitle("Startseite");
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    async _renderTiles(pageDom) {
        let mainElement = pageDom.querySelector("main");
        let templateElement = pageDom.querySelector("#template-tile");

        let produkte = await this._app.database.selectAllProdukte();
        console.log('produkte 2', produkte);
        produkte.forEach(produkt => {
            let html = templateElement.innerHTML;
            // html = html.replace("{HREF}", `#/Detail/${buch.id}`);
            // html = html.replace("{IMG}", buch.img);
            html = html.replace("{NAME}", produkt.name);

            mainElement.innerHTML += html;
        });
    }
}
