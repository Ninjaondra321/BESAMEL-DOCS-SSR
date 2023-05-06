
import xd from '../docs/introduction/xd.mdx';
import index from '../docs/introduction/(index).mdx';
import dalsi from '../docs/introduction/dalsi.mdx';

import { Head, Outlet, Title, useLocation, useSearchParams } from 'solid-start';
import { A } from 'solid-start';
import { For, createEffect, createSignal, onMount } from 'solid-js';



const sidebar = [
    {
        "cs": "Úvod <span class='badge secondary'>NOVÉ</span>",
        "en": "Introduction",
        "links": [
            {
                "cs": "Instalace",
                "en": "Installation",
                "link": "/introduction/installation",
            },
            {
                "cs": "Proč Bešamel?  <span class='badge secondary'>NOVÉ</span>",
                "en": "Why Bešamel? <span class='badge secondary'>NEW</span>",
                "link": "/introduction/why",
            }
        ]
    },
    {
        "cs": "Komponenty",
        "en": "Components",
        "links": [
            {
                "cs": "Dalsi link",
                "en": "Another link",
                "link": "/components/dalsi",
            }

        ]
    }
];

const files = {
    "": {
        "cs": xd,
        "en": xd,
    },
    "introduction/why": {
        "cs": xd,
        "en": xd,
    },
    "introduction/installation": {
        "cs": index,
        "en": index,
    },
    "components/dalsi": {
        "cs": dalsi,
        "en": xd,
    }
}

const versionList = [
    "latest",
    "2.0",
    "1.0"
]

function Docs({ language }) {
    // ! KDYŽ AKTUALIZUJEŠ PŘES CTRL+F5, TAK NEFUNGUJE RIGHT SIDEBAR
    let textRef;
    const location = useLocation();
    console.log(location);

    const [version, setVersion] = createSignal(location["query"]["v"] || "latest");
    const [rightSidebar, setRightSidebar] = createSignal([{ "title": "Výchozí", "id": "default" }]);

    const [loaded, setLoaded] = createSignal(false);



    function createRightSidebar() {
        // Init variables
        let sidebarNew = [];
        let children = textRef.children;
        children = Array.from(children);

        // Loop through all children and save all H2 tags into -sidebarNew-
        for (let i = 0; i < children.length; i++) {
            if (children[i].tagName === "H2") {
                children[i].id = "heading-" + i;
                sidebarNew.push({
                    "title": children[i].innerHTML,
                    "id": children[i].id,
                })
            }
        }

        // Set the h2 tags into rightSidebar signal
        setRightSidebar(sidebarNew);
    }

    createEffect(() => {
        console.log(location.pathname); // ! Tohle nemaž - jinak se effect neexekuuje
        createRightSidebar();
    })

    return (
        <>
            {/* This appears to help not changing the title - do not remove */}
            <Head>
            </Head>
            <div className="sidebar left">
                <h1>
                    {version()}
                </h1>
                <label htmlFor="version">Version</label>

                <select class='terciary' name="version" id="version" value={version()}>
                    {versionList.map(item =>
                        <option value={item} class="first-letter-capital">{item}</option>
                    )}
                </select>



                {sidebar.map(item =>
                    <div>
                        <h2 innerHTML={item[language()]}></h2>
                        {item.links.map(obj =>
                            <A href={"/docs" + obj.link} innerHTML={obj[language()]}></A>
                        )}

                    </div>
                )}
            </div>
            <div className="sections" ref={textRef} >
                <button className="primary large" onclick={() => createRightSidebar()} >CreateRightSidebar</button>

                {() => {
                    if (files[location.pathname.substring(6)]) {
                        return files[location.pathname.substring(6)][language()]
                    }
                    return <h1>404</h1>
                }}

                {/* <Outlet /> */}

            </div>

            <div className="sidebar right">
                <h1>Right sidebar</h1>

                {rightSidebar().map(item =>
                    <A href={"#" + item.id} >{item.title} </A>
                )}

                <hr />

                <button onClick={() => { console.warn(rightSidebar()) }}>
                    Log right sidebar
                </button>

            </div>
        </>
    )




}

export default Docs;