import React, { useState } from 'react'
import { SelectionArea, InputArea } from './index';

function AdminPanel() {
  const [radioInput, setRadioInput] = useState(null);

  return (
    <div className='w-full min-h-screen flex items-center p-8 gap-4'>
        <SelectionArea radioInput={radioInput}/>
        <span>-</span>
        <InputArea
          radioInput={radioInput}
          setRadioInput={setRadioInput}/>
    </div>
  )
}

export default AdminPanel