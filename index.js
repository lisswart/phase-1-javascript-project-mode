console.log("Hi");

const learnerDictionApiKey = "3248df3e-261a-4346-bf3d-e4d8e4480e1e";
const learnerDictionarybaseURL = "https://www.dictionaryapi.com/api/v3/references/learners/json/";
const thesaurusApiKey = "969242a7-379c-400e-8c2b-e07bdc47843c";
const thesaurusBaseURL = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/";
const resultPanel = document.querySelector("#result-panel");

const searchType = document.querySelector("#search-type");
const lookUpWord = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", event => {
    event.preventDefault();
    const arrOfRespObjects = getDictionary(lookUpWord.value);
    if(searchType.value === "short-def") {
        arrOfRespObjects.then( arr => {
            displayShortDef(arr);
            console.log(arr);
        });
    }
    else if(searchType.value === "def") {
        arrOfRespObjects.then(arr => {
            displayDef(arr);
            console.log(arr);
        });
    }
    else if(searchType.value === "dros") {
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

function getDictionary(word) {    
    return fetch(learnerDictionarybaseURL+word+"?key="+learnerDictionApiKey)
        .then(resp => resp.json());
}

function getThesaurus(word) {
    return fetch(thesaurusBaseURL+word+"?key="+thesaurusApiKey)
        .then(resp => resp.json());
}

function displayShortDef(arrayOfObjects) {
    resultPanel.innerHTML = "";
    arrayOfObjects.forEach(object => {
        const shortDefDiv = document.createElement("div");
        shortDefDiv.className = "short-definition-div";
        const functionalLabel = document.createElement("li");
        functionalLabel.className = "fl";
        functionalLabel.textContent = object.fl;
        const headword = document.createElement("h3");
        headword.className = "hwi";
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
        resultPanel.appendChild(shortDefDiv);
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
    resultPanel.innerHTML = "";
    arrOfRespObjs.forEach(respObj => {
        const drpDiv = document.createElement("div");
        drpDiv.className = "drp-div";
        const functionalLabel = document.createElement("li");
        functionalLabel.className = "fl";
        functionalLabel.textContent = respObj.fl;
        const functionalLabelConsole = respObj.fl;
        console.log("fl: " + functionalLabelConsole);
        const headword = document.createElement("h3");
        headword.className = "hwi";
        headword.textContent = respObj.hwi.hw;
        const headwordConsole = respObj.hwi.hw;
        console.log("hw:" + headwordConsole);
        const unorderedList = document.createElement("ul");
        unorderedList.appendChild(headword);

        if(respObj.dros) {
            const drosConsole = respObj.dros;
            //console.log(dros);
            drpDiv.appendChild(functionalLabel);
            drpDiv.appendChild(unorderedList);
            resultPanel.appendChild(drpDiv);
/*************************************************************************************************************************************************************/           
            // const dros = document.createElement("li");
            // dros.className = "drp";
            // dros.textContent = respObj.dros.drp;
            // drpDiv.appendChild(dros);// this is a ::marker element, resulting in empty dom element            
/*************************************************************************************************************************************************************/
            drosConsole.forEach(drp => {
                console.log("phrase: " + drp.drp);
                const drPhrase = document.createElement("li");
                drPhrase.className = "drp";
                drPhrase.textContent = `phrase: ${drp.drp}`;
                drpDiv.appendChild(drPhrase);
                resultPanel.appendChild(drpDiv);
/**************************************************************************************************************************************************************/                
                console.log("def: " + drp.def);
                // above logs "def: [object Object]"
                const drpDef = Array.from(drp.def);//an array with an object in it---{sseq: Array(1)}
                console.log(drpDef);
                //above logs: [{...}]
                console.log(typeof(drpDef));
                //above logs: "object"
                drpDef.forEach(sseq => {
                    const drpDefDiv = document.createElement("div");
                    drpDefDiv.className = "drp-def-div";

                    console.log("sseq: " + sseq.sseq); //an array of object whose key is sseq
                    // logs: "sseq: sense, [object Object]"
                    console.log(typeof(sseq));
                    // logs: "object"
                    Array.from(sseq.sseq).forEach(oneLayerAboveDt => {
                        console.log("One Layer Above dt: " + oneLayerAboveDt); 
                        //logs: "One Layer Above dt: sense, [object Object]" 
                        Array.from(oneLayerAboveDt).forEach(dt => {
                            console.log("is this dt? " + dt);
                            //the above logs to the console:
                            //"is this dt? sense, [object Object]
                            
                            if(typeof(dt) === "object") {
                                dt.forEach(a => {
                                    console.log("what is this? " + typeof(a));
                                    console.log("what is that? " + a);
                                    //logs: "string",
                                    //      "sense"
                                    //logs: "object"
                                    //      [object Object]                              
                                        if(typeof(a) === "object") {
                                            console.log(a.dt);                                            
                                            console.log(typeof(a.dt));
                                            //logs: [Array(2)] 
                                            //      "object"                                      
                                            if(typeof(a.dt) === "object") {
                                                const adt = a.dt;
                                                console.log(adt);
                                                // the above logs to the console---[Array(2)]
                                                adt.forEach(b => {
                                                    console.log(b);
                                                    //logs: (2) ["uns", Array(1)]
                                                    b.forEach(c => {
                                                        console.log(c);
                                                        console.log(typeof(c));
                                                        //logs: "uns",
                                                        //      "string"                                                        
                                                        //logs: [Array(2)],
                                                        //      "object"
                                                            if(typeof(c) === "object") {
                                                                c.forEach(d => {
                                                                    console.log(d);
                                                                    console.log(typeof(d));
                                                                    console.log(d.t);                                                           
                                                                    //logs: (2) [Array(2), Array(2)],                                                                   
                                                                    //      "object"
                                                                    const dt = document.createElement("li");
                                                                    dt.className = "vis";
                                                                    dt.textContent = `verbal illustration: ${d.t}`;
                                                                    drpDefDiv.appendChild(dt);
                                                                    drpDiv.appendChild(drpDefDiv);
                                                                    resultPanel.appendChild(drpDiv);
                                                                    Array.from(d).forEach(e => {
                                                                            console.log(e);
                                                                            console.log(typeof(e));
                                                                            console.log(e.t);
                                                                            const et = document.createElement("li");
                                                                            et.className = "vis";
                                                                            et.textContent = `verbal illustration: ${e.t}`;
                                                                            drpDefDiv.appendChild(et);
                                                                            drpDiv.appendChild(drpDefDiv);
                                                                            resultPanel.appendChild(drpDiv);
                                                                            if(typeof(e) === "object") {
                                                                                Array.from(e).forEach(f => {
                                                                                    console.log(f);
                                                                                    console.log(typeof(f));
                                                                                    console.log(f.t);
                                                                                    const ft = document.createElement("li");
                                                                                    ft.className = "vis";
                                                                                    if(typeof(f.t) !== "") {
                                                                                    ft.textContent = `verbal illustration: ${f.t}`;
                                                                                    drpDefDiv.appendChild(ft);
                                                                                    drpDiv.appendChild(drpDefDiv);
                                                                                    resultPanel.appendChild(drpDiv);
                                                                            //logs: (2) ["text", "used to say that you would not be surprised if someone did something bad"],
                                                                            //      "object",
                                                                            //      "text",
                                                                            //      "string",
                                                                            //      "used to say that you would not be surprised if someone did something bad",
                                                                            //      "string"
                                                                            //logs: (2) ["vis", Array(s)]                                                                            
                                                                            //      "object"
                                                                            //      "vis"
                                                                            //      "string"
                                                                            //      (2) [{...}, {...}],
                                                                            //      "object"
                                                                                    if(typeof(f) === "object") {
                                                                                        Array.from(f).forEach(g => {
                                                                                            console.log(g);
                                                                                            console.log(typeof(g));
                                                                                            
                                                                                                console.log(g.t);
                                                                                                //logs: {t: "I {it}wouldn't put it past him{/it} to lie."}.
                                                                                                //      "object"
                                                                                                //      "I {it}wouldn't put it past him{/it} to lie."
                                                                                                //logs: {t: "I don't know if she ever cheated on an exam, but {it}I wouldn't put it past her{/it}."},
                                                                                                //      "object"
                                                                                                //      "I don't know if she ever cheated on an exam, but {it}I wouldn't put it past her{/it}."
                                                                                                const gt = document.createElement("li");
                                                                                                gt.className = "vis";
                                                                                                gt.textContent = `verbal illustration: ${g.t}`;
                                                                                                
                                                                                                    drpDefDiv.appendChild(gt);
                                                                                                    drpDiv.appendChild(drpDefDiv);
                                                                                                    resultPanel.appendChild(drpDiv);
                                                                                            
                                                                                            if(typeof(g) === "object") {
                                                                                                Array.from(g).forEach(h => {
                                                                                                    console.log(h);
                                                                                                    console.log(typeof(h));
                                                                                                    console.log(h.t);
                                                                                                    const ht = document.createElement("li");
                                                                                                    ht.className = "vis";
                                                                                                    if(typeof(h.t) === "object") {
                                                                                                        ht.textContent = `verbal illustration: ${h.t}`;
                                                                                                        drpDefDiv.appendChild(ht);
                                                                                                        drpDiv.appendChild(drpDefDiv);
                                                                                                        resultPanel.appendChild(drpDiv);
                                                                                                        if(typeof(h) === "object") {
                                                                                                            Array.from(h).forEach(m => {
                                                                                                                console.log(m);
                                                                                                                console.log(typeof(m));
                                                                                                                console.log(m.t);
                                                                                                                const mt = document.createElement("li");
                                                                                                                mt.className = "vis";
                                                                                                                if(typeof(m.t) === "object") {
                                                                                                                    mt.textContent = `verbal illustration: ${m.t}`;
                                                                                                                    drpDefDiv.appendChild(mt);
                                                                                                                    drpDiv.appendChild(drpDefDiv);
                                                                                                                    resultPanel.appendChild(drpDiv);
                                                                                                                }
                                                                                                            })                                                                                                        
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                }                                                                                                                                                            
                                                                            })
                                                                        }
                                                                    }) 
                                                                })                                                    
                                                            }
                                                    })
                                                })
                                            }
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
        const defDiv = document.createElement("div");
        defDiv.className = "def-div";
        const functionalLabel = document.createElement("li");
        functionalLabel.className = "fl";
        functionalLabel.textContent = respObj.fl;
        const functionalLabelConsole = respObj.fl;
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