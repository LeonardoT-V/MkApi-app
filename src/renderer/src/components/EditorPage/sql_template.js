export const Sql_Template_Code = [
  {
    label: 'Create Table',
    code: `CREATE TABLE tablename (
    id_name int NOT NULL PRIMARY KEY,
    colum1 int DEFAULT 1,
    PRIMARY KEY (id_name),
    FOREIGN KEY (id_name) REFERENCES otherTable(id_name)
    );`
  },
  {
    label: 'Drop Table',
    code: `DROP TABLE table_name;`
  },
  {
    label: 'Alter Table - ADD',
    code: `ALTER TABLE table_name
    ADD column_name datatype;`
  },
  {
    label: 'Alter Table - REMOVE',
    code: `ALTER TABLE table_name
    DROP COLUMN column_name;`
  },
  {
    label: 'Alter Table - RENAME',
    code: `ALTER TABLE table_name
    RENAME COLUMN old_name to new_name;`
  },
  {
    label: 'Alter Table - ALTER TYPE',
    code: `ALTER TABLE table_name
    ALTER COLUMN column_name TYPE [type_data];`
  },
  {
    label: 'Select',
    code: `SELECT column1, column2, ...
    FROM table_name;`
  },
  {
    label: 'Select Distinct',
    code: `SELECT DISTINCT column1, column2, ...
    FROM table_name;`
  },
  {
    label: 'Where',
    code: `SELECT column1, column2, ...
  FROM table_name
  WHERE condition;`
  },
  {
    label: 'AND OR NOT',
    code: `SELECT column1, column2, ...
    FROM table_name
    WHERE condition1 [AND|OR|NOT] condition2 [AND|OR|NOT] condition3 ...;`
  },
  {
    label: 'Order By',
    code: `SELECT column1, column2, ...
    FROM table_name
    ORDER BY column1, column2, ... ASC|DESC;`
  },
  {
    label: 'Insert Into',
    code: `INSERT INTO table_name (column1, column2, column3, ...)
    VALUES (value1, value2, value3, ...);`
  },
  {
    label: 'Update',
    code: `UPDATE table_name
    SET column1 = value1, column2 = value2, ...
    WHERE condition;`
  },
  {
    label: 'Delete',
    code: `DELETE FROM table_name WHERE condition;`
  },
  {
    label: 'Min Max',
    code: `SELECT [MIN|MAX](column_name)
    FROM table_name
    WHERE condition;`
  },
  {
    label: 'COUNT() AVG() SUM()',
    code: `SELECT [COUNT|AVG|SUM](column_name)
    FROM table_name
    WHERE condition;`
  },
  {
    label: 'Like',
    code: `SELECT column1, column2, ...
    FROM table_name
    WHERE columnN LIKE pattern;`
  },
  {
    label: 'In',
    code: `SELECT column_name(s)
    FROM table_name
    WHERE column_name IN (value1, value2, ...);`
  },
  {
    label: 'Between',
    code: `SELECT column_name(s)
    FROM table_name
    WHERE column_name BETWEEN value1 AND value2;`
  },
  {
    label: 'Aliases',
    code: `SELECT column_name AS alias_name
    FROM table_name;`
  },
  {
    label: 'Inner Join',
    code: `SELECT column_name(s)
    FROM table1
    INNER JOIN table2
    ON table1.column_name = table2.column_name;`
  },
  {
    label: 'Left Join',
    code: `SELECT column_name(s)
    FROM table1
    LEFT JOIN table2
    ON table1.column_name = table2.column_name;`
  },
  {
    label: 'Right Join',
    code: `SELECT column_name(s)
    FROM table1
    RIGHT JOIN table2
    ON table1.column_name = table2.column_name;`
  },
  {
    label: 'Full Join',
    code: `SELECT column_name(s)
    FROM table1
    FULL OUTER JOIN table2
    ON table1.column_name = table2.column_name
    WHERE condition;`
  },
  {
    label: 'Self Join',
    code: `SELECT column_name(s)
    FROM table1 T1, table1 T2
    WHERE condition;`
  },
  {
    label: 'Union',
    code: `SELECT column_name(s) FROM table1
    UNION
    SELECT column_name(s) FROM table2;`
  },
  {
    label: 'Group By',
    code: `SELECT column_name(s)
    FROM table_name
    WHERE condition
    GROUP BY column_name(s)
    ORDER BY column_name(s);`
  },
  {
    label: 'Having',
    code: `SELECT column_name(s)
    FROM table_name
    WHERE condition
    GROUP BY column_name(s)
    HAVING condition
    ORDER BY column_name(s);`
  },
  {
    label: 'Exists',
    code: `SELECT column_name(s)
    FROM table_name
    WHERE EXISTS
    (SELECT column_name FROM table_name WHERE condition);`
  }
]
