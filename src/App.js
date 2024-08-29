import LibraryManagementTextOverlay from './components/LibraryManagementTextOverlay';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LibraryManagementTextOverlay/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App
