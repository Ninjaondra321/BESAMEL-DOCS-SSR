import { createDeferred, createEffect, onMount } from "solid-js";
import { Navigate } from "solid-start";
import { Outlet, useLocation } from "solid-start";

const supportedLanguages = ["cs", "en"];

function Redirect({ language }) {

    const location = useLocation();
    createEffect(() => {
        const lang = location.pathname.split("/")[1];
        console.log(lang);

        if (!supportedLanguages.includes(lang)) {
            return <Navigate href="/cs" />;
        }
    });

    return (
        <div>
            <Outlet />
        </div>
    );

}

export default Redirect;