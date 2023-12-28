
//importing react hook
import { useEffect } from "react";

// importing the function to fetch data from the API
import { contactThunk } from "../Redux/Reducers/contactReducer";

// importing dispatch hook to call function
import { useDispatch} from "react-redux";

// Importing MoreInfo component to show info about a contact
import MoreInfoSection from "./MoreInfoSection";

// Importing List component to render the list of contact on screen
import List from "./List";


// Rendering the main Page

const ContactList = () => {
    // for dispatching an action
    const dispatch = useDispatch();
    
    // to get the data from the API when the page gets rendered first time
    useEffect(() => {
        dispatch(contactThunk());
    },[]);
    // rendering the page
    return(
        // container
        <div className="w-full flex h-full overflow-hidden">
           {/*changed upar neeche */}
            {/* to render the more info section on page */}
            <MoreInfoSection />
            {/* list component to show the list */}
            <List />

            
        </div>
    )
}

export default ContactList;