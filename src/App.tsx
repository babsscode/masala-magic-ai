import Home from '@/scenes/home';
// app.js
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/**const firebaseConfig = {
  apiKey: "AIzaSyD7nNWOeyQERqWfHFiMUTZp-27tW5sikqc",
  authDomain: "foody-ai.firebaseapp.com",
  projectId: "foody-ai",
  storageBucket: "foody-ai.appspot.com",
  messagingSenderId: "1026638607928",
  appId: "1:1026638607928:web:ae7e7c85b87c4d5dfad8cd",
  measurementId: "G-C02LKJ67YW"
}; */

//CHANGED
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb2SkwulpkMPgV7htwEvdUXNCb6D9zN7c",
  authDomain: "masalamagicai.firebaseapp.com",
  projectId: "masalamagicai",
  storageBucket: "masalamagicai.firebasestorage.app",
  messagingSenderId: "342497033993",
  appId: "1:342497033993:web:ee37712e018b734b6c1dd8",
  measurementId: "G-Q1S60SQDWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Log a custom event
logEvent(analytics, 'page_view', {
  pageName: 'homepage'
});

function App() {
  /*const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
    
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  */
  return (
    <div className="app">
      <Home />
    </div>
  );
}

export default App;
