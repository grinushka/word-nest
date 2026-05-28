import type { NextFunction, Request, Response } from 'express';
import { createWord, deleteWord, getWords, updateWord } from '../services/word.service';
import {
  validateCreateWord,
  validateDeleteWord,
  validateUpdateWord,
} from '../validators/word.validator';

const getWordsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const words = await getWords();
    res.status(200).json({ data: words });
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
    const { id, ...payload } = validateUpdateWord(req.body);
    const word = await updateWord(id, payload);
    res.status(200).json({ data: word });
  } catch (error) {
    next(error);
  }
};

const deleteWordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateDeleteWord(req.body);
    await deleteWord(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  createWordController,
  deleteWordController,
  getWordsController,
  updateWordController,
};
