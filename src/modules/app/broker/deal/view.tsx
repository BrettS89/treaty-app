import { Button, TextField, Typography } from '@material-ui/core';
import { Deal } from '../../../../types/services/insurance';
import useStyles from './styles';
import RightNav from './components/right-nav';
import TreatyDetails from './components/treaty-details';
import DetailSection from './components/detail-section';
import Territory from './components/territory';
import DealMarkets from './components/markets';
import Files from './components/files';

interface DealViewProps {
  addDetail(arg: any): void;
  deal: Deal;
  editing: string;
  editingDetail: string;
  expensesOptions: { value: string; name: string }[];
  generalTermsOptions: { value: string; name: string }[];
  lists: any[];
  marketNotes: Record<string, any>
  menuOptions: { value: string; name: string }[];
  onCancel(): void;
  onSaveField(str?: string): void;
  setEditedValue(inpt: string | number): void;
  setEditing(str: string): void; 
  setEditingDetail(str: string): void
  setSideComponent(str: string): void;
  sideComponent: string;
  updateMarketList(str: string): void;
  updateTerritory: any
  upsertMarketNote(account_id: string, note: string): void;
}

const View = (props: DealViewProps) => {
  const { addDetail, deal, editing, editingDetail, expensesOptions, generalTermsOptions, lists, marketNotes, menuOptions, onCancel, onSaveField, setEditedValue, setEditing, setEditingDetail, sideComponent, setSideComponent, updateMarketList, updateTerritory, upsertMarketNote } = props;
  const classes = useStyles();

  const renderTitle = (): JSX.Element => {
    if (editing !== 'title') {
      return (
        <div className="Deal-row Deal-title">
          <Typography variant="h5" className="title">
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
            <Typography className="title grey">
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
          <Typography className="title grey">
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
            <Typography className="title grey">
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
          <Typography className="title grey">
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
            <Typography className="title grey">
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
          <Typography className="title grey">
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

  const renderAdditionalDetails = () => {
    if (editing === 'additional_details') {
      return (
        <div className="Deal-summary">
          <div className="Deal-summary-title">
            <Typography className="title grey">
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
          <Typography className="title grey">
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
            <Typography className="title grey">
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
          <Typography className="title grey">
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

  const renderRightPanel = () => {
    switch(sideComponent) {
      case 'TreatyInformation':
        return (
          <DetailSection
            addDetail={addDetail}
            deal={deal}
            editingDetail={editingDetail}
            menuOptions={menuOptions}
            onSaveField={onSaveField}
            section="treatyInformation"
            setEditingDetail={setEditingDetail}
            setEditedValue={setEditedValue}
            title="Treaty Information"
          />
        );

      case 'GeneralTerms':
        return (
          <DetailSection
            addDetail={addDetail}
            deal={deal}
            editingDetail={editingDetail}
            menuOptions={generalTermsOptions}
            onSaveField={onSaveField}
            section="generalTerms"
            setEditingDetail={setEditingDetail}
            setEditedValue={setEditedValue}
            title="General Terms"
          />
        );

      case 'Expenses':
        return (
          <DetailSection
            addDetail={addDetail}
            deal={deal}
            editingDetail={editingDetail}
            menuOptions={expensesOptions}
            onSaveField={onSaveField}
            section="expenses"
            setEditingDetail={setEditingDetail}
            setEditedValue={setEditedValue}
            title="Expenses"
          />
        );

      case 'Territory':
        return (
          <Territory
            deal={deal}
            updateTerritory={updateTerritory}
          />
        );

      case 'Files':
        return (
          <Files />
        )

      case 'Markets':
        return (
          <DealMarkets
            deal={deal}
            lists={lists}
            marketNotes={marketNotes}
            updateMarketList={updateMarketList}
            upsertMarketNote={upsertMarketNote}
          />
        );

      default:
        return (
          <DetailSection
            addDetail={addDetail}
            deal={deal}
            editingDetail={editingDetail}
            menuOptions={expensesOptions}
            onSaveField={onSaveField}
            section="treatyInformation"
            setEditingDetail={setEditingDetail}
            setEditedValue={setEditedValue}
            title="Treaty Information"
          />
        );
    }
  }

  return (
    <div className="Deal">
      {renderTitle()}
      <div className="Deal-content">
        <div className="Deal-left">
          {renderCompanyName()}
          {renderInsuranceType()}
          {renderBusinessCovered()}

          <TreatyDetails
            deal={deal}
          />

          {renderExecutiveSummary()}
          {renderAdditionalDetails()}
          
        </div>

        <div className="Deal-right">
          <RightNav
            component={sideComponent}
            setSideComponent={setSideComponent}
            markets
          />

          {renderRightPanel()}
        </div>
      </div>
    </div>
  );
};

export default View;
