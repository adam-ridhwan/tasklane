import AddTaskButton from './components/addTaskButton/index.jsx';
import CompletionButton from './components/completionButton/index.jsx';
import CustomizeButton from './components/customizeButton/index.jsx';
import SortButton from './components/sortButton/index.jsx';
import Header from '/src/layouts/header/index.jsx';

import './styles.css';

const List = () => {
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
