# instanz-status-repo

This program is supposed to display different instances and the status (offline, online, slow, error) of their services.

Instances can be presented as:
 - __Start__: single stacked bar chart (values online/slow/error)
 - __Detailed-Start__(?): single stacked bar chart (values offline/online/slow/error)
 - __Status__: running vs stopped 
 - __Instanzen__: list with none, selected or all services displayed
 
 If one Instance is selected __Instanz/name__:
  - every service and their status can be seen
  - instanz can be restarted (after some additional identity valudation)

If services are selected __Status-Update__:
 - all services (presented as "Instanz_Name:Service_Name") are categorized into their status 
 - potentionally specific services/instances can be hidden
 
