import { Request, Response } from "express";
import {
  createFilterService,
  deleteFilterService,
  getFIlterByIdService,
  getFiltersService,
  updateFilterService,
} from "../services/filters.service";

export async function getFiltersController(req: Request, res: Response) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const filters = await getFiltersService(Number(page), Number(limit));

    return res.status(200).json(filters);
  } catch (error: any) {
    if (error.message === "SERVER_ERROR") {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
}

export async function getFilterByIdController(req: Request, res: Response) {
  try {
    const filterId = req.params.id;

    const filter = await getFIlterByIdService(Number(filterId));
    return res.status(200).json(filter);
  } catch (error: any) {
    if (error.message === "SERVER_ERROR") {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
}

export async function createFilerController(req: Request, res: Response) {
  try {
    const createdFilter = await createFilterService(req.body.weightAmount);

    return res.status(201).json({
      filter: createdFilter,
    });
  } catch (error: any) {
    if (error.message === "EXISTING_FILTER") {
      return res.status(400).json({
        message: "Filter already exists",
      });
    }

    if (error.message === "SERVER_ERROR") {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
}

export async function updateFilterController(req: Request, res: Response) {
  try {
    const filterId = req.params.id;
    const weightAmount = req.body.weightAmount;
    const updatedFilter = await updateFilterService(
      Number(filterId),
      weightAmount,
    );
    return res.status(200).json(updatedFilter);
  } catch (error: any) {
    if (error.message === "SERVER_ERROR") {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
}

export async function deleteFilterController(req: Request, res: Response) {
  try {
    const filterId = req.params.id;

    const deletedFilter = await deleteFilterService(Number(filterId));
    return res.status(200).json(deletedFilter);
  } catch (error: any) {
    if (error.message === "SERVER_ERROR") {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}
