import React from "react";
import {Switch, Route} from "react-router-dom";
import Table from "./components/EmployeeTable/EmployeeTable";
import EditForm from './components/FormCard/FormCard';

function App() {
	return (
			<Switch>
				<Route path="/" exact component={Table} />
                <Route path="/form" exact component={EditForm} />
			</Switch>
	);
}

export default App;
