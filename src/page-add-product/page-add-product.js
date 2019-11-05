"use strict";

/**
 * Klasse AddProduct: Kann ein Produkt hinzufügen
 */
class AddProduct {
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
        let html = await fetch("page-add-product/page-add-product.html");
        let css = await fetch("page-add-product/page-add-product.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts");
            return;
        }

        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        // await this._renderTiles(pageDom);

        this._app.setPageTitle("Produkt hinzufügen");
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));

        let addProductButton = document.getElementById("produkt-hinzufügen");
        addProductButton.addEventListener("click", this._onAddButtonClicked);

    }
    /*
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
    */
    async _onAddButtonClicked() {
        let name = document.getElementById("namenstextfeld").value;
        let beschreibung = document.getElementById("beschreibungstextfeld").value;
        let preis = document.getElementById("preis").value;
        let besonderheit = document.getElementById("besonderheit").value;
        console.log("Digga", name, beschreibung, preis, besonderheit);

        let produkt = { 'name': name, 'beschreibung': beschreibung, 'preis': preis, 'besonderheit': besonderheit };
        
        this._app.database.speichereProdukt(produkt);
        /* TODO: herausfinden, wie wir an dieser Stelle auf die DB zugreifen können */

    }
}
