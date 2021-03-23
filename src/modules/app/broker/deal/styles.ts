import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  leftMargin: {
    marginLeft: 10,
  },
  titleInput: {
    width: 600,
    height: 41,
  },
  treatyType: {
    padding: 15,
    paddingRight: 40,
    backgroundColor: '#F6F7FB',
    // width: '40%',
    width: 'auto',
    display: 'inline-flex',
    flexDirection: 'column'
  },
  bullet: {
    paddingTop: 1,
    paddingBottom: 1
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
    fontSize: 15
  },
  detailValue: {
    fontSize: 15,
    marginLeft: 7,
  },
  detailInput: {
    width: 250,
    padding: 0,
    height: 35,
    marginLeft: 5,
  },
  checkbox: {
    paddingTop: 4,
    paddingBottom: 4,
  }
});

export default useStyles;
