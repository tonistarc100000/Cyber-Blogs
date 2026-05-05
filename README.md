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
   <p>"package.json" file shows our project Identity like name , version , Entrypoint Without package.json, you cannot properly manage dependencies. This allow us to use any kind of dependencies exist for `NODE` like `EXPRESS`,`MONGOOSE`,`CORS` ....<p>

5. Like We Initialized the `Node Package Manager through -> npm init -y` We can download the needed Dependencies to build this Project , We can download every Dependencies either seperatly one by one like this `npm install express` or either we can use one Command like this `npm install express mongoose dotenv cors bcryptjs jsonwebtoken `. Last but not the least one more Dependency we need is `nodemon` which is use for to make development environment Smooth So later we don't need to restart the server evrytime we change or edit our files , command : `npm install --save-dev nodemon`.



              ├── Package                                       Purpose 
              
              ├── express                                       The web framework, handles routes
              ├── mongoose                                      Talks to MongoDB in a clean way
              ├── dotenv                                        Loads secret keys from .env file 
              ├── cors                                          Allows your React frontend to talk to this server
              ├── bcryptjs                                      Hashes passwords before saving
              ├── jsonwebtoken                                  Creates/verifies JWT ├── tokens for auth
              ├── nodemon                                       Auto-restarts server when you save a file
               

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


8. This whole structure is needed to build the `Server-Side-Logic` for our `MERN` project , So take a big pause and create this Properly then we can start Understanding why this file tree needed and why we created the every peice of it in that particular structure . But before we have to make Accounts on this following services (included only free Plans) :


                                        ├── web3 forms    # For to view User Email Registrations
                                        ├── Mongodb Atlas # For Databse CRUD
                                        ├── Render.com    # for backend Deployment
                                        ├── Netlify       # for Frontend Deployment 


<h3>(Note❗️ MongoDb connection strings might look different from this Project over time don't expect the same and copy from this references.) </h3>

9. When We have account on mongodb and free default Clustor 0 now we have to make a connection between our first file and our database . Now Do these steps :--               
                                 
                                 ├── Once cluster is created → click "Connect"
                                 ├── Choose "Connect your application"
                                 ├── Copy the connection string 

         
         
10. The `MONGO_URI` string looks like this : mongodb+srv://yourname:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority  .
When you get this string Replace `yourname:<password>` with your Name and Password you setted during the creation of cluster.

`Ref: mongodb+srv://Aman:12345678@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`.

11. Take that modified String and put it inside `server/.env` file in this form : `MONGO_URI=mongodb+srv://Aman:12345678@cluster881.9urorbp.mongodb.net/?appName=Cluster881`. Now inside that file write another thing on the top of this mongo_uri string is `PORT:5000` , After doing all of that Our .env file is done completely But keep in mind that 🔐 Never share this file. Never push it to GitHub.


12. Now You can open files one by one by the Summery order I am describing down there lets Start with My `server/.env` file and see what inside it , But why would we need this file ❓


<h2>Server-Side Files Summery ▶️</h2>

(A) `server/.env`
The very first file. Before your app does anything — before it connects to MongoDB, before it starts listening for requests — it needs secrets. Your MongoDB password, your JWT secret key, your port number. You never hardcode these inside your actual code because you'll push that code to GitHub and the whole world can see it. So they live here, in a file that never leaves your machine. Every other file in the backend depends on this file existing.


(B) `server/server.js`
Our First Most Important Brick of our Project , This is the front door of Our entire backend. It's the file Node.js actually runs when you type `npm run dev`. It does four things — loads your .env secrets, connects to MongoDB, registers all your routes, and starts listening on port 5000. Think of it as the manager who opens the restaurant every morning, turns the lights on, and tells the staff where to stand. Every route file plugs into this file.

