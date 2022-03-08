
const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});
const doc = {
    a: "a",
    b: "b"
};
coll1.insert(doc, function (err, newDoc) {
    console.log("dodano dokument (obiekt):")
    console.log(newDoc)
    console.log("losowe id dokumentu: "+newDoc._id)
});