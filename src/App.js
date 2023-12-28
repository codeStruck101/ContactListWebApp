// importing the Navbar component
import NavBar from "./Components/NavBar";

// importing contactList component containing the main container
import ContactList from "./Components/ContactList";


function App() {
  return (
    <div className="h-screen flex flex-col w-full">
      {/* rendering the Navbar */}
      <NavBar />
      {/* rendering the ContactList */}
      <ContactList />
    </div>
  );
}

export default App;
