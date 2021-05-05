import { Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import ListCard from './components/list-card';
import ConfigureList from './components/configure-list';
import EditFieldModal from './components/edit-field-modal';

const View = ({ 
  addMarketToList,
  createList,
  deleteList,
  deleteMarket,
  editMarketField,
  lists,
  marketEditing,
  marketFieldModal,
  selectList,
  selectedList,
  setMarketFieldModal,
  updateListName,
  visibleMarkets
}) => {
  const classes = useStyles();

  const renderLists = () => {
    if (true) {
      return lists.map(l => (
        <ListCard
          key={l._id}
          list={l}
          selectedList={selectedList}
          selectList={selectList}
        />
      ))
    }
  };

  const renderListContent = () => {
    if (!selectedList) {
      return (
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Add a new list to get started
        </Typography>
      );
    }
    return (
      <ConfigureList
        addMarketToList={addMarketToList}
        deleteList={deleteList}
        deleteMarket={deleteMarket}
        list={selectedList}
        setMarketFieldModal={setMarketFieldModal}
        visibleMarkets={visibleMarkets}
        updateListName={updateListName}
      />
    );
  };

  return (
    <div className="Markets">
      <div style={{ marginBottom: 15 }}>
        <Typography variant="h4" className="title">
          Markets
        </Typography>
      </div>

      <div className="Markets-main">
        <div className="Markets-main-lists">
          <div className="Markets-main-lists-header">
            <Typography variant="h6" className={classes.subHeader}>
              Market lists
            </Typography>
            <Button 
              color="primary"
              onClick={createList}
            >
              Add list +
            </Button>
          </div>

          <div className="markets-main-lists-content">
            {renderLists()}
          </div>
        </div>

        <div className="Markets-main-manage">
          <div className="Markets-main-lists-header">
            <Typography variant="h6" className={classes.subHeader}>
              Configure market list
            </Typography>
          </div>
          <div className="Markets-main-manage-content">
            {renderListContent()}
          </div>
        </div>
      </div>
      <EditFieldModal
        editMarketField={editMarketField}
        isOpen={marketFieldModal}
        marketEditing={marketEditing}
        setIsOpen={setMarketFieldModal}
      />
    </div>
  );
};

export default View;
