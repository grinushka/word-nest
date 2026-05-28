import type { NextFunction, Request, Response } from 'express';
declare const getWordsController: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createWordController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateWordController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteWordController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createWordController, deleteWordController, getWordsController, updateWordController, };
//# sourceMappingURL=word.controller.d.ts.map