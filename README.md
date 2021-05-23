
# Targil - Server



For Testing on single computer, do the following :

1. open "package.json" then go to "scripts" then to "start" and change the string "node" to "nodemon".
2. open the file "index.ts" and add after imports the code :

    import cors from 'cors';
    const corsOptions = {
        origin: 'http://localhost:3000'
    }
    app.use(cors(corsOptions));

3. open the file "index.ts" and scroll down until reaching "app.get('/')", then inside replace the code as :

    //   res.redirect("/index.html");
    res.send("We are Running !"); // Testing

4. now open console and run "npm start" to debug.




