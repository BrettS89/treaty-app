import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  leftMargin: {
    marginLeft: 10,
  },
  titleInput: {
    width: 600,
  },
  rightNavLink: {

  },
  treatyType: {
    padding: 15,
    paddingRight: 40,
    backgroundColor: '#F6F7FB',
    width: 'auto',
    display: 'inline-flex',
    flexDirection: 'column'
  },
  bullet: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  bulletKey: {
    fontWeight: 600,
    marginRight: 15,
    color: '#069CEC',
  },
  dropdown: {
    width: 200,
    marginTop: 6,
    marginBottom: 15
  },
  detailsSectionTitle: {
    marginBottom: 10,
    fontWeight: 600
  },
  detailKey: {
    fontWeight: 600,
    fontSize: 15,
    color: 'grey',
  },
  detailValue: {
    fontSize: 15,
    marginLeft: 15,
  },
  detailInput: {
    width: 250,
    padding: 0,
    marginLeft: 5,
  },
  checkbox: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  removeMarketListText: {
    fontSize: 14,
    color: '#F44436'
  },
  fileFormat: {
    fontSize: 14,
    color: 'grey',
    marginRight: 5,
  },
  fileType: {
    fontSize: 14,
  },
  fileName: {
    fontSize: 14,
  }
}));

export default useStyles;
