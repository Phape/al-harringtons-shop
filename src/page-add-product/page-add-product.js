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

        this._app.setPageTitle("Produkt hinzufügen");
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
        // console.log("findeProdukt", await this._app.database.findeProdukt("1"));

        let addProductButton = document.getElementById("produkt-hinzufuegen");
        addProductButton.addEventListener("click", () => this._onAddButtonClicked());

        document.querySelector("#hinzugefuegt-popup").style.display = "none";
        document.querySelector("#leer-popup").style.display = "none";
        document.querySelector("#vorhanden-popup").style.display = "none";
    }

    async _onAddButtonClicked() {
        let artikelnummer = document.getElementById("artikelnummertextfeld").value;
        let name = document.getElementById("namenstextfeld").value;
        let beschreibung = document.getElementById("beschreibungstextfeld").value;
        let preis = document.getElementById("preistextfeld").value;
        let besonderheit = document.getElementById("besonderheitstextfeld").value;
        let bild_adresse = document.getElementById("bild_adresse").value;

        let produkt = { artikelnummer, name, beschreibung, preis, besonderheit, bild_adresse };

        let vorhanden = await this._app.database.pruefeVorhanden(artikelnummer);
        if (artikelnummer == "") {
            document.querySelector("#leer-popup").style.display = "block";
            window.setTimeout(() => this._closePopup("#leer-popup"), 3000);
        }
        else if(vorhanden) {
            document.querySelector("#vorhanden-popup").style.display = "block";
            window.setTimeout(() => this._closePopup("#vorhanden-popup"), 3000);
        }
        else {
            this._app.database.speichereProdukt(produkt);
            document.querySelectorAll("input").forEach(element => element.value="");
            document.querySelector("#hinzugefuegt-popup").style.display = "block";
            window.setTimeout(() => this._closePopup("#hinzugefuegt-popup"), 3000);
        }
    }

    _closePopup(popup) {
        document.querySelector(popup).style.display = "none";
    }

}
