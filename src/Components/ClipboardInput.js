import React from 'react';
import history from '../Utilities/history';
import '../Styles/Clipboard.scss';

export default function ClipboardInput(props) {
  const [clipboardInput, setClipboardInput] = React.useState('');
  const [displayVal, setDisplayVal] = React.useState('');
  const onChangeText = ({ target: { value } }) => {
    setClipboardInput(value);
  };

  const inputEl = React.useRef('');
  const displayInputEl = React.useRef('');

  const onCopyToClipboard = (e) => {
    const {
      target: { id },
    } = e;
    if (id === 'displayBtn') {
      displayInputEl.current.select();
      document.execCommand('copy');
    } else if (id === 'clipBtn') {
      inputEl.current.select();
      document.execCommand('copy');
    }
  };

  React.useEffect(() => {
    const {
      location: { search },
    } = history;
    if (search.indexOf('q') !== -1) {
      const v = search.substring(search.indexOf('q') + 2);
      setDisplayVal(v);
    }
  }, []);

  return (
    <div className='clipboard__container'>
      <div className='editable__inp'>
        <input
          type='text'
          name='clip-input'
          value={clipboardInput}
          onChange={onChangeText}
          ref={inputEl}
        />
        <button id='clipBtn' onClick={onCopyToClipboard}>
          Copy To Clipboard
        </button>
      </div>

      <div className='uneditable__inp'>
        <textarea
          disabled
          name='displayVal'
          value={displayVal}
          ref={displayInputEl}
        />
        <button id='displayBtn' onClick={onCopyToClipboard}>
          Copy To Clipboard
        </button>
      </div>
    </div>
  );
}
