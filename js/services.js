//Service to validate, insert, clean, and get questions
app.service('questionListService', function(){
	this.questionList = [];

	this.questionIdArray = [];

	this.setQuestionIdArray = function(questionIds){
		this.questionIdArray = questionIds;
	}

	this.getQuestionIdArray = function(){
		return this.questionIdArray;
	}

	//Add question to questionList array
	this.insertQuestion = function(question, isEdit, questionPlace) {
		var questionCopy = angular.copy(question);
		if(isEdit){
			this.questionList[questionPlace] = questionCopy;
		} else {			
			this.questionList.push(questionCopy);
		}
		
		console.log(this.questionList);		
	}

	//Get questionList
	this.getQuestions = function() {
		return this.questionList;
	}

	//Set questionList
	this.setQuestions = function(questions){
		this.questionList = questions;
	}

	//Clean Question Before Insertion
	this.cleanQuestion = function(currentQuestion) {
		//No cleaning necessary for Single/Multiple text lines
		if(currentQuestion.question.type === 'TO' || currentQuestion.question.type === 'TM' || currentQuestion.question.type === 'FT'){
			return currentQuestion;
		}
		//Cleaning for PickOne/PickMany
		else if(currentQuestion.question.type === 'PO' || currentQuestion.question.type === 'PM'){
			//Zero out Max Pick Number if Max Pick property is false
			if(currentQuestion.question.type === 'PM' && currentQuestion.pickmany.maxPick === false){
				currentQuestion.pickmany.maxPickNumber = '';
			}

			//If Number of responses !== response values array length
			if( (parseInt(currentQuestion.responses.number)) !== currentQuestion.responses.vals.length ){
				currentQuestion.responses.vals.splice(currentQuestion.responses.number);
			}
		}

		//Cleaning for Grid Question
		else if(currentQuestion.question.type === 'GR') {
			//If Number of columns !== Columns array length
			if( (parseInt(currentQuestion.grid.columnsNumber)) !== currentQuestion.grid.columnsValue.length ){
				currentQuestion.grid.columnsValue.splice(currentQuestion.grid.columnsNumber);
			}

			//If Number of Rows value !== Rows array length
			if( (parseInt(currentQuestion.grid.questions.num)) !== currentQuestion.grid.questions.rowsValues.length ){
				currentQuestion.grid.questions.rowsValues.splice(currentQuestion.grid.questions.num);
			}
		}

		return currentQuestion;
	}

	//Validate Question
	this.validQuestion = function(currentQuestion) {
		//If NO type
		if(currentQuestion.question.type === ''){
			return false;
		}

		//If text single or multiple
		else if(currentQuestion.question.type === 'TO' || currentQuestion.question.type === 'TM' || currentQuestion.question.type === 'FT'){
			//Confirm it has a prompt
			if(currentQuestion.question.prompt === ''){
				return false;
			} 

			return true;
			
		}

		//If Pick One or Pick Many
		else if(currentQuestion.question.type === 'PO' || currentQuestion.question.type === 'PM'){
			//If no prompt
			if(currentQuestion.question.prompt === ''){
				return false;
			}
			//If zero responses
			if(currentQuestion.responses.vals.length < 1 || isNaN(currentQuestion.responses.number) || currentQuestion.responses.number < 1){
				return false;
			}
			//If Pickmany Max Pick is empty or less than 1
			if(currentQuestion.question.type === 'PM' && currentQuestion.pickmany.maxPick === true){
				if(currentQuestion.pickmany.maxPickNumber === '' || currentQuestion.pickmany.maxPickNumber < 1 || isNaN(currentQuestion.pickmany.maxPickNumber)){
					return false;
				}
			}

			return true;
		}
		//If Grid Question
		else if(currentQuestion.question.type === 'GR'){
			//No Grid Statement
			if(currentQuestion.grid.statement === ''){
				return false;
			}
			//Only one Scale item
			if(currentQuestion.grid.scaleLeft !== '' || currentQuestion.grid.scaleRight !== ''){
				if(currentQuestion.grid.scaleLeft === '' || currentQuestion.grid.scaleRight === ''){
					return false;
				}
			}
			//Check Columns
			if(currentQuestion.grid.columnsNumber === '' || isNaN(currentQuestion.grid.columnsNumber) || currentQuestion.grid.columnsNumber < 1 || currentQuestion.grid.columnsValue.length < 1){
				return false;
			}

			//Check Question Rows
			if(currentQuestion.grid.questions.num === '' || isNaN(currentQuestion.grid.questions.num) || currentQuestion.grid.questions.num < 1 || currentQuestion.grid.questions.rowsValues.length < 1){
				return false;
			}

			return true;

		}

	}

});

