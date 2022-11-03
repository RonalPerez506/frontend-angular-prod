# UNIVERSIDAD MARIANO GALVEZ

# DESARROLLO WEB

# Manual Tecnico

## PROYECTO III

# Integrantes

|      Nombre       |         Carné |
| :---------------: | ------------: |
|    Ronal Pérez    | 7690-14-11506 |
| Geoffrey Hernadez |  7690-14-3807 |
|    Marco Pérez    | 7690-19-20394 |

# Desarrollo de aplicación:

## Estructura

    VPS
        IP: 216.238.68.70
            puerto 80 frontend
            puerto 8000 backend
        Openvpn
            usuario db
            usuario para marcaje
        Docker
            Nginx Frontend
            Nginx Backend
        Dominio
            webappcontrol.ddns.net
    Oracle Linux 7
        Postgresql
            db_marcaje

# VPS

Se instalo Ubuntu Server 20.04, en este se configuro como servidor de VPN con openvpn, también se adquirió un domino Free que apunta a esta ip publica. se crearon los usuarios correspondientes con permisos de sudo

    public ip: http://216.238.68.70/

    dominio: http://webappcontrol.ddns.net

    user: root

    pass: XXXXXXXXX

    SO: Ubuntuserver 20.04

IP que utilizaran usando VPN

    216.238.68.70 -> 10.8.0.1 -> FrontEnd - VPS(OpenVpn) Docker(Nginx:80 Nginx:8000) -> Ubuntu Server 20.04

    192.168.1.24  -> 10.8.0.6 -> BD - PostgreSQL                                     -> Oracle Linux

