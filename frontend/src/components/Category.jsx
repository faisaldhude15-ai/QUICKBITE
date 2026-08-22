import React from "react";

function Category({ categories = [], selected, onSelect }) {

  return (

    <div className="category-list">


      <button

        type="button"

        className={
          selected === "" 
          ? "active" 
          : ""
        }

        onClick={() => onSelect("")}

      >

        All

      </button>





      {
        categories.map((category) => (

          <button

            type="button"

            key={category._id}

            className={
              selected === category.name
              ? "active"
              : ""
            }

            onClick={() => 
              onSelect(category.name)
            }

          >

            {category.name}

          </button>


        ))
      }





    </div>

  );

}



export default Category;