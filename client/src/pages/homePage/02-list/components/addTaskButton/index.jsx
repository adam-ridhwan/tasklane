import MiniArrowDownIcon from '/src/assets/svg/miniArrowDownIcon';
import MiniPlusIcon from '/src/assets/svg/miniPlusIcon';

import './styles.css';

const AddTaskButton = () => {
  return (
    <>
      <div className='AddTaskButton-container'>
        <div className='AddTaskButton-button'>
          <div>
            <MiniPlusIcon />
          </div>
          <div>Add task</div>
        </div>

        <div className='AddTaskButton-arrowDown'>
          <div>
            <MiniArrowDownIcon />
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTaskButton;
