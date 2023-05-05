
import xd from '../docs/introduction/xd.mdx';
import index from '../docs/introduction/(index).mdx';
import dalsi from '../docs/introduction/dalsi.mdx';

import { Head, Title, useLocation, useSearchParams } from 'solid-start';
import { A } from 'solid-start';
import { createEffect, createSignal } from 'solid-js';


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

function Docs({ language }) {

    const location = useLocation();
    console.log(location);

    const [version, setVersion] = createSignal(location["query"]["v"] || "latest");

    createEffect(() => {
        console.log(version());
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

                <select class='terciary' name="version" id="version">
                    <option value="@">Latest</option>
                    <option value="2.0">2.0</option>
                    <option value="1.0">1.0</option>
                </select>



                {sidebar.map(item =>
                    <div>
                        <h2 innerHTML={item[language()]}></h2>
                        {item.links.map((obj, i) =>
                            <A href={"/docs" + obj.link} innerHTML={obj[language()]}>


                            </A>
                        )}

                    </div>
                )}
            </div>
            <div className="sections">
                {() => {

                    if (files[location.pathname.substring(6)]) {
                        return files[location.pathname.substring(6)][language()]
                    }

                    return <h1>404</h1>
                }}
            </div>
        </>
    )




}

export default Docs;