
document.getElementById("data").innerHTML = fetch("http://jsonplaceholder.typicode.com/users")
    .then(response => {
        return response.json()
    });







//https://api.trello.com/1/members/me/boards?key=2e78a869a2fee0898eca553fc8a37472&token=f23411d4ba9f094efdd8d4affcfee30825bfcea560c014e396601def9461c076*/