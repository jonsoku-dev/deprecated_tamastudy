// https://support.google.com/cloud/answer/6158849#authorized-domains
// https://console.cloud.google.com/apis/credentials/oauthclient/33026534455-n6oee3es3uglskeff2d6gd5p9sbl5h4q.apps.googleusercontent.com?organizationId=0&project=po1gaipplatform
// https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/oauth2.js
const asyncHandler = require('express-async-handler');
//sns login start 
const log = console.log
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy')

const {google} = require('googleapis')
const plus = google.plus('v1')
//sns login end

/**
 * oauth2를 사용하려면 CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI가 필요
 * 자세한 내용은 아래 링크 참조
 * 아래 : https://console.cloud.google.com/apis/credentials.
 */
const keyPath = path.join(__dirname, '../oauth2.keys.json')
let keys = {redirect_uris: ['']}
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web
}

/**
 * 인증 관련 키를 설정합시다~
 */
const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
)

google.options({auth: oauth2Client})

/**
 * 인증화면을 출력 / 로그인 후 콜백함수로 코드를 취득하기까지의 소스
 */
async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // 승인에 사용될 URL을 취득
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    })
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/api/user/googleCallback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3333')
              .searchParams
            res.end('Authentication successful! Please return to the console.')
            server.destroy()
            const {tokens} = await oauth2Client.getToken(qs.get('code'))
            log(tokens)
            oauth2Client.credentials = tokens
            resolve(oauth2Client)
          }
        } catch (e) {
          reject(e)
        }
      })
      .listen(3333, () => {
        // 인증화면 열기
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref())
      })
    destroyer(server)
  });
}

if (module === require.main) {
  runSample().catch(console.error);
}

module.exports.googleAuth = asyncHandler(async (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/plus.me']
  let userinfo = {}
  let resByGoogle = {}
  let client = await authenticate(scopes).catch(console.error)

  var res = plus.people.get({ userId: 'me', auth: client }, function (err, profile) {
    if (err) {
      log('An error occured', err);
    }
    log(profile)
  });
  //log(res)
  // resByGoogle = await plus.people.get({userId: 'me'})
  // log('hoge', resByGoogle)
  // // 사용자 프로필 검색
  // userinfo = resByGoogle.data || {}
  // log('resByGoogle.data : [ ', resByGoogle.data, ' ]')
  // res.status(200).json(userinfo)
    
})



// module.exports.googleCallback = asyncHandler(async (req, res) => {
//   log(req.query.code)
//   res.status(200).json({'code' : req.query.code})
// })