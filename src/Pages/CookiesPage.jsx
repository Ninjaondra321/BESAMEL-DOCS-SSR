const dictionary = {
    "heading": {
        "cs": "Nastavení cookies",
        "en": "Cookies settings"
    },
}


function CookiesPage({ language }) {
    return (<>
        <h1>{dictionary["heading"][language()]}</h1>
    </>);
}

export default CookiesPage;