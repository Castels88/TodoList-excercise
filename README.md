# TODO by priority


Sito  web di TODO con 2 pagine:

	il TODO è strutturato da TITOLO, Descrizione e priorità che può essere bassa, media o alta

	pagina 1 (MainPage):
	- mostra numero di todo totali, fatti e da completare, divisi per priorità 
        example:   
            ALTA: 3 tot, 2 completed 1 todo
            MEDIA: 4 tot, 3 completed, 1 todo 
            BASSA: 0 tot, 0 completed, 0 todo
	- storico di todo completati con la data e ora di completamento per ogni elemento, e possibilità di segnarli da completare
	
	pagina 2 (TodoPage):
	- form di creazione todo
	- lista di TODO DA COMPLETARE con possibilità di eliminarli, modificarli o segnarli come completati
	- i TODO sono ordinati da priorità decrescente (dal più alto al più basso), a parità di priorità in ordine cronologico crescente (dal meno recente al più recente)
	
è possibile usare librerie esterne a piacere (ex. redux, tailwind, material ui, etc.)
il design dell'UI deve seguire le indicazioni riportate, per il resto è a discrezione del candidato (navigazione tra le pagine, stili css, etc.)
	
I dati vanno presi da un webserver provveduto con il progetto:
    per avviarlo è necessario scaricare ed installare python da https://www.python.org/downloads/
    installare flask con i comandi "pip install flask" e "pip install flask-cors"
    per avviare il server lanciare il comando "python server.py"

    i dati sono in memoria quindi vengono resettati ad ogni avvio del server, sta in ascolto sulla porta 5000 e ha le seguenti API:

        /getTodos GET
        restituisce una lista di tutti i todo
        un esempio di response si trova in response-example.json

        /addTodo POST
        ex. body:
        {
            "title": "Push code to git",
            "desc": null,
            "priority": 1,
            "completionTime": 1667996730
        }
        aggiunge un nuovo todo in status 1, e setta il tempo di creazione con quello corrente se non provveduto

        /updateTodo/<id> POST
        ex. body:
        {
            "desc": "example desc",
        }
        modifica i campi passati ad eccezione di id e creationTime

        /deleteTodo/<id> DELETE
        elimina il todo con l'id passato

legenda:
    STATUS:
        1 = DA COMPLETARE
        2 = COMPLETATO
    PRIORITY:
        1 = ALTA
        2 = MEDIA
        3 = BASSA