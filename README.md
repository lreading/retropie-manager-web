# retropie-manager-web (WIP)

A web-based manager for retropie.

# Security Warning
This app will interface directly with your retropie.  It does not come with authentication/authorization, and there is no guarantee regarding the security of this application.  You will copy files directly to the pi, and some inputs may be used in bash commands.  YOU SHOULD ONLY RUN THIS ON A PRIVATE NETWORK WITH PEOPLE YOU TRUST.


# Running Locally / Developing
- database/start.sh -e dev.env
- cd server && npm run dev

Theme for FE: 
https://blackrockdigital.github.io/startbootstrap-small-business/

TODO:
- Set up documentation for what needs to be done on the retropie (get ssh key)

Goals:
- Upload ROMs from the same network using a web interface
- Manage multiple retropies from the same location 