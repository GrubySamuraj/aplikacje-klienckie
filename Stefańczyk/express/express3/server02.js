var express = require("express")
var app = express()
const PORT = 3000;

// app.use(express.static('static')) // pliki strony

let uczniowe = [
    { dane: "1Nazwisko Imie" },
    { dane: "2Nazwisko Imie" },
    { dane: "3Nazwisko Imie" },
    { dane: "4Nazwisko Imie" },
    { dane: "5Nazwisko Imie" },
    { dane: "6Nazwisko Imie" }
]
names = ["obecny", "nieobecny", "spozniony"]
app.get("/",function(req,res){
        let forms = `<table> <form action="/radio" method="GET"> <tr>
                    <td>Imie i nazwisko</td>
                    <td>obency</td>
                    <td>nieobecny</td>
                    <td>spóźniony</td>
                </tr>`
        for(let x = 0;x < uczniowe.length; x++){
            forms +=`<tr>
            <td>${uczniowe[x].dane}</td>
            <td>`
            for(let y = 0;y < 3;y++){
                forms+=`<td><input type="radio" name="radio${x}" value=${names[y]}></td>`
            }
        }
        forms +=`<tr><td><input type="submit"></td></tr></form> </table>`;
        res.send(forms);
    })
app.get("/radio",function(req,res){
    let status = []
    let obecny = 0
    let nieobecny = 0
    let spozniony = 0
    console.log(req.query);
    status.push(req.query.radio0);
    status.push(req.query.radio1);
    status.push(req.query.radio2);
    status.push(req.query.radio3);
    status.push(req.query.radio4);
    status.push(req.query.radio5);
    for(let o=0; o < status.length; o++){
        console.log(status[o])
        if(status[o]=="obecny"){
            obecny++
        }
        else if(status[o]=="nieobecny"){
            nieobecny++
        }
        else if(status[o]=="spozniony"){
            spozniony++
        }
    }
    res.send("Jest " + spozniony + " spoznionych, " + obecny + " obecnych, " + nieobecny + " nieobencych")
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
    console.log("Witaj");
})
