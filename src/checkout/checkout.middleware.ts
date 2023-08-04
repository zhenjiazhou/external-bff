import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CheckoutMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // add your headers
    req.headers["X-VTEX-API-AppKey"] = this.configService.get("X_VTEX_API_AppKey");
    req.headers["X-VTEX-API-AppToken"] = this.configService.get("X_VTEX_API_AppToken");
    console.log(req.headers);
    console.log(req.cookies);
    next();
  }
}
