//Controller for Adding a Question card
app.controller('EvaluationGenerator', function($scope, $state, questionListService, questionLoadService, questionEditService) {

	//Helper function to log scope
	$scope.uploadXMLdefinition = function(el) {
		$scope.file = el.files[0];
		var textType = /text.*/;

		//if correct file type uploaded
		if($scope.file.type.match(textType)){
			var reader = new FileReader();

			reader.onload = function(e){

				var fileMin = vkbeautify.xmlmin(e.target.result);

				//Set XML definition in service
				questionLoadService.setXMLdefinition(fileMin);

				//Create XML document
				questionLoadService.createXMLdoc();	

				//Convert xml to questions
				var questionImport = questionLoadService.xmlToQuestions();
				questionListService.setQuestions(questionImport);

				//List Ids
				var questionIds = questionLoadService.getQuestionIds();
				questionListService.setQuestionIdArray(questionIds);

				$state.go('summary');			
			}

			reader.readAsText($scope.file);
		} else {
			console.log('ERROR: file type not supported...');
		}
	}

	//Helper function to re-render inputs
	$scope.renderInputs = function() {
		setTimeout(function(){componentHandler.upgradeDom()});
	}

	//Push number of specified elements into array
	$scope.createListArray = function(listArray, listNumber) {		
		listArray.length = 0;
		for (var i = 0; i < parseInt(listNumber); i++){
			listArray.push(i);
		}
		$scope.renderInputs();
	}

	//Add question data to model and move to next question
	$scope.addQuestion = function(headToSummary) {		
		
		//Valid Question? 
		var validQuestion = questionListService.validQuestion($scope.currentQuestion);
		if(validQuestion){
			$scope.hasError = false;
			//Clean Question...
			var cleanedQuestion = questionListService.cleanQuestion($scope.currentQuestion);
			var edit = questionEditService.getComeFromEdit();
			if(edit){
				questionListService.insertQuestion(cleanedQuestion, true, $scope.editQuestionPosition);
				//Mark as no edit and reset edit question
				questionEditService.setComeFromEdit(false);
				questionEditService.resetEditQuestion();
			} else {
				questionListService.insertQuestion(cleanedQuestion, false);
			}

			$scope.resetForm();
			$scope.currentQuestion.question.type = '';
			$scope.renderInputs();
		} else {
			$scope.hasError = true;
		}
		
	}

	//Question Type has changed, initialize
	$scope.changeQuestion = function(){
		$scope.resetForm();

		//Render DOM
		$scope.renderInputs();
	}

	//Helper function to clear out form values
	$scope.resetForm = function(){
		//Clear out form values
		$scope.currentQuestion.question.prompt = '';
		$scope.currentQuestion.question.required = false;
		$scope.currentQuestion.responses.number = '';
		$scope.currentQuestion.responses.numberArray = [];	
		$scope.currentQuestion.responses.vals = [];
		$scope.currentQuestion.responses.weights = [];	
		$scope.currentQuestion.pickmany.maxPick = false;
		$scope.currentQuestion.pickmany.maxPickNumber = '';
		$scope.currentQuestion.grid.columnsNumber = '';
		$scope.currentQuestion.grid.columnsArray = [];
		$scope.currentQuestion.grid.columnsValue = [];
		$scope.currentQuestion.grid.statement = '';
		$scope.currentQuestion.grid.scaleLeft = '';
		$scope.currentQuestion.grid.scaleRight = '';
		$scope.currentQuestion.grid.questions.num = '';
		$scope.currentQuestion.grid.questions.rowsNumbers = [];
		$scope.currentQuestion.grid.questions.rowsValues = [];

		$scope.hasError = false;
		$scope.file = null;
	}

	//--------------INITIALIZATION--------------

	//Question object
	$scope.currentQuestion = {};
	$scope.currentQuestion.question = {};
	$scope.currentQuestion.question.type = '';
	$scope.currentQuestion.question.prompt = '';
	$scope.currentQuestion.question.required = false;

	//Responses Object
	$scope.currentQuestion.responses = {};
	$scope.currentQuestion.responses.number = '';
	$scope.currentQuestion.responses.numberArray = [];
	$scope.currentQuestion.responses.vals = [];

	//Pickmany object
	$scope.currentQuestion.pickmany = {};
	$scope.currentQuestion.pickmany.maxPick = false;
	$scope.currentQuestion.pickmany.maxPickNumber = '';

	//Grid object
	$scope.currentQuestion.grid = {};
	$scope.currentQuestion.grid.statement = '';
	$scope.currentQuestion.grid.columnsNumber = '';
	$scope.currentQuestion.grid.columnsArray = [];
	$scope.currentQuestion.grid.columnsValue = [];
	$scope.currentQuestion.grid.scaleLeft = '';
	$scope.currentQuestion.grid.scaleRight = '';
	$scope.currentQuestion.grid.questions = {};
	$scope.currentQuestion.grid.questions.num = '';
	$scope.currentQuestion.grid.questions.rowsNumbers = [];
	$scope.currentQuestion.grid.questions.rowsValues = [];

	//For Errors
	$scope.hasError = false;

	//For Editing
	$scope.editQuestionPosition = '';

	//For Uploads
	$scope.file = null;
	

	if(questionEditService.getComeFromEdit()){
		$scope.currentQuestion = questionEditService.questionToEdit();
		$scope.editQuestionPosition = questionEditService.getQuestionPosition();

		$scope.renderInputs();
	}


});


