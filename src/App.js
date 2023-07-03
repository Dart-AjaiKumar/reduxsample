import './App.css';
import Addtask from './components/Addtask';
import Header from './components/Header';
import TaskLists from './components/TaskLists';


function App() {
  return (
    <div className="App">
       <Header/>
       <Addtask/>
       <TaskLists/>
    </div>
  );
}

export default App;
