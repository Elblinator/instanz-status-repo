# Missing components: 
 - filter (probably added as service)
 - search field needs to be linked with different pages
 - pages (in general) have to be linked more
 - I want a button with just the display of one colour
 - Status-Update-Page needs to be added
 - functional Login/Logout Button

 - numbers in start need to be bar with colour 
 - placement of everything (buttons, titles, etc.) needs correction
 - appearance needs to be adusted to OpenSlides
 - I want a little OpenSlides-Logo


 # Needs correction:
 - for stati.component + stati.detail used data needs adjustment [from hero-data to mock-data]
 - ng-container [ngSwitch]="service.status" (in instanz-detail and instanz.component) potentially also into service. filter.service maybe_
 - which stati are displayed needs to be decided and adjusted _where should this default selection be saved? filter.service?_
 - services need to be selectable. _additional function in filter.service maybe_

 ## Additional Thoughts:
 - messages not needed atm, delete if not needed
 - dashboard not needed atm, delete if not needed

 # No to forget:
 - if real data is used use url in status.service.ts getData()



