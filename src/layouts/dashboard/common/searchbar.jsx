import { useState } from 'react';

import { TextField, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

// import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [textSearch, setTextSearch] = useState('');
  // const lgUp = useResponsive('up', 'lg');
  return (
    <div style={{ width: '400px' }}>
      <TextField
        name="phone_number"
        placeholder="Tìm kiếm sản phẩm..."
        fullWidth
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start">
                <Iconify icon="eva:search-fill" />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderRadius: '22px',
            marginLeft: '15px',
            fontSize: '13px',
            color: '#333333',
            lineHeight: 1.5,
            height: '39px',
            borderColor: 'transparent',
            appearance: 'none',
            wordSpacing: '-1px',
            border: 'none',
            '&:hover': {
              border: 'none',
              borderColor: 'transparent',
            },
          },
        }}
      />
    </div>
  );
}
