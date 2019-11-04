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
            "authors": "Peter Pohmann",
            "edition": "1. Auflage",
            "id": "cpp17",
            "publisher": "Entwickler-Press",
            "title": "C++ 17 -- Praxiswissen zum Standard",
            "year": 2017
        }, {
            "authors": "Kyle Loudon; Rainer Grimm",
            "edition": "3. Auflage",
            "id": "cpp-kurz-gut",
            "publisher": "O'Reilly",
            "title": "C++ Kurz & Gut",
            "year": 2018
        }, {
            "authors": "Torsten T. Will",
            "edition": "1. Auflage",
            "id": "cpp-einfuehrung",
            "publisher": "Galileo Computing",
            "title": "Einführung in C++",
            "year": 2015
        }, {
            "authors": "Dietmar Ratz; Dennis Schulmeister-Zimolong; Detlef Seese; Jan Wiesenberger",
            "edition": "8. Auflage",
            "id": "grundkurs-java",
            "publisher": "Hanser-Verlag",
            "title": "Grundkurs Programmieren in Java",
            "year": 2018
        }, {
            "authors": "Dan Lüdtke",
            "edition": "1. Auflage",
            "id": "ip6-workshop",
            "publisher": "Amazon Distribution",
            "title": "IPv6 Workshop",
            "year": 2013
        }, {
            "authors": "Thomas Peschel-Findeisen",
            "edition": "1. Auflage",
            "id": "make-gepackt",
            "publisher": "mitp",
            "title": "make ge-packt",
            "year": 2004
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
