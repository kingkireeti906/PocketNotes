import React, { useState } from 'react';
import Styles from './popup.module.css';
import { useRef } from 'react';
import { useEffect } from 'react';

function Popup({ onResultSelection,  setGroupNames ,onClose}) {
  const [inputText, setInputText] = useState('');
  const [selectedContainers, setSelectedContainers] = useState([]);
  const popUpRef = useRef(null);

  const containers = [
    { id: 1, color: '#B38BFA' },
    { id: 2, color: '#FF79F2' },
    { id: 3, color: '#43E6FC' },
    { id: 4, color: '#F19576' },
    { id: 5, color: '#0047FF' },
    { id: 6, color: '#6691FF' },
  ];
 
  const create = () => {
    // Use the inputText directly without formatting
    const groupName = inputText;
  
    // Check if both groupName and color are truthy
    if (groupName && selectedContainers.length > 0 && selectedContainers[selectedContainers.length - 1]?.color) {
      // Update the group names array
      setGroupNames((prevGroupNames) => [...prevGroupNames, groupName]);
  
      // Update the selectedContainers state
      setSelectedContainers((prevContainers) => [
        ...prevContainers,
        { groupName, color: selectedContainers[selectedContainers.length - 1]?.color },
      ]);
  
      // Trigger the onResultSelection callback
      onResultSelection({ groupName, color: selectedContainers[selectedContainers.length - 1]?.color });
    } else {
      // Handle the case where groupName or color is not truthy (optional)
      console.log('Group name or color is not valid. Cannot create.');
    }
  };
  
  const handleClickOutside = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        onClose();
    }
};
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [onClose]);

  return (
    <div className={Styles.popup }>
      <div className={Styles.popup_container}ref={popUpRef}>
        <div className={Styles.texted}> Create New group</div>
        <div className={Styles.text1}> Group Name</div>
        <div>
          <form className={Styles.forms}>
            <input
              type="text"
              name="name"
              placeholder="Enter group name"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                borderRadius: '22px',
                border: '2px solid #CCC',
                background: '#FFF',
                width: '58%',
                height: '51px',
              }}
            />
          </form>
        </div>
        <div className={Styles.color}>Choose colour</div>
        <div className={Styles.order}>
          {containers.map((container) => (
            <div key={container.id} className={Styles.color1}>
              <div
                style={{ backgroundColor: container.color, width: '4.5vh', height: '50px', borderRadius: '100%' }}
                onClick={() => setSelectedContainers((prevContainers) => [...prevContainers, { color: container.color }])}
              ></div>
            </div>
          ))}

          <div>
            <button className={Styles.create} onClick={create}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;

