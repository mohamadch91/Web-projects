      //client 
      // Connect to the server it's (Here you want to change the port if you changed it in the server)
      const socket = io("localhost:80");
      // On new vote update the chart
      socket.on("update", (candidates) => {

        // Convert the candidates object into an array
        candidates = Object.entries(candidates);

        // For each candidate
        var allvotes=0;
        for (const [key1, candidate1] of candidates) {
          document.getElementById(key1).style.backgroundColor=candidate1.color;
            allvotes+=candidate1.votes;

        }
        
        for (const [key, candidate] of candidates) {
          var bar=0;
          if(allvotes===0){
            bar=0;
          }
          else{
           bar=(candidate.votes/allvotes)*100;
          }
          bar=bar.toPrecision(3);
          console.log(bar);
          if(bar===NaN){
            bar=0;
          }
          // console.log(key+key)
          document.getElementById(key).style.width=`${bar}%`;
          document.getElementById(key+key).textContent=`${bar}% in gozine ra entekhab kardand yani ${candidate.votes} nafar az ${allvotes}`;
        }

      });
      socket.on("update1",(candidates)=>{
        candidates = Object.entries(candidates);
        
        for (let i=0;i<=4;i++) {
          $(document).ready(function(){

            $("#options").append("<button type=\"button\"  class=\"btn btn-primary mt-2 md-2 me-2 ms-2 text-center\" style=\" width:100px; height:30px;\" onclick=vote("+i+")>"+candidates[i][1].label+ "</button>")
          })
         
        }
        document.getElementById("prbar").style.visibility="visible";
      });

      // Make a new vote (Remember this is not a safe way to do this)
      function vote(index) {
        socket.emit("vote", index);
      }

      // get the inputs from it 
      function change(){
        const labels =[];
        if(document.getElementById("namevote1").value===""){
         labels.push("default")
        }
        else{
          labels.push(document.getElementById("namevote1").value);

        }
        if(document.getElementById("namevote2").value===""){
          labels.push("default")
        }
        else{
          labels.push(document.getElementById("namevote2").value);

        }
        if(document.getElementById("namevote3").value===""){
          labels.push("default")
        }
        else{
          labels.push(document.getElementById("namevote3").value);

        }
        if(document.getElementById("namevote4").value===""){
          labels.push("default")
        }
        else{
          labels.push(document.getElementById("namevote4").value);

        }
        if(document.getElementById("namevote5").value===""){
          labels.push("default")
        }
        else{
        
          labels.push(document.getElementById("namevote5").value);
        }
     
        socket.emit("text",labels);
    
      }
