import './styles.css';

const GlobalSearchBar = ({ inputRef, setIsInputActive }) => {
  return (
    <>
      <input
        ref={inputRef}
        className='TopBarPageHeaderGlobalActions-input'
        placeholder='Search'
        onFocus={() => setIsInputActive(true)}
        // onMouseEnter={() => darkenBorderHandler()}
        // onMouseLeave={() => lightenBorderHandler()}
      />
    </>
  );
};
export default GlobalSearchBar;
