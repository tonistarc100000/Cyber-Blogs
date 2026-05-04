<h1>The CYBER-BLOGS Summery — File by File🚀</h1>

1. Firstly open the CMD by pressing `Win + R → type "cmd" → Enter`. We have to Select which Directory (Folder) , we want to create out project 
   And Indside that Folder Create the Folder Named `DEVFOLIO` (You Guys can use any name you want for this project I used `DEVFOLIO`) . Lets 
   Check the two most importent things Before everything `Node` and `NPM` versions by typing these commands in terminal :-
  
      ├──node --version    # should be v18 or above
      ├──npm --version     # comes with Node


2. If `NODE` is present then no worries If not we have to download it , Hope everything is installed before following the futher steps :-

   (I) Also create accounts on :

   --MongoDB Atlas → `mongodb.com/atlas` (Database Deployment).
   --Vercel → `vercel.com`  (Fronted Deployment).
   --Render → `render.com`  (Backend Deployment).

3. Now Inside `DEVFOLIO` we have to Create 2 new folder Called `client` and `server`, here we are going to create the Fullstack MERN Project. 
   I named it a `CYBER-BLOGS` cuz it will be a more like bloging website with `ADMIN` pannel where only the `ADMIN` can do CRUD Operations But We will deploy it on Internet So everyone can see what we built .

4. Now Select `server` folder and run these Command `npm init -y` , this Command will instantly Create the `package.json` file inside our `server` folder.
   <h4>Why we use this ⁉️</h4>
   <p>package.json file shows our project Identity like name , version , Entrypoint Without package.json, you cannot properly manage dependencies. This allow us to use any kind of dependencies exist for `NODE` like `EXPRESS`,`MONGOOSE`,`CORS` ....<p>

5. Like We Initialized the `Node Package Manager -> npm init -y` We can download the needed Dependencies to build this Project , We can download every Dependencies either seperatly one by one like this `npm install express` or either we can use one Command like this `npm install express mongoose dotenv cors bcryptjs jsonwebtoken `. Last but not the least one more Dependency we need is `nodemon` which is use for to make development 
environment Smooth So we dont need to restart the server evrytime we change something command : `npm install --save-dev nodemon`.

6. After Downloading these dependencies We just need to make a little change in our `package.json` to make sure when we Run Development Environment Command then our Selected file Runs immediately . We just need to change the `scripts` part of `package.json` like this :-

                      ├──     "scripts": {
                      ├──        "start": "node server.js",
                      ├──        "dev": "nodemon server.js"
                      ├──      }
                                 

7. So before Starting to build this MERN project We need to visualize the file trees of every folder and their subfolders and their files we are gonna create into them lets Start with the `server`'s folder files tree First :-

                                        server/
                                        ├── .env
                                        ├── server.js
                                        ├── config/
                                        │   └── db.js
                                        ├── models/
                                        │   ├── User.js
                                        │   ├── Post.js
                                        │   └── Project.js
                                        ├── controllers/
                                        │   ├── authController.js
                                        │   ├── postController.js
                                        │   └── projectController.js
                                        ├── routes/
                                        │   ├── authRoutes.js
                                        │   ├── postRoutes.js
                                        │   └── projectRoutes.js
                                        └── middleware/
                                            └── authMiddleware.js


4. This whole structure is needed to build the `Server-Side-Logic` for our `MERN` project , So take a big pause and create this Properly then we can    start Understanding why this file tree needed and why we created the every peice of it in that particular structure .

   












<h2>Server Files Summery</h2>

(A) `server/.env`
The very first file. Before your app does anything — before it connects to MongoDB, before it starts listening for requests — it needs secrets. Your MongoDB password, your JWT secret key, your port number. You never hardcode these inside your actual code because you'll push that code to GitHub and the whole world can see it. So they live here, in a file that never leaves your machine. Every other file in the backend depends on this file existing.

