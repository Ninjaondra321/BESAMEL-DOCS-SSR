
import xd from '../docs/introduction/xd.mdx';
import index from '../docs/introduction/(index).mdx';
import dalsi from '../docs/introduction/dalsi.mdx';

import { useLocation, useSearchParams } from 'solid-start';
import { A } from 'solid-start';


const sidebar = [
    {
        "cs": "Úvod",
        "en": "Introduction",
        "links": [
            {
                "cs": "Instalace",
                "en": "Installation",
                "link": "/introduction/installation",
            },
            {
                "cs": "Proč Bešamel?",
                "en": "Why Bešamel?",
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

    const path = location.pathname.split("/");
    console.log(path);

    return (
        <>
            <div className="sidebar left">
                {sidebar.map(item =>
                    <div>
                        <h2>{item[language()]}</h2>
                        {item.links.map((obj, i) =>
                            <A href={"/docs" + obj.link}>{obj[language()]}</A>
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