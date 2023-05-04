// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Route
} from "solid-start";

import { createSignal } from "solid-js";

import { useLocation } from "solid-start";
import { createEffect } from "solid-js";


import "./besamel-before-beta.css";
import NavBar from "./components/NavBar";

import { redirect } from "solid-start/server";

import Redirect from "./routes";
import Docs from "./Pages/Docs";
import Homepage from "./Pages/Homepage";


const supportedLanguages = ["cs", "en"];


export default function Root() {

  const location = useLocation();

  createEffect(() => {
    console.log(location.pathname);
  })



  const [language, setLanguageSignal] = createSignal("cs");

  function setLanguage(lang) {
    console.log(lang)
    if (supportedLanguages.includes(lang)) {
      setLanguageSignal(lang);
      console.log("setted")
      // return <Navigate href={lang} />;
      // return <Redirect />
      return redirect(lang);
    }
  }

  createEffect(() => {
    const lang = location.pathname.split("/")[1];
    console.log(lang);

    if (lang != language()) {
      setLanguage(lang);
    }
  });

  createEffect(() => {
    console.log(language());
  })

  return (
    <Html lang={language()}>
      <Head>
        <Title>BEŠAMEL css</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <Body>

        <Suspense>
          <NavBar language={language} setLanguage={setLanguage} languages={supportedLanguages} />

          <div className="main">

            <Routes>

              <Route path={"/"} element={<Homepage language={language} />} />
              <Route path={"/theme-creator"} element={<h1>Theme creator</h1>} />
              <Route path={"/cookies"} element={<h1>Theme creator</h1>} />
              <Route path={"/docs/*a/*b"} element={<Docs language={language} />} />

              <FileRoutes />
            </Routes>
          </div>

        </Suspense>
        <ErrorBoundary>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
