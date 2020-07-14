var isMatched = false;
const searchToFile = () => {

    var text = {
        searchText : document.getElementById('strtoSearch').value
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText){
                isMatched = true;
                document.getElementById('txtMatch').setAttribute('enable', true)
                document.getElementById('txtMatch').setAttribute("style", "color: black;")
                document.getElementById('txtMatch').innerHTML = "Search String matched in this line: " + this.responseText;
            } else{
                isMatched = true;
                document.getElementById('txtMatch').setAttribute('enable', true)
                document.getElementById('txtMatch').setAttribute("style", "color: red;")
                document.getElementById('txtMatch').innerHTML = "Given String not Matched in file.";
            }
        }
    };
    xhttp.open("POST", "http://localhost:3000/readFile", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(text));

}