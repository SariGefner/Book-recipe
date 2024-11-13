import React from "react";

export  const Header = () => {

    return(

        <div>
            <h1>Recipes</h1>
            <br></br>
            <label>pick a category</label>
           <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
           </select>
           <input type="search" id="search-input" name="search" placeholder="Search..." aria-label="Search"></input>
        </div>
    )
}