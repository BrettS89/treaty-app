import { Button, Checkbox,  FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select,TextField, Typography } from '@material-ui/core';
import { Deal } from '../../../../types/services/insurance';
import useStyles from './styles';
import Detail from './components/Detail';
import { formatDollarAmount } from '../../../../utilities/helpers';

interface DealViewProps {
  addDetail(arg: any): void;
  deal: Deal;
  detailsList: JSX.Element[];
  editing: string;
  editingDetail: string;
  onCancel(): void;
  onSaveField(str?: string): void;
  setDetailsList(el: JSX.Element[]): void;
  setEditedValue(inpt: string | number): void;
  setEditing(str: string): void; 
  setEditingDetail(str: string): void
}

const View = (props: DealViewProps) => {
  const { addDetail, deal, detailsList, editing, editingDetail, onCancel, onSaveField, setDetailsList, setEditedValue, setEditing, setEditingDetail } = props;
  const classes = useStyles();

  const renderTitle = (): JSX.Element => {
    if (editing !== 'title') {
      return (
        <div className="Deal-row Deal-title">
          <Typography variant="h4" className="title">
            {deal.title}
          </Typography>
          <Button
            className={classes.leftMargin}
            color="primary"
            onClick={() => setEditing('title')}
          >
            Edit
          </Button>
        </div>
      );
    }
    return (
      <div className="Deal-row Deal-title">
        <TextField
          className={classes.titleInput}
          variant="outlined"
          label="Title"
          autoComplete="off"
          onChange={e => setEditedValue(e.target.value)}
        />
        <Button
          className={classes.leftMargin}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => onSaveField()}
        >
          Save
        </Button>
      </div>
    )
  };

  const renderDetails = (): JSX.Element[] => 
    deal.details.map((detail) => (
      <Detail
        detail={detail}
        editingDetail={editingDetail}
        onSaveField={onSaveField}
        setEditingDetail={setEditingDetail}  
        setEditedValue={setEditedValue}
      />
    ));

  const renderTreatyType = () => {
    return (
      <FormControl component="fieldset">
        <FormHelperText>Select all that apply</FormHelperText>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox className={classes.checkbox} checked={false} onChange={console.log} name="gilad" />}
            label="Admitted"
          />
          <FormControlLabel
            control={<Checkbox className={classes.checkbox} checked={false} onChange={console.log} name="jason" />}
            label="Non admitted"
          />
          <FormControlLabel
            control={<Checkbox className={classes.checkbox} checked={false} onChange={console.log} name="antoine" />}
            label="Risk attaching"
          />
          <FormControlLabel
            control={<Checkbox className={classes.checkbox} checked={false} onChange={console.log} name="antoine" />}
            label="Losses ocurring durring"
          />
        </FormGroup>
      </FormControl>
    )
  }

  const renderAdditionalDetails = () => {
    return (
      <div className="Deal-summary">
        <div className="Deal-summary-title">
          <Typography variant="h6" className="title">
            Additional details
          </Typography>
          <Button
            className={classes.leftMargin}
            color="primary"
            onClick={() => setEditing('additional_details')}
          >
            Edit
          </Button>
        
        </div>
        <Typography style={{ flexWrap: 'wrap' }}>
          Include any additional details, bells and whistels, etc. here.
        </Typography>
      </div>
    );
  };

  const renderExecutiveSummary = () => {
    if (editing === 'executive_summary') {
      return (
        <div className="Deal-summary">
          <div className="Deal-summary-title">
            <Typography variant="h6" className="title">
              Executive Summary
            </Typography>
            <Button
              className={classes.leftMargin}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => onSaveField()}
            >
              Save
            </Button>
          </div>
          <TextField
            id="outlined-multiline-static"
            label="Executive summary"
            multiline
            style={{ width: '100%', marginTop: 10 }}
            rows={4}
            defaultValue={deal.executive_summary}
            variant="outlined"
            onChange={e => setEditedValue(e.target.value)}
          />
        </div>
      )
    }
    return (
      <div className="Deal-summary">
        <div className="Deal-summary-title">
          <Typography variant="h6" className="title">
            Executive Summary
          </Typography>
          <Button
            className={classes.leftMargin}
            color="primary"
            onClick={() => setEditing('executive_summary')}
          >
            Edit
          </Button>
        </div>
        <Typography style={{ flexWrap: 'wrap' }}>
          {deal.executive_summary}
        </Typography>
      </div>
    );
  };

  return (
    <div className="Deal">
      {renderTitle()}

      <div>
        <Typography variant="h6" className="title">
          Treaty type
        </Typography>

        {renderTreatyType()}
      </div>

      <div className="Deal-details title">
        <Typography variant="h6" className={classes.detailsSectionTitle}>
          Treaty details
        </Typography>

        <div>
          <FormControl className={classes.dropdown} variant="outlined" size="small">
            <InputLabel id="demo-simple-select-label">Add details</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={addDetail}
              label="Add details"
            >
              <MenuItem value="projected_gross_premium">Projected gross premium</MenuItem>
              <MenuItem value="projected_gross_premium">Projected net premium</MenuItem>
              <MenuItem value="projected_loss_ratio">Projected loss ratio</MenuItem>
              <MenuItem value="term">Term</MenuItem>
              <MenuItem value="business_covered">Business covered</MenuItem>
              <MenuItem value="limit">Limit</MenuItem>
              <MenuItem value="cede">Cede</MenuItem>
              <MenuItem value="mga">MGA</MenuItem>
            </Select>
          </FormControl>
        </div>
          
        {renderDetails()}
      </div>

      {renderAdditionalDetails()}
      {renderExecutiveSummary()}
    </div>
  );
};

export default View;
