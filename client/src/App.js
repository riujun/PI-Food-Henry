import "./App.css";
import { useState } from "react";

import { Home, Landing, Form, Detail } from "./views";
import { Route, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

function App() {
  const [recipesQuerySearch, setRecipesQuerySearch] = useState("");
  // const submitHandler = (event) => {
  //   // event.preventDedault();
  //   dispatch(getAllRecipes(recipesQuerySearch));
  // };
  // console.log(recipesQuerySearch);

  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar
          recipesQuerySearch={recipesQuerySearch}
          setRecipesQuerySearch={setRecipesQuerySearch}
        />
      )}
      <Route exact path="/" component={Landing} />
      <Route
        path="/home"
        render={() => <Home recipesQuerySearch={recipesQuerySearch} />}
      />

      <Route
        exact
        path="/detail/:detailId"
        render={({ match }) => <Detail recipeId={match.params.detailId} />}
      />

      <Route exact path="/create" component={Form} />
    </div>
  );
}

export default App;
