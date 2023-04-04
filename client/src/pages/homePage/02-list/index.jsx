import { useContext } from 'react';
import { TodosContext } from '/src/context/todoContext.jsx';

import AddTaskButton from './components/addTaskButton/index.jsx';
import CompletionButton from './components/CompletionButton/index.jsx';
import CustomizeButton from './components/customizeButton/index.jsx';
import SortButton from './components/sortButton/index.jsx';
import Header from '/src/layouts/header/index.jsx';

import GetTodos from '/src/pages/homePage/hooks/getTodos.jsx';

import { useEffect } from 'react';
import './styles.css';

const List = () => {
  const { todos, setTodos } = useContext(TodosContext);
  GetTodos();

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <Header />
      <div className='PageToolBar-list'>
        <div className='PageToolBar-list-leftContainer'>
          <AddTaskButton />
        </div>

        <div className='PageToolBar-list-rightContainer'>
          <div>
            <CompletionButton />
            <SortButton />
            <CustomizeButton />
          </div>
        </div>
      </div>
      {/* <div className='centerize'>
        <div className='Animation-test-container1'>
          <div className='Animation-test'></div>
        </div>
      </div>

      <div className='centerize'>
        <div className='Animation-test-container2'>
          <div className='Animation-test'></div>
        </div>
      </div>

      <div className='centerize'>
        <div className='Animation-test-container3'>
          <div className='Animation-test'></div>
        </div>
      </div> */}
    </>
  );
};
export default List;
