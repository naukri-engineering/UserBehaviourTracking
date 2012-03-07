var tnm = function() {
    this.resLogData="";
    this.curId = 'default';

    this.tnmLogPath;//= "savelog.php";
    this.tnmLogArray = {"value":true, "error":false, "links":false};
    this.tnmLogFields={};
    /*= { "myform":[ "email", "sex" ],
          "form2":[ "mno", "Number", "city", "education" ]
      };*/
    this.tnmPageId="Page Id Not Specified";
    var errorMessage= new Array();
    var ajaxErrors = new Array();
    var pageStartTS = new Date().getTime(); 


    this.makeResLog = function() {
        if(window.XMLHttpRequest)
            tnmxhr = new XMLHttpRequest();
        else
            tnmxhr = new ActiveXObject("Microsoft.XMLHTTP");
        var logData ="log="+escape(this.resLogData)+"&rand="+Math.random();
        tnmxhr.onreadystatechange = function() {
            if (tnmxhr.readyState == 4) {
                try {
                    if (tnmxhr.status == 200) {
                        return true;
                    }
                } catch (e) {}
            }
        }
        tnmxhr.open("POST",this.tnmLogPath,false);
        tnmxhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        tnmxhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        tnmxhr.setRequestHeader("Content-length", logData.length);
        tnmxhr.setRequestHeader("Connection", "close");
        tnmxhr.send(logData);

        return true;
    }

    this.LogCatch = function() {
        var curTS = new Date().getTime();
        if(this.tnmLogArray["error"]) {
            while(errorMessage.length > 0) { 
                this.resLogData+="|X||X|error:"+errorMessage.pop();
            }
            while(ajaxErrors.length > 0) {
                this.resLogData+="|X||X|error:"+ajaxErrors.pop();
            }
        }
        this.resLogData +="|X||X|pageEndTS:"+curTS+"|xXx||xXx|";
        this.makeResLog();
        return true;
    }


    this.keyL = function(act, element) {
        var curTS = new Date().getTime();
        if(act == "focus"){
            this.curId = element.name;
            if(this.tnmLogArray["error"]) {
                var length = errorMessage.length;
                while(errorMessage.length > 0) { 
                    if(errorMessage.length == length) {// Log first error with name of element in focus
                        this.resLogData+="|X||X|name:"+(element.name)+"||error:"+errorMessage.pop();
                    }
                    else {
                        this.resLogData+="|X||X|error:"+errorMessage.pop();
                    }
                    //errorMessage = '';
                }
            }
            this.resLogData +="|X||X|name:"+(element.name)+"||startTS:"+curTS;
        }
        else if(act == "blur") {
            if(element.name == this.curId || this.curId == 'default'){
                if(this.curId == 'default') {
                    this.resLogData +="|X||X|name:"+(element.name)+"||startTS:"+pageStartTS;
                }
                if(this.tnmLogArray["value"]){
                    this.resLogData+="||value:";
                    //fieldvalue = (element.options[element.selectedIndex].text)?(element.options[element.selectedIndex].text):element.value;
                    if(element.type == "select-one") {
                        fieldvalue = (element.options[element.selectedIndex].text);
                    }
                    else if(element.type == "select-multiple") {
                       fieldarr = new Array(); 
                        for(idx=0;idx < element.options.length;idx++) {
                            if(element.options[idx].selected) {
                                fieldarr.push((element.options[idx].text));
                            }
                        }
                        fieldvalue = fieldarr.join(",");
                    }
                    else if(element.type == "password")
                        fieldvalue = "******";
                    else {
                        fieldvalue = (element.value);
                    }
                    this.resLogData+=fieldvalue;
                }
                if(this.tnmLogArray["error"]) {
                    if(errorMessage.length > 0) {
                        this.resLogData+="||error:";
                        this.resLogData+=errorMessage.pop();
                        //errorMessage = '';
                    }
                }
                this.resLogData +="||endTS:"+curTS;
            }
            else{
                if(this.tnmLogArray["error"]) {
                    if(errorMessage.length > 0) {
                        this.resLogData+="|X||X|name:"+(element.name)+"||error:";
                        this.resLogData+=errorMessage.pop();
                        //errorMessage = '';
                    }
                }
                else
                    this.resLogData +="||";
            }
        }
        else if(act == "click"){
            if(element.nodeName.toLowerCase() == 'a') {
                var txt = (typeof element.text != 'undefined' && element.text != '')?element.text:element.innerHTML;
                txt +="|-|"+element.href;
                this.resLogData +="|X||X|name:"+encodeURIComponent(txt)+"||pressTS:"+curTS;
            }
            else if(element.nodeName.toLowerCase() == 'button') {
               var txt = (typeof element.value !='undefined' && element.value != '')?element.value:element.innerHTML;
                this.resLogData +="|X||X|name:"+encodeURIComponent(txt)+"||pressTS:"+curTS;
            }
            else {
                if(element.type == "checkbox") {
                    logvalue = element.checked;
                    this.resLogData +="|X||X|name:"+(element.name)+"||value:"+logvalue+"||pressTS:"+curTS;
                }
                else if(element.type == "radio") {
                    logvalue = element.value;
                    this.resLogData +="|X||X|name:"+(element.name)+"||value:"+logvalue+"||pressTS:"+curTS;
                }
                else if(element.type == "submit") 
                    this.resLogData +="|X||X|name:"+(element.value)+"||pressTS:"+curTS;
                else
                    this.resLogData +="|X||X|name:"+(element.name)+"||pressTS:"+curTS;
            }
        }
    }

    this.logError = function(error, type) {
        if(this.tnmLogArray["error"]){
            type = typeof type != 'undefined'?type:'';
            if(type.toLowerCase() == 'ajax') 
                ajaxErrors.push(error);
            else
                errorMessage.push(error);
        }
    }

    this.attachEventtoElements = function(elementsarr) {
        ev=new Evt();
        for(i=0; i<elementsarr.length; i++) {
            if(elementsarr[i].type=="submit"||elementsarr[i].type=="button"||elementsarr[i].type=="radio"||elementsarr[i].type=="checkbox"){
                ev.add(elementsarr[i],'click',this.keyL,this);
            }
            else{
                ev.add(elementsarr[i],'focus',this.keyL,this);
                ev.add(elementsarr[i], 'blur', this.keyL,this);
            }
        }

        if(this.tnmLogArray["links"]) {
            for(i=0;i<document.links.length;i++) {
                ev.add(document.links[i],'click',this.keyL,this);
            }
        }
    }

    this.init = function() {
        var df = document.forms;
        var elAry = [];
        var j=0;
        if(this.tnmLogPath==""||this.tnmLogArray=="")
            return;

        this.resLogData=this.timestamp()+" ";
        this.resLogData+="page:"+this.tnmPageId;
        for(var i=0; i<df.length; i++) {

            if ('undefined' !== typeof this.tnmLogFields[df[i].name]) {
                key=df[i].name;
                var df1=document.forms[key];
                for (elementName in this.tnmLogFields[key]) {   
                    if('undefined' !== typeof df1[this.tnmLogFields[key][elementName]].length){

                        for(j=0;j<df1[this.tnmLogFields[key][elementName]].length;j++)
                            elAry.push(df1[this.tnmLogFields[key][elementName]][j]);
                    }
                    else{
                        elAry.push(df1[this.tnmLogFields[key][elementName]]);
                    }

                }
                i
            } else {
                j = 0;
                for(j=0; j<document.forms[i].elements.length;j++) {

                    if(document.forms[i].elements[j].type!="hidden")
                        elAry.push(document.forms[i].elements[j]);
                }
            }
        }
        this.attachEventtoElements(elAry);
    }

    this.getElementValue = function(act, element) {

        this.resLogData+="||value:";
        this.resLogData+=element.value;

    }
    this.timestamp = function() {
        var cts = new Date();
        var year=cts.getFullYear();
        var month=cts.getMonth() + 1; //we dont want zero based month index
        month = (month < 10)?"0"+month:month;
        var day=cts.getDate();
        day = (day < 10)?"0"+day:day;
        var hours = cts.getHours();
        // minutes part from the timestamp
        var minutes = cts.getMinutes();
        // seconds part from the timestamp
        var seconds = cts.getSeconds();

        return ('['+year+'-'+month+'-'+day+' '+hours + ':' + minutes +
                ':'+seconds+']');
    }
}

var Evt = function() {
    this.add = function(el, evtName, fn, ctx) {
        if (window.attachEvent) {
            el.attachEvent('on' + evtName, function() {
                    fn.call(ctx,evtName,el);
                    });
        } else if (window.addEventListener) {
            el.addEventListener(evtName, function() {
                    fn.call(ctx,evtName,el);
                    }, false);
        }
    }
}