//Service to Edit Questions
app.service('questionEditService', function(){
	var edit = false;
	var question = {};
	var questionPosition = '';

	this.setComeFromEdit = function(val){
		edit = val;
	}

	this.getComeFromEdit = function() {
		return edit;
	}

	this.questionToEdit = function() {
		return question;
	}

	this.editQuestion = function(questionFromController, editNumber) {
		question = questionFromController;	
		questionPosition = editNumber;	
	}

	this.getQuestionPosition = function(){
		return questionPosition;
	}

	this.resetEditQuestion = function(){
		question = {};
		questionPosition = '';
	}

});

//Service to Load XML
app.service('questionLoadService', function(){
	var xmlDef;
	var xmlDoc;
	var xmlQuestions;
	var questionIdentifyArray = [];
	
	//Array to hold questions
	var questionList = [];

	//Return imported question ids
	this.getQuestionIds = function(){
		return questionIdentifyArray;
	}

	this.setXMLdefinition = function(definition){
		xmlDef = definition;		
	}

	this.createXMLdoc = function(){
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(xmlDef, "text/xml");
		console.log(xmlDoc);
	}

	this.xmlToQuestions = function() {
		xmlQuestions = xmlDoc.documentElement.childNodes;
		for(var i=0; i<xmlQuestions.length; i++){
			var questionType = xmlQuestions[i].nodeName;
			questionType = questionType.toUpperCase();

			//Determine node type
			if(questionType === 'PICKLIST'){
				this.xmlToPick(xmlQuestions[i]);
			} else if(questionType === 'GRID'){
				this.xmlToGrid(xmlQuestions[i]);
			} else if(questionType === 'FIELD'){
				this.xmlToTextInput(xmlQuestions[i]);
			} else if(questionType === 'GROUP'){
				this.xmlToGroup(xmlQuestions[i]);
			} else if(questionType === 'TEXTNODE'){
				this.xmlToTextNode(xmlQuestions[i]);
			} else {
				console.log('ERROR: unknown question type');
			}

		}
		return questionList;
	}

	this.xmlToPick = function(xPick) {
		var questionObj = this.questionTemplate();

		var pickType = xPick.getAttribute('multiple');
		pickType = pickType.toUpperCase();

		var pickRequired = xPick.getAttribute('requireif');

		var identify = xPick.getAttribute('id');

		//Question Type
		if(pickType === 'NO'){
			questionObj.question.type = 'PO';
		} else {
			questionObj.question.type = 'PM';

			//Max Pick
			var pickMax = xPick.getAttribute('maxpick');
			if(pickMax){
				questionObj.pickmany.maxPick = true;
				questionObj.pickmany.maxPickNumber = pickMax;
			}
		}

		//Required?
		if(pickRequired && pickRequired.toUpperCase() !== 'NO'){
			questionObj.question.required = true;
		} else {
			questionObj.question.required = false;
		}

		//Import ID
		if(identify){
			questionObj.question.id = identify;
			questionIdentifyArray.push(identify);
		}

		//Options
		var xOptions = xPick.getElementsByTagName('options')[0].childNodes;
		questionObj.responses.number = xOptions.length;

		//test if weights exist
		var hasWeights = false;
		for(var m = 0; m < xOptions.length; m++){
			var weightOption = xOptions[m].getAttribute('weight');
			if(weightOption){
				hasWeights = true;
			}
		}

		for(var i = 0; i < xOptions.length; i++){
			var identifyOption = xOptions[i].getAttribute('id');
			var weightOption = xOptions[i].getAttribute('weight');
			if(identifyOption){
				questionObj.responses.ids.push(identifyOption);
				questionIdentifyArray.push(identifyOption);
			}
			if(hasWeights){
				questionObj.responses.weights.push(weightOption);
			}
			questionObj.responses.numberArray.push(i);
			questionObj.responses.vals.push(this.extractCulture(xOptions[i]));
		}

		//Prompt
		var xPrompt = xPick.getElementsByTagName('text')[0];
		questionObj.question.prompt = this.extractCulture(xPrompt);

		//Push to Question List
		questionList.push(questionObj);
	}

	this.xmlToGroup = function(xGroup) {
		var xmlGroupQuestions = xGroup.childNodes;
		for(var i = 0; i < xmlGroupQuestions.length; i++){
			var name = xmlGroupQuestions[i].nodeName.toUpperCase();
			if(name === 'FIELD'){
				this.xmlToTextInput(xmlGroupQuestions[i]);
			} else if (name === 'PICKLIST'){
				this.xmlToPick(xmlGroupQuestions[i]);
			} else if (name === 'TITLE' || name === 'TEXTNODE'){
				this.xmlToTextNode(xmlGroupQuestions[i]);
			} else if (name === 'GRID'){
				console.log("ERROR: GRID CANNOT EXIST INSIDE GROUPS");
				this.xmlToGrid(xmlGroupQuestions[i]);
			}
		}
	}

	this.xmlToGrid = function(xGrid) {
		var questionObj = this.questionTemplate();

		var identify = xGrid.getAttribute('id');
		if(identify){
			questionObj.question.id = identify;
			questionIdentifyArray.push(identify);
		}
		
		//Type 
		questionObj.question.type = 'GR';

		//Statement
		var xPrompt = xGrid.getElementsByTagName('title')[0].childNodes;
		questionObj.grid.statement = this.extractCulture(xPrompt);

		//Scales
		var xScale = xGrid.getElementsByTagName('scale')[0];
		if(xScale){
			var xScaleLeft = xScale.getElementsByTagName('left');
			var xScaleRight = xScale.getElementsByTagName('right');
			questionObj.grid.scaleLeft = this.extractCulture(xScaleLeft);
			questionObj.grid.scaleRight = this.extractCulture(xScaleRight);
		}

		//Columns
		var xColumns = xGrid.getElementsByTagName('columns')[0].childNodes;
		questionObj.grid.columnsNumber = xColumns.length;
		for(var i = 0; i < xColumns.length; i++){
			var identifyColumn = xColumns[i].getAttribute('id');
			if(identifyColumn){
				questionObj.grid.columnsIds.push(identifyColumn);
				questionIdentifyArray.push(identifyColumn);
			}
			questionObj.grid.columnsArray.push(i);
			var columnObj = {};
			//Prompt
			columnObj.prompt = this.extractCulture(xColumns[i]);
			//Weight
			var colWeight = xColumns[i].getAttribute('weight');
			if(colWeight || colWeight === '0'){
				columnObj.weight = colWeight;
			}
			//Push
			questionObj.grid.columnsValue.push(columnObj);
		}

		//Rows
		var xRows = xGrid.getElementsByTagName('rows')[0].childNodes;
		questionObj.grid.questions.num = xRows.length;
		for(var j = 0; j < xRows.length; j++){
			var identifyRow = xRows[j].getAttribute('id');
			if(identifyRow){
				questionObj.grid.questions.rowsIds.push(identifyRow);
				questionIdentifyArray.push(identifyRow);
			}

			questionObj.grid.questions.rowsNumbers.push(j);
			var rowObj = {};
			//Prompt
			rowObj.prompt = this.extractCulture(xRows[j]);
			//Required
			var requireRow = xRows[j].getAttribute('requireif');
			if(requireRow && requireRow.toUpperCase() !== 'NO'){
				rowObj.required = true;
			} else {
				rowObj.required = false;
			}
			questionObj.grid.questions.rowsValues.push(rowObj);
		}

		//Push to Question List
		questionList.push(questionObj);
	}

	this.xmlToTextInput = function(xTextInput) {
		var questionObj = this.questionTemplate();
		
		var textInputType = xTextInput.getAttribute('textmode');
		textInputType = textInputType.toUpperCase();

		var requiredText = xTextInput.getAttribute('requireif');

		var identify = xTextInput.getAttribute('id');

		//Question Type
		if(textInputType === 'SINGLE'){
			questionObj.question.type = 'TO';
		} else {
			questionObj.question.type = 'TM';
		}

		//Required?
		if(requiredText && requiredText.toUpperCase() !== 'NO'){
			questionObj.question.required = true;
		} else {
			questionObj.question.required = false;
		}

		if(identify){
			questionObj.question.id = identify;
			questionIdentifyArray.push(identify);
		}

		questionObj.question.prompt = this.extractCulture(xTextInput);

		questionList.push(questionObj);
	}

	this.xmlToTextNode = function(xTextNode) {
		var questionObj = this.questionTemplate();
		questionObj.question.type = 'FT';
		questionObj.question.prompt = this.extractCulture(xTextNode);
		questionList.push(questionObj);
	}

	this.questionTemplate = function(){
		var questionObj = {};
		questionObj.question = {};
		questionObj.question.prompt = '';
		questionObj.question.required = false;
		questionObj.question.type = '';
		questionObj.question.id = '';

		questionObj.grid = {};
		questionObj.grid.columnsArray = [];
		questionObj.grid.columnsNumber = '';
		questionObj.grid.columnsValue = [];
		questionObj.grid.columnsIds = [];
		questionObj.grid.questions = {};
		questionObj.grid.questions.num = '';
		questionObj.grid.questions.rowsNumbers = [];
		questionObj.grid.questions.rowsValues = [];
		questionObj.grid.questions.rowsIds = [];
		questionObj.grid.scaleLeft = '';
		questionObj.grid.scaleRight = '';

		questionObj.pickmany = {};
		questionObj.pickmany.maxPick = false;
		questionObj.pickmany.maxPickNumber = '';

		questionObj.responses = {};
		questionObj.responses.number = '';
		questionObj.responses.numberArray = [];
		questionObj.responses.vals = [];
		questionObj.responses.ids = [];
		questionObj.responses.weights = [];

		return questionObj;
	}

	this.extractCulture = function(xElement) {
		if('textContent' in xElement){					
			var placeHolderList = xElement.getElementsByTagName('placeholder');
			if(placeHolderList.length){
				var elCulture = xElement.getElementsByTagName('culture');				
				cultureValue = this.convertPlaceholders(elCulture[0]);
			} else {
				var cultureValue = xElement.textContent;
			}
		} else {		
			var placeHolderList = xElement[0].getElementsByTagName('placeholder');
			if(placeHolderList.length){
				var elCulture = xElement[0].getElementsByTagName('culture');
				console.log(elCulture);
				cultureValue = this.convertPlaceholders(elCulture[0]);
			} else {
				var cultureValue = xElement[0].textContent;
			}
		}
		return cultureValue;
	}

	this.convertPlaceholders = function(cultureText){
		var totalString = cultureText.innerHTML;
		totalString = totalString.replace(/(?:\r\n|\r|\n|\s{3})/igm, '');
		
		var noSpace = totalString.replace(/\s/gm, '');
		noSpace = noSpace.toUpperCase();
		var cBeg = noSpace.indexOf('<PLACEHOLDERNAME=');
		var cEnd = noSpace.indexOf('/>');
		if(cBeg >=0 && cEnd >= 0){
			var placePattern = /<placeholder\sname=.|.\/>/gmi;
			var updatedText = totalString.replace(placePattern, function(mat){
				mat = mat.toUpperCase();
				if(mat.indexOf('<PLACEHOLDER') >= 0){
					return '{{';
				} else if (mat.indexOf('\/>') >= 0){
					return '}}';
				} else {
					return '';
				}
			});
			return updatedText;
		}
	}
});

