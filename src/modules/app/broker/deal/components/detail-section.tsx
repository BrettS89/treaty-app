import '../styles.css';
import { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import useStyles from '../styles';
import optionsConfig from '../options.config.json';
import { Deal } from '../../../../../types/services/insurance';
import Detail from './Detail';

interface TreatyInformationProps {
  addDetail(arg: any): void;
  deal: Deal;
  editingDetail: string;
  menuOptions: { value: string; name: string }[];
  onSaveField(str?: string): void;
  section: string;
  setEditedValue(inpt: string | number): void;
  setEditingDetail(str: string): void;
  title: string;
}

const DetailSection: FC<TreatyInformationProps> = ({ addDetail, deal, menuOptions, editingDetail, section, onSaveField, setEditingDetail, setEditedValue, title }) => {
  const classes = useStyles();

  const createTable = () =>
    [
      ...optionsConfig[section].general,
      ...optionsConfig[section].xol,
      ...optionsConfig[section].surplus,
      ...optionsConfig[section].quotaShare,
      ...optionsConfig[section].programBusiness,
    ].reduce((acc, curr) => {
      return { ...acc, [curr.value]: true };
    }, {});

  const renderDetails = (): JSX.Element[] => 
    deal.details
    .filter(d => createTable()[d.key])
    .map((detail) => (
      <Detail
        detail={detail}
        editingDetail={editingDetail}
        onSaveField={onSaveField}
        setEditingDetail={setEditingDetail}  
        setEditedValue={setEditedValue}
      />
    ));

  return (
    <div className="Deal-details title">
      <Typography variant="h6" className={classes.detailsSectionTitle}>
        {title}
      </Typography>

      <div>
        <FormControl className={classes.dropdown} variant="outlined" size="small">
          <InputLabel id="demo-simple-select-label">Add details</InputLabel>
          <Select
            label="Add details"
            onChange={addDetail}
          >
            {menuOptions.map(m => <MenuItem value={m.value}>{m.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
        
      {renderDetails()}
    </div>
  );
};

export default DetailSection;
