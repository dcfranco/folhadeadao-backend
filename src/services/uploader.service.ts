import {
  bind,
  BindingScope,
  config,
  ContextTags,
  Provider
} from '@loopback/core';
import multer from 'multer';
import {UploaderServiceBindings} from '../keys';
import {FileUploadHandler} from '../types';

@bind({
  scope: BindingScope.TRANSIENT,
  tags: {[ContextTags.KEY]: UploaderServiceBindings.FILE_UPLOAD_SERVICE},
})
export class FileUploadProvider implements Provider<FileUploadHandler> {
  constructor(@config() private options: multer.Options = {}) {
    if (!this.options.storage) {
      this.options.storage = multer.memoryStorage();
    }
  }

  value(): FileUploadHandler {
    return multer(this.options).any();
  }
}
