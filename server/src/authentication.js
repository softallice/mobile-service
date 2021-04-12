const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile) {   
    const baseData = await super.getEntityData(profile);    
    return {
      ...baseData,
      profilePicture: profile.picture,
      email: profile.email,
      name: profile.name,
      firstname: profile.given_name,
      lastname: profile.family_name,
      avatar: profile.picture
    };
  }

  async getPayload(authResult, params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params)
    const { user } = authResult
    return Object.assign(payload, {
        userId: user.id,
        role: user.role,
    })
  }

  async getRedirect(authResult) {
    // console.log('google getRedirect authResult', authResult)
    if (authResult.accessToken) {
        return `http://localhost:8080/#access_token=${authResult.accessToken}`
    }
    return 'http://localhost:8080/authenticate?error=OAuth%20Authentication%20not%20successful'
  }
}

class NaverStrategy extends OAuthStrategy {
  async getEntityQuery(profile) {
    console.log('Naver getEntityQuery', profile)
    return {
      naverId: profile.response.id
    };
  }

  async updateEntity(entity, profile, params) {
    return super.updateEntity(entity, profile, params);
  }

  async getEntityData(profile) {
    console.log('naver profile ======================= ', profile)
    const baseData = await super.getEntityData(profile);
    
    return {
      ...baseData,
      naverId: profile.response.id,
      profilePicture: profile.response.profile_image,
      email: profile.response.email,
      name: profile.response.name,
      firstname: profile.response.name,
      lastname: profile.response.name,
      avatar: profile.response.profile_image
    };
  }
  
  async getRedirect(authResult) {
    if (authResult.accessToken) {
        return `http://localhost:8080/#access_token=${authResult.accessToken}`
    }
    return 'http://localhost:8080/authenticate?error=OAuth%20Authentication%20not%20successful'
  }
}

class KakaoStrategy extends OAuthStrategy {
  async getRedirect(authResult) {
    console.log('kakao getRedirect authResult', authResult)

    if (authResult.accessToken) {
        return `http://localhost:8080/?access_token=${authResult.accessToken}`
    }
    return 'http://localhost:8080/authenticate?error=OAuth%20Authentication%20not%20successful'
  
  }

  async getProfile(profile, params) {
    console.log('kakao getProfile profile', profile);
    console.log('kakao getProfile params', params);
  }

  async getEntityData(profile) {
    console.log('Kakao profile.response', profile);
    const baseData = await super.getEntityData(profile);
    
    return {
      ...baseData,
      // profilePicture: profile.response.profile_image,
      // email: profile.response.email,
      // name: profile.response.name,
      // firstname: profile.response.name,
      // lastname: profile.response.name,
    };
  }
}


module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('google', new GoogleStrategy());
  authentication.register('naver', new NaverStrategy());
  authentication.register('kakao', new KakaoStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());

  //최근 로그인 일시 업데이트
  app.on('login', (data) => {
    data.user['lastLoggedIn'] = new Date();
    app.service('users').patch(data.user._id, data.user);
  });
};
