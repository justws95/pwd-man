import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const OPTIONS = [
  'Capital Letters',
  'Lowercase Letters',
  'Numbers',
  'Special Characters'
];

const ModalMultiSelect = ({ updateParentComponentState }) => {
  const theme = useTheme();
  const [selectedOpts, setSelectedOpts] = useState([]);
  const [pristine, setPristine] = useState(true);

  useEffect(() => {
    updateParentComponentState(selectedOpts);
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOpts(
      typeof value === 'string' ? value.split(',') : value,
    );

    updateParentComponentState(selectedOpts);

    if (pristine) {
      setPristine(false);
    }
  };

  const getStyles = (opt, selectedOpts, theme) => {
    return {
      fontWeight:
        selectedOpts.indexOf(opt) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <React.Fragment>
      <FormControl sx={{ m: 1, width: '80%' }}>
        <InputLabel id="pwd-gen-options-label">Options</InputLabel>
        <Select
          required
          labelId="pwd-gen-options-label"
          id="pwd-gen-options"
          multiple
          value={selectedOpts}
          onChange={handleChange}
          input={<OutlinedInput label="Options" />}
          MenuProps={MenuProps}
          error={!pristine && selectedOpts.length === 0}
        >
          {OPTIONS.map((opt) => (
            <MenuItem
              key={opt}
              value={opt}
              style={getStyles(opt, selectedOpts, theme)}
            >
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}

export default ModalMultiSelect;
