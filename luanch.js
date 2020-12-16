
  var jsonFile = null;// this variable will hold the JSON file once its fetched from the web
  var elementId = 1; //number of elements or images displayed
  var positionId = 2; //the main JSON id position of each object
 var getJSON = function(url) 
 {
     //this is the function that will return the JSON from online resource
    
    var getRequest = new XMLHttpRequest();
    getRequest.open('GET', url, true);
    getRequest.send();
    getRequest.onload = function() {
        var status = getRequest.status;
      if (status === 200) {
       jsonFile  = JSON.parse(getRequest.responseText);
       executeResponsive(jsonFile);
      }
    };
 }

 

function executeResponsive(anything)
{
  for(i=1; i<=10; i++ ){
  createInnerDivandElement(anything,positionId,elementId);
  }
console.log(positionId);
console.log(elementId);
}

function createInnerDivandElement(JSONElement,mypositionId,ElementId){
//this function will create the internal single div  to hold an image and its elements. the Sytling will be done with Css
//this function also increases the positionid by 51 to get the next album
//This function also increment elementid by 1
var innerDiv = document.createElement("div"); //creating the innerdiv
innerDiv.setAttribute("id","innerDiv");       //setting the div  Id
var imageTitle = document.createElement("h4");// creating the Elements
var albumId = document.createElement("h5"); //creating the Album h element
var imageId = document.createElement("h5"); //creating the Image h element
imageTitle.setAttribute("id","imageTitle");
var imageAnchor = document.createElement("a"); ////creating the Anchor element that will have images
imagescr = document.createElement("img");//creating the image element


var imageTitleText,albumIdText,imageIdText,imagescr;

if(ElementId===1){// Check if the elementid is been called the first time , it calls the function to create button and increaese positionid
    imageTitleText = document.createTextNode('Title: '+JSONElement[1].title);
    albumIdText = document.createTextNode('AlbumId: '+JSONElement[1].albumId);
    imageIdText = document.createTextNode('ImageId: '+JSONElement[1].id);
    imagescr.setAttribute("src",JSONElement[1].thumbnailUrl);
    imageAnchor.setAttribute("href",JSONElement[1].url);
    imagescr.setAttribute("id","imagescr");
    this.positionId = 51;
    createbtn();
}
else{
     imageTitleText = document.createTextNode('Title: '+JSONElement[mypositionId].title);
     albumIdText = document.createTextNode('AlbumId: '+JSONElement[mypositionId].albumId);
     imageIdText = document.createTextNode('ImageId: '+JSONElement[mypositionId].id);
     imagescr = document.createElement("img");
     imagescr.setAttribute("id","imagescr");
     imagescr.setAttribute("src",JSONElement[mypositionId].thumbnailUrl);
     imageAnchor.setAttribute("href",JSONElement[mypositionId].url);
     positionId +=50;
     
      }
      elementId++;
imageTitle.appendChild(imageTitleText);
albumId.appendChild(albumIdText);
imageId.appendChild(imageIdText);
imageAnchor.appendChild(imagescr);

innerDiv.appendChild(imageTitle);
innerDiv.appendChild(albumId);
innerDiv.appendChild(imageId);
innerDiv.appendChild(imageAnchor);

document.getElementById("mybody").appendChild(innerDiv);
}
function createbtn() {
var btnMore = document.createElement('button');
btnMore.setAttribute("id","btnMore");
btnMore.innerHTML ="Show More";
btnMore.setAttribute("onclick","increamentGallery()")
document.getElementById("mybodyrapper").appendChild(btnMore);

}
function increamentGallery() {
  //This function adds more gallery in 10s on Click 
  // and if the image is upto 50, it displays an alert 
  if(elementId<51){
   var elementIdNex = elementId+10;
    for(i=elementId; i<elementIdNex; i++ ){
    createInnerDivandElement(jsonFile,positionId,elementId);
    }
  }else{
alert("50 Images Reached!");
  }
  
}


getJSON('https://jsonplaceholder.typicode.com/photos');//this is the primary fuction that will be called on luanch
