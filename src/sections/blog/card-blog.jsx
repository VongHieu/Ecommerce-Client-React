import { Box, Card, Stack, Typography } from '@mui/material';
import Label from 'src/components/label';
import { customShadows } from 'src/theme/custom-shadows';
import { common, grey, primary } from 'src/theme/palette';
import { BACKEND_URL } from 'src/utils/axios-instance';
import { fDate } from 'src/utils/format-time';

export default function CardBlog({ news }) {
  const shadow = customShadows();
  const renderTag = (
    <Label
      color={common.white}
      sx={{
        fontSize: '11px',
        pl: 1.5,
        pr: 1.5,
        width: 70,
        backgroundColor: primary.red,
        borderRadius: 22,
      }}
    >
      MEATDELI
    </Label>
  );

  const handleSelectBlog = () => {
    alert(news.alias);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        height: 370,
        backgroundColor: common.white,
        boxShadow: shadow.cards,
        cursor: 'pointer',
      }}
      onClick={handleSelectBlog}
    >
      <Stack
        p={news.image ? 0 : 2}
        height={200}
        width={1}
      >
        <img
          src={`${BACKEND_URL}images/news${news.image}`}
          width="100%"
          height={200}
          alt={news.name}
        />
      </Stack>
      <Stack
        p={2}
        direction="column"
        flex={1}
      >
        {renderTag}
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          gap={0.5}
          mt={1}
          height={'auto'}
          flex={2}
        >
          <Stack>
            <Typography
              variant="normal"
              fontSize={15}
              fontWeight={700}
            >
              {news.name}
            </Typography>
            <Stack>
              <Typography
                variant="normal"
                fontSize={13}
                color={grey[700]}
                noWrap
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {news.description}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            variant="normal"
            fontSize={12}
            textAlign={'right'}
          >
            {fDate(news.created_at)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