//Controller for Summary card
app.controller('EvaluationSummary', function($scope, $state, questionListService, questionCompleteService, questionEditService){	

	//Successfully copied definition
	$scope.onCopySuccess = function(e){
		$scope.outputXML.alertClass = true;
		$scope.$apply();
		setTimeout(function(){
			$scope.outputXML.alertClass = false;
			$scope.$apply();
		}, 900)
		e.clearSelection();
	}


	//Return array of questions
	$scope.getQuestionList = function() {		
		questionCompleteService.setQuestionIdArray(questionListService.getQuestionIdArray());		
		$scope.questionList = questionListService.getQuestions();
	}

	//Generate XML of evaluation questions
	$scope.success = function() {
		questionCompleteService.setQuestionIdArray(questionListService.getQuestionIdArray());
		var xmlObj = questionCompleteService.generateXML($scope.questionList);
		if(xmlObj){
			var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
			xmlString = vkbeautify.xml(xmlString);
			$scope.outputXML.value = xmlString;
		}
	}

	//Helper function to log scope
	$scope.logScope = function() {
		console.log($scope);
	}

	//Move to question state w/loaded question
	$scope.editQuestion = function(ev) {
		//Climb up the DOM until the 'li' element is found
		var el = ev.target;
		while(el.parentElement){
			if(el.nodeName === 'LI'){
				var questionNumber = el.id;
				break;
			} else {
				el = el.parentElement;
			}
		}	

		questionEditService.setComeFromEdit(true);
		questionEditService.editQuestion($scope.questionList[questionNumber], questionNumber);

		//Return to the question state
		$state.go('question');
	}

	//--------------INITIALIZATION--------------

	//Get Question list when activated
	$scope.questionList = questionListService.getQuestions();

	//No longer editing a question
	questionEditService.setComeFromEdit(false);


	//Output XML object for copying
	$scope.outputXML = {};
	$scope.outputXML.value = 'test';
	$scope.outputXML.alertClass = false;
});


app.controller('EvaluationPreview', function($scope, $state, $sce, questionListService, questionCompleteService, questionPreviewService){
	//Generate XML of evaluation questions
	$scope.success = function() {
		questionCompleteService.setQuestionIdArray(questionListService.getQuestionIdArray());
		var xmlObj = questionCompleteService.generateXML($scope.questionList);
		if(xmlObj){
			var xmlString = (new XMLSerializer()).serializeToString(xmlObj);
			xmlString = vkbeautify.xml(xmlString);
			$scope.outputXML.value = xmlString;
		}
	}

	 //Successfully copied definition
	$scope.onCopySuccess = function(e){
		$scope.outputXML.alertClass = true;
		$scope.$apply();
		setTimeout(function(){
			$scope.outputXML.alertClass = false;
			$scope.$apply();
		}, 900)
		e.clearSelection();
	}

	//--------------INITIALIZATION--------------

	// Preview content initialization
	$scope.xml;
	$scope.xslt;
	$scope.result = "No definition found...";
	questionPreviewService.getTemplateXSLT().then(function(val) {
		if(val && val.status === 200) {			
			$scope.xml = questionCompleteService.generateXML(questionListService.getQuestions());
			$scope.xslt = (new DOMParser()).parseFromString(val.data, 'text/xml');
			var processor = new XSLTProcessor();
			processor.importStylesheet($scope.xslt);
			console.log(processor.transformToFragment($scope.xml, document));
			$scope.result = (new XMLSerializer()).serializeToString(processor.transformToFragment($scope.xml, document));				
		}
	});

	// Generate xml content initialization
	$scope.outputXML = {};
	$scope.outputXML.value = 'test';
	$scope.outputXML.alertClass = false;
	$scope.questionList = questionListService.getQuestions();
});

app.directive("previewBox", function() {
	function link(scope, element) {
		var iframe = document.createElement('iframe');
		iframe.height = "600";
		iframe.width = "100%";
		var element0 = element[0];
		element0.appendChild(iframe);
		var body = iframe.contentDocument.body;

		scope.$watch('content', function() {
			var escapedStr = scope.content.replace(/&amp;&amp;/g, "&&").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
			body.innerHTML = escapedStr;
		});
	}
	return {
		link : link,
		restrict : 'E',
		scope : {
			content : '='
		}
	};
});