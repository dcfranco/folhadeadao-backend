import {
  AuthenticationComponent,
  registerAuthenticationStrategy
} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import multer from 'multer';
import path from 'path';
import {JWTAuthenticationStrategy} from './auth';
import {
  TokenServiceBindings,
  TokenServiceConstants,

  UploaderServiceBindings, UserServiceBindings
} from './keys';
import {MySequence} from './sequence';
import {TokenService, UserService} from './services';

export class SalesFunnelApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(TokenService);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserService);

    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
    this.component(AuthenticationComponent);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.configureFileUpload(options.fileStorageDirectory);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  protected configureFileUpload(destination?: string) {
    destination = destination ?? path.join(__dirname, '../.sandbox');
    this.bind(UploaderServiceBindings.STORAGE_DIRECTORY).to(destination);
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        destination,
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
    this.configure(UploaderServiceBindings.FILE_UPLOAD_SERVICE).to(multerOptions);
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    await super.migrateSchema(options);
  }
}
