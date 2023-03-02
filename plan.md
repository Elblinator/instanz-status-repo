# Missing components: 
 - sort (probably added as service)
 - search of instances (probably added as service):
    - 'include' in search
    - 'exclude' in search
 - search field needs to be linked with different pages
 - pages (in general) have to be linked more
 - I want a button with just the display of one colour
 - Status-Update-Page needs to be added
 - Detailed-Start-Page
 - Status-Update-Page
 - functional Login Button
 - functional Logout Button
 - numbers in start need to be bar with colour 
 - placement of everything (buttons, titles, etc.) needs correction
 - appearance needs to be adusted to OpenSlides
 - I want a little OpenSlides-Logo


 # Needs correction:
 - for stati.component + stati.detail used data needs adjustment [from hero-data to mock-data]
 - running/stopped frame needs to be added (will be put into stati.component) 
 - resetCount, countStati, countStatus, checkStatus (in start.component.ts) potentially pushed into a service. _countService maybe_
 - ng-container [ngSwitch]="service.status" (in instatnz-detail and instanz.component) potentially also into service. _determineStatus maybe_
 - which stati are displayed needs to be decided and adjusted _where should this default selection be saved? determineStatus?_
 - services need to be selectable. _additional function in determineStatus maybe_

 ## Additional Thoughts:
 - messages not needed atm, delete if not needed



