# Components: 
 - arrays with amount of online/slow/error/offline is now in service statusService
 --> change Instanzen in an order to get a compromised view on the most accute status (offline>error>slow>online)
 - I want a button with just the display of one colour

 - neustart -> auseinandergezogen zu multiple optionen
 - vorschlag für 'optimale Handlung'
 - Hinzufügen Log wer war überhaupt da
 - Log wer hat etwas an den Instanzen verändert (?)
 - Blockieren von doppelten neustarts
 - Fehlermeldung Ausgabe und im Log falls Neustart fail
 - Bei wahl von Neustart Warnung was die Konsequenzen sein können, länge, dauer, neuanmelden, wirklich ALLES neustarten etc.
 - Neustart von bestimmten Services -> key word ein ganzer Service
 - Also Cluster von Services (e.g. whole backendish)
 - welche Instanz/Veranstaltungen sind relevant
 - minimalistische colour coding in Instanzen
 - Kalender Funktion
 - (./agenda ssh-key zugriff, darf ich soll ich?)

# Design:
 - numbers in start need to be bar with colour 
 - icons need to be adjusted
 - placement of everything (buttons, titles, etc.) needs correction
 - appearance needs to be adusted to OpenSlides

 # No to forget:
 - if real data is used use url in status.service.ts getData()
 - same for users