import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/general_reducer";

const initialState = {
	isSidebarOpen: false,
};

const GeneralContext = React.createContext();

export const GeneralProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const openSidebar = () => {
		dispatch({ type: "SIDEBAR_OPEN" });
	};
	const closeSidebar = () => {
		dispatch({ type: "SIDEBAR_CLOSE" });
	};

	return (
		<GeneralContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
			{children}
		</GeneralContext.Provider>
	);
};
// make sure use
export const useGeneralContext = () => {
	return useContext(GeneralContext);
};
