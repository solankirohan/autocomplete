import React from 'react';
import AutoComplete from './Autocomplete';

function App() {


  const onSelectItem = (item) => {
    console.log("Selected Item: ", item);
  }

  return (
    <AutoComplete onSelectItem={onSelectItem} />

  );
}

export default App;
