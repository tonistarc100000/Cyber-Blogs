<h1>The CYBER-BLOGS Story — File by File🚀</h1>

1. Firstly open the CMD by pressing `Win + R → type "cmd" → Enter`. We have to Select which Directory (Folder) , we want to create out project 
   And Indside that Folder Create the Folder Named `DEVFOLIO` (You Guys can use any name you want for this project I used `DEVFOLIO`) .

2. Now Inside `DEVFOLIO` we have to Create 2 new folder Called `client` and `server`, here we are going to create the Fullstack MERN Project. 
   I named it a `CYBER-BLOGS` cuz it will be a more like bloging website with `ADMIN` pannel where only the `ADMIN` can do CRUD Operations But We will deploy it on Internet So everyone can see what we built .

3. So before Starting to build this MERN project We need to visualize the file trees of evry folder and their subfolders and their files we are   gonna create into them lets Start with the `server`'s folder files tree First :-

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

