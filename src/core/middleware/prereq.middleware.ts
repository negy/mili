import { Injectable, NestMiddleware, } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { MyRequest, MyResponse } from '../types/net';

@Injectable()
export class PreRequestMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    use(request: Request, response: Response, next: () => void) {
        const nestReq: any = request;
        const nestRes: any = response;
        const req: MyRequest = nestReq as MyRequest;
        const res: MyResponse = nestRes as MyResponse;
        const configService = this.configService;
        req.reqStartTime = Date.now();
        res.locals.env = configService.env;
        res.locals.siteName = configService.server.siteName;
        res.locals.apiPrefix = configService.server.apiPrefix,
        res.locals.reqPath = req.originalUrl,
        res.locals.staticURL = configService.static.staticURL;
        res.locals.cssPath = configService.static.cssPath;
        res.locals.jsPath = configService.static.jsPath;
        res.locals.imgPath = configService.static.imgPath;
        res.locals.fontPath = configService.static.fontPath;
        res.locals.userLevelChapterURL = configService.static.userLevelChapterURL;

        res.locals.globalConfig = {
            url: configService.server.url,
            mURL: configService.server.mURL,
            domain: configService.server.domain,
            mDomain: configService.server.mDomain,
            csrfToken: configService.server.csrfProtect ? req.csrfToken() : '',
            apiPrefix: configService.server.apiPrefix,
            imgPath: configService.static.imgPath,
            jsPath: configService.static.jsPath,
            cssPath: configService.static.cssPath,
        };
        next();
    }
}