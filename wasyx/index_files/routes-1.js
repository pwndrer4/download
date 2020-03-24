routes = [
    {
      path: '/',
      url: './index.php',
    },
    {
      path: '/app/',
      url: './pages/app.php',
    },
    {
      path: '/category/',
      url: './pages/catApps.php',
    },
    // Default route (404 page). MUST BE THE LAST
    {
      path: '(.*)',
      url: './pages/404.html',
    },
  ];
  