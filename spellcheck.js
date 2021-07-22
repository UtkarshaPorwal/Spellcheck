
        document.getElementById('inputfile')
        .addEventListener('change', function() {
          var better=[];
          var bad="";
        var fr=new FileReader();
        fr.onload=function(){
           
            document.getElementById('output')
                    .textContent=fr.result;
var text= document.getElementById('output')
                    .textContent;
//alert(text);
var p=fetch("https://api.textgears.com/grammar?key=an2VegQkmsScnjN6&text="+text+"&language=en-GB");
            p.then((resp)=>{
return resp.json();
}).then(data => {
var jsonData=data;
// console.log(jsonData);

for(var i in jsonData){
  //console.log(jsonData[i]);
   var val = jsonData[i];
var k=0;

    for(var j in val){
      //console.log(val[j]);
      var errors=val[j];
                var ul="";
      for(var l in errors){
    //console.log(errors[l].better);
    
text = text.replace(errors[l].bad, "<span class='highlight' id='text"+l+"'  data-id='"+l+"' itemNo="+l+" oncontextmenu='myFunction(this)'  >"+errors[l].bad+"</span>");
bad=errors[l].bad;
document.getElementById('output')
                    .innerHTML=text;
     better=errors[l].better;
   console.log(better);

  ul+="<ul id=ul"+l+" class='list display-none' itemNo="+l+">"
for(var b=0;b<errors[l].better.length;b++)
{
ul+="<li id="+l+" >"+errors[l].better[b]+"</li>";
console.log(errors[l].better[b]);

}

ul+="</ul>";
    

      }
      
    


ul+="";
document.getElementById("contextMenu").innerHTML=ul;
    }

     
}


}).catch((error)=>{

alert(error);
});


        }
          console.log(better);
        fr.readAsText(this.files[0]);
    })
    
function myFunction(z) {

  var targetid = z.getAttribute("data-id");

const uls = document.querySelectorAll('.list');


uls.forEach(function(d){
   if(z.getAttribute('itemNo') != d.getAttribute('itemNo')) d.classList.add('display-none');
   else d.classList.remove('display-none');
});

function getEventTarget(e) {
e = e || window.event;
return e.target || e.srcElement; 
}

var ul = document.getElementById("ul"+targetid);
ul.onclick = function(event) {
var target = getEventTarget(event);
document.getElementById("text"+targetid).innerHTML=target.innerText;
document.getElementById("text"+targetid).style.color="black";
var textforcorrection= document.getElementById('output')
                    .textContent;
    document.getElementById("ul"+targetid).style.display="none";

//alert(textforcorrection);

};
}

window.addEventListener('contextmenu', function (e) {

e.preventDefault();
}, false);