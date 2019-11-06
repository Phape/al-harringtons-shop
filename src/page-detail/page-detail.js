"use strict";

/**
 * Klasse PageDetail: Stellt die Detailseite der App zur Verfügung
 */
class PageDetail {
    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */
    constructor(app) {
        this._app = app;
        this._recordId = -1;
        this._data = null;
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show(matches) {
        // URL-Parameter auswerten
        this._recordId = matches[1];
        console.log("recordId:", this._recordId);
        this._data = await this._app.database.findeProdukt(this._recordId);
        console.log(this._data);

        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-detail/page-detail.html");
        let css = await fetch("page-detail/page-detail.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts");
            return;
        }

        // Seite zur Anzeige bringen
        let pageDom = await this._processTemplate(html);

        this._app.setPageTitle(`${this._data.name}`, { isSubPage: true });
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    /**
    * Hilfsmethode, welche den HTML-Code der eingelesenen HTML-Datei bearbeitet
    * und anhand der eingelesenen Daten ergänzt. Zusätzlich wird hier ein
    * Event Handler für den Button registriert.
    *
    * @param {HTMLElement} pageDom Wurzelelement der eingelesenen HTML-Datei
    * mit den HTML-Templates dieser Seite.
    */
    async _processTemplate(html) {
        // Platzhalter mit den eingelesenen Daten ersetzen
        html = html.replace(/{IMG}/g, this._data.bild_adresse);
        html = html.replace(/{NAME}/g, this._data.name);
        html = html.replace(/{ARTIKELBESCHREIBUNG}/g, this._data.beschreibung);
        html = html.replace(/{PREIS}/g, this._data.preis);
        html = html.replace(/{BESONDERHEIT}/g, this._data.besonderheit);
        html = html.replace(/{ARTIKELNUMMER}/g, this._data.artikelnummer);

        // HTML-Template in echte DOM-Objekte umwandeln, damit wir es mit den
        // DOM-Methoden von JavaScript weiterbearbeiten können
        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        // Event Handler für den Warenkorb Button registrieren
        pageDom.querySelector("#add-to-warenkorb-button").addEventListener("click", () => this._onAddToWarenkorbClicked());

        // Fertig bearbeitetes HTML-Element zurückgeben
        return pageDom;
    }

    //Warenkorb Button Funktion
    _onAddToWarenkorbClicked() {
        alert(this._data.name + " wurde zum Warenkorb hinzugefügt");
    }
}
