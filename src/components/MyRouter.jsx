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

} from "solid-start";

import { Route } from "solid-start";


function MyRouter({ language }) {
    return (<>
        <Routes>
            <Route path="/" end={true}>
                <h1>Index.htmllll</h1>
            </Route>
            <Route path="/theme-creator">
                <h1>Theme creator</h1>
            </Route>

            <FileRoutes />
        </Routes>
    </>);
}

export default MyRouter;