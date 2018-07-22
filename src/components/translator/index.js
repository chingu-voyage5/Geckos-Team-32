import React, { Component } from 'react';
import './translator.css';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

const API_KEY = env.REACT_APP_YANDEX_TRANSLATE_KEY;
const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/';

//construct the full url address for each api method here
const api_method = {
  translate: API_URL + 'translate?key=' + API_KEY,
  detect: API_URL + 'detect?key=' + API_KEY,
  languages: API_URL + 'getLangs?key=' + API_KEY
};

class Translator extends Component {
  translate = this.translate.bind(this);
  swapLanguages = this.swapLanguages.bind(this);

  state = {
    textToTranslate: '',
    translated: '',
    sourceLang: '', //autodetect language
    targetLang: 'en',
    languages: {}
  };

  changeSourceLang = e => {
    let sourceLang = e.target.value;
    this.setState({ sourceLang: sourceLang });
  };

  changeTargetLang = e => {
    let targetLang = e.target.value;
    this.setState({ targetLang: targetLang });
  };

  changeTextToTranslate = e => {
    let textToTranslate = e.target.value;
    this.setState({ textToTranslate: textToTranslate });
  };

  swapLanguages() {
    let sLang = this.state.sourceLang;
    let tLang = this.state.targetLang;
    this.setState({ sourceLang: tLang, targetLang: sLang });
    return () => this.props.changeSourceLang();
  }

  detectLang() {
    let textToTranslate = this.state.textToTranslate;
    let apiCall = api_method['detect'] + '&text=' + textToTranslate;
    fetch(apiCall)
      .then(res => res.json())
      .then(data => {
        this.setState({ sourceLang: data.lang });
      })
      .then(() => this.translate())
      .catch(error => {
        console.log('There was an error with the translation request: ', error);
      });
  }

  translate() {
    let textToTranslate = this.state.textToTranslate;
    let sourceLang = this.state.sourceLang;
    let targetLang = this.state.targetLang;

    //only perform API call for non-empty input text field
    //if input is empty reset translated and exit the function
    if (textToTranslate.trim().length === 0) {
      //if textToTranslate is empty, set translated to empty
      this.setState({ textToTranslate: '', translated: '' });
      return;
    }

    //if sourceLang is empty -> call detectLang()
    if (!sourceLang) {
      this.detectLang();
    } else {
      textToTranslate = encodeURI(textToTranslate);
      let apiCall =
        api_method['translate'] +
        '&text=' +
        textToTranslate +
        '&lang=' +
        sourceLang +
        '-' +
        targetLang;

      fetch(apiCall)
        .then(res => res.json())
        .then(data => {
          this.setState({ translated: data.text[0] });
        })
        .catch(error => {
          console.log(
            'There was an error with the translation request: ',
            error
          );
        });
    }
  }

  componentDidMount() {
    // use api call to fetch list of languages
    fetch(api_method['languages'] + '&ui=en')
      .then(res => res.json())
      .then(data => this.setState({ languages: data.langs }))
      .catch(error => {
        console.log('There was an error with the translation request: ', error);
      });
  }

  render() {
    //constructing list of available languages
    const langList = Object.keys(this.state.languages).map((lang, i) => {
      return (
        <option key={i} value={lang}>
          {this.state.languages[lang]}
        </option>
      );
    });

    return (
      <div id="translator">
        <div className="container">
          <div className="item item-left">
            <div className="lang-panel">
              <select
                value={this.state.sourceLang}
                className="lang-list"
                onChange={this.changeSourceLang}
              >
                <option value="">Autodetect language</option>
                {langList}
              </select>
              <button id="btn-swap" onClick={this.swapLanguages} />
            </div>
            <textarea
              id="textbox1"
              value={this.state.textToTranslate}
              onChange={this.changeTextToTranslate}
            />
          </div>

          <div className="item item-right">
            <div className="lang-panel">
              <select
                value={this.state.targetLang}
                className="lang-list"
                onChange={this.changeTargetLang}
              >
                {langList}
              </select>
              <button id="btn-translate" type="submit" onClick={this.translate}>
                Translate
              </button>
            </div>
            <div id="textbox2">{this.state.translated}</div>

            <a
              className="yandex"
              href="http://translate.yandex.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Yandex.Translate
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Translator;
