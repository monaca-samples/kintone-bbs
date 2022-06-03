let app, $;

$ = Dom7;
app = new Framework7({
  name: 'My App', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  // App routes
  routes: routes,
});

setTimeout(() => {
  app.views.create('.view-main', {
    url: '/home'
  });
}, 1000);

const KINTONE_DOMAIN = 'xxxx.cybozu.com';
const KINTONE_APP_ID = '1';
let AUTH; // 認証用

// kintoneリクエスト用の共通ヘッダー作成関数
const getHeaders = () => {
  return {
    'X-Cybozu-Authorization': btoa(unescape(encodeURIComponent(AUTH)))
  }
}

// アプリ情報取得関数
const getApp = ({ id }) => {
  const options = {
    method: 'get',
    params: { id },
  };
  return sendRequest(`/app.json`, options);
}

// レコード情報取得関数
const getRecords = (params) => {
  const options = {
    method: 'get',
    params,
  };
  return sendRequest(`/records.json`, options);
}

// レコード登録用関数
const addRecord = (data) => {
  const options = {
    method: 'post',
    data,
  };
  return sendRequest(`/record.json`, options);
}

// コメント取得用関数
const getComments = (params) => {
  const options = {
    method: 'get',
    params,
  };
  return sendRequest(`/record/comments.json`, options);
}

// コメント登録用関数
const postComment = (data) => {
  const options = {
    method: 'post',
    data,
  };
  return sendRequest(`/record/comment.json`, options);
};

// ファイルアップロード用関数
const uploadFile = (file) => {
  const data = new FormData();
  data.append('file', file, file.name);
  const options = {
    method: 'post',
    data,
  };
  return sendRequest(`/file.json`, options, 'multipart');
}

// ファイルダウンロード用
const downloadFile = (fileKey) => {
  const options = {
    method: 'get',
    params: {
      fileKey
    }
  };
  return sendRequest(`/file.json`, options, 'json', 'blob');
}

// リクエスト送信用共通関数
const sendRequest = (path, options, type = 'json', responseType = 'json') => {
  cordova.plugin.http.setDataSerializer(type);
  options.headers = getHeaders();
  options.responseType = responseType;
  return promisify(cordova.plugin.http.sendRequest)(
    `https://${KINTONE_DOMAIN}/k/v1${path}`, options
  );
}

// コールバック方式をPromise形式に変換する関数
function promisify(cdvFunc) {
  return function () {
    return new Promise((res, rej) => {
      cdvFunc(...arguments, res, rej);
    });
  }
}
