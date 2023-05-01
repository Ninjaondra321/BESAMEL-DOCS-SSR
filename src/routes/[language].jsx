import { Navigate, Outlet, useLocation } from "solid-start";
import { createEffect } from "solid-js";



const supportedLanguages = ["cs", "en"];

function LanguageRedirection() {
    createEffect(() => {
        const location = useLocation();
        const lang = location.pathname.split("/")[1];

        if (!supportedLanguages.includes(lang)) {
            return <Navigate href="/cs" />;
        }
    });




    return (
        <div>
            <h1>Ahoj světe!</h1>
            <Outlet />
        </div>
    );
}

export default LanguageRedirection;