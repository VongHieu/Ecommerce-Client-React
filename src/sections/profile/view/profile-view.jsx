/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Stack,
  Typography,
  styled as MUIStyled,
  ListItemButton,
  List,
  TextField,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  createTheme,
  ThemeProvider,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { primary } from 'src/theme/palette';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fGetDateOnly } from 'src/utils/format-time';
import { UserActionThunk } from 'src/redux/actions/user-action';
import { Toastify } from 'src/utils/format-toast';

const fontSize = {
  fontSize: 13,
};

const MENU_OPTIONS = [
  {
    id: 1,
    label: 'Tài khoản',
    icon: 'mingcute:user-4-line',
    url: 'profile',
  },
  {
    id: 2,
    label: 'Quản lý đơn hàng',
    icon: 'quill:paper',
    url: 'orders',
  },
  {
    id: 3,
    label: 'Lịch sử giao dịch',
    icon: 'tdesign:undertake-transaction',
    url: 'transaction-history',
  },
];

const genderDefaultValue = [
  { label: 'Nam', value: false, width: 20 },
  { label: 'Nữ', value: true, width: 20 },
];

const theme = createTheme({
  palette: {
    primary: {
      main: primary.hover,
    },
  },
});

const defaultValues = {
  full_name: '',
  address: '',
  dob: new Date(),
  gender: false,
  email: '',
  phone_number: '',
  avatar: null,
};

const schema = yup
  .object()
  .shape({
    full_name: yup.string().required('Thông tin bắt buộc'),
    phone_number: yup.string().required('Thông tin bắt buộc'),
    dob: yup.date(),
    gender: yup.boolean(),
    email: yup.string().required('Thông tin bắt buộc').email('Email không đúng định dạng'),
  })
  .required();

export default function ProfileView() {
  const { alias } = useParams();
  const [selected, setSelected] = useState(alias);
  const { user, loading, message, success, refresh } = useSelector((x) => x.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickItem = (item) => {
    setSelected(item.url);
    router.push(`/customer/${item.url}`);
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      const val = {
        ...defaultValues,
        ...user,
        dob: user.dob || new Date(),
        address: user.address || '',
      };
      reset(val);
    }
  }, [user.id]);

  const submitFormUpdate = () => {
    const data = getValues();
    const formData = new FormData();
    const param = {
      full_name: data.full_name,
      address: data.address,
      dob: fGetDateOnly(data.dob),
      gender: data.gender,
      email: data.email,
      avatar: data.avatar,
    };

    for (const key in param) {
      formData.append(key, param[key]);
    }

    dispatch(UserActionThunk.updateUser(param));
  };

  useEffect(() => {
    if (!loading && message !== null) {
      Toastify(message, success);
    }
    if (refresh) {
      const param = {
        id: getValues('id'),
      };
      dispatch(UserActionThunk.getInfoUser(param));
      dispatch(UserActionThunk.cleanMessage());
    }
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ maxWidth: '1200px', position: 'relative', p: '0 !important', height: 1 }}>
        <Stack direction="row" height={1} width={1} mb={4}>
          <Box width="25%">
            <List>
              {MENU_OPTIONS.map((option) => (
                <StyledListItemButton
                  key={option.id}
                  onClick={() => handleClickItem(option)}
                  selected={selected === option.url}
                >
                  <Iconify icon={option.icon} />
                  <Typography variant="normal" fontSize={13}>
                    {option.label}
                  </Typography>
                </StyledListItemButton>
              ))}
            </List>
          </Box>
          <Box width="75%" px={3}>
            <Typography variant="h6" fontWeight={400}>
              Thông tin tài khoản
            </Typography>
            <form id="form" onSubmit={handleSubmit(submitFormUpdate)}>
              <Controller
                name="full_name"
                control={control}
                render={({ field }) => (
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    width="100%"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="normal" fontSize={13} width="25%">
                      Họ tên <sup style={{ color: primary.red }}>*</sup>
                    </Typography>
                    <TextField
                      {...field}
                      variant="outlined"
                      size="medium"
                      placeholder="Nhập họ tên đầy đủ"
                      required
                      sx={{ width: '75%' }}
                      error={!!errors.full_name}
                      helperText={errors.full_name?.message}
                      inputProps={{ style: fontSize }}
                    />
                  </Stack>
                )}
              />
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    width="100%"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="normal" fontSize={13} width="25%">
                      Số điện thoại <sup style={{ color: primary.red }}>*</sup>
                    </Typography>
                    <TextField
                      {...field}
                      variant="outlined"
                      size="medium"
                      placeholder="Số điện thoại"
                      error={!!errors.phone_number}
                      helperText={errors.phone_number?.message}
                      required
                      disabled
                      sx={{ width: '75%' }}
                      inputProps={{ style: fontSize }}
                    />
                  </Stack>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    width="100%"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="normal" fontSize={13} width="25%">
                      Email <sup style={{ color: primary.red }}>*</sup>
                    </Typography>
                    <TextField
                      {...field}
                      type="email"
                      variant="outlined"
                      size="medium"
                      placeholder="Email"
                      required
                      sx={{ width: '75%' }}
                      inputProps={{ style: fontSize }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Stack>
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    width="100%"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="normal" fontSize={13} width="25%">
                      Giới tính
                    </Typography>
                    <FormControl sx={{ width: '75%' }}>
                      <RadioGroup
                        sx={{ display: 'flex', flexDirection: 'row' }}
                        value={watch('gender')}
                        onChange={(e) => setValue('gender', e.target.value === 'true')}
                      >
                        {genderDefaultValue.map((item) => (
                          <FormControlLabel
                            key={item.value}
                            value={item.value}
                            control={<Radio color="primary" />}
                            label={
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Typography variant="normal" fontWeight={400} fontSize={12}>
                                  {item.label}
                                </Typography>
                              </Stack>
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    width="100%"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="normal" fontSize={13} width="25%">
                      Ngày sinh
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DemoContainer components={['DatePicker']} sx={{ width: '75%' }}>
                        <DatePicker
                          sx={{ width: 100 }}
                          onChange={(date) => setValue('dob', date)}
                          value={watch('dob')}
                          name="dob"
                          slotProps={{ textField: { size: 'small' } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Stack>
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    width="100%"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="normal" fontSize={13} width="25%">
                      Địa chỉ
                    </Typography>
                    <TextField
                      {...field}
                      variant="outlined"
                      multiline
                      size="medium"
                      placeholder="Địa chỉ"
                      sx={{ width: '75%' }}
                      inputProps={{ style: fontSize }}
                    />
                  </Stack>
                )}
              />
              <StyledButton
                padding="6px 24px"
                type="submit"
                disabled={!isValid || isSubmitting || !isDirty}
              >
                Cập nhật
              </StyledButton>
            </form>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

const StyledListItemButton = MUIStyled(ListItemButton)(({ themes }) => ({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
  padding: 10,
  color: primary.colorPrice,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: primary.red,
    color: 'white',
    '&:hover': {
      backgroundColor: primary.red,
    },
  },
}));

const StyledButton = MUIStyled(Button)(({ themes, padding }) => ({
  backgroundColor: primary.red,
  display: 'flex',
  textTransform: 'none',
  gap: 6,
  float: 'right',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  borderRadius: 4,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));
