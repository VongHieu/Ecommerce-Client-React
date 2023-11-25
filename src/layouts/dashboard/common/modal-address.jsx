import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  styled as MUIStyled,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import { cityService } from 'src/services/city-service';
import { grey, primary } from 'src/theme/palette';
import { storage } from 'src/utils/storage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  pt: 2,
  pb: 3,
  width: '45%',
};

export default function ModalAddress({ open, handleClose }) {
  const [valueCityConfig, setValueCityConfig] = useState(null);
  const [valueDistrictConfig, setValueDistrictConfig] = useState(null);
  const [valueWardConfig, setValueWardConfig] = useState(null);

  const [dataCity, setDatacity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);

  useEffect(() => {
    const dataFilter = storage.getCache('userAddress');
    if (dataFilter) {
      const dataCityFilter = {
        description: dataFilter.provinceTitle,
        code: dataFilter.provinceCode,
      };

      const dataDistrictFilter = {
        description: dataFilter.districtTitle,
        code: dataFilter.districtCode,
      };

      const dataWardFilter = {
        description: dataFilter.wardTitle,
        code: dataFilter.wardCode,
      };
      setValueCityConfig(dataCityFilter);
      setValueDistrictConfig(dataDistrictFilter);
      setValueWardConfig(dataWardFilter);
    }
  }, []);

  const handleOpenCityConfig = async () => {
    const data = await cityService.getAllProvinces();
    setDatacity(data.data);
  };

  const handleOpenDistrictConfig = async () => {
    const param = {
      code: valueCityConfig?.code,
    };
    const response = await cityService.getAllDistricts(param);
    setDataDistrict(response.data);
  };

  const handleOpenWardConfig = async () => {
    const param = {
      provinceCode: valueCityConfig?.code,
      districtCode: valueDistrictConfig?.code,
    };
    const resp = await cityService.getAllWards(param);
    setDataWard(resp.data);
  };

  const handleOnChangecityConfig = (event, valueSelected) => {
    setValueDistrictConfig(null);
    setValueWardConfig(null);
    const selectedOption = dataCity.find((item) => item.description === valueSelected);
    setValueCityConfig(selectedOption || null);
  };

  const handleOnchangeDistrictConfig = (event, valueSelected) => {
    setValueWardConfig(null);
    const selectedOption = dataDistrict.find((item) => item.description === valueSelected);
    setValueDistrictConfig(selectedOption || null);
  };

  const handleOnchangeWardConfig = (event, valueSelected) => {
    const selectedOption = dataWard.find((item) => item.description === valueSelected);
    setValueWardConfig(selectedOption || null);
  };

  const handleSubmitAddress = () => {
    const data = {
      address: `${valueWardConfig.description}, ${valueDistrictConfig.description}, ${valueCityConfig.description}`,
      customerName: 'Hieu',
      districtCode: valueDistrictConfig.code,
      districtTitle: valueDistrictConfig.description,
      provinceCode: valueCityConfig.code,
      provinceTitle: valueCityConfig.description,
      wardCode: valueWardConfig.code,
      wardTitle: valueWardConfig.description,
    };

    storage.setCache('userAddress', data);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 4, right: 4 }}>
          <Iconify icon="iconamoon:close" width={24} height={24} />
        </IconButton>
        <Stack borderBottom={`1px solid ${grey[400]}`} px={3} py={1}>
          <Typography id="modal-modal-title" variant="normal" fontSize={17} component="h2">
            Địa chỉ giao hàng
          </Typography>
        </Stack>

        <Stack px={3} py={1}>
          <Typography id="modal-modal-title" variant="normal" fontSize={13} component="h2">
            Quý khách vui lòng chọn khu vực giao hàng dự kiến
          </Typography>
          <Box pt={2} display="flex" flexDirection="column" gap={2}>
            <Stack px={1} direction="row" alignItems="center" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="normal" fontSize={13}>
                Tỉnh/Thành phố
              </Typography>
              <Autocomplete
                disablePortal
                id="combox-city"
                value={valueCityConfig?.description || null}
                onChange={handleOnChangecityConfig}
                onOpen={handleOpenCityConfig}
                options={dataCity.map((item) => item.description)}
                sx={{
                  width: 400,
                }}
                classes={{ listbox: 'custom-listbox' }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Tỉnh thành"
                    {...params}
                    inputProps={{
                      style: { fontSize: 13 },
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Stack>
            <Stack px={1} direction="row" alignItems="center" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="normal" fontSize={13}>
                Quận/Huyện
              </Typography>
              <Autocomplete
                disablePortal
                value={valueDistrictConfig?.description || null}
                id="combox-district"
                onChange={handleOnchangeDistrictConfig}
                options={dataDistrict.map((item) => item.description)}
                onOpen={handleOpenDistrictConfig}
                disabled={valueCityConfig === null}
                sx={{
                  width: 400,
                }}
                classes={{ listbox: 'custom-listbox' }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Quận huyện"
                    {...params}
                    inputProps={{
                      style: { fontSize: 13 },
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Stack>
            <Stack px={1} direction="row" alignItems="center" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="normal" fontSize={13}>
                Phường/Xã
              </Typography>
              <Autocomplete
                disablePortal
                value={valueWardConfig?.description || null}
                onOpen={handleOpenWardConfig}
                onChange={handleOnchangeWardConfig}
                id="combox-ward"
                options={dataWard.map((item) => item.description)}
                disabled={valueDistrictConfig === null}
                sx={{
                  width: 400,
                }}
                classes={{ listbox: 'custom-listbox' }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Phường xã"
                    {...params}
                    inputProps={{
                      style: { fontSize: 13 },
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Stack>
          </Box>
          <Stack px={1} direction="row" justifyContent="flex-end" pt={2}>
            <StyledButton
              disabled={!valueCityConfig || !valueDistrictConfig || !valueWardConfig}
              onClick={handleSubmitAddress}
            >
              Xác nhận địa chỉ
            </StyledButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

ModalAddress.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const StyledButton = MUIStyled(Button)(({ theme, padding, disabled }) => ({
  backgroundColor: `${disabled ? primary.colorPrice : primary.red}`,
  display: 'flex',
  gap: 6,
  width: 150,
  float: 'left',
  alignItems: 'center',
  color: theme.palette.background.paper,
  borderRadius: 2,
  padding: `${padding}`,
  '&:hover': {
    backgroundColor: primary.red,
  },
}));
