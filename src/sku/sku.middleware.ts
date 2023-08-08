import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SkuMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // add your headers
    req.headers["X-VTEX-API-AppKey"] = this.configService.get("X_VTEX_API_AppKey");
    req.headers["X-VTEX-API-AppToken"] = this.configService.get("X_VTEX_API_AppToken");
    req.headers["Accept"] = "application/json";
    req.headers["Content-Type"] = "application/json";
    next();
  }
}
