"use strict";

/**
 * Klasse Database: Kümmert sich um die Datenhaltung der App
 *
 * Diese Klasse beinhaltet alle Datensätze der App. Entgegen dem Namen handelt
 * es sich nicht wirklich um eine Datenbank, da sie lediglich ein paar statische
 * Testdaten enthält. Ausgefeilte Methoden zum Durchsuchen, Ändern oder Löschen
 * der Daten fehlen komplett, könnten aber in einer echten Anwendung relativ
 * einfach hinzugefügt werden.
 */
class Database {
    // Verknüpfung mit firebase
    constructor() {
        var config = {
            apiKey: "AIzaSyApqarP_WMagU8AEGvG6pGdhDGSR5U5UVY",
            authDomain: "al-harringtons-shop.firebaseapp.com",
            databaseURL: "https://al-harringtons-shop.firebaseio.com",
            projectId: "al-harringtons-shop",
            storageBucket: "al-harringtons-shop.appspot.com",
            messagingSenderId: "818914740017",
            appId: "1:818914740017:web:a9b7d692b289bf14fcd210"
        };
        firebase.initializeApp(config);

        this._db = firebase.firestore();
        this._produkte = this._db.collection("produkte");

    }

    speichereProdukte(produkte) {
        produkte.forEach(produkt => {
            this._db.collection("produkte").add(produkt)
        });
    }

    // Diese Methode in der run() Methode von app.js aufrufen (ggf.)
    async createDemoData() {
        this.speichereProdukte([{
            "name": "WWWK Blau",
            "aktikelbeschreibung": "Dies ist der hervorragender WWWK in der wunderschönen Farbe BLAU",
            "preis": "3€",
            "besonderheit": "Er hat die Farbe Meeresblau"
        }]);
    }

    async selectAllProdukte() {
        let result = await this._produkte.get();
        let produkte = [];
        console.log('result', result);
        result.forEach(entry => {
            let produkt = entry.data();
            console.log('produkt', produkt);
            console.log('entry', entry);
            produkte.push(produkt);
        });
        console.log('produkte', produkte);
        return produkte;
    }
    /**
     * Diese Methode sucht einen Datensazt anhand seiner ID in der Datenbank
     * und liefert den ersten, gefundenen Treffer zurück.
     *
     * @param  {Number} id Datensatz-ID
     * @return {Object} Gefundener Datensatz
     */
    getRecordById(id) {
        id = parseInt(id);
        return this._data.find(r => r.id === id);
    }
}
