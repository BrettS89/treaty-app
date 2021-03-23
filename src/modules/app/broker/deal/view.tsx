import { Button,  FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select,TextField, Typography } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { Deal } from '../../../../types/services/insurance';
import useStyles from './styles';
import Detail from './components/Detail';

interface DealViewProps {
  addDetail(arg: any): void;
  deal: Deal;
  editing: string;
  editingDetail: string;
  onCancel(): void;
  onSaveField(str?: string): void;
  setEditedValue(inpt: string | number): void;
  setEditing(str: string): void; 
  setEditingDetail(str: string): void
}

const View = (props: DealViewProps) => {
  const { addDetail, deal, editing, editingDetail, onCancel, onSaveField, setEditedValue, setEditing, setEditingDetail } = props;
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
        <div className="Deal-row Deal-title">
          <div className="Deal-row">
            <Typography variant="h6" className="title">
              Insurance company:
            </Typography>
            <TextField
              className={classes.detailInput}
              size="small"
              variant="outlined"
              label="Insurance company name"
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
    )
  }

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

      <div>
        {renderCompanyName()}
      </div>

      <div className={classes.treatyType}>
        <Typography variant="h6" className="title">
          Treaty Details
        </Typography>

        <div>
          <List dense={false}>
            <ListItem className={classes.bullet}>
              <ListItemIcon>
                <FiberManualRecordRoundedIcon color="primary" style={{ fontSize: 14 }} />
              </ListItemIcon>
              <ListItemText
                primary={deal.treaty_type.join(', ')}
              />
            </ListItem>

            <ListItem className={classes.bullet}>
              <ListItemIcon>
                <FiberManualRecordRoundedIcon color="primary" style={{ fontSize: 14 }} />
              </ListItemIcon>
              <ListItemText
                primary={deal.insurance_type.join(', ')}
              />
            </ListItem>

            <ListItem className={classes.bullet}>
              <ListItemIcon>
                <FiberManualRecordRoundedIcon color="primary" style={{ fontSize: 14 }} />
              </ListItemIcon>
              <ListItemText
                primary={`Effective date: ${deal.effective_date}`}
              />
            </ListItem>

            <ListItem className={classes.bullet}>
              <ListItemIcon>
                <FiberManualRecordRoundedIcon color="primary" style={{ fontSize: 14 }} />
              </ListItemIcon>
              <ListItemText
                primary={`Term: ${deal.contract_term}`}
              />
            </ListItem>

            <ListItem className={classes.bullet}>
              <ListItemIcon>
                <FiberManualRecordRoundedIcon color="primary" style={{ fontSize: 14 }} />
              </ListItemIcon>
              <ListItemText
                primary={deal.reinsurance_coverage}
              />
            </ListItem>

            <ListItem className={classes.bullet}>
              <ListItemIcon>
                <FiberManualRecordRoundedIcon color="primary" style={{ fontSize: 14 }} />
              </ListItemIcon>
              <ListItemText
                primary={`Excess Treaty: ${deal.excess_treaty ? 'Yes' : 'No'}`}
              />
            </ListItem>

            <ListItem className={classes.bullet}>
              <ListItemIcon>
                <FiberManualRecordRoundedIcon color="primary" style={{ fontSize: 14 }} />
              </ListItemIcon>
              <ListItemText
                primary={deal.admitted.join(', ')}
              />
            </ListItem>
          </List>
        </div>
      </div>

      <div className="Deal-details title">
        <Typography variant="h6" className={classes.detailsSectionTitle}>
          Treaty Information
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
