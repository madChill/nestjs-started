/**
 * Pagination for sequelize:
 * 
 * Note: WIP
 */

function forPage(page, perPage) {
  const offset = page === 1 ? 0 : perPage * (page - 1)
  return { offset, limit: perPage }
}

export class QueryHelper {
  static async paginate({ page = 1, perPage = 20, where, order, attributes, include }: any, model: Record<string, any> = {}): Promise<any> {
    /**
     * Force cast page and perPage to numbers
     */
    page = Number(page) || 1
    perPage = Number(perPage)

    const { rows, count } = await model.findAndCountAll({ ...forPage(page, perPage), ...where, order, attributes, include });
    
    // Return result:
    return {
      total: count,
      perPage: perPage,
      page: page,
      lastPage: Math.ceil(count / perPage),
      data: rows
    }
  }
}