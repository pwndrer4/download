// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.iosninja.app', // App bundle ID
  name: 'iOS Ninja', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {

    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-main-page', {
  url: '/'
});
var catalogView = app.views.create('#view-apps', {
  url: '/apps/'
});
var settingsView = app.views.create('#view-info', {
  url: '/info/'
});

