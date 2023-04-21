

# next Job:
 - update instance/stati/stati2 to new data
 - instances make pretty
 - status make pretty
 - Terminologie menschlich machen
 - cancel button für dialog
 - Filtern with auto-completion
 - wähle Instanz
 - timer
 - start abgerundete ecken, getrennte Spalten
 
# ui:
 - instances
 - status
 - status 2
 - instances detail
 - header
 
# Components: 
 - cancel button für dialog
 - Filtern with auto-completion
 - wähle Instanz
 - timer
 - Blockieren von doppelten neustarts --> dummy button for now, timer, visible timer?,
 - Fehlermeldung Ausgabe falls Neustart fail
 - restart != logged out (backend? python? ht access)  
 - translate
 - Kalender Funktion, first try Nextcloud
 - (./agenda ssh-key zugriff, darf ich soll ich?)

  # needs fixing:
 - if a instanz is selected while filtering, the name needs to be directly clicked on, the general area will disply the Instanz's name but not go to the wanted page

 # Log (backend):
 - Hinzufügen Log wer war überhaupt da
 - Log wer hat etwas an den Instanzen verändert (?)
 - Fehlermeldung im Log falls Neustart fail

 # additional things for warn (Magnus/Adrian):
 - neustart vorschlag für 'optimale Handlung'
 - Bei wahl von Neustart Warnung was die Konsequenzen sein können, länge, dauer, neuanmelden, wirklich ALLES neustarten etc.
 - Neustart von bestimmten Services -> key word ein ganzer Service
 - Also Cluster von Services (e.g. whole backendish)


	"running":false, //normal/error/unknown/stopped
	//name change from running to status
