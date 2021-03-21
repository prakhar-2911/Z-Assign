import React from 'react';
import Chart from './Chart';
import '../Styles/Home.scss';

export default function Home(props) {
  const [list, setList] = React.useState([]);
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState('');

  React.useEffect(() => {
    handleCallApi();
  }, []);

  const handleCallApi = () => {
    const strArray = [
      { name: 'fromdate', value: fromDate },
      { name: 'todate', value: toDate },
      { name: 'page', value: page },
    ];
    const str = constructVarString(strArray);
    fetch(
      `https://api.stackexchange.com/2.2/tags?pagesize=${pageSize}&order=desc&sort=popular&site=stackoverflow${str}`
    )
      .then((res) => res.json())
      .then((result) => {
        setList(
          result.items.map((data) => {
            return { name: data?.name, count: data?.count };
          })
        );
      })
      .catch((err) => err);
  };

  const constructVarString = (params) => {
    let varString = '';
    for (let i = 0; i < params.length; i++) {
      if (params[i]?.value) {
        varString = varString + '&' + params[i]?.name + '=' + params[i]?.value;
      }
    }

    return varString;
  };

  const handleChangeInput = (e) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case 'fromDate':
        setFromDate(value);
        break;

      case 'toDate':
        setToDate(value);
        break;

      case 'pageSize':
        setPageSize(value);
        break;

      case 'page':
        setPage(value);
        break;

      default:
        break;
    }
  };

  return (
    <div className='home__container' onChange={handleChangeInput}>
      <div className='input__section'>
        <div className='usr_inp'>
          <label htmlFor='fromDate'>FROM DATE</label>
          <input name='fromDate' value={fromDate} />
        </div>
        <div className='usr_inp'>
          <label htmlFor='toDate'>TO DATE</label>
          <input name='toDate' value={toDate} />
        </div>

        <div className='usr_inp'>
          <label htmlFor='pageSize'>PAGE SIZE</label>
          <input name='pageSize' value={pageSize} />
        </div>
        <div className='usr_inp'>
          <label htmlFor='page'>PAGE</label>
          <input name='page' value={page} />
        </div>
      </div>
      <div>
        <button onClick={handleCallApi}>FETCH DATA</button>
      </div>
      {/* <div className='chart'> */}
      <Chart data={list} />
      {/* </div> */}
    </div>
  );
}
