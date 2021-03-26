import { Button,  FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select,TextField, Typography } from '@material-ui/core';
import { Deal } from '../../../../types/services/insurance';
import useStyles from './styles';
import Detail from './components/Detail';
import TreatyDetails from './components/treaty-details';
import { select } from '@redux-saga/core/effects';

interface DealViewProps {
  addDetail(arg: any): void;
  deal: Deal;
  editing: string;
  editingDetail: string;
  menuOptions: { value: string; name: string }[];
  onCancel(): void;
  onSaveField(str?: string): void;
  setEditedValue(inpt: string | number): void;
  setEditing(str: string): void; 
  setEditingDetail(str: string): void
}

const View = (props: DealViewProps) => {
  const { addDetail, deal, editing, editingDetail, menuOptions, onCancel, onSaveField, setEditedValue, setEditing, setEditingDetail } = props;
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

  const renderCompanyName = () => {
    if (editing === 'insurance_company') {
      return (
        <div className="Deal-row Deal-title-less-margin">
          <div className="Deal-row">
            <Typography variant="h6" className="title">
              Insurance company:
            </Typography>
            <TextField
              className={classes.detailInput}
              size="small"
              variant="outlined"
              placeholder="Insurance company name"
              autoComplete="off"
              onChange={e => setEditedValue(e.target.value)}
            />
          </div>
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
      );
    }

    return (
      <div className="Deal-row Deal-title-less-margin">
        <div className="Deal-row">
          <Typography variant="h6" className="title">
            Insurance company:
          </Typography>
          <Typography className={classes.leftMargin}>
            {deal.insurance_company}
          </Typography>
        </div>
        <Button
          className={classes.leftMargin}
          color="primary"
          onClick={() => setEditing('insurance_company')}
        >
          Edit
        </Button>
      </div>
    );
  };

  const renderInsuranceType = () => {
    if (editing === 'insurance_type') {
      return (
        <div className="Deal-row Deal-title-less-margin">
          <div className="Deal-row">
            <Typography variant="h6" className="title">
              Insurance type:
            </Typography>
            <TextField
              className={classes.detailInput}
              size="small"
              variant="outlined"
              label="Insurance type"
              autoComplete="off"
              onChange={e => setEditedValue(e.target.value)}
            />
          </div>
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
      );
    }

    return (
      <div className="Deal-row Deal-title-less-margin">
        <div className="Deal-row">
          <Typography variant="h6" className="title">
            Insurance type:
          </Typography>
          <Typography className={classes.leftMargin}>
            {deal.insurance_type.join(', ')}
          </Typography>
        </div>
        <Button
          className={classes.leftMargin}
          color="primary"
          onClick={() => setEditing('insurance_type')}
        >
          Edit
        </Button>
      </div>
    );
  };

  const renderBusinessCovered = () => {
    if (editing === 'business_covered') {
      return (
        <div className="Deal-row Deal-title">
          <div className="Deal-row">
            <Typography variant="h6" className="title">
              Business covered:
            </Typography>
            <TextField
              className={classes.detailInput}
              size="small"
              variant="outlined"
              label="Business covered"
              autoComplete="off"
              onChange={e => setEditedValue(e.target.value)}
            />
          </div>
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
      );
    }

    return (
      <div className="Deal-row Deal-title">
        <div className="Deal-row">
          <Typography variant="h6" className="title">
            Business covered:
          </Typography>
          <Typography className={classes.leftMargin}>
            {deal.business_covered}
          </Typography>
        </div>
        <Button
          className={classes.leftMargin}
          color="primary"
          onClick={() => setEditing('business_covered')}
        >
          Edit
        </Button>
      </div>
    );
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

  const renderAdditionalDetails = () => {
    if (editing === 'additional_details') {
      return (
        <div className="Deal-summary">
          <div className="Deal-summary-title">
            <Typography variant="h6" className="title">
              AdditionalDetails
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
            label="AdditionalDetails"
            multiline
            style={{ width: '100%', marginTop: 10 }}
            rows={4}
            defaultValue={deal.additional_details}
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
          {deal.additional_details}
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
      {renderCompanyName()}
      {renderInsuranceType()}
      {renderBusinessCovered()}

      <TreatyDetails
        deal={deal}
      />

      <div className="Deal-details title">
        <Typography variant="h6" className={classes.detailsSectionTitle}>
          Treaty Information
        </Typography>

        <div>
          <FormControl className={classes.dropdown} variant="outlined" size="small">
            <InputLabel id="demo-simple-select-label">Add details</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              displayEmpty
              id="demo-simple-select"
              onChange={addDetail}
              label="Add details"
            >
              {menuOptions.map(m => <MenuItem value={m.value}>{m.name}</MenuItem>)}
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
