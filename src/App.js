import LibraryManagementTextOverlay from './components/LibraryManagementTextOverlay';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import About from './components/About';
import BookType from'./components/booktypes'
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LibraryManagementTextOverlay/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/booktype" element={<BookType/>}/>
        <Route path="/footer" element={<Footer/>}/>
      </Routes>
    </Router>
  );
}

export default App
