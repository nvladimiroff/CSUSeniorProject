Group 4's classroom clicker app

[Google Drive](https://drive.google.com/open?id=0BwiB_LZjyFkDQ21FT1dZWG1OUUk)

#### Running
First, install [node.js](https://nodejs.org/en/). Once that is installed run:

```
git clone https://github.com/nvladimiroff/CSUSeniorProject.git
cd CSUSeniorProject
npm install
```

Then execute all of the mysql schema files with:
```
for i in ./mysql_schema_files/* ; do mysql --user="root" --password="root" --database="clicker" < $i; done
```
I also had to change the port number in the mysql config file (/etc/mysql/mysql.conf.d/mysqld.cnf) to 8889.

Once everything finished, you can run ```npm start``` to start the server. Then all you need to do is open [http://localhost:3000/](http://localhost:3000/) in your browser.
