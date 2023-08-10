const Pagination = ({recipePerPage, totalRecipes, currentPage, handlePaginate}) => {
  const pageNumbers = Math.ceil(totalRecipes / recipePerPage);

  // const renderPageNumbers = () => {
  //   const buttons = [];
  //   const start = Math.max(currentPage - 1, 1)
  //   const end = Math.min(currentPage + 1, pageNumbers);
  //   for (let i = start; i <= end; i++){
  //       buttons.push(
  //           <li
  //           key={i}
  //           onClick = {() => handlePaginate(i)}
  //           >
  //               {i}
  //           </li>
  //       )
  //   }
  //   return buttons;
  // }
 
  const renderPageNumbers = () => {
    const buttons = [];
    for(let i = 1; i <= pageNumbers; i++) {
      buttons.push(
        <button 
        key ={i}
        onClick={() => handlePaginate(i)}>
          {i}
        </button>
      );
    }
    return buttons; 
  }

  const handlePrev = () => {
    if (currentPage > 1) {
        handlePaginate(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < pageNumbers) {
        handlePaginate(currentPage + 1);
    }
  }

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      handlePaginate(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== pageNumbers) {
        handlePaginate(pageNumbers);
    }
  }

  return (
    <div>
        <ul>
            <button onClick ={handleFirstPage}>
                First
            </button>

            <button onClick ={handlePrev}>Prev</button>    
            {renderPageNumbers()}
            <button onClick ={handleNext}>last</button>
        </ul>
    </div>
  )
}

export default Pagination;