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
      return <Redirect />
    }
  }

  createEffect(() => {
    const lang = location.pathname.split("/")[1];
    console.log(lang);

    if (lang != language()) {
      setLanguageSignal(lang);
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
            <div className="sections">

              <Routes>

                <Route path={language()} element={<div><h1>Elementtt</h1></div>} />
                <Route path={language() + "/theme-creator"} element={<h1>Theme creator</h1>} />
                <Route path={language() + "/cookies"} element={<h1>Theme creator</h1>} />


                <FileRoutes />
              </Routes>
            </div>
          </div>

        </Suspense>
        <ErrorBoundary>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}