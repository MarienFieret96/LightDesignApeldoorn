import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";
import TagManager from "react-gtm-module";
import { Navbar, Sidebar, AnimatedRoutes } from "./components";

const TRACKING_ID = "redacted";
ReactGA.initialize(TRACKING_ID);

const tagManagerArgs = {
	gtmId: "redacted",
};

TagManager.initialize(tagManagerArgs);

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Sidebar />
			<AnimatedRoutes />
		</BrowserRouter>
	);
}

export default App;
