# Doggogram-Frontend
This repository holds the code for Baden-Wuerttemberg Cooperative State University (DHBW) Ravensburg project for the lecture Webprogrammierung.

## Documentation
This web-application is used for the lecture Webprogrammierung and the code is documented.


## Test Environment

* The test environment is a Debian (x64) Linux Server
  * 2 CPU Cores
  * 2 GB RAM
  * 25 GB Storage
  * 1 IP-Adress: http://88.214.57.214/
* The Application is Configured as systemd Service
  * The configuration script can be found in the [Service File](files/debian/doggogramsvc.service)
  * The Application is able to run on differen environments even on cloud PaaS (when cloud dependencies are added)
* The Database that is used in the test scenario is MariaDB
  * Dialect: MySQL
  * Hosted on the same test environment
* The [Frontend](https://github.com/xSpeed1337/Doggogram-Frontend) is also hosted on the the test evirnonment 
  * Develeoped with HTML, CSS and JavaScript
  * It is exposed to the Internet via a Apache installation with PHP configured

## Technologies
The web-application uses the following technology stack:
* HTML,CSS, JavaScript
* Frameworks: Bootstrap, jQuery

## Authors
* **Moritz Bürkle** - *Implementation / Planning / Concept* - [moritzbuerkle](https://github.com/moritzbuerkle)
* **Lukas Fink** - *Implementation / Planning / Concept* - [xSpeed1337](https://github.com/xSpeed1337)
* **Malik Press** - *Implementation / Planning / Concept* - [W4W3](https://github.com/W4W3)
* **Robin Herder** - *Implementation / Planning / Concept* - [LeError](https://github.com/LeError)

## Acknowledgments
* Was created as a Baden-Wuerttemberg Cooperative State University (DHBW) Ravensburg project for the lecture *Webprogrammierung*
* Thanks to my teammates Robin, Moritz and Malik
