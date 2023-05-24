# instance-status-repo

## how to start: use yarn in cloned folder 


This program is supposed to display different instances (on/off) and the status (fast, slow, error) of their services.

Instances can be presented as:
 - __Start__: single stacked bar chart (values fast/slow/error)
 - __Detailed-Start__: two stacked bar chart (values fast/slow/error and online/offline)
 - __Instanzen__: display of all instances sorted by instance (and filterable)
 - __Status__: display of all instances sorted by status ( and filterable)
 
 If one Instance is selected __Instanz/name__:
  - every service and their status can be seen
  - instance can be restarted (after some additional warn-dialog)

