import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import { download, logoShirt } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation,slideAnimation } from '../config/motion'
import { AIPicker,CustomButton,ColorPicker,Tab,FilePicker,TextPicker } from '../components'

console.log('STATATATATATATTA : ',state);
const Customizer = () => {
  const snap = useSnapshot(state);
  const [activeEditorTab,setActiveEditorTab] = useState("");
  const [activeFilterTab,setActiveFilterTab] = useState({
    logoShirt : true,
    stylishShirt:false,
    textShirt: false
  });
  const [file,setFile] = useState("");
  const [prompt,setPrompt] = useState("");
  const [generatingImg,setGeneratingImg] = useState(false);
  const [text,setText] = useState("");

  const generateTabContent = ()=>{
    switch (activeEditorTab) {
      case "colorpicker" :
        return <ColorPicker/>
      case "aipicker" :
        return <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
        />
      case "filepicker" :
        return <FilePicker
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
      case "textpicker" :
        return <TextPicker
        text={text}
        setText={setText}
        handleSubmit={handleTextSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) {
      alert("Please enter a prompt!!");
      return; // Ensure function stops here
    }

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      console.log(data);

      if (data.photo) {
        handleDecals(type, `data:image/png;base64,${data.photo}`);
      } else {
        alert("Failed to generate image.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check console for details.");
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleTextSubmit = (type) => {
    console.log('handleTextSubmit called with type:', type, 'text:', text);

    if (!text.trim()) {
      alert("Please enter some text!!");
      return;
    }

    console.log('Creating text canvas...');

    // Create a canvas to render text as image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 400;
    canvas.height = 200;

    // Set font properties from state
    const { fontSize, fontFamily, fontWeight, textColor } = state.textProperties;
    console.log('Font properties:', { fontSize, fontFamily, fontWeight, textColor });

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add text shadow for realistic effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert canvas to data URL
    const textImageData = canvas.toDataURL('image/png');
    console.log('Text image data created, length:', textImageData.length);

    // Handle as decal
    handleDecals(type, textImageData);
    setActiveEditorTab("");
  };
  

  const handleActiveFiterTab=(tabName)=>{
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      case "textShirt":
          state.isTextTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        state.isTextTexture = false;
    }

    setActiveFilterTab((prevState)=>{
      return{
        ...prevState,
        [tabName] : !prevState[tabName]
      }
    })
  }

  const handleDecals = (type,result)=>{
    console.log('handleDecals called with type:', type, 'result length:', result?.length);
    const decalType = DecalTypes[type];
    console.log('decalType:', decalType);

    if (!decalType) {
      console.error('No decal type found for:', type);
      return;
    }

    state[decalType.stateProperty] = result;
    console.log('Set state property:', decalType.stateProperty, 'to result');

    if(!activeFilterTab[decalType.filterTab]){
      console.log('Activating filter tab:', decalType.filterTab);
      handleActiveFiterTab(decalType.filterTab);
    }
  }
  
  const readFile =(type)=>{
    reader(file)
      .then((result)=>{
        handleDecals(type,result);
        setActiveEditorTab("");
      })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='min-h-screen flex items-center'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab)=>(
                  <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={()=>setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute top-5 right-5 z-10' {...fadeAnimation}>
            <CustomButton
            type={'filled'}
            title={'Go Back'}
            handleClick={()=>{state.intro=true}}
            customStyles={'px-4 py-2.5 w-fit font-bold text-sm'}
            />
          </motion.div>
          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab)=>(
              <Tab
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={()=>{handleActiveFiterTab(tab.name)}}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer


