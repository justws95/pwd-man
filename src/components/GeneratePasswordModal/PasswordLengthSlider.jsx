import React, { useState, useEffect } from 'react';

import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 64,
    label: '64',
  },
];

const PasswordLengthSlider = ({ updateParentComponentState }) => {
  const DEFAULT_RANGE = [18, 36];
  const [range, setRange] = useState(DEFAULT_RANGE);

  useEffect(() => {  
    updateParentComponentState(range);
  });

  const handleChange = (event) => {
    setRange(event.target.value);
    updateParentComponentState(range);
  }

  return (
    <React.Fragment>
      <Slider
        disableSwap
        defaultValue={DEFAULT_RANGE}
        valueLabelDisplay="auto"
        marks={marks}
        min={1}
        max={64}
        onChange={handleChange}
      />
    </React.Fragment>
  );
}

export default PasswordLengthSlider;
