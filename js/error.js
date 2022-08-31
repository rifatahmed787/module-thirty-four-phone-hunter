
fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error)); //should use always

//or
//vitore onk dhorener vul hote pare  tai amra sob somoy try , catch 
try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}
catch {

}




//synchronous, asynchronous
console.log(1);

setTimeout(() => {
    console.log(3);
}, 3000); //3000 ms that means 3s
console.log(2);