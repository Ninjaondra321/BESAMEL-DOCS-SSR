import { createSignal } from "solid-js";
import { A } from "solid-start";

const dictionary = {
    "home": {
        "cs": "Domů",
        "en": "Home",
    },
    "docs": {
        "cs": "Dokumentace",
        "en": "Docs",
    },
    "theme-creator": {
        "cs": "Tvůrce motivů",
        "en": "Theme creator",
    },
    "examples": {
        "cs": "Ukázky",
        "en": "Examples",
    },
    "versions": {
        "cs": "Verze",
        "en": "Versions",
    },
}



function NavBar({ language, setLanguage, languages }) {

    console.log(dictionary)
    console.log(dictionary["home"])

    console.log(language())

    const [showBanner, setShowBanner] = createSignal(true);
    const [drawerShown, setDrawerShown] = createSignal(false);
    // const [dictionary, setDictionary] = createSignal("translation_cs");

    function updateHeight(useLessProps = undefined) {
        // Navbar height + banner height
        if (showBanner()) {

            document.documentElement.style.setProperty('--navbar-height', `${document.querySelector(".navbar").clientHeight + document.querySelector(".banner").clientHeight}px`);
        } else {
            document.documentElement.style.setProperty('--navbar-height', `${document.querySelector(".navbar").clientHeight}px`);
        }

    }


    return (<>

        <nav class='always-on-top '>

            {showBanner() &&
                <div className="banner">
                    <div className="left">
                    </div>
                    <div className="center">
                        <header>Nové menu najdete <a href="#">zde</a></header>
                    </div>
                    <div className="right">
                        <button onclick={() => { language() === "cs" ? setLanguage("en") : setLanguage("cs") }} className="primary">Change language - now: {language()}</button>
                        <button className="icon-btn small " onClick={() => setShowBanner(false)}>
                            close
                        </button>
                    </div>
                </div>
            }

            <div className="navbar ">

                <div className="left">
                    <A href="/#" end={true}>
                        <span className="icon-btn ">
                            coffee
                        </span>
                        <header>Kavárna ZadeK</header>

                    </A>
                </div>

                <div className="center"></div>

                <div className="right">
                    <div className="m-hidden">
                        <A href={"/"} end={true}>{dictionary["home"][language()]}</A>
                        <A href={"/docs"} > {dictionary["docs"][language()]} </A>
                        <A href={"/examples"} > {dictionary["examples"][language()]} </A>
                        <A href={"/theme-creator"}>{dictionary["theme-creator"][language()]}</A>
                        <A href={"/versions"}>{dictionary["versions"][language()]}</A>

                        <div className="dropdown">
                            <p className="dropdown-heading">Dropdown</p>
                            <div className="dropdown-window">
                                <A href="/dropdown">Dropdown</A>
                                <A href="/dropdown">Dropdown</A>
                            </div>
                        </div>

                    </div>
                    <div className="pc-hidden">
                        <button className="icon-btn large " style="margin-right:-15px" id="menu-opener" onclick={() => setDrawerShown(!drawerShown())}>
                            menu
                        </button>
                    </div>
                </div>

            </div>
            <div className={"nav-drawer fullscreen  bg" + (drawerShown() ? " opened" : " closed")}>
                <div className="drawer-content to-left">
                    <A href="/">Home</A>
                    <A href="/abc">abc</A>
                    <A href="/components">Components</A>
                    <div className="accordion-plain">
                        <div className="accordion-item closed center " >

                            <button className="accordion-header h4"
                                onTouch={(e) => { e.target.parentElement.classList.toggle("closed"); }}
                                onClick={(e) => { e.target.parentElement.classList.toggle("closed"); }}
                            >
                                Accordion

                            </button>
                            <div className="accordion-content">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, sequi quaerat. Possimus hic, quaerat ut eos repellat sint minus doloremque beatae fuga mollitia nulla perferendis commodi quibusdam sequi? Saepe, est!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        </nav >

    </>);
}

export default NavBar;