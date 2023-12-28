

//importing redux hooks
import { useDispatch, useSelector } from "react-redux";
//importing actions and state from Contact Reducer
import { contactSelector, setShowAddContact } from "../Redux/Reducers/contactReducer";


// rendering the NavBar
const NavBar = () => {
    //  dispatching an action
    const dispatch = useDispatch();

    // function to show add contact section on clicking of button
    const {showAddContact} = useSelector(contactSelector);


    // rendering the NavBar
    return(
        // container for NavBar
        <div className="bg-[#1D5D9B] h-[50px] flex justify-between 
                        md:justify-center items-center px-1 sticky 
                        left-0 top-0 right-0">

            {/* header inside the NavBar */}
            <h1 className="text-white text-lg">
                Contact List
            </h1>

            {/* add contact button */}
            {/* visible only on smaller screen  */}
            <button className="bg-green-300 rounded p-[2px] md:hidden" 
                    onClick={() => dispatch(setShowAddContact())}>

                {/* setting the value of button on condition */}
                {showAddContact ? "Cancel"
                                    : "Add Contact" }

            </button>
            
        </div>
    )
}

export default NavBar;