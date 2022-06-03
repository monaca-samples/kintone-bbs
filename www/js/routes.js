const routes = [
  {
    path: '/',
    url: './index.html',
  },
  // ログイン
  {
    path: '/home',
    name: 'Home',
    componentUrl: './pages/home.html'
  },
  // スレッド一覧
  {
    path: '/threads',
    name: 'Threads',
    componentUrl: './pages/threads.html'
  },
  // スレッド詳細
  {
    path: '/threads/:id',
    name: 'Thread',
    componentUrl: './pages/thread.html'
  },
  // スレッド新規作成
  {
    path: '/form',
    name: 'Form',
    componentUrl: './pages/form.html'
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