//Service to Generate Evaluation XML
app.service('questionCompleteService', function(){

	var xmlDoc;
	var questionIdCounter = 0;
	var questionIdArray = [];

	this.setQuestionIdArray = function(questionIds){
		questionIdArray = questionIds;		
	}

	this.generateXML = function(questionListArray) {
		console.log(questionIdArray);
		console.log(questionListArray);
		if(questionListArray.length === 0){
			return false;
		}


		//S1 - Create Xml Document
		var xDoc = this.createDoc();
		var xDocRoot;
		

		//S2 - Loop through question list and generate proper xml nodes
		for(var i = 0, j = questionListArray.length; i < j; i++){
			//Text Single
			if(questionListArray[i].question.type === 'TO'){
				this.addTextInput(questionListArray[i], 'single')
			}
			//Text Multiple
			else if(questionListArray[i].question.type === 'TM'){
				this.addTextInput(questionListArray[i], 'multiple');
			}
			//Pick One
			else if(questionListArray[i].question.type === 'PO'){
				this.addPickQuestion(questionListArray[i]);
			}
			//Pick Many
			else if(questionListArray[i].question.type === 'PM'){
				this.addPickQuestion(questionListArray[i]);
			}
			//Grid
			else if(questionListArray[i].question.type === 'GR'){
				this.addGridQuestion(questionListArray[i]);
			}
			//Free Text
			else if(questionListArray[i].question.type === 'FT'){
				this.addFreeText(questionListArray[i]);
			}
		} 
		return xDoc;
	}

	//Create Evaluation Definition xml document
	this.createDoc = function() {
		xmlDoc = document.implementation.createDocument(null, 'evaluationdefinition');		
		xDocRoot = xmlDoc.getElementsByTagName('evaluationdefinition')[0];
		return xmlDoc;
	}

	//Generate free text xml elements
	this.addFreeText = function(tInput) {
		var elGroup = xmlDoc.createElement('textnode');		
		var elTitle = xmlDoc.createElement('title');
		var elGroupTextModes = this.modesCulture(tInput.question.prompt);
		elGroup.appendChild(elTitle).appendChild(elGroupTextModes);

		//Attach to xml dom
		xDocRoot.appendChild(elGroup);

		return;
	}

	//Generate a unique ID
	this.uniqueIdentifier = function(id, grid){
		var unique = true;
		for(var i = 0; i <questionIdArray.length; i++){
			if(id === questionIdArray[i]){
				unique = false;
			}
		}
		if(unique){
			return id;
		} else {
			questionIdCounter++;
			if(!grid){				
				var x = this.uniqueIdentifier('id'+ questionIdCounter, false);
				return x;
			} else {
				var x = this.uniqueIdentifier('id'+ questionIdCounter + 'grid', true);
				return x;
			}					
		}
	}	

	//Generate text single or multiple fields xml elements
	this.addTextInput = function(qInput, fieldHeight) {
		var elTextInputField = xmlDoc.createElement('field');		
		elTextInputField.setAttribute('type', 'text');
		elTextInputField.setAttribute('textmode', fieldHeight);
		var elTextInputText = xmlDoc.createElement('text');		
		var elTextInputModes = this.modesCulture(qInput.question.prompt);
		elTextInputText.appendChild(elTextInputModes);

		if(qInput.question.required){
			elTextInputField.setAttribute('requireif', 'yes');
		}

		if(qInput.question.id && qInput.question.id !== ''){
			elTextInputField.setAttribute('id', qInput.question.id);
		} else {
			var textId = 'id' + questionIdCounter;
			textId = this.uniqueIdentifier(textId, false);
			elTextInputField.setAttribute('id', textId);
			questionIdArray.push(textId);			
		}		

		//create field element
		elTextInputField.appendChild(elTextInputText);

		//Attach to xml dom
		xDocRoot.appendChild(elTextInputField);
		
		return;
	}

	//Generate pickone or pickmany xml elements
	this.addPickQuestion = function(qPick){
		console.log(qPick);
		var elPickList = xmlDoc.createElement('picklist');

		if(qPick.question.id && qPick.question.id !== ''){
			elPickList.setAttribute('id', qPick.question.id);
		} else {
			var pickId = 'id' + questionIdCounter;
			pickId = this.uniqueIdentifier(pickId, false);
			elPickList.setAttribute('id', pickId);
			questionIdArray.push(pickId);
		}
		
		if(qPick.question.type === 'PO'){
			elPickList.setAttribute('multiple', 'no');
		} else {
			elPickList.setAttribute('multiple', 'yes');
			if(qPick.pickmany.maxPick){
				elPickList.setAttribute('maxpick', (qPick.pickmany.maxPickNumber));
			}
		}

		if(qPick.question.required){
			elPickList.setAttribute('requireif', 'yes');
		}


		//Create Text Element
		var elTitleText = xmlDoc.createElement('text');
		var elTitleModes = this.modesCulture(qPick.question.prompt);
		elTitleText.appendChild(elTitleModes);

		//Create Options element
		var optionsHolder = xmlDoc.createElement('options');
		for(var i =0, j = qPick.responses.vals.length; i < j; i++){
			var option = xmlDoc.createElement('option');

			//Add weights for pick one questions
			if(qPick.responses.weights.length > 0){
				if(qPick.responses.weights[i] !== '' && qPick.responses.weights[i] !== undefined && qPick.responses.weights[i] !== null) {
					option.setAttribute('weight', qPick.responses.weights[i]);
				}
			}

			if(qPick.responses.ids && qPick.responses.ids[i] !== ''){
				option.setAttribute('id', qPick.responses.ids[i]);
			} else {
				var optionId = 'id' + questionIdCounter;
				optionId = this.uniqueIdentifier(optionId, false);
				option.setAttribute('id', optionId);
				questionIdArray.push(optionId);
			}

			var optionContents = this.modesCulture(qPick.responses.vals[i]);
			option.appendChild(optionContents);
			optionsHolder.appendChild(option);
		}

		//Add Text and Options elements to the Picklist element
		elPickList.appendChild(elTitleText);
		elPickList.appendChild(optionsHolder);

		//Add Picklist to xml document
		xDocRoot.appendChild(elPickList);
	}

	//Generate a Grid question
	this.addGridQuestion = function(qGrid){
		//Create Grid holder
		var elGridHolder = xmlDoc.createElement('grid');

		if(qGrid.question.id && qGrid.question.id !== ''){
			if(qGrid.question.id.substr(-4) !== 'grid'){
				elGridHolder.setAttribute('id', qGrid.question.id + 'grid');
			} else {
				elGridHolder.setAttribute('id', qGrid.question.id);
			}			
		} else {
			var gridId = 'id' + questionIdCounter + 'grid';
			gridId = this.uniqueIdentifier(gridId, true);
			elGridHolder.setAttribute('id', gridId);
			questionIdArray.push(gridId);			
		}
		
		//Create Title holder element
		var elTitle = xmlDoc.createElement('title');
		var elTitleModes = this.modesCulture(qGrid.grid.statement);
		elTitle.appendChild(elTitleModes);
		elGridHolder.appendChild(elTitle);

		//Add scales if needed
		if(qGrid.grid.scaleLeft !== '' || qGrid.grid.scaleRight !== ''){
			var elScale = xmlDoc.createElement('scale');
			var elScaleLeft = xmlDoc.createElement('left');
			var elScaleRight = xmlDoc.createElement('right');
			var elScaleLeftModes = this.modesCulture(qGrid.grid.scaleLeft);
			var elScaleRightModes = this.modesCulture(qGrid.grid.scaleRight);
			elScaleLeft.appendChild(elScaleLeftModes);
			elScaleRight.appendChild(elScaleRightModes);
			elScale.appendChild(elScaleLeft);
			elScale.appendChild(elScaleRight);

			elGridHolder.appendChild(elScale);
		}

		//Create Columns holder
		var elColumns = xmlDoc.createElement('columns');
		for(var i = 0, j = qGrid.grid.columnsValue.length; i < j; i++){
			var elColumn = xmlDoc.createElement('column');

			if(qGrid.grid.columnsIds && qGrid.grid.columnsIds[i] !== ''){
				elColumn.setAttribute('id', qGrid.grid.columnsIds[i]);
			} else {
				var colId = 'id' + questionIdCounter;
				colId = this.uniqueIdentifier(colId, false);
				elColumn.setAttribute('id', colId);
				questionIdArray.push(colId);			
			}
			
			//Add weight attribute if needed
			if(qGrid.grid.columnsValue[i].hasOwnProperty('weight')){
				elColumn.setAttribute('weight', qGrid.grid.columnsValue[i].weight);
			}
			var elColumnModes = this.modesCulture(qGrid.grid.columnsValue[i].prompt);
			//Add Column to Columns node
			elColumn.appendChild(elColumnModes);
			elColumns.appendChild(elColumn);
		}
		elGridHolder.appendChild(elColumns);

		//Create Rows holder
		var elRows = xmlDoc.createElement('rows');
		for(var l = 0, m = qGrid.grid.questions.rowsValues.length; l < m; l++){
			var elRow = xmlDoc.createElement('row');

			if(qGrid.grid.questions.rowsIds && qGrid.grid.questions.rowsIds[l] !== ''){
				elRow.setAttribute('id', qGrid.grid.questions.rowsIds[l]);
			} else {
				var rowId = 'id' + questionIdCounter;
				rowId = this.uniqueIdentifier(rowId, false);
				elRow.setAttribute('id', rowId);
				questionIdArray.push(rowId);			
			}

			if(qGrid.grid.questions.rowsValues[l].hasOwnProperty('required')){
				if(qGrid.grid.questions.rowsValues[l].required === true){
					elRow.setAttribute('requireif', 'yes');
				}
			}
			var elRowModes = this.modesCulture(qGrid.grid.questions.rowsValues[l].prompt);
			elRow.appendChild(elRowModes);
			elRows.appendChild(elRow);
		}
		elGridHolder.appendChild(elRows);

		//Add to xml document
		xDocRoot.appendChild(elGridHolder);		
	}

	//Helper function to Create Modes>Mode>Culture nodes
	this.modesCulture = function(textInsert){

		var elModes = xmlDoc.createElement('modes');
		var elMode = xmlDoc.createElement('mode');
		elMode.setAttribute('type', 'display');
		
		//if text has placeholders
		if(this.searchForPlaceholders(textInsert)){
			var phCulture = this.insertPlaceholder(textInsert);					
		 	elModes.appendChild(elMode).appendChild(phCulture);
		} else {
			var elCulture = xmlDoc.createElement('culture');
			var elCultureText = xmlDoc.createTextNode(textInsert);			
		 	elModes.appendChild(elMode).appendChild(elCulture).appendChild(elCultureText);
		}
		return elModes;
	}

	//Helper function to test if placeholder exists
	this.searchForPlaceholders = function(str){
		var openPlace = str.indexOf('{{');
		var endPlace = str.indexOf('}}');
		if(openPlace >= 0 && endPlace >= 0){
			return true;
		}
		return false;
	}

	//create 'Culture' xml element with text nodes & placeholder elements
	this.insertPlaceholder = function(str){
		var strPlaceholders = str.replace(/{{(.*?)}}/gim, this.cleanPlaceholder);
		var strPlaceArray = strPlaceholders.split('/PH/');
		var i;
		var elCulture = xmlDoc.createElement('culture');

		for(i=0; i < strPlaceArray.length; i++){
			if(strPlaceArray[i].indexOf('<placeholder name="') >= 0){
				var phEl = xmlDoc.createElement('placeholder');
				var phName = strPlaceArray[i].substring(19, strPlaceArray[i].length-4);
				phEl.setAttribute('name', phName);
				elCulture.appendChild(phEl);
			} else {
				var plText = xmlDoc.createTextNode(strPlaceArray[i]);
				elCulture.appendChild(plText);
			}
		}		
		return elCulture;
	}

	//Helper function to remove whitespace and brackets from placeholders
	this.cleanPlaceholder = function(str){
		//remove whitespace
		var noSpaceStr = str.replace(/\s/g, '');
		//remove brackets
		var place = noSpaceStr.slice(2, noSpaceStr.length - 2);
		//return placeholder element with added seperator character /PH/
		return '/PH/<placeholder name="' + place + '" />/PH/';
	}

});

app.service('questionPreviewService', function($http){
	this.getTemplateXSLT = function() {
		return $http({
			method: 'GET',
			url: 'js/eval-template.xslt',
			headers : {
				'Content-Type' : 'text/xml'
			}
		});
	};
});