![imagen](https://user-images.githubusercontent.com/99605908/199333304-37aa008d-ed8d-4152-be61-5ca39c9dbae5.png)

---

# USER SO:

    adduser ronal

    adduser geoffrey

    adduser marco

    usermod -aG sudo ronal

    usermod -aG sudo geoffrey

    usermod -aG sudo marco

---

# Configuracion OpenVPN

    curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh

    chmod +x openvpn-install.sh

    sudo ./openvpn-install.sh (todo por defecto)

    sudo ./openvpn-install.sh (luego de la isntalacion para agregar lientes)

---

# configuracion ftp

Se configuro para transferencia de archivos

    apt-get install vsftpd

    ps -ef | grep vsftpd

---

# Instalación y configuración postgresql en Oracle Linux

Oracle Linux se instalo sobre una maquina virtual en VirtualBox, en esa se creo un usuario oracle para la administración de la base de datos. Este hace uso de yum para la instalación de paquetes, tambien se instalo Openvpn para poder comunicarce con el Backend. Para la base de datos se uso POSTGRESQL y se crearon los usuarios correspondientes para la administración de DB

    sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-6-x86_64/pgdg-redhat-repo-latest.noarch.rpm

    sudo yum install -y postgresql-server

    sudo service postgresql initdb

    sudo chkconfig postgresql on

    sudo service postgresql start

    sudo su - postgres

    psql

Se configuro el archivo postgresql.conf para acceso remoto

    listen_addresses = '*'          # what IP address(es) to listen on;

De igual forma el archivo pg_hba.conf

    host    all      all              0.0.0.0/0                    md5

    host    all      all              ::/0                         md5

    systemctl restart postgresql.service

Datos creado para base de datos

    CREATE USER sa WITH PASSWORD 'GTbd2022';

    CREATE DATABASE marcaje with owner sa;

    GRANT ALL PRIVILEGES ON DATABASE marcaje to sa;

    \q
    \l

    yum install openvpn-client

    openvpn --config _certificado

# Sistema operativo Oracle Linux 7.9 virtual

![imagen](https://user-images.githubusercontent.com/99605908/199334020-bb0c93bf-3160-4d8c-909a-005d856cc2ad.png)

Base de datos en Postgresql en Oracle linux

![imagen](https://user-images.githubusercontent.com/99605908/199333590-71e27c64-e36e-48c9-bb18-9113866d22c0.png)

![imagen](https://user-images.githubusercontent.com/99605908/199333658-ec1f5648-5b8b-41af-86c3-da3a1aba38fa.png)

---

# OAuth2.0

Para agregar autenticación con Google o Facebook se debe tener una cuenta registrada como desarrollador, luego crear una aplicacion web con permisos de inicio de sesion.

google:

    372832709126-kv3cmi52e098v079vtdqsg9.apps.googleusercontent.com

![imagen](https://user-images.githubusercontent.com/99605908/199373671-91907f14-a543-4957-840d-c69578b22d7d.png)

facebook:

    GOCSPX-0rhS-Y6kAcXhj1iwHH8

![imagen](https://user-images.githubusercontent.com/99605908/199373586-264cc913-3532-4b12-bfa1-6c35d5472b61.png)

---

# Docker VPS

Se instalo Docker y Docker-compose en la VPS para administrar los contenedores, se usaron los archivos yml para levantar contenedores con con que se necesita.

     curl -fsSL https://get.docker.com -o get-docker.sh

     sudo sh get-docker.sh

     docker ps

     docker start _id-contenedor

     docker stop _id-contenedor

     docker-compose up -d

     docker-compose down

![imagen](https://user-images.githubusercontent.com/99605908/199334548-ef7016e4-8b78-47a7-a00f-a05ed934f845.png)

## crear contenedor

sudo docker run --name some-nginx-frontend -v /home/ronal/docker/html:/var/www/html/:ro -p 8080:80 -d nginx

    b83ca1f60XXX   nginx:latest   "/docker-entrypoint.…"   0.0.0.0:80->80/tcp, :::80->80/tcp       frontend_web_1

![imagen](https://user-images.githubusercontent.com/99605908/199335576-db5263ca-a582-4b42-b9f4-e0b1b1570522.png)

    d80f44b62XXX   nginx:latest   "/docker-entrypoint.…"   0.0.0.0:8000->80/tcp, :::8000->80/tcp   backend-laravel-prod_web_1
    18aefe4e5xxx   php:8-fpm      "docker-php-entrypoi…"   9000/tcp                                backend-laravel-prod_php-fpm_1

![imagen](https://user-images.githubusercontent.com/99605908/199335475-5ffb963c-65f1-4c66-ae28-a39c08a2df26.png)

### Contenedor para FrontEnd con angular-->

docker-compose.yml

    version: "3.3"

    services:

      web:
          image: nginx:latest

          ports:

              - "80:80"

          volumes:

              - ./src:/var/www/html

              - ./default.conf:/etc/nginx/conf.d/default.conf

### Para el servidor ->

    server {

      index index.php index.html;

      server_name phpfpm.local;

      error_log  /var/log/nginx/error.log;

      access_log /var/log/nginx/access.log;

      root /var/www/html;

    }

### Contenedor para Backend con laravel-->

    version: "3.3"

    services:

        web:

            image: nginx:latest

            ports:

                - "8000:80"

            volumes:

                - ./src:/var/www/html

                - ./default.conf:/etc/nginx/conf.d/default.conf

            links:

               - php-fpm

        php-fpm:

            image: php:8-fpm

            #image: php:fpm

            volumes:

                - ./src:/var/www/html

### Para el servidor ->

    server {

        index index.php index.html;

        server_name phpfpm.local;

        error_log  /var/log/nginx/error.log;

        access_log /var/log/nginx/access.log;

        root /var/www/html/public;

        location ~ \.php$ {

            try_files $uri =404;

            fastcgi_split_path_info ^(.+\.php)(/.+)$;

            fastcgi_pass php-fpm:9000;

            fastcgi_index index.php;

            include fastcgi_params;

            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

            fastcgi_param PATH_INFO $fastcgi_path_info;

        }

    }

## Metodos: GET POST DELETE PUT

Metodo POST para inicio de sesion y tocken JWT
Metodo GET para obtener datos de la API
Metodo DELETE para eliminar datos
Metodo PUT para editar datos

JWT para autenticación de usuario

![imagen](https://user-images.githubusercontent.com/99605908/199375213-d32fd8bf-3cdd-4f3a-b24d-1e6dd2ee1eb8.png)

Sesión concluye después de 30s el tocken se botta de local storage

![imagen](https://user-images.githubusercontent.com/99605908/199375282-1dae37f3-479c-4513-96dd-dfabe8f0f165.png)
