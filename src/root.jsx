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

import Docs from "./Pages/Docs";
import Homepage from "./Pages/Homepage";
import Page404 from "./Pages/404";
import CookiesPage from "./Pages/CookiesPage";
import CookiesBanner from "./components/CookiesBanner";


const supportedLanguages = ["cs", "en"];


export default function Root() {

  const location = useLocation();

  const [language, setLanguageSignal] = createSignal("cs");
  // const [cookiesAllowed, setCookiesAllowed] = createSignal(checkCookies());

  function setLanguage(lang) {
    console.log(lang)
    if (supportedLanguages.includes(lang)) {
      setLanguageSignal(lang);
    }
  }

  function checkCookies() {
    const cookiesAllowed = localStorage.getItem("BESAMEL-DOCS-COOKIES-ALLOWED");
    if (cookiesAllowed === "true") {
      return true;
    }
    else if (cookiesAllowed === "false") {
      return false;
    } else {
      return null;
    }
  }

  function setCookies(value) {
    localStorage.setItem("BESAMEL-DOCS-COOKIES-ALLOWED", value);
    setCookiesAllowed(value);
  }


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
              <Route path={"/cookies"} element={<CookiesPage language={language} />} />
              <Route path={"/docs/*a/*b"} element={<Docs language={language} />} />
              <Route path={"/docs/*a/*b"} element={<Docs language={language} />} />

              <FileRoutes />
              <Route path={"*"} element={<Page404 language={language} />} />
            </Routes>
          </div>

          <CookiesBanner language={language} />

        </Suspense>
        <ErrorBoundary>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
