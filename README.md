# GravityCrusher
Online multiplayer space game, also a University project.

## Requirements
* **Node.js** runtime environment with the following Node.js JavaScript packages
  installed on a server machine:
    * `express`
    * `socket.io`
    * `nodemailer`
    * `mysql`

* MySQL Server on a server machine
* HTML5 support on a client web browsing software

## Installation and running
1. To install **Node.js**, visit the [download](https://nodejs.org/en/download/)
   page of the **Node.js** project and choose the appropriate download option
   for your operating system.

2. Make sure you have an instance of MySQL Server running on the server machine.

3. Clone the repository in the desired directory:
```
git clone https://github.com/NikolaJov96/GravityCrusher
```

4. In the root directory of the **GravityCrusher** project install the required
packages using **npm** package manager:
```
npm install express socket.io nodemailer mysql
```

5. Finally, run the server using the following command:
```
node app.js
```