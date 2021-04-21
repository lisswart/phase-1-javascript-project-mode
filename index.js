console.log("Hi");

const pageContainer = document.createElement("div");
pageContainer.id = "page-container";
document.body.appendChild(pageContainer);

const contentWrapper = document.createElement("div");
contentWrapper.id = "content-wrapper";
pageContainer.appendChild(contentWrapper);

const header = document.createElement("header");
contentWrapper.appendChild(header);
const headerImage = document.createElement("div");
headerImage.id = "header-image";
header.appendChild(headerImage);
const headerTitleDiv = document.createElement("div");
headerTitleDiv.id = "header-title-div";
headerImage.appendChild(headerTitleDiv);
const h1 = document.createElement("h2");
h1.innerHTML = "Learner's<br>Dictionary";
headerTitleDiv.appendChild(h1);

const main = document.createElement("main");
contentWrapper.appendChild(main);
const formFunction = document.createElement("form");
formFunction.className = "form-function";
main.appendChild(formFunction);
const searchOption = document.createElement("select");
searchOption.id = "search-option";
formFunction.appendChild(searchOption);

const nullOption = document.createElement("option");
nullOption.textContent = "Search for/in ...";
nullOption.value = "";
const shortDefOption = document.createElement("option");
shortDefOption.id = "short-def-option";
shortDefOption.value = "shortDefinition";
shortDefOption.textContent = "short definition"
const defOption = document.createElement("option");
defOption.id = "dep-option";
defOption.value = "definition";
defOption.textContent = "definition";
const drosOption = document.createElement("option");
drosOption.id = "dros-option";
drosOption.value = "definedRunOns";
drosOption.textContent = "defined run-on phrases";
const thesaurus = document.createElement("option");
thesaurus.id = "thesaurus-option";
thesaurus.value = "thesaurus";
thesaurus.textContent = "thesaurus";
searchOption.appendChild(nullOption);
searchOption.appendChild(shortDefOption);
searchOption.appendChild(defOption);
searchOption.appendChild(drosOption);
searchOption.appendChild(thesaurus);

const searchBar = document.createElement("input");
searchBar.id = "search-bar";
searchBar.type = "text";
searchBar.placeholder = "search by keyword ...";
const searchButton = document.createElement("input");
searchButton.id = "search-button";
searchButton.type = "submit";
formFunction.appendChild(searchBar);
formFunction.appendChild(searchButton);

const resultsPanel = document.createElement("section");
resultsPanel.id = "results-panel";
main.appendChild(resultsPanel);
const topLevelObjects = document.createElement("div");
topLevelObjects.className = "top-level-objects";
resultsPanel.appendChild(topLevelObjects);
const sseq = document.createElement("div");
sseq.className = "sseq";
topLevelObjects.appendChild(sseq);
const sense = document.createElement("div");
sense.className = "sense";
sseq.appendChild(sense);

let headword = document.createElement("h3");
headword.className = "headword";
let functionalLabel = document.createElement("h3");
functionalLabel.className = "functional-label";
const definition = document.createElement("ul");
definition.className = "definition";
const verbalIllustrations = document.createElement("ul");
verbalIllustrations.className = "verbal-illustrations";
sense.appendChild(headword);
sense.appendChild(functionalLabel);
sense.appendChild(definition);
sense.appendChild(verbalIllustrations);

const text = document.createElement("li");
text.className = "text";
definition.appendChild(text);
const vis = document.createElement("li");
vis.className = "vis";
verbalIllustrations.appendChild(vis);

const footer = document.createElement("footer");
footer.textContent = "Courtesy of Merriam-Webster's API";
contentWrapper.appendChild(footer);

const learnerDictionApiKey = "3248df3e-261a-4346-bf3d-e4d8e4480e1e";
const learnerDictionarybaseURL = "https://www.dictionaryapi.com/api/v3/references/learners/json/";
const thesaurusApiKey = "969242a7-379c-400e-8c2b-e07bdc47843c";
const thesaurusBaseURL = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/";
const resultPanel = document.querySelector("#results-panel");

const searchType = document.querySelector("#search-option");
const lookUpWord = document.querySelector("#search-bar");

searchButton.addEventListener("click", event => {
    event.preventDefault();
    const arrOfRespObjects = getDictionary(lookUpWord.value);
    if(searchType.value === "shortDefinition") {
        arrOfRespObjects.then( arr => {
            displayShortDef(arr);
            console.log(arr);
        });
    }
    else if(searchType.value === "definition") {
        arrOfRespObjects.then(arr => {
            displayDef(arr);
            console.log(arr);
        });
    }
    else if(searchType.value === "definedRunOns") {
        arrOfRespObjects.then(arr => {
            displayDRP(arr);
            console.log(arr);            
        });
    }
    else if(searchType.value === "thesaurus") {
        arrOfRespObjects.then(arr => {
            displaySynonyms(arr);
            console.log(arr);
        })
    }
})

function appendVisToDOM(vis) {
    verbalIllustrations.appendChild(vis);
    sense.appendChild(verbalIllustrations);
    sseq.appendChild(sense);
    resultsPanel.appendChild(sseq);
    topLevelObjects.appendChild(resultsPanel);     
    main.appendChild(sense);
    contentWrapper.appendChild(main);
    pageContainer.appendChild(contentWrapper);  
}

function appendFLToDOM(fl) {
    sense.appendChild(fl);        
    sseq.appendChild(sense);
    topLevelObjects.appendChild(sseq);
    resultsPanel.appendChild(topLevelObjects);     
    main.appendChild(resultsPanel);
    contentWrapper.appendChild(main);
    pageContainer.appendChild(contentWrapper);
}

function appendHWToDOM(hw) {
    sense.appendChild(hw);        
    sseq.appendChild(sense);
    topLevelObjects.appendChild(sseq);
    resultsPanel.appendChild(topLevelObjects);     
    main.appendChild(resultsPanel);
    contentWrapper.appendChild(main);
    pageContainer.appendChild(contentWrapper);
}

function appendDefinitionToDOM(text) {    
    definition.appendChild(text);
    sense.appendChild(definition);        
    sseq.appendChild(sense);
    topLevelObjects.appendChild(sseq);
    resultsPanel.appendChild(topLevelObjects);     
    main.appendChild(resultsPanel);
    contentWrapper.appendChild(main);
    pageContainer.appendChild(contentWrapper);
}

function getDictionary(word) {    
    return fetch(learnerDictionarybaseURL+word+"?key="+learnerDictionApiKey)
        .then(resp => resp.json());
}

function getThesaurus(word) {
    return fetch(thesaurusBaseURL+word+"?key="+thesaurusApiKey)
        .then(resp => resp.json());
}

function displayShortDef(arrayOfObjects) {
    resultsPanel.innerHTML = "";
    arrayOfObjects.forEach(object => {
        const shortDefDiv = document.createElement("div");
        shortDefDiv.className = "short-definition-div";
        const functionalLabel = document.createElement("li");
        functionalLabel.className = "fl";
        functionalLabel.textContent = object.fl;
        headword.textContent = object.hwi.hw;
        const unorderedList = document.createElement("ul");
        unorderedList.appendChild(headword);
        const arrOfShortDef = object.shortdef;
        arrOfShortDef.forEach( strings => {
            const para = document.createElement("li");
            para.textContent = strings;
            unorderedList.appendChild(para);
        })       
        shortDefDiv.appendChild(functionalLabel);
        shortDefDiv.appendChild(unorderedList);
        resultsPanel.appendChild(shortDefDiv);
    });
}

function displaySynonyms(arrOfRespObjects) {
    resultPanel.innerHTML = "";
    
    arrOfRespObjects.forEach(respObj => {
        const flText = respObj.fl;
        const headword = respObj.hwi.hw;
        console.log("fl: " + flText);
        console.log("hw: " + headword);
        const synText = respObj.meta.stems;
        console.log("synonyms: " + synText);
        const sdText = respObj.shortdef;
        console.log("short def: " + sdText);

        const unorderedList = document.createElement("ul");
        const fl = document.createElement("li");
        fl.className = "fl";
        fl.textContent = flText;
        const hw = document.createElement("h3");
        hw.className = "hwi";
        hw.textContent = headword;
        const shortDef = document.createElement("li");
        shortDef.className = "short-def";
        shortDef.innerHTML = `<span class="short-def-span">short definition: </span>${sdText}`;
        const synonyms = document.createElement("li");
        synonyms.className = "synonyms";
        synonyms.innerHTML = `<span class="syn-span">synonyms: </span>${synText}`;

        const thesaurusDiv = document.createElement("div");
        thesaurusDiv.className = "thesaurus-div";
        unorderedList.appendChild(fl);
        unorderedList.appendChild(hw);
        unorderedList.appendChild(shortDef);
        unorderedList.appendChild(synonyms);
        thesaurusDiv.appendChild(unorderedList);
        resultPanel.appendChild(thesaurusDiv);
    })
    
}

