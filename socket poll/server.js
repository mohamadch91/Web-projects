// Import dependencies
//server
const express = require("express");
const app = express();

// If you change this remember to change it on the client side as well
const port = 80;

// Host the front end
app.use(express.static("client"));

// Start the server and initialize socket.io
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
const io = require("socket.io")(server);

// Initialize candidates
const candidates = {
    "0": { votes: 0, label: "ray 1", color: `rgb(${202}, ${6}, ${86})`  },
    "1": { votes: 0, label: "ray 2", color: `rgb(${202}, ${6}, ${86})`},
    "2": { votes: 0, label: "ray 3", color: `rgb(${202}, ${6}, ${86})` },
    "3": { votes: 0, label: "ray 4", color: `rgb(${202}, ${6}, ${86})` },
    "4": { votes: 0, label: "ray 5", color: `rgb(${202}, ${6}, ${86})` }

};

let allvote=0;
// On new client connection
io.on("connection", (socket) => 
{
    io.emit("update", candidates);
    socket.on("text",(labels)=>{
        
        for (let i=0;i<=4;i++) {
            candidates[i].label=labels[i];
            
          }
          io.emit("add",candidates);  
          io.emit("update1",candidates);

    });
    io.emit("update", candidates);
    
    // On new vote
    socket.on("vote", (index) => {

        // Increase the vote at index
        if (candidates[index]) {
            candidates[index].votes += 1;
            allvote+=1;
            // candidates[index].allvotes=allvote;
        }

        // Show the candidates in the console for testing
        console.log(candidates);
        console.log(allvote)
        
        // Tell everybody else about the new vote
        io.emit("update", candidates);

    });
    
    

});

// // Generate a random RGB color
// function randomRGB() {
//     const r = () => Math.random() * 256 >> 0;
//     return `rgb(${r()}, ${r()}, ${r()})`;
// }