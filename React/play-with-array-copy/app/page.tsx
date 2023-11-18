'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [sourceArrayOfNumbers, setSourceArrayOfNumbers] = useState([1, 2, 3, 4, 5]);
  const [sourceArrayOfObjects, setSourceArrayOfObjects] = useState([
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
    { id: 3, name: 'test3' },
    { id: 4, name: 'test4' },
    { id: 5, name: 'test5' }
  ]);

  const [destinationArrayOfNumbers, setDestinationArrayOfNumbers] = useState<number[]>([]);
  const [destinationArrayOfObjects, setDestinationArrayOfObjects] = useState <{ id: number, name: string }[]>([]);

  function resetDefaultValues() {
    setSourceArrayOfNumbers([1, 2, 3, 4, 5]);
    setSourceArrayOfObjects([
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test3' },
      { id: 4, name: 'test4' },
      { id: 5, name: 'test5' }
    ]);
    setDestinationArrayOfNumbers([]);
    setDestinationArrayOfObjects([]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className='title'>Sample of array copy with or without deep linking</h1>
      <br/>
      {/* Display the source and destination arrays in two divs aligned horizontally */}
      <div className="flex">
        <div className="flex flex-col gapped">
          <h2><b>Source Array</b></h2>
          {sourceArrayOfNumbers.map((item) => (
            <div key={`source_${item}`}>{item}</div>
          ))}
        </div>
        <div className='spacer-column'></div>
        <div className="flex flex-col gapped">
          <h2><b>Destination Array</b></h2>
          {destinationArrayOfNumbers.map((item) => (
            <div key={`target_${item}`}>{item}</div>
          ))}
        </div>
      </div>
      <div className='spacer-row'></div>
      <div className="flex">
        <div className="flex flex-col">
          <h2><b>Source Array</b></h2>
          {sourceArrayOfObjects.map((item) => (
            <div key={`source_${item.id}`}>{item.name}</div>
          ))}
        </div>
        <div className='spacer-column'></div>
        <div className="flex flex-col">
          <h2><b>Destination Array</b></h2>
          {destinationArrayOfObjects.map((item) => (
            <div key={`target_${item.id}`}>{item.name}</div>
          ))}
        </div>
      </div>
      <br />
      <div>
        Press one of the buttons below to copy the source array to the destination array and updating one of the destination array items using the spread operator or without deep linking using JSON stringify and parse. <br/>
        When copying the numbers array, the spread operator works fine. <br/>
        When copying the objects array, the spread operator keeps a deep linking to the original object because it's an object array. <br/>
      </div>
      <div>
        {/* Buttons to copy the source array to the destination array with or without reference */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            // Copy the numbers array without reference
            const tempArrayOfNumbers = [...sourceArrayOfNumbers];
            tempArrayOfNumbers[2] = 100;
            setDestinationArrayOfNumbers(tempArrayOfNumbers);
            // Copy the objects array "without" reference
            const tempArrayOfObjects = [...sourceArrayOfObjects];
            tempArrayOfObjects[2].name = `${tempArrayOfObjects[2].name} - changed!`; // This will update also the source array
            setDestinationArrayOfObjects(tempArrayOfObjects);
            console.log('Copied with spread operator');
          }}>Copy with spread operator</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            // Copy the numbers array without reference
            const tempArrayOfNumbers = JSON.parse(JSON.stringify(sourceArrayOfNumbers));
            tempArrayOfNumbers[3] = 42;
            setDestinationArrayOfNumbers(tempArrayOfNumbers);
            // Copy the objects array without reference
            const tempArrayOfObjects = JSON.parse(JSON.stringify(sourceArrayOfObjects));
            tempArrayOfObjects[3].name = `${tempArrayOfObjects[3].name} - changed!`; // This will not update the source array
            setDestinationArrayOfObjects(tempArrayOfObjects);
            console.log('Copied without deep linking');
          }}>Copy without deep linking</button>
      </div>
      <br/>
      <div>
        Press the button below to reset to the default values.
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            resetDefaultValues();
            console.log('Reset default values');
          }}>Reset default values</button>
        
      </div>
    </main>
  )
}