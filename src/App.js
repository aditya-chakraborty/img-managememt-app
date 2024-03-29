import { useState } from 'react';
import Media from './components/UI/Media';
import Header from './components/Layout/Header';
import ActionBar from './components/Layout/ActionBar'
import AddImageWindow from './components/Image/AddImageWindow';

function App() {
  const [showAddImageWindow, setShowAddImageWindow] = useState(false);
  
  const showAddImageHandler = () => {
    setShowAddImageWindow(true);
  }

  const hideAddImageHandler = () => {
    setShowAddImageWindow(false);
  }

  return (
    <section>
      <Header showAddImage={showAddImageHandler}/>
      <ActionBar />
      <Media/>
      {showAddImageWindow && <AddImageWindow onClose={hideAddImageHandler}/>} 
    </section>
  );
}

export default App;
