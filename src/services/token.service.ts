import {TokenService as TokenServiceBase} from '@loopback/authentication';
import {bind, BindingScope, inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings} from '../keys';

const token = require('jsonwebtoken');
const signAsync = promisify(token.sign);
const verifyAsync = promisify(token.verify);

@bind({scope: BindingScope.TRANSIENT})
export class TokenService implements TokenServiceBase {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private tokenSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private tokenExpiresIn: string,
  ) {}

  async verifyToken(tokenStr: string): Promise<UserProfile> {
    if (!tokenStr) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }

    let userProfile: UserProfile;

    try {
      // decode user profile from token
      const decodedToken = await verifyAsync(token, this.tokenSecret);
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: decodedToken.id,
          name: decodedToken.name,
          id: decodedToken.id,
        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }
    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
      email: userProfile.email,
    };
    // Generate a JSON Web Token
    let userToken: string;
    try {
      userToken = await signAsync(userInfoForToken, this.tokenSecret, {
        expiresIn: Number(this.tokenExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return userToken;
  }
}
