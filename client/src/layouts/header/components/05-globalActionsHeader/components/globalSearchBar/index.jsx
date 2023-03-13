const GlobalSearchBar = ({
  inputRef,
  darkenBorderHandler,
  lightenBorderHandler,
  setIsInputActive,
}) => {
  return (
    <>
      <input
        ref={inputRef}
        placeholder='Search'
        onFocus={() => setIsInputActive(true)}
        onMouseEnter={() => darkenBorderHandler()}
        onMouseLeave={() => lightenBorderHandler()}
      />
    </>
  );
};
export default GlobalSearchBar;
