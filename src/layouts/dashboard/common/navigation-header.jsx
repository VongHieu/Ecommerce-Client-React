import { Box, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActionThunk } from 'src/redux/actions/category-action';
import { RouterLink } from 'src/routes/components';
import { primary } from 'src/theme/palette';

const StyleButton = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  borderRadius: 0,
  outline: 'none',
  boxShadow: 'none',
  padding: '8px 16px',
  ':hover': {
    backgroundColor: primary.hover,
  },
};

export default function NavigationHeader() {
  const dispatch = useDispatch();
  const { categories } = useSelector((x) => x.rootReducer.categories);

  useEffect(() => {
    dispatch(categoryActionThunk.getAllCategories());
  }, [dispatch]);

  const renderMenu = (
    <Box height="100%" width="100%">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        width="1200px"
        margin="0 auto"
      >
        {categories.map((element, index) => (
          <Button key={index} component={RouterLink} href={element.alias} sx={StyleButton}>
            {element.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
  return <div style={{ backgroundColor: primary.red, width: '100%' }}>{renderMenu}</div>;
}
