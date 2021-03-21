import React from 'react';
import { withRouter } from 'react-router-dom';
import history from '../Utilities/history';
import '../Styles/Header.scss';

function Header(props) {
  const homeLi = React.useRef();
  const clipboardLi = React.useRef();

  const handleNavigate = (e) => {
    if (e?.target?.id === 'home') {
      history.push('/');
      homeLi.current.classList.add('selected__item');
      clipboardLi.current.classList.remove('selected__item');
    } else if (e?.target?.id === 'clipboard') {
      history.push('clipboard');
      clipboardLi.current.classList.add('selected__item');
      homeLi.current.classList.remove('selected__item');
    }
  };

  React.useEffect(() => {
    homeLi.current.classList.add('selected__item');
  });

  return (
    <div className='header' onClick={handleNavigate}>
      <div ref={homeLi} id='home'>
        Home
      </div>
      <div ref={clipboardLi} id='clipboard'>
        Clipboard
      </div>
    </div>
  );
}

export default Header;
