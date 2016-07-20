var app = angular.module('evaluationGenApp', ['ui.router', 'dndLists', 'ngclipboard']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider
		.state('question', {
			url: '/question',
			templateUrl: 'question-card.html', 
			controller: 'EvaluationGenerator'
		})

		.state('summary', {
			url: '/summary',
			templateUrl: 'question-summary.html',
			controller: 'EvaluationSummary'
		})

		.state('preview', {
			url: '/preview',
			templateUrl: 'evaluation-preview.html',
			controller : 'EvaluationPreview'
		});

		$urlRouterProvider.otherwise('/question');
});