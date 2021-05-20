import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import authorization from '../../../../components/authorization';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import View from './view';
import app from '../../../../feathers';
import optionsConfig from './options.config.json';

const defaultDeal = {
  account_id: '',
  user_id: '',
  title: 'Title',
  detail_ids: [],
  details: [],
  insurance_company: 'Abc Insurance',
  insurance_type: 'TBD',
  business_covered: 'TBD',
  executive_summary: 'Executive summary',
  additional_details: 'Additional details',
  location: ['New York', 'New Jersey'],
};

const Deal = (props: any) => {
  const dispatch = useDispatch();
  const deal_id = props.match.params.id;
  const deals = useSelector((state: StoreState) => state.deal);
  const market = useSelector((state: StoreState) => state.market);
  const deal = deals.myDeals.filter((deal) => deal._id === deal_id)[0];
  let dealData: DealType;

  const [sideComponent, setSideComponent] = useState<string>('TreatyInformation');
  const [editing, setEditing] = useState<string>('');
  const [editingDetail, setEditingDetail] = useState<string>('')
  const [editedValue, setEditedValue] = useState<string | number>(null);
  const [marketNotes, setMarketNotes] = useState(null);
  const [menuOptions, setMenuOptions] = useState<{ value: string; name: string }[]>([])
  const [generalTermsOptions, setGeneralTermsOptions] = useState<{ value: string; name: string }[]>([])
  const [expensesOptions, setExpensesOptions] = useState<{ value: string; name: string }[]>([])

  if (deal) {
    dealData = {
      ...defaultDeal,
      ...deal,
    };
  }

  const onSaveField = (detail_id?: string) => {
    if (editingDetail) {
      dispatch({
        type: ActionTypes.EDIT_DETAIL,
        payload: {
          _id: detail_id,
          data: {
            value: editedValue,
          },
        },
      });
    } else {
      dispatch({
        type: ActionTypes.EDIT_DEAL,
        payload: {
          _id: deal._id,
          data: { [editing]: editedValue }
        },
      });
    }

    setEditingDetail('');
    setEditing('');
    setEditedValue(null);
  };

  const onCancel = () => {
    setEditing('');
    setEditedValue(null);
  };

  const addDetail = (e: any): void => {
    const key = e.target.value.split('&')[0];
    const display_text = e.target.value.split('&')[1];
    console.log(key, display_text);

    app.service('insurance/detail')
      .create({
        deal_id: deal._id,
        display_text,
        key,
        value: 'default',
      })
      .then((detail: DetailType) => {
        dispatch({
          type: ActionTypes.EDIT_DEAL,
          payload: {
            _id: deal._id,
            data: { detail_ids: [...deal.detail_ids, detail._id] },
          },
        });
      });
  };

  const updateTerritory = (state?: string, exists?: boolean, selectAll?: string[]): void => {
    let territories = !exists
      ? [...deal.territories, state]
      : deal.territories.filter(t => t !== state);

    if (selectAll) territories = selectAll;

    dispatch({
      type: ActionTypes.EDIT_DEAL,
      payload: {
        _id: deal._id,
        data: { territories },
      },
    });
  };

  const getMarketNotes = async () => {
    const notes = await app.service('market/note').find({
      query: {
        deal_id,
      },
    });

    const notesObj = notes.data.reduce((acc, curr) => {
      acc[curr.account_id] = curr;
      return acc;
    }, {});

    setMarketNotes(notesObj);
  };

  const updateMarketList = (list: any, remove: boolean = false) => {
    if (!list && !remove) return;

    dispatch({
      type: ActionTypes.EDIT_DEAL,
      payload: {
        _id: deal._id,
        data: { market_list_id: remove ? null : list._id }
      },
    });

    if (remove) setMarketNotes({});
  };

  const upsertMarketNote = (account_id: string, notes: string) => {
    const service = app.service('market/note')

    service
      .find({
        query: {
          deal_id,
          account_id,
        }
      })
      .then(res => {
        const note = res.data[0];

        return note
          ? service.patch(note._id, { notes })
          : service.create({ deal_id, account_id, notes });
      })
      .then(res => {
        const clonedMarketNotes = _.cloneDeep(marketNotes);
        clonedMarketNotes[res.account_id] = res;
        setMarketNotes(clonedMarketNotes);
      })
  };
  
  useEffect(() => {
    if (!deal) {
      dispatch({ type: ActionTypes.GET_MY_DEALS });
    } else {
      const options: { value: string, name: string }[] = [
        ...optionsConfig.treatyInformation.general
      ];

      const expensesOptionsArr: { value: string, name: string }[] = [
        ...optionsConfig.expenses.general,
      ];

      const generalTermsOptions: { value: string, name: string }[] = [
        ...optionsConfig.generalTerms.general
      ];

      if (deal.treaty_type.includes('Excess of loss')) {
        optionsConfig.treatyInformation.xol.forEach(o => options.push(o));
        optionsConfig.generalTerms.xol.forEach(o => generalTermsOptions.push(o));
        optionsConfig.expenses.xol.forEach(o => expensesOptionsArr.push(o));
      }

      if (deal.treaty_type.includes('Surplus')) {
        optionsConfig.treatyInformation.surplus.forEach(o => options.push(o));
        optionsConfig.generalTerms.surplus.forEach(o => generalTermsOptions.push(o));
        optionsConfig.expenses.surplus.forEach(o => expensesOptionsArr.push(o));
      }

      if (deal.treaty_type.includes('Quota share')) {
        optionsConfig.treatyInformation.quotaShare.forEach(o => options.push(o));
        optionsConfig.generalTerms.quotaShare.forEach(o => generalTermsOptions.push(o));
        optionsConfig.expenses.quotaShare.forEach(o => expensesOptionsArr.push(o));
      }

      if (deal.program_business) {
        optionsConfig.treatyInformation.programBusiness.forEach(o => options.push(o));
        optionsConfig.generalTerms.programBusiness.forEach(o => generalTermsOptions.push(o));
        optionsConfig.expenses.programBusiness.forEach(o => expensesOptionsArr.push(o));
      }

      if (deal.insurance_type.includes('Property')) {
        optionsConfig.treatyInformation.property.forEach(o => options.push(o));
        optionsConfig.generalTerms.property.forEach(o => generalTermsOptions.push(o));
        optionsConfig.expenses.property.forEach(o => expensesOptionsArr.push(o));
      }

      const details = deal.details.map(d => d.key);

      const filteredOptions = options.filter(o => !details.includes(o.value));
      const filteredExpenseOptions = expensesOptionsArr.filter(o => !details.includes(o.value));
      const filteredGeneralTermsOptions = generalTermsOptions.filter(o => !details.includes(o.value));

      setMenuOptions(filteredOptions);
      setExpensesOptions(filteredExpenseOptions);
      setGeneralTermsOptions(filteredGeneralTermsOptions);
    }
  }, [deal]);

  useEffect(() => {
    getMarketNotes();
  }, []);

  return deal && marketNotes
    ? (
    <View
      addDetail={addDetail}
      deal={dealData}
      editing={editing}
      editingDetail={editingDetail}
      expensesOptions={expensesOptions}
      generalTermsOptions={generalTermsOptions}
      lists={market.lists}
      marketNotes={marketNotes}
      menuOptions={menuOptions}
      onCancel={onCancel}
      onSaveField={onSaveField}
      setEditedValue={setEditedValue}
      setEditing={setEditing}
      setEditingDetail={setEditingDetail}
      setSideComponent={setSideComponent}
      sideComponent={sideComponent}
      updateMarketList={updateMarketList}
      updateTerritory={updateTerritory}
      upsertMarketNote={upsertMarketNote}
    />
  )
  : <div>Loading...</div>
};

export default authorization(Deal);
