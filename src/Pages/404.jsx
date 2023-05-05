
const dictionary = {
    "title": {
        "cs": "Stránka nebyla nalezena",
        "en": "Page not found",
    },
    "text": {
        "cs": "TODO: Sem dpoiš nějaký názorný text",
        "en": "TODO: Write some text here",
    },
}


function Page404({ language }) {
    return (<div>
        <h1>{dictionary["title"][language()]}</h1>
        <p>{dictionary["text"][language()]}</p>

    </div>);
}

export default Page404;