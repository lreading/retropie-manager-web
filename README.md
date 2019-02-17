# retropie-manager-web (WIP)

A web-based manager for retropie.

# Security Warning
This app will interface directly with your retropie.  It does not come with authentication/authorization, and there is no guarantee regarding the security of this application.  You will copy files directly to the pi, and some inputs may be used in bash commands.


# Running Locally / Developing
- database/start.sh -e dev.env
- cd server && npm run dev


TODO:
- Set up documentation for what needs to be done on the retropie (get ssh key)

Goals:
- Upload ROMs from the same network using a web interface
- Manage multiple retropies from the same location 