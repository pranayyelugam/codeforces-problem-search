var theUrl="";
var htmlc="";

function test(){

var prob = [];
var query = document.getElementById( "query1" ).value;
url="http://codeforces.com/api/problemset.problems?tags="+query;

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            document.body.className = 'ok';
            var result = JSON.parse(request.responseText);
            var problems = result.result.problems;
            $.each(problems,function(i,item){
              var id=problems[i].contestId;
              var itt=problems[i].index;
              theUrl="http://codeforces.com/problemset/problem/"+id+"/"+itt;
              console.log(theUrl);
              httpGet(theUrl);
              });
              var message=document.getElementById('message');
              message.innerHTML='grabbed all links.File is ready to download';
        } else {
            document.body.className = 'error';
        }
    }
};
request.open("GET", url , true);
request.send(null);

}


function httpGet(theUrl)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            
            htmlc=htmlc+xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();    
}

function saveTextAsFile()
{
    var textToSave = htmlc;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();

}
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
