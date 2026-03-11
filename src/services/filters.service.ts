import { Filters } from "../models/filters";

export async function getFiltersService(page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;

    const filters = await Filters.findAll({
      offset,
      limit,
    });

    const filtersCount = await Filters.count();

    return { filters, totalRows: filtersCount };
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}

export async function getFIlterByIdService(filterId: number) {
  try {
    const filter = await Filters.findOne({
      where: {
        id: filterId,
      },
    });

    return filter;
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}

export async function createFilterService(weightAmount: number) {
  try {
    const existingFilter = await Filters.findOne({
      where: {
        weight_amount: weightAmount,
      },
    });

    if (existingFilter) {
      throw new Error("EXISTING_FILTER");
    }

    const createdFilter = await Filters.create({
      weight_amount: weightAmount,
    });

    return createdFilter;
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}

export async function updateFilterService(
  filterId: number,
  weightAmount: number,
) {
  try {
    const updatedFilter = await Filters.update(
      { weight_amount: weightAmount },
      {
        where: {
          id: filterId,
        },
      },
    );

    return updatedFilter;
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}

export async function deleteFilterService(filterId: number) {
  try {
    const deletedFilter = await Filters.destroy({
      where: {
        id: filterId,
      },
    });

    return deletedFilter;
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}