function displayDRP(arrOfRespObjs) {
    resultsPanel.innerHTML = "";
    arrOfRespObjs.forEach(respObj => { 
        
        if(respObj.dros) {        
            const arrNamedDros = respObj.dros;
            // functionalLabel.textContent = respObj.fl;        
            // headword.textContent = respObj.hwi.hw;
            Array.from(arrNamedDros).forEach(objectInsideArrNamedDros => {
                
                // appendFLToDOM(functionalLabel);
                // appendHWToDOM(headword);
                // const drp = objectInsideArrNamedDros.drp;               
                // text.innerHTML = `<span class="phrase">phrase: </span>${drp}`;
                // appendDefinitionToDOM(text);
                const def = objectInsideArrNamedDros.def;                             
                Array.from(def).forEach(objInArrNamedDef => {
                    const sseqConsole = objInArrNamedDef.sseq;                    
                    Array.from(sseqConsole).forEach(arrInArrNamedsseq => {                                                
                        Array.from(arrInArrNamedsseq).forEach(element => {                 
                            if(typeof(element) === "object") {                                
                                Array.from(element).forEach(a => {
                                    if(typeof(a) === "object") {
                                        const dt = a.dt;
                                        console.log(dt);
                                        console.log(typeof(dt));
                                        Array.from(dt).forEach(b => {
                                            Array.from(b).forEach(c => {
                                                if(typeof(c) === "object") {
                                                    Array.from(c).forEach(d => {
                                                        const vis_1 = document.createElement("li");
                                                        vis_1.classList.add = "vis";                                                     
                                                        if(typeof(d.t) == typeof("")) {
                                                            vis_1.innerHTML = `<span class="vis">verbal illustration: </span>${d.t}`;
                                                            appendVisToDOM(vis_1);
                                                        }                                                        
                                                        Array.from(d).forEach(e => { 
                                                            const vis_2 = document.createElement("li");
                                                            vis_2.classList.add = "vis";                                                      
                                                            if(typeof(e.t) == typeof("")) {
                                                                vis_2.innerHTML = `<span class="vis">verbal illustration: </span>${e.t}`;
                                                                appendVisToDOM(vis_2);
                                                            }                                                                                                                           
                                                            if(typeof(e) === "object") {
                                                                Array.from(e).forEach(f => {
                                                                    const vis_3 = document.createElement("li");
                                                                    vis_3.classList.add = "vis";                                                                                    
                                                                    if(typeof(f.t) == typeof("")) {
                                                                        vis_3.innerHTML = `<span class="vis>verbal illustration: </span>${f.t}`;
                                                                        appendVisToDOM(vis_3);
                                                                    }                                                                
                                                                    if(typeof(f) === "object") {
                                                                        Array.from(f).forEach(g => { 
                                                                            const vis_4 = document.createElement("li");
                                                                            vis_4.classList.add = "vis";                                                                                  
                                                                            if(typeof(g.t) == typeof("")) {
                                                                                vis_4.innerHTML = `<span class="vis">verbal illustration: </span>${g.t}`;
                                                                                appendVisToDOM(vis_4);
                                                                            }                                                                                                                                                                                    
                                                                            if(typeof(g) === "object") {
                                                                                Array.from(g).forEach(h => {
                                                                                    const vis_5 = document.createElement("li");
                                                                                    vis_5.classList.add = "vis";                                                                                                    
                                                                                    if(typeof(h.t) == typeof("")) {
                                                                                        vis_5.innerHTML = `<span class="vis">verbal illustration: </span>${h.t}`;
                                                                                        appendVisToDOM(vis_5);
                                                                                    } 
                                                                                    if(typeof(h) === "object") {
                                                                                        Array.from(h).forEach(m => { 
                                                                                            const vis_6 = document.createElement("li");
                                                                                            vis_6.classList.add = "vis";                                                                                                              
                                                                                            if(typeof(m.t) == typeof("")) {
                                                                                                vis_6.innerHTML = `<span class="vis">verbal illustration: </span>${m.t}`;
                                                                                                appendVisToDOM(vis_6);
                                                                                            }                                                                                                                                                                           
                                                                                        })                                                                                                        
                                                                                    }                                                                                                    
                                                                                })
                                                                            }
                                                                        })
                                                                    }                                                                                                                                                                                                                                            
                                                                })
                                                            }
                                                        }) 
                                                    })                                                    
                                                }
                                            })
                                        })
                                    }                                        
                                }) 
                            }                                                                                  
                        })                                        
                    })
                })                        
            })   
        }
    })    
}

function displayDef(arrOfRespObjects) {
    resultPanel.innerHTML = "";
    arrOfRespObjects.forEach(respObj => {        
        functionalLabel.textContent = respObj.fl;        
        console.log("fl: " + functionalLabelConsole);
        const headword = document.createElement("h3");
        headword.className = "hwi";
        headword.textContent = respObj.hwi.hw;
        const headwordConsole = respObj.hwi.hw;
        console.log("hw:" + headwordConsole);
        const unorderedList = document.createElement("ul");
        unorderedList.appendChild(headword);

        if(respObj.def) {
            const defConsole = respObj.def;
            console.log(defConsole);            
            console.log(typeof(defConsole));
            //logs: [{...}],
            //      "object"
            const def = document.createElement("li");
            def.classList.add = "def";
            def.textContent = `def: ${defConsole}`;
            defDiv.appendChild(functionalLabel);
            defDiv.appendChild(unorderedList);
            defDiv.appendChild(def);
            resultPanel.appendChild(defDiv);

            defConsole.forEach(abc => {
                console.log(abc);
                console.log(typeof(abc));
                console.log(abc.sseq);
                console.log(typeof(abc.sseq));
                //logs: {sseq: Array(4)},
                //      "object"                
                //logs: (4) [Array(1), Array(1), Array(1), Array(1)],
                //      "object"
                (abc.sseq).forEach(bcd => {
                    console.log(bcd);
                    console.log(typeof(bcd));
                    //logs: [Array(2)]
                    //      "object"
                    //logs: [Array(2)]
                    //      "object"
                    //logs: [Array(2)]
                    //      "object"
                    //logs: [Array(2)]
                    //      "object"
                    bcd.forEach(cde => {
                        console.log(cde);
                        console.log(typeof(cde));
                        //logs: (2) ["sense", {...}]
                        //      "object"
                        //logs: (2) ["sense", {...}]
                        //      "object"
                        //logs: (2) ["sense", {...}]
                        //      "object"
                        //logs: (2) ["sense", {...}]
                        //      "object"
                        cde.forEach(def => {
                            console.log(def);
                            console.log(typeof(def));
                            //logs: "sense"
                            //      "string"
                            //      {sn: "1", lbs: Array(1), dt: Array(2)}
                            //      "object"
                            //logs the same as above 3 more times
                            //console.log(def.sn);//logs: "undefined"
                            if(typeof(def) === "object") {
                                Array.from(def).forEach(efg => {
                                    console.log(efg.sn);
                                    
                                    console.log(typeof(efg.sn));
                                    //logs: [Array(2)]
                                    //      "object"
                                    //logs: (2) ["sense", {...}]
                                    //      "object"
                                    //if(typeof(efg.dt) === "object") {
                                        Array.from(efg.dt).forEach(fgh => {
                                            console.log(fgh);
                                            console.log(typeof(fgh));
                                            //logs: "sense",
                                            //      "string"
                                            //      {sn: "1", dt: Array(1)}
                                            //      "object"
                                            //logs the same as above 3 more times                                  
                                            // if(typeof(fgh) === "object") {
                                            //     console.log(fgh.sn);
                                            //     Array.from(fgh.dt).forEach(ghi => {
                                            //         console.log(ghi);
                                            //         console.log(typeof(ghi));
                                            //         //logs: 
                                            //     })
                                            // }
                                        })
                                    //}

                                })
                            }
                        })
                    })
                })
            })
 
        }
    })    
}