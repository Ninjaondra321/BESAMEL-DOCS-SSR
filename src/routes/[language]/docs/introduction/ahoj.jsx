
import xd from "./xd.mdx"
import { useLocation } from "solid-start";


function Ahoj() {


    const location = useLocation();
    const lang = location.pathname.split("/")[1];
    if (lang == "cs") {
        return xd;
    } else {
        return <h1>English sites</h1>
    }
}

export default Ahoj;