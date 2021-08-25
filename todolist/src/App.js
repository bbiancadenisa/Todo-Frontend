import "./App.css";
import TodoList from "./components/TodoList";
import { BrowserRouter as Router } from "react-router-dom";

function App({ match }) {
  const pageNumber = match.params.pageNumber || 1;
  console.log(pageNumber);
  return (
    <Router>
      <div className="App">
        <TodoList pageNumber={pageNumber} />
      </div>
    </Router>
  );
}

export default App;
