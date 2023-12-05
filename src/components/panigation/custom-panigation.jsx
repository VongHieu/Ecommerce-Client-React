import { Pagination, Stack } from '@mui/material';

export default function CustomPanigation({ count, page, defaultValue, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="primary"
        page={page}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Stack>
  );
}
