import { Injectable } from '@nestjs/common';
import { BaseRepo } from 'src/providers/base-dao';
import { GetChildCategoriesDto } from './dto/category.dto';

@Injectable()
export class CategoryRepo extends BaseRepo<any> {
  constructor() {
    super('category');
  }

  async getWithChildren(id) {
    const knex = this.knexService.instance;

    const query = knex.raw(`WITH RECURSIVE
    c_with_level AS (
    
    SELECT *, 0 as lvl
    FROM   category
    WHERE  parent_id IS NULL and is_deleted = false and id = '${id}'

    UNION ALL
    
    SELECT child.*, parent.lvl + 1
    FROM   category child
    JOIN   c_with_level parent ON parent.id = child.parent_id
    where child.is_deleted = false
),
maxlvl AS (
  SELECT max(lvl) maxlvl FROM c_with_level
),
c_tree AS (
    SELECT
        lvl,
        name_uz,
        name_lat,
        name_ru, 
        id, parent_id, 
        jsonb '[]' children
    FROM   c_with_level, maxlvl
    WHERE  lvl = maxlvl

    UNION 
    (
        SELECT
            (branch_parent).lvl,
            (branch_parent).name_uz,
            (branch_parent).name_ru,
            (branch_parent).name_lat,
            (branch_parent).id,
            (branch_parent).parent_id,
            jsonb_agg(branch_child) as children
        FROM (
            SELECT branch_parent, branch_child
            FROM c_with_level branch_parent
            JOIN c_tree branch_child ON branch_child.parent_id = branch_parent.id
        ) branch
        GROUP BY branch.branch_parent
            
        UNION
            
        SELECT
            c.lvl, 
            c.name_uz, 
            c.name_lat, 
            c.name_ru, 
            c.id, 
            c.parent_id, 
            jsonb '[]' children
        FROM   c_with_level c
        WHERE  NOT EXISTS (SELECT 1 FROM c_with_level hypothetical_child WHERE hypothetical_child.parent_id = c.id)
    )
)
SELECT *
FROM c_tree
WHERE lvl = 0;`);
    const data = await query;

    return data['rows'];
  }

  async getAllParentCategories() {
    const knex = this.knexService.instance;

    const query = knex
      .select(['c.id', 'c.name_uz', 'c.name_ru', 'c.name_lat', 'c.image'])
      .from('category as c')
      .where('is_deleted', false)
      .where('parent_id', null);

    return query;
  }
}
