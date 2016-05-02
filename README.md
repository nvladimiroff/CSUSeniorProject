Group 4's classroom clicker app

[Google Drive](https://drive.google.com/open?id=0BwiB_LZjyFkDQ21FT1dZWG1OUUk)

#### Running
First, make sure nginx is setup as a reverse proxy and is listening on port 4000. Install a recent version of [node.js](https://nodejs.org/en/) and [mysql](http://www.mysql.com) and run:
```
git clone https://github.com/nvladimiroff/CSUSeniorProject.git
cd CSUSeniorProject
npm install
```

Then create the databse and execute all of the mysql schema files with:
```
for i in ./mysql_schema_files/* ; do mysql --user="username" --password="pass" --database="clicker" < $i; done
```

Mysql also needs to be listening on port 8889. (Change /etc/mysql/mysql.conf.d/mysqld.cnf).

Once everything finished, you can run ```npm start``` to start the server. Then all you need to do is open [http://localhost:3000/](http://localhost:3000/) in your browser.
