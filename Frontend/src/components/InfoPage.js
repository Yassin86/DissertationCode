import React from 'react';

const InfoPage = () => {
    return (
      <div>
        <p style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}><strong><span style={{fontSize: '22px', lineHeight: '107%'}}>Welcome to the Turing Machine Simulator!</span></strong></p>
        <p style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}><span style={{fontSize: '18px', lineHeight: '107%'}}>You will see machines listed at the top of the page – please click on a machine to begin. If there is nothing there, you can define your own machine by clicking ‘New’.&nbsp;</span></p>
        <p style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}><strong><span style={{fontSize: '18px', lineHeight: '107%'}}>Adding a machine:&nbsp;</span></strong><span style={{fontSize: '18px', lineHeight: '107%'}}>once you click ‘New’, you will be prompted with text fields to enter your Turing machine configuration. The ‘Name’ of the machine will be what gets displayed at the top of the page. The ‘Alphabet’, ‘States’ and ‘Halting’ sections should be strings delimited by a comma ‘,’. The first state you define in your list of states will be the starting state by default. The format of the transition function is -&gt; state : letter ; state : {'{'}letter,direction{'}'}. The letters can include either the space character ‘ ‘ or any other character defined in the alphabet. A wildcard letter in the form of ‘*’ can be used to represent any of the letters defined in the alphabet. The direction is given by either ‘&lt;’ for left, or ‘&gt;’ for right. You can check the configurations of the example machines by clicking 'Edit' when a machine is selected to help you with configuring a new machine.&nbsp;</span></p>
        <p style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}><span style={{fontSize: '18px', lineHeight: '107%'}}>Once you have clicked on a machine, you will see a finite state machine diagram which represents that machine. You can zoom in and zoom out to resize the diagram and also drag any of the nodes. You will also be prompted to input a string onto the tape. Make sure your string is made up of the alphabet defined in the configuration. Press ‘Edit’ to check the configuration of your machine. Upon loading the string, a Turing machine tape will appear with a log below indicating where you are in the computation cycle. You can press play to move through the tape at your desired speed which can be chosen on the slider. Alternatively, use the arrows below the tape to move through the computations step by step. As you move through the tape, the log will show all the previous states of the tape. This is clickable and you may go back to any of these intermediate configurations.&nbsp;</span></p>
        <p style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}><span style={{fontSize: '18px', lineHeight: '107%'}}>Press ‘Hide’ to close this tutorial and enjoy the simulator! You can return to this at any time by pressing ‘Info’.</span></p>
      </div>
    )
  };

export default InfoPage;