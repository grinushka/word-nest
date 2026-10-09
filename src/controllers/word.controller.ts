import type { NextFunction, Request, Response } from 'express';
import { createWord, deleteWord, getWord, getWords, updateWord } from '../services/word.service';
import { validateIdParam } from '../validators/params.validator';
import { validateCreateWord, validateUpdateWord } from '../validators/word.validator';

const getWordsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const words = await getWords();
    res.status(200).json({ data: words });
  } catch (error) {
    next(error);
  }
};

const getWordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateIdParam(req.params);
    const word = await getWord(id);
    res.status(200).json({ data: word });
  } catch (error) {
    next(error);
  }
};

const createWordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = validateCreateWord(req.body);
    const word = await createWord(payload);
    res.status(201).json({ data: word });
  } catch (error) {
    next(error);
  }
};

const updateWordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateIdParam(req.params);
    const payload = validateUpdateWord(req.body);
    const word = await updateWord(id, payload);
    res.status(200).json({ data: word });
  } catch (error) {
    next(error);
  }
};

const deleteWordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateIdParam(req.params);
    await deleteWord(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  createWordController,
  deleteWordController,
  getWordController,
  getWordsController,
  updateWordController,
};
