import React, { useState, useEffect } from 'react';
import Styles from './Homepage.module.css';
import Popup from '../popup/popup';
import Mainimage from '../../Images/image-removebg-preview 1.png';
import Lock from '../../Images/Vector (5).svg';
import Notepage from '../Notepage/Notepage';

function Homepage() {
  const [showPopup, setShowPopup] = useState(false);
  const [clickedGroup, setClickedGroup] = useState(null);
  const [click, setClicked] = useState(false);
  const [groupNames, setGroupNames] = useState([]);
  const [selectedContainers, setSelectedContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleContainerClick = (index) => {
    const clickedContainer = selectedContainers[index];
    setClickedGroup(clickedContainer);
    setClicked(true);
    console.log('Clicked Group Details:', clickedContainer);
  };

  const handleClose = (groupName, selectedColor) => {
    if (groupName && selectedColor) {
      const newGroup = {
        storedGroupName: groupName,
        storedSelectedColor: selectedColor,
        storedFormattedGroupName: formatGroupName(groupName),
      };

      const updatedContainers = [...selectedContainers, newGroup];
      setSelectedContainers(updatedContainers);

      localStorage.setItem('selectedContainers', JSON.stringify(updatedContainers));

      setClicked(true);
      setClickedGroup(newGroup);
    }

    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const storedGroupNames = localStorage.getItem('groupNames');
    const storedSelectedContainers = localStorage.getItem('selectedContainers');

    setGroupNames(storedGroupNames ? JSON.parse(storedGroupNames) : []);
    setSelectedContainers(storedSelectedContainers ? JSON.parse(storedSelectedContainers) : []);
    setLoading(false);
  }, []);

  const togglePopup = () => {
   
    setShowPopup(!showPopup);
    
  };

  const touched = () => {
    setClicked(true);
  };


  const formatGroupName = (groupName) => {
    const formattedText = groupName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
    return formattedText.length === 1 ? '\u00A0\u00A0' + formattedText : formattedText;
  };

  const handleResultSelection = (container) => {
    setSelectedContainers([...selectedContainers, container]);
    localStorage.setItem('selectedContainers', JSON.stringify([...selectedContainers, container]));
    togglePopup();
  };

  return (
    <div className={Styles.pageContainer}>
      <div className={Styles.leftcontainer} >
        <div className={Styles.pockets}> Pocket Notes</div>
        <div className={Styles.content}>
          {selectedContainers.map((container, index) => (
            <div
              key={index}
              style={{
                backgroundColor: container.color,
                width: '58px',
                height: '60px',
                borderRadius: '100%',
                display: 'flex',
                position: 'relative',
                margin: '20px',
                top: '10%',
                left: '9%',
                [Styles.adjustedLeft]: container.groupName.split(' ').length <= 2,
              }}
              onClick={() => handleContainerClick(index)}
            >
              {container.groupName && (
                <>
                  <div className={Styles.group_name} onClick={touched}>
                    {formatGroupName(container.groupName)}
                  </div>
                  <div className={Styles.group_named} onClick={touched}>
                    {container.groupName}
                  </div>
                </>
              )}
            </div>
          ))}
          <div className={Styles.Ellipsed} onClick={togglePopup}>
            <div className={Styles.add_button}> +</div>
          </div>
        </div>
      </div>

      <div className={Styles.rightcontainer} >
        <div className={Styles.right_image}>
          <img src={Mainimage} alt="right_image" />
        </div>
        <div className={Styles.rightside_text}>Pocket Notes</div>
        <div className={Styles.rightside_subtext}>
          Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </div>
        <div className={Styles.lock}>
          <img src={Lock} alt="lock_image" />
        </div>
        <div className={Styles.encrypt}>end-to-end encrypted</div>
      </div>

      {click && <Notepage selectedContainers={selectedContainers} clickedGroup={clickedGroup} />}
      {showPopup && <Popup onResultSelection={handleResultSelection} groupNames={groupNames} setGroupNames={setGroupNames} onClose={handleClose} />}
    </div>
  );
}

export default Homepage;