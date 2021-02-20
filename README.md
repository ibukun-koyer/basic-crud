# basic-crud
<h2>creating a basic crud site using node.js</h2>
<p>I approached this assignment using node.js and express for the backend programming, mongodb for the database, and HTML, CSS and Js, for the front end design. Be sure to use a "npm i" to install all the dependencies.</p>
<h3>FOLDERS AND FILES</h3>
<ul>
    <li>Mongoose_schema: This is a folder that contains only one file. The file inside this folder is the file used for creating my mongo schema(database schema). It returns a module that is then used in index.js and seed.js.</li><br>
    <li>Public: This is a folder that contains all of my static files. This folder contains two folders, css and js.</li><br>
    <li>Seed: This only file in this folder is the seeding file. To use the seed file, simply run "node seed.js" in the seed folder or use a relative path to run from other folders.</li><br>
    <li>Views: This folder holds the only dynamic html file(ejs) used in this project. </li><br>
    <li>The main folder: The main folder contains the main index.js used to start up the server. It also contains the package.json file.</li><br>
</ul>
<p>To run this program, simply run "node index.js" or "nodemon index.js" which allows you make changes to the server without restarting it manually. Then to access the webpage, visit the localhost:3000 port. You must also have mongodb set on your computer for my server to connect to. </p>
