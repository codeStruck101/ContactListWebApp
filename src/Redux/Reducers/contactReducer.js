
// creating slice and async thunk
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

// declaring initial State
const initialState = {contactList:[],
                      showContact:null,
                      showAddContact:null};

// fetching the data from API on first render 
export const contactThunk = createAsyncThunk(
    'contact/fetchAPI',
    async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        // returning the data to an extraReducer to store it within the initial state.
        return data;
    }
)
// making an API call for creating a new contact 
export const addContactThunk = createAsyncThunk(
    'contact/createContact',
    async(args,thunkAPI) => {
        fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(
            args
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json());
        //returning the newly added contact to an extraReducer to store it in the initialState.
        return args;
    }
)
// making an API call to update the data of a selected contact.
export const updateContactThunk = createAsyncThunk(
    'contact/updateContact',
    async(args,thunkAPI) => {
        fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'PUT',
        body: JSON.stringify(
            args
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json());
        // returning the updated contact to extraReducer in order to update it in initial state
        return args;
    }
)

//making an API call to delete a contact from the List

export const deleteContactThunk = createAsyncThunk(
    'contact/deleteContact',
    async(args,thunkAPI) => {
        fetch(`https://jsonplaceholder.typicode.com/`, {
            method: 'DELETE',
    });
    // returning the contact to be deleted to extraReducer in order to remove it from the initial state.
    return args;
    }
)
// creating a slice for contacts
const contactSlice = createSlice({
    name:'ContactList',
    initialState,
    // reducers
    reducers:{
        // deciding whether to show or hide a contact on moreInfo page 
        setShowContact:(state,action) => {
            // if previously add contact page was opened 
            if(state.showAddContact){
                // removing the add contact page from screen
                state.showAddContact = null;
            }

            // storing the data of clicked contact inside the showContact variable
            state.showContact = action.payload;
        },
        //showing form to add a new contact
        setShowAddContact:(state,action) => {
            // if more info page for a contact is opened already
            if(state.showContact){
                // removing the more info page from screen
                state.showContact = null;
            }
            // toggling the value of Add contact page
            state.showAddContact = !state.showAddContact;
        },
    },
    // extraReducers 
    extraReducers:(builder) => {
        // first case for storing the values inside contact list array from API
        builder.addCase(contactThunk.fulfilled,(state,action) => {
            // storing inside the array
            state.contactList = [...action.payload];
        })
        // adding a contact inside the contact list array
        .addCase(addContactThunk.fulfilled,(state,action) => {
            // pushing the new contact inside the contact list array
            state.contactList.push(action.payload);
            state.showAddContact=null;
        })
        // updating a contact inside the array
        .addCase(updateContactThunk.fulfilled,(state,action) => { 
            const data = action.payload;
            // making new array by filtering the old array
            const newList = state.contactList.filter((contact) => contact.id !== data.id);
            // storing new array inside the contact list
            state.contactList = newList;
            // appending the updated values inside the array
            state.contactList.push(data);
            state.showContact=null;
        })
        // deleting a contact inside the array
        .addCase(deleteContactThunk.fulfilled,(state,action) => {
            const data = action.payload;
            // making new array by filtering the old array
            const newList = state.contactList.filter((contact) => contact.id !== data.id);
            // storing the new array inside the contact list
            state.contactList = newList;
            state.showContact=null;
        })
    }
})



// exporting the contact reducer for the store
export const contactReducer = contactSlice.reducer;

// exporting all the actions
export const { setShowContact, setShowAddContact } = contactSlice.actions;

// exporting the initial state
export const contactSelector = (state) => state.contactReducer;
