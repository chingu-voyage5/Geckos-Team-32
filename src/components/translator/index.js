import React, { Component } from 'react';
import './translator.css';

const API_KEY = process.env.REACT_APP_YANDEX_TRANSLATE_KEY;
class Translator extends Component {

    translate = this.translate.bind(this);
    swapLanguages = this.swapLanguages.bind(this);

    state = {
                textToTranslate: '', 
                translated: '',
                sourceLang:'en',
                targetLang: 'de',
                languages: {}
            }
    

    changeSourceLang = e => {
        let sourceLang = e.target.value;
        this.setState({ sourceLang: sourceLang });
    }

    changeTargetLang = e => {
        let targetLang = e.target.value;
        this.setState({ targetLang: targetLang });
    }

    changeTextToTranslate = e => {
        let textToTranslate = e.target.value;
        this.setState({ textToTranslate: textToTranslate});
    }

    swapLanguages() {
        let sLang = this.state.sourceLang;
        let tLang = this.state.targetLang;
        this.setState({ sourceLang: tLang, targetLang: sLang });
        return(() => this.props.changeSourceLang())
    }

    translate() {
        let textToTranslate = encodeURI(this.state.textToTranslate);
        let sourceLang = this.state.sourceLang;
        let targetLang = this.state.targetLang;

        let apiCall = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='
                        + API_KEY + '&text=' + textToTranslate + '&lang=' + sourceLang + '-' + targetLang;

        fetch(apiCall)
        .then(res => res.json())
        .then((data) => {
            this.setState({ translated: data.text[0] })
        })
        .catch(error => {
            console.log("There was an error with the translation request: ", error);
        });

    }
    
    componentDidMount() {
       // use api call to fetch list of languages
       fetch('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + API_KEY + '&ui=en')
        .then(res => res.json())
        .then(data => this.setState({ languages: data.langs }))
        .catch(error => {
            console.log("There was an error with the translation request: ", error);
        });
    }


    render() {
        //constructing list of available languages
        const langList = Object.keys(this.state.languages).map((lang, i) => {
            return (
                <option key={i} value={lang}>
                    {this.state.languages[lang]}
                </option>
            )
        })


        return (
            <div>
                <br />
                <div className="container" >
	                <div className="item item-left">
                        <div className="lang-panel">
                            <select value={this.state.sourceLang} className="lang-list"
                                onChange={this.changeSourceLang}>
                                {langList}
                            </select>  
                            <button id="btn-swap" onClick={this.swapLanguages}>
                            </button>  
                        </div>
                        <textarea id="textbox1" onChange={this.changeTextToTranslate}>
                        </textarea>
                    </div>
                    
                    <div className="item item-right"> 
                        <div className="lang-panel">
                            <select value={this.state.targetLang} className="lang-list"
                                onChange={this.changeTargetLang}>
                                {langList}
                            </select>
                            <button id="btn-translate" type="submit" onClick={this.translate}>Translate</button>
                        </div>
                        <div id="textbox2">
                            {this.state.translated}            
                        </div>
                        
                         <a className="yandex" href="http://translate.yandex.com/" target="_blank" rel="noopener noreferrer">Powered by Yandex.Translate</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Translator;